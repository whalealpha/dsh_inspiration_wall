/**
 * 灵感墙 — Host half.
 *
 * Owns the local idea store (notes JSON + media files) and exposes it to the
 * browser half through a small read/write HTTP surface registered on the
 * harness web server:
 *
 *   GET  /api/inspiration/ping            -> { ok: true }
 *   GET  /api/inspiration/state           -> { settings, notes }
 *   POST /api/inspiration/rpc             -> { op, payload } -> { ok, value }
 *   POST /api/inspiration/media?name=...  -> raw bytes -> { path, mime, size }
 *   GET  /api/inspiration/media?path=...  -> raw bytes
 *
 * RPC ops: state | saveNote | deleteNote | saveSettings | storage | usage |
 *          clearUsageCache | openPath
 *
 * `usage` aggregates the REAL token usage written by this Harness into its own
 * session logs (`assistant/message.usage`), so the wall can report what the
 * terminal actually consumed per day, per model, for a chosen date range.
 */
import { spawn } from 'node:child_process'
import { createReadStream } from 'node:fs'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, extname, join, resolve } from 'node:path'

const CATEGORIES = ['未开始', '进行中', '已实现', '已放弃']
const LEGACY_CATEGORY = { 新想法: '未开始', 思路: '未开始', 待验证: '未开始' }

function normalizeCategory(value) {
  if (CATEGORIES.includes(value)) return value
  return LEGACY_CATEGORY[value] || '未开始'
}

const PALETTE_IDS = ['paper', 'graphite', 'mist', 'sand', 'midnight', 'cyber', 'ember']
const PALETTE_VISIBLE = ['paper', 'graphite', 'ember']
/* Kept definitions that the picker no longer offers snap to their closest
   sibling so a stored value can never leave the panel stuck on a hidden theme. */
const PALETTE_FALLBACK = { mist: 'graphite', sand: 'paper', midnight: 'graphite', cyber: 'graphite' }

const DEFAULT_SETTINGS = {
  palette: 'paper',
  mediaDir: '',
  mediaRoots: [],
  priceInput: 2,
  priceOutput: 8,
  priceCache: 0.04,
  transcribe: true,
  language: 'zh',
  period: 'month',
}

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.webm': 'audio/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.ogv': 'video/ogg',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
  '.zip': 'application/zip',
}

function sendJson(res, status, value) {
  const body = Buffer.from(JSON.stringify(value), 'utf8')
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': String(body.length),
    'cache-control': 'no-store',
  })
  res.end(body)
}

function readBody(req, limit = 200 * 1024 * 1024) {
  return new Promise((resolveBody, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('body-too-large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolveBody(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function inside(root, path) {
  if (!root) return false
  const a = resolve(root)
  const b = resolve(path)
  return b === a || b.startsWith(a + (process.platform === 'win32' ? '\\' : '/'))
}

function newId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Cordis waits for these services before calling `apply` and re-applies when
 * one is replaced. Declaring `webServer` here (instead of reading it with
 * `ctx.get` and giving up) is what keeps the panel available on a cold start:
 * at boot the web server may still be mounting, and an early return would leave
 * the HTTP surface unregistered, so the browser half would 404 on first load.
 */
export const inject = ['webServer']

function pad2(value) {
  return String(value).padStart(2, '0')
}

function localDay(time) {
  const date = new Date(Number(time))
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function dayList(fromDay, toDay) {
  const days = []
  const [fy, fm, fd] = fromDay.split('-').map(Number)
  const [ty, tm, td] = toDay.split('-').map(Number)
  const cursor = new Date(fy, fm - 1, fd)
  const end = new Date(ty, tm - 1, td)
  let guard = 0
  while (cursor.getTime() <= end.getTime() && guard < 4000) {
    days.push(`${cursor.getFullYear()}-${pad2(cursor.getMonth() + 1)}-${pad2(cursor.getDate())}`)
    cursor.setDate(cursor.getDate() + 1)
    guard += 1
  }
  return days
}

function todayDay() {
  return localDay(Date.now())
}

function monthStartDay() {
  const now = new Date()
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-01`
}

function sanitizeMedia(input, max) {
  const list = Array.isArray(input) ? input : []
  return list.slice(0, max).map((item) => ({
    id: String(item.id || newId('m')),
    type: ['audio', 'image', 'video', 'file'].includes(item.type) ? item.type : 'file',
    path: String(item.path || ''),
    mime: String(item.mime || ''),
    duration: Number(item.duration) || 0,
    size: Number(item.size) || 0,
    caption: String(item.caption || '').slice(0, 160),
    transcript: String(item.transcript || '').slice(0, 8000),
  }))
}

function sanitizeRecords(input) {
  const list = Array.isArray(input) ? input : []
  return list.slice(0, 200).map((item) => ({
    id: String(item.id || newId('r')),
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
    kind: item.kind === 'complete' ? 'complete' : 'progress',
    text: String(item.text || '').slice(0, 8000),
    implementedAt: item.implementedAt ? String(item.implementedAt) : '',
    results: Array.isArray(item.results)
      ? item.results.slice(0, 10).map((link) => ({
          label: String(link.label || link.url || '').slice(0, 200),
          url: String(link.url || '').slice(0, 2000),
        }))
      : [],
    media: sanitizeMedia(item.media, 12),
  }))
}

function sanitizeNote(input) {
  const now = new Date().toISOString()
  const media = Array.isArray(input.media) ? input.media : []
  return {
    id: typeof input.id === 'string' && input.id ? input.id : newId('n'),
    title: typeof input.title === 'string' ? input.title.slice(0, 240) : '',
    body: typeof input.body === 'string' ? input.body.slice(0, 20000) : '',
    summary: typeof input.summary === 'string' ? input.summary.slice(0, 8000) : '',
    category: normalizeCategory(typeof input.category === 'string' ? input.category : '未开始'),
    stars: Math.min(5, Math.max(1, Number(input.stars) || 3)),
    tags: Array.isArray(input.tags) ? input.tags.slice(0, 12).map((tag) => String(tag).slice(0, 24)) : [],
    createdAt: typeof input.createdAt === 'string' ? input.createdAt : now,
    expectedAt: typeof input.expectedAt === 'string' ? input.expectedAt.slice(0, 40) : '',
    updatedAt: now,
    media: sanitizeMedia(media, 24),
    records: sanitizeRecords(input.records),
  }
}

/** Sentence splitter shared by the local summarizer (no model, no network). */
function splitSentences(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .split(/[。！？!?；;]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function clip(value, max) {
  const text = String(value || '').trim()
  if (!max || text.length <= max) return text
  return `${text.slice(0, Math.max(1, max - 1)).trimEnd()}…`
}

/**
 * Local extractive summary — the host-side twin of the client summarizer, used
 * once to repair notes whose summary was the full voice transcript.
 */
function localSummary(text, maxChars = 76) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  if (clean.length <= maxChars) return clean
  const sentences = splitSentences(clean)
  const target = sentences.length > 1 ? sentences : [clean]
  const freq = new Map()
  for (const token of clean.split(/[^\u4e00-\u9fa5A-Za-z0-9]+/)) {
    if (!token) continue
    if (/^[A-Za-z0-9]+$/.test(token)) {
      if (token.length >= 2) freq.set(token.toLowerCase(), (freq.get(token.toLowerCase()) || 0) + 1)
      continue
    }
    for (let index = 0; index < token.length - 1; index += 1) {
      const gram = token.slice(index, index + 2)
      freq.set(gram, (freq.get(gram) || 0) + 1)
    }
  }
  const scored = target.map((sentence, index) => {
    let score = 0
    for (const token of sentence.split(/[^\u4e00-\u9fa5A-Za-z0-9]+/)) {
      if (!token) continue
      if (/^[A-Za-z0-9]+$/.test(token)) {
        score += token.length >= 2 ? freq.get(token.toLowerCase()) || 0 : 0
        continue
      }
      for (let index2 = 0; index2 < token.length - 1; index2 += 1) {
        score += freq.get(token.slice(index2, index2 + 2)) || 0
      }
    }
    return { sentence, index, score: (score * 10) / Math.max(6, sentence.length) }
  })
  const ranked = scored
    .sort((left, right) => right.score - left.score)
    .filter((item) => item.sentence.length <= maxChars)
  const picked = []
  let length = 0
  for (const item of ranked.length ? ranked : scored.slice(0, 1)) {
    if (picked.length >= 3) break
    const next = length + item.sentence.length + (picked.length ? 1 : 0)
    if (next > maxChars && picked.length > 0) continue
    picked.push(item)
    length = next
    if (length >= maxChars * 0.8) break
  }
  if (!picked.length) return clip(clean, maxChars)
  picked.sort((left, right) => left.index - right.index)
  return clip(picked.map((item) => item.sentence).join('。') + '。', Math.round(maxChars * 1.08))
}

function migrateNote(note) {
  let changed = false
  const normalized = normalizeCategory(note.category)
  if (note.category !== normalized) {
    note.category = normalized
    changed = true
  }
  if (!Array.isArray(note.records)) {
    const legacy = Array.isArray(note.reviews) ? note.reviews : []
    note.records = legacy.map((item) => ({
      id: String(item.id || newId('r')),
      createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
      kind: item.implementedAt ? 'complete' : 'progress',
      text: String(item.text || '').slice(0, 8000),
      implementedAt: item.implementedAt ? String(item.implementedAt) : '',
      results: Array.isArray(item.results) ? item.results : [],
      media: sanitizeMedia(item.media, 12),
    }))
    delete note.reviews
    changed = true
  }
  for (const record of note.records) {
    if (!Array.isArray(record.media)) {
      record.media = []
      changed = true
    }
  }
  if (typeof note.summary !== 'string') {
    note.summary = ''
    changed = true
  }
  if (typeof note.expectedAt !== 'string') {
    note.expectedAt = ''
    changed = true
  }
  // Old builds copied the whole transcript into `summary`; shrink those to a
  // real summary line so the card shows the core meaning, not the full speech.
  if (typeof note.summary === 'string' && note.summary.trim().length > 76) {
    const match = note.media.find(
      (item) => typeof item.transcript === 'string' && item.transcript.trim() && item.transcript.trim() === note.summary.trim(),
    )
    if (match) {
      const shrunk = localSummary(note.summary)
      if (shrunk && shrunk !== note.summary) {
        note.summary = shrunk
        changed = true
      }
    }
  }
  if (!Array.isArray(note.media)) {
    note.media = []
    changed = true
  }
  return changed
}

export function apply(ctx, config = {}) {
  const webServer = ctx.webServer

  const dataDir = config.dataDir ? resolve(config.dataDir) : join(homedir(), '.dsh', 'inspiration')
  const statePath = join(dataDir, 'notes.json')
  const settingsPath = join(dataDir, 'settings.json')

  let state = { settings: { ...DEFAULT_SETTINGS }, notes: [] }
  let loaded = false
  let loading = null
  let settingsMigrated = false

  const ensureDir = () => mkdir(dataDir, { recursive: true })

  async function load() {
    if (loaded) return state
    if (loading) return loading
    loading = (async () => {
      await ensureDir()
      try {
        const raw = JSON.parse(await readFile(statePath, 'utf8'))
        if (raw && Array.isArray(raw.notes)) state.notes = raw.notes
      } catch {
        /* first run */
      }
      try {
        const raw = JSON.parse(await readFile(settingsPath, 'utf8'))
        if (raw && typeof raw === 'object') {
          state.settings = { ...DEFAULT_SETTINGS, ...raw }
          if (state.settings.priceCache === 1) {
            state.settings.priceCache = 0.04
            settingsMigrated = true
          }
          /* older builds stored the panel palette as `theme` */
          if (!PALETTE_IDS.includes(state.settings.palette)) {
            const legacy = raw.theme
            state.settings.palette = PALETTE_IDS.includes(legacy) ? legacy : 'paper'
          }
          if (!PALETTE_VISIBLE.includes(state.settings.palette)) {
            state.settings.palette = PALETTE_FALLBACK[state.settings.palette] || 'paper'
            settingsMigrated = true
            settingsMigrated = true
          }
          delete state.settings.theme
        }
      } catch {
        /* first run */
      }
      let migrated = false
      for (const note of state.notes) {
        if (note && typeof note === 'object') migrated = migrateNote(note) || migrated
      }
      loaded = true
      if (migrated) await saveNotes()
      if (settingsMigrated) await saveSettings()
      return state
    })()
    return loading
  }

  async function saveNotes() {
    await ensureDir()
    await writeFile(statePath, JSON.stringify({ version: 2, notes: state.notes }, null, 2), 'utf8')
  }

  async function saveSettings() {
    await ensureDir()
    await writeFile(settingsPath, JSON.stringify(state.settings, null, 2), 'utf8')
  }

  function allowedRoots() {
    const roots = [dataDir, ...(state.settings.mediaRoots ?? [])]
    if (state.settings.mediaDir) roots.push(state.settings.mediaDir)
    return roots.filter(Boolean).map((root) => resolve(root))
  }

  function mediaRoot() {
    return state.settings.mediaDir || join(dataDir, 'media')
  }

  /* ----------------------------------------------------------- usage data */
  const usageCache = new Map()
  let usageQueue = Promise.resolve()

  function aggregateSessionUsage(events) {
    const rows = new Map()
    for (const event of events) {
      if (!event || event.type !== 'assistant/message') continue
      const usage = event.data && event.data.usage
      if (!usage) continue
      const input = Number(usage.inputTokens) || 0
      const output = Number(usage.outputTokens) || 0
      const cacheRead = Number(usage.cacheReadTokens) || 0
      if (!input && !output) continue
      const model =
        (event.data.message && event.data.message.source && event.data.message.source.model) || 'unknown'
      const day = localDay(event.time)
      const key = `${day}|${model}`
      const row = rows.get(key) || { day, model, input: 0, output: 0, cacheRead: 0 }
      row.input += input
      row.output += output
      row.cacheRead += cacheRead
      rows.set(key, row)
    }
    return [...rows.values()]
  }

  async function readSessionUsage(service, snapshot) {
    const handle = await service.open(snapshot.header.id, 'read')
    try {
      const payload = await handle.read()
      return aggregateSessionUsage(payload.events || [])
    } finally {
      await handle.close()
    }
  }

  async function computeUsage(fromDay, toDay, refresh) {
    const service = ctx.get('sessionPersistence')
    if (service === undefined) throw new Error('会话日志服务不可用，无法统计 Token')
    const snapshots = await service.list()
    const active = new Set()
    const endTime = new Date(`${toDay}T23:59:59.999`).getTime()
    let readCount = 0
    for (const snapshot of snapshots) {
      const id = snapshot.header.id
      active.add(id)
      if (snapshot.header.createdAt > endTime) continue
      const cached = usageCache.get(id)
      if (!refresh && cached && cached.revision === snapshot.revision) continue
      try {
        const rows = await readSessionUsage(service, snapshot)
        usageCache.set(id, { revision: snapshot.revision, rows })
        readCount += 1
      } catch (error) {
        usageCache.set(id, {
          revision: snapshot.revision,
          rows: cached ? cached.rows : [],
          error: String((error && error.message) || error),
        })
        readCount += 1
      }
    }
    for (const id of [...usageCache.keys()]) {
      if (!active.has(id)) usageCache.delete(id)
    }

    const days = dayList(fromDay, toDay)
    const daySet = new Set(days)
    const dayMap = new Map(days.map((date) => [date, { date, input: 0, output: 0, cacheRead: 0 }]))
    const modelMap = new Map()
    const sessions = new Set()
    const totals = { input: 0, output: 0, cacheRead: 0, total: 0 }

    for (const [id, entry] of usageCache) {
      if (!entry || !Array.isArray(entry.rows)) continue
      for (const row of entry.rows) {
        if (!daySet.has(row.day)) continue
        sessions.add(id)
        totals.input += row.input
        totals.output += row.output
        totals.cacheRead += row.cacheRead
        const day = dayMap.get(row.day)
        day.input += row.input
        day.output += row.output
        day.cacheRead += row.cacheRead
        const model = modelMap.get(row.model) || { model: row.model, input: 0, output: 0, cacheRead: 0 }
        model.input += row.input
        model.output += row.output
        model.cacheRead += row.cacheRead
        modelMap.set(row.model, model)
      }
    }
    totals.total = totals.input + totals.output
    const models = [...modelMap.values()]
      .map((model) => ({ ...model, total: model.input + model.output }))
      .sort((left, right) => right.total - left.total)
    return {
      from: fromDay,
      to: toDay,
      days: [...dayMap.values()],
      totals,
      models,
      sessions: sessions.size,
      scanned: readCount,
      cached: Math.max(0, active.size - readCount),
    }
  }

  function usageRequest(payload, refresh) {
    const rawFrom = typeof payload?.from === 'string' ? payload.from : ''
    const rawTo = typeof payload?.to === 'string' ? payload.to : ''
    const from = /^\d{4}-\d{2}-\d{2}$/.test(rawFrom) ? rawFrom : monthStartDay()
    const to = /^\d{4}-\d{2}-\d{2}$/.test(rawTo) ? rawTo : todayDay()
    if (from > to) return { from: to, to: from }
    return { from, to }
  }

  function handleUsage(payload) {
    const { from, to } = usageRequest(payload, false)
    const refresh = payload?.refresh === true
    const run = usageQueue.then(() => computeUsage(from, to, refresh))
    usageQueue = run.catch(() => {})
    return run
  }

  /* ---------------------------------------------------------- os opener */
  /**
   * Hand a local file to the desktop shell: the default application, or the
   * containing folder with the file selected. Purely local — it spawns an OS
   * helper, never a network or model call, so the wall stays zero-token.
   */
  /** Origin of the last inbound request: lets `browser` mode build a URL. */
  let requestOrigin = ''

  function openWithOs(target, mode) {
    let command
    let args
    if (process.platform === 'win32') {
      if (mode === 'reveal') {
        command = 'explorer.exe'
        args = [`/select,${target}`]
      } else {
        command = 'cmd.exe'
        args = ['/c', 'start', '', target]
      }
    } else if (process.platform === 'darwin') {
      command = 'open'
      args = mode === 'reveal' ? ['-R', target] : [target]
    } else {
      command = 'xdg-open'
      args = [mode === 'reveal' ? dirname(target) : target]
    }
    const child = spawn(command, args, { detached: true, stdio: 'ignore' })
    child.on('error', () => {})
    child.unref()
  }

  /* --------------------------------------------------------------- notes */
  async function handleRpc(op, payload) {
    await load()
    switch (op) {
      case 'state':
        return { settings: state.settings, notes: state.notes }
      case 'saveNote': {
        const note = sanitizeNote(payload?.note ?? {})
        const index = state.notes.findIndex((item) => item.id === note.id)
        if (index >= 0) state.notes[index] = note
        else state.notes.unshift(note)
        await saveNotes()
        return { note, notes: state.notes }
      }
      case 'deleteNote': {
        const id = String(payload?.id || '')
        state.notes = state.notes.filter((item) => item.id !== id)
        await saveNotes()
        return { notes: state.notes }
      }
      case 'saveSettings': {
        const next = payload?.settings ?? {}
        if (typeof next.palette === 'string' && PALETTE_IDS.includes(next.palette)) {
          state.settings.palette = PALETTE_VISIBLE.includes(next.palette)
            ? next.palette
            : PALETTE_FALLBACK[next.palette] || 'paper'
        }
        if (typeof next.mediaDir === 'string') {
          state.settings.mediaDir = next.mediaDir
          if (next.mediaDir) {
            await mkdir(next.mediaDir, { recursive: true })
            const roots = new Set(state.settings.mediaRoots ?? [])
            roots.add(resolve(next.mediaDir))
            state.settings.mediaRoots = [...roots]
          }
        }
        if (Number.isFinite(Number(next.priceInput))) state.settings.priceInput = Number(next.priceInput)
        if (Number.isFinite(Number(next.priceOutput))) state.settings.priceOutput = Number(next.priceOutput)
        if (Number.isFinite(Number(next.priceCache))) state.settings.priceCache = Number(next.priceCache)
        if (typeof next.transcribe === 'boolean') state.settings.transcribe = next.transcribe
        if (typeof next.language === 'string') state.settings.language = next.language
        if (typeof next.period === 'string') state.settings.period = next.period
        await saveSettings()
        return { settings: state.settings }
      }
      case 'storage':
        return {
          dataDir,
          mediaRoot: mediaRoot(),
          notes: state.notes.length,
          media: state.notes.reduce((sum, note) => sum + note.media.length, 0),
        }
      case 'openPath': {
        const target = resolve(String(payload?.path || ''))
        if (!target || !allowedRoots().some((root) => inside(root, target))) {
          throw new Error('path-not-allowed')
        }
        const info = await stat(target).catch(() => undefined)
        if (info === undefined) throw new Error('not-found')
        const mode = String(payload?.mode || 'open')
        if (mode === 'browser') {
          const origin = requestOrigin || 'http://127.0.0.1'
          const url = `${origin}/api/inspiration/media?path=${encodeURIComponent(target)}`
          openWithOs(url, 'browser')
          return { opened: true, path: target, url }
        }
        openWithOs(target, mode === 'reveal' ? 'reveal' : 'open')
        return { opened: true, path: target }
      }
      case 'usage':
        return await handleUsage(payload || {})
      case 'clearUsageCache':
        usageCache.clear()
        return { cleared: true }
      default:
        throw new Error(`unknown-op:${op}`)
    }
  }

  /* ---------------------------------------------------------------- http */
  const handler = async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const path = url.pathname.replace(/^\/api\/inspiration/, '')

      // Loopback development panel: reject browser cross-site calls (a present,
      // foreign Origin), so a random web page cannot read or write notes through
      // the local port. Local scripts send no Origin and stay usable.
      const origin = req.headers.origin
      if (origin !== undefined) {
        const host = req.headers.host
        const allowed = host !== undefined && (origin === `http://${host}` || origin === `https://${host}`)
        if (!allowed) {
          sendJson(res, 403, { ok: false, error: 'cross-origin-not-allowed' })
          return
        }
      }

      if (req.method === 'GET' && (path === '/ping' || path === '')) {
        sendJson(res, 200, { ok: true })
        return
      }

      if (req.method === 'GET' && path === '/state') {
        const value = await handleRpc('state', {})
        sendJson(res, 200, { ok: true, value })
        return
      }

      if (req.method === 'POST' && path === '/rpc') {
        requestOrigin = `http://${req.headers.host || '127.0.0.1'}`
        const body = await readBody(req, 8 * 1024 * 1024)
        let request
        try {
          request = JSON.parse(body.toString('utf8') || '{}')
        } catch {
          sendJson(res, 400, { ok: false, error: 'bad-json' })
          return
        }
        const value = await handleRpc(request.op, request.payload)
        sendJson(res, 200, { ok: true, value })
        return
      }

      if (req.method === 'POST' && path === '/media') {
        await load()
        const name = url.searchParams.get('name') || `${newId('m')}${url.searchParams.get('ext') || '.bin'}`
        const safeName = name.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 140)
        const dir = mediaRoot()
        await mkdir(dir, { recursive: true })
        const target = join(dir, safeName)
        const body = await readBody(req)
        await writeFile(target, body)
        sendJson(res, 200, {
          ok: true,
          value: {
            path: resolve(target),
            name: safeName,
            mime: MIME[extname(safeName).toLowerCase()] || 'application/octet-stream',
            size: body.length,
          },
        })
        return
      }

      if (req.method === 'GET' && path === '/media') {
        await load()
        const target = url.searchParams.get('path')
        if (!target || !allowedRoots().some((root) => inside(root, target))) {
          sendJson(res, 403, { ok: false, error: 'path-not-allowed' })
          return
        }
        const info = await stat(target).catch(() => undefined)
        if (info === undefined || !info.isFile()) {
          sendJson(res, 404, { ok: false, error: 'not-found' })
          return
        }
        res.writeHead(200, {
          'content-type': MIME[extname(target).toLowerCase()] || 'application/octet-stream',
          'content-length': String(info.size),
          'cache-control': 'private, max-age=31536000, immutable',
        })
        createReadStream(target).pipe(res)
        return
      }

      sendJson(res, 404, { ok: false, error: 'not-found' })
    } catch (error) {
      sendJson(res, 500, { ok: false, error: String((error && error.message) || error) })
    }
  }

  ctx.effect(
    () => webServer.register({ kind: 'prefix', path: '/api/inspiration', handler }),
    'inspiration-wall: http surface',
  )

  ctx.logger?.info?.(`灵感墙: data at ${dataDir}`)
}
