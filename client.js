/* 鐏垫劅澧?鈥?browser half. Assembled from src/ by build.mjs. */
window.__ModuleLoader__.load({
  id: 'dsh-inspiration-wall',
  factory(require) {
    const React = require('react')

/* ================= 00-prelude.js ================= */
/* ---------------------------------------------------------------------------
 * 灵感墙 — shared prelude (runs inside the module loader factory)
 * ------------------------------------------------------------------------- */
const h = React.createElement
const NS = 'inspiration'

const CATEGORIES = ['未开始', '进行中', '已实现', '已放弃']
const STATUSES = ['未开始', '进行中', '已实现']
const CAT_INDEX = Object.fromEntries(CATEGORIES.map((name, index) => [name, index]))
const CAT_KEYS = {
  未开始: 'catNotStarted',
  进行中: 'catInProgress',
  已实现: 'catDone',
  已放弃: 'catDropped',
}

/* ------------------------------------------------------------------ palette
 * A palette is a set of the Harness' own alias tokens. Applying one through
 * `ctx.theme.overrideTokens` restyles the whole application, so the wall is the
 * single place where the app's colours are chosen. `light`/`dark` are the two
 * modes the Harness can render in; a palette supplies both so switching the
 * system scheme never leaves a half-styled UI.
 */
const PALETTES = {
  paper: {
    dot: '#d97706',
    light: {
      '--dsw-alias-bg-base': '#f7f4ee',
      '--dsw-alias-bg-layer-1': '#fdfbf7',
      '--dsw-alias-bg-layer-2': '#efe9df',
      '--dsw-alias-bg-overlay': '#fdfbf7',
      '--dsw-alias-border-l1': 'rgba(31,27,22,0.08)',
      '--dsw-alias-border-l2': 'rgba(31,27,22,0.16)',
      '--dsw-alias-brand-primary': '#d97706',
      '--dsw-alias-label-primary': '#1f1b16',
      '--dsw-alias-label-secondary': '#5e554a',
      '--dsw-alias-state-error-primary': '#b3261e',
      '--dsw-alias-state-idle-primary': '#7b7266',
      '--dsw-alias-state-success-primary': '#4b7c3f',
      '--dsw-alias-state-warn-primary': '#b45309',
      '--dsw-specific-sidebar-fill': '#f2eee6',
    },
    dark: {
      '--dsw-alias-bg-base': '#151310',
      '--dsw-alias-bg-layer-1': '#1d1a16',
      '--dsw-alias-bg-layer-2': '#26221c',
      '--dsw-alias-bg-overlay': '#221e19',
      '--dsw-alias-border-l1': 'rgba(247,244,238,0.10)',
      '--dsw-alias-border-l2': 'rgba(247,244,238,0.20)',
      '--dsw-alias-brand-primary': '#e8a13c',
      '--dsw-alias-label-primary': '#f4f0e8',
      '--dsw-alias-label-secondary': '#b5aa9c',
      '--dsw-alias-state-error-primary': '#e5726a',
      '--dsw-alias-state-idle-primary': '#8f857a',
      '--dsw-alias-state-success-primary': '#79b56a',
      '--dsw-alias-state-warn-primary': '#e8a13c',
      '--dsw-specific-sidebar-fill': '#12100d',
    },
  },
  graphite: {
    dot: '#4b5563',
    light: {
      '--dsw-alias-bg-base': '#f5f6f7',
      '--dsw-alias-bg-layer-1': '#ffffff',
      '--dsw-alias-bg-layer-2': '#eceef0',
      '--dsw-alias-bg-overlay': '#ffffff',
      '--dsw-alias-border-l1': 'rgba(17,24,39,0.09)',
      '--dsw-alias-border-l2': 'rgba(17,24,39,0.18)',
      '--dsw-alias-brand-primary': '#2b6ef2',
      '--dsw-alias-label-primary': '#16181d',
      '--dsw-alias-label-secondary': '#565c66',
      '--dsw-alias-state-error-primary': '#c02929',
      '--dsw-alias-state-idle-primary': '#737983',
      '--dsw-alias-state-success-primary': '#217a3c',
      '--dsw-alias-state-warn-primary': '#a8600a',
      '--dsw-specific-sidebar-fill': '#eff1f3',
    },
    dark: {
      '--dsw-alias-bg-base': '#15171b',
      '--dsw-alias-bg-layer-1': '#1c1f24',
      '--dsw-alias-bg-layer-2': '#23272d',
      '--dsw-alias-bg-overlay': '#20242a',
      '--dsw-alias-border-l1': 'rgba(255,255,255,0.09)',
      '--dsw-alias-border-l2': 'rgba(255,255,255,0.18)',
      '--dsw-alias-brand-primary': '#5b95ff',
      '--dsw-alias-label-primary': '#f2f4f7',
      '--dsw-alias-label-secondary': '#a8b0bb',
      '--dsw-alias-state-error-primary': '#f0736c',
      '--dsw-alias-state-idle-primary': '#828a95',
      '--dsw-alias-state-success-primary': '#5fc17e',
      '--dsw-alias-state-warn-primary': '#e0a34a',
      '--dsw-specific-sidebar-fill': '#111317',
    },
  },
  mist: {
    dot: '#3e8fa8',
    light: {
      '--dsw-alias-bg-base': '#f1f6f8',
      '--dsw-alias-bg-layer-1': '#fbfdfe',
      '--dsw-alias-bg-layer-2': '#e3edf1',
      '--dsw-alias-bg-overlay': '#fbfdfe',
      '--dsw-alias-border-l1': 'rgba(15,45,56,0.09)',
      '--dsw-alias-border-l2': 'rgba(15,45,56,0.18)',
      '--dsw-alias-brand-primary': '#2f7f97',
      '--dsw-alias-label-primary': '#132229',
      '--dsw-alias-label-secondary': '#4d6672',
      '--dsw-alias-state-error-primary': '#b03a3a',
      '--dsw-alias-state-idle-primary': '#6a828c',
      '--dsw-alias-state-success-primary': '#2f7a5c',
      '--dsw-alias-state-warn-primary': '#9d6a12',
      '--dsw-specific-sidebar-fill': '#e9f1f4',
    },
    dark: {
      '--dsw-alias-bg-base': '#0f171b',
      '--dsw-alias-bg-layer-1': '#16232a',
      '--dsw-alias-bg-layer-2': '#1d2d35',
      '--dsw-alias-bg-overlay': '#1a2830',
      '--dsw-alias-border-l1': 'rgba(226,242,248,0.10)',
      '--dsw-alias-border-l2': 'rgba(226,242,248,0.20)',
      '--dsw-alias-brand-primary': '#5cb6d0',
      '--dsw-alias-label-primary': '#eaf5f8',
      '--dsw-alias-label-secondary': '#9db7c2',
      '--dsw-alias-state-error-primary': '#e2776f',
      '--dsw-alias-state-idle-primary': '#7e949e',
      '--dsw-alias-state-success-primary': '#5dbf9b',
      '--dsw-alias-state-warn-primary': '#d8a955',
      '--dsw-specific-sidebar-fill': '#0c1317',
    },
  },
  sand: {
    dot: '#b4693a',
    light: {
      '--dsw-alias-bg-base': '#faf5ee',
      '--dsw-alias-bg-layer-1': '#fffdf9',
      '--dsw-alias-bg-layer-2': '#f1e8db',
      '--dsw-alias-bg-overlay': '#fffdf9',
      '--dsw-alias-border-l1': 'rgba(64,44,26,0.09)',
      '--dsw-alias-border-l2': 'rgba(64,44,26,0.18)',
      '--dsw-alias-brand-primary': '#b4693a',
      '--dsw-alias-label-primary': '#2c211a',
      '--dsw-alias-label-secondary': '#6b5847',
      '--dsw-alias-state-error-primary': '#b03f2c',
      '--dsw-alias-state-idle-primary': '#8a7764',
      '--dsw-alias-state-success-primary': '#5c7a3a',
      '--dsw-alias-state-warn-primary': '#a5641a',
      '--dsw-specific-sidebar-fill': '#f4ece0',
    },
    dark: {
      '--dsw-alias-bg-base': '#161211',
      '--dsw-alias-bg-layer-1': '#1f1a17',
      '--dsw-alias-bg-layer-2': '#29221c',
      '--dsw-alias-bg-overlay': '#241e19',
      '--dsw-alias-border-l1': 'rgba(255,244,232,0.10)',
      '--dsw-alias-border-l2': 'rgba(255,244,232,0.20)',
      '--dsw-alias-brand-primary': '#d9895c',
      '--dsw-alias-label-primary': '#f7efe6',
      '--dsw-alias-label-secondary': '#bfab97',
      '--dsw-alias-state-error-primary': '#e0836f',
      '--dsw-alias-state-idle-primary': '#96816c',
      '--dsw-alias-state-success-primary': '#8fb573',
      '--dsw-alias-state-warn-primary': '#dba45f',
      '--dsw-specific-sidebar-fill': '#120f0d',
    },
  },
  midnight: {
    dot: '#1f2a37',
    light: {
      '--dsw-alias-bg-base': '#eef2f7',
      '--dsw-alias-bg-layer-1': '#fbfcfe',
      '--dsw-alias-bg-layer-2': '#e2e9f2',
      '--dsw-alias-bg-overlay': '#fbfcfe',
      '--dsw-alias-border-l1': 'rgba(13,27,42,0.09)',
      '--dsw-alias-border-l2': 'rgba(13,27,42,0.18)',
      '--dsw-alias-brand-primary': '#2f6fb5',
      '--dsw-alias-label-primary': '#0f1b28',
      '--dsw-alias-label-secondary': '#4c5f74',
      '--dsw-alias-state-error-primary': '#b23a3a',
      '--dsw-alias-state-idle-primary': '#6b7c8d',
      '--dsw-alias-state-success-primary': '#2c7a58',
      '--dsw-alias-state-warn-primary': '#9a6a10',
      '--dsw-specific-sidebar-fill': '#e8eef6',
    },
    dark: {
      '--dsw-alias-bg-base': '#0b1219',
      '--dsw-alias-bg-layer-1': '#121b25',
      '--dsw-alias-bg-layer-2': '#18242f',
      '--dsw-alias-bg-overlay': '#16212b',
      '--dsw-alias-border-l1': 'rgba(220,235,250,0.10)',
      '--dsw-alias-border-l2': 'rgba(220,235,250,0.20)',
      '--dsw-alias-brand-primary': '#5aa7e8',
      '--dsw-alias-label-primary': '#eef5fb',
      '--dsw-alias-label-secondary': '#9fb3c6',
      '--dsw-alias-state-error-primary': '#ea7a72',
      '--dsw-alias-state-idle-primary': '#7f93a6',
      '--dsw-alias-state-success-primary': '#5cbf92',
      '--dsw-alias-state-warn-primary': '#d7a74e',
      '--dsw-specific-sidebar-fill': '#080d12',
    },
  },
  cyber: {
    dot: '#38cdf8',
    light: {
      '--dsw-alias-bg-base': '#eef4f9',
      '--dsw-alias-bg-layer-1': '#fbfdff',
      '--dsw-alias-bg-layer-2': '#dfeaf4',
      '--dsw-alias-bg-overlay': '#fbfdff',
      '--dsw-alias-border-l1': 'rgba(10,15,20,0.10)',
      '--dsw-alias-border-l2': 'rgba(10,15,20,0.20)',
      '--dsw-alias-brand-primary': '#1c86b8',
      '--dsw-alias-label-primary': '#0a0f14',
      '--dsw-alias-label-secondary': '#4a5c6d',
      '--dsw-alias-state-error-primary': '#c23b52',
      '--dsw-alias-state-idle-primary': '#647488',
      '--dsw-alias-state-success-primary': '#1c8a6d',
      '--dsw-alias-state-warn-primary': '#9c6a12',
      '--dsw-specific-sidebar-fill': '#e6eff7',
    },
    dark: {
      '--dsw-alias-bg-base': '#0a0f14',
      '--dsw-alias-bg-layer-1': '#151e28',
      '--dsw-alias-bg-layer-2': '#0e151d',
      '--dsw-alias-bg-overlay': '#1a2532',
      '--dsw-alias-border-l1': '#24313f',
      '--dsw-alias-border-l2': '#33455a',
      '--dsw-alias-brand-primary': '#38cdf8',
      '--dsw-alias-label-primary': '#f8fafc',
      '--dsw-alias-label-secondary': '#a9b7c6',
      '--dsw-alias-state-error-primary': '#ff5a73',
      '--dsw-alias-state-idle-primary': '#647488',
      '--dsw-alias-state-success-primary': '#35d0a0',
      '--dsw-alias-state-warn-primary': '#f5b64a',
      '--dsw-specific-sidebar-fill': '#0a0f14',
    },
  },
  ember: {
    dot: '#e08a3c',
    light: {
      '--dsw-alias-bg-base': '#f7f3ee',
      '--dsw-alias-bg-layer-1': '#fffdfa',
      '--dsw-alias-bg-layer-2': '#efe7de',
      '--dsw-alias-bg-overlay': '#fffdfa',
      '--dsw-alias-border-l1': 'rgba(42,30,20,0.10)',
      '--dsw-alias-border-l2': 'rgba(42,30,20,0.20)',
      '--dsw-alias-brand-primary': '#b96a1f',
      '--dsw-alias-label-primary': '#231a13',
      '--dsw-alias-label-secondary': '#64513f',
      '--dsw-alias-state-error-primary': '#b23c2c',
      '--dsw-alias-state-idle-primary': '#87725e',
      '--dsw-alias-state-success-primary': '#4d7a3a',
      '--dsw-alias-state-warn-primary': '#a4611a',
      '--dsw-specific-sidebar-fill': '#f1eae1',
    },
    dark: {
      '--dsw-alias-bg-base': '#12100d',
      '--dsw-alias-bg-layer-1': '#1a1713',
      '--dsw-alias-bg-layer-2': '#221e19',
      '--dsw-alias-bg-overlay': '#1e1a15',
      '--dsw-alias-border-l1': '#2f2921',
      '--dsw-alias-border-l2': '#423a31',
      '--dsw-alias-brand-primary': '#e08a3c',
      '--dsw-alias-label-primary': '#efe9e0',
      '--dsw-alias-label-secondary': '#b5aa9c',
      '--dsw-alias-state-error-primary': '#dc6255',
      '--dsw-alias-state-idle-primary': '#7f7466',
      '--dsw-alias-state-success-primary': '#58b76e',
      '--dsw-alias-state-warn-primary': '#e08a3c',
      '--dsw-specific-sidebar-fill': '#12100d',
    },
  },
}
const PALETTE_IDS = Object.keys(PALETTES)
/* Offered in the picker. The other palettes stay defined below so the source of
   truth keeps their tokens; they are simply not selectable any more. */
const PALETTE_VISIBLE = ['paper', 'graphite', 'ember']
const PALETTE_FALLBACK = { mist: 'graphite', sand: 'paper', midnight: 'graphite', cyber: 'graphite' }
const visiblePalette = (id) =>
  PALETTE_VISIBLE.includes(id) ? id : PALETTE_FALLBACK[id] || 'paper'
const PALETTE_KEYS = {
  paper: 'palettePaper',
  graphite: 'paletteGraphite',
  mist: 'paletteMist',
  sand: 'paletteSand',
  midnight: 'paletteMidnight',
  cyber: 'paletteCyber',
  ember: 'paletteEmber',
}

/* ------------------------------------------------------------------ locale */
let LANG = 'zh'
function setLang(id) {
  LANG = String(id || 'zh').toLowerCase().startsWith('zh') ? 'zh' : 'en'
}
function isZh() {
  return LANG === 'zh'
}

const API = '/api/inspiration'
const MAX_AUDIO_SECONDS = 120

const EMPTY_SETTINGS = {
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

const STAR_LABEL = ['', 'starHint1', 'starHint2', 'starHint3', 'starHint4', 'starHint5']
const RECORD_KIND_LABEL = { progress: 'progress', complete: 'complete' }

/** Display label for a stored, language-neutral category value. */
function catLabel(category) {
  const key = CAT_KEYS[category]
  return key ? T(key) : String(category || '')
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function pad2(value) {
  return String(value).padStart(2, '0')
}

function asDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmtDate(value) {
  const date = asDate(value)
  return isZh()
    ? `${date.getMonth() + 1}月${pad2(date.getDate())}日`
    : `${MONTHS_EN[date.getMonth()]} ${date.getDate()}`
}

function fmtClock(value) {
  const date = asDate(value)
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

function fmtDateTime(value) {
  const date = asDate(value)
  return isZh() ? `${fmtDate(date)} ${fmtClock(date)}` : `${fmtDate(date)} · ${fmtClock(date)}`
}

function fmtDayMonth(value) {
  const date = asDate(value)
  return isZh() ? `${date.getMonth() + 1}月${date.getDate()}日` : `${MONTHS_EN[date.getMonth()]} ${date.getDate()}`
}

function fmtRel(value) {
  const date = asDate(value)
  const diff = Date.now() - date.getTime()
  if (diff < 60 * 1000) return T('justNow')
  if (diff < 60 * 60 * 1000) return T('minutesAgo', { count: Math.floor(diff / 60000) })
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return T('hoursAgo', { count: Math.floor(diff / 3600000) })
  }
  const yesterday = new Date(today.getTime() - 86400000)
  if (date.toDateString() === yesterday.toDateString()) return T('yesterday')
  return isZh() ? `${date.getMonth() + 1}/${pad2(date.getDate())}` : fmtDayMonth(date)
}

function fmtDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0))
  return `${Math.floor(total / 60)}:${pad2(total % 60)}`
}

function fmtBytes(bytes) {
  const size = Math.max(0, Number(bytes) || 0)
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`
  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`
}

function fmtTokens(value) {
  const tokens = Math.max(0, Math.round(Number(value) || 0))
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(2)}M`
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`
  return String(tokens)
}

function fmtCost(value) {
  const cost = Number(value) || 0
  if (cost <= 0) return '¥0'
  if (cost < 0.01) return `¥${cost.toFixed(4)}`
  if (cost < 1) return `¥${cost.toFixed(3)}`
  return `¥${cost.toFixed(2)}`
}

function costOfUsage(input, output, cacheRead, settings) {
  return (
    ((Number(input) || 0) * (Number(settings.priceInput) || 0) +
      (Number(output) || 0) * (Number(settings.priceOutput) || 0) +
      (Number(cacheRead) || 0) * (Number(settings.priceCache) || 0)) /
    1000000
  )
}

/* ------------------------------------------------------------------- days */
function dayString(value) {
  const date = asDate(value)
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function parseDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date()
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function addDays(value, amount) {
  const date = value instanceof Date ? new Date(value) : parseDay(String(value))
  date.setDate(date.getDate() + Number(amount || 0))
  return date
}

function todayString() {
  return dayString(new Date())
}

function monthStartString() {
  const now = new Date()
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-01`
}

function weekStartString() {
  const date = new Date()
  const weekday = (date.getDay() + 6) % 7
  date.setDate(date.getDate() - weekday)
  return dayString(date)
}

function daysBackString(days) {
  return dayString(addDays(new Date(), -(Number(days) || 0)))
}

function rangeDays(from, to) {
  const out = []
  const [fy, fm, fd] = from.split('-').map(Number)
  const [ty, tm, td] = to.split('-').map(Number)
  const cursor = new Date(fy, fm - 1, fd)
  const end = new Date(ty, tm - 1, td)
  let guard = 0
  while (cursor.getTime() <= end.getTime() && guard < 4000) {
    out.push(`${cursor.getFullYear()}-${pad2(cursor.getMonth() + 1)}-${pad2(cursor.getDate())}`)
    cursor.setDate(cursor.getDate() + 1)
    guard += 1
  }
  return out
}

function shortDay(day) {
  const [, month, date] = day.split('-')
  return `${Number(month)}/${pad2(Number(date))}`
}

function startOfDay(date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function startOfMonth(date) {
  const next = new Date(date)
  next.setDate(1)
  next.setHours(0, 0, 0, 0)
  return next
}

function startOfWeek(date) {
  const next = startOfDay(date)
  const day = (next.getDay() + 6) % 7
  next.setDate(next.getDate() - day)
  return next
}

function weekSeries(count) {
  const now = startOfWeek(new Date())
  const out = []
  for (let index = count - 1; index >= 0; index -= 1) {
    const start = new Date(now)
    start.setDate(start.getDate() - index * 7)
    out.push(start)
  }
  return out
}

function weekLabel(date) {
  return `${date.getMonth() + 1}/${pad2(date.getDate())}`
}

function periodStart(period) {
  if (period === '90d') return startOfDay(new Date(Date.now() - 89 * 86400000))
  if (period === 'all') return new Date(0)
  return startOfMonth(new Date())
}

function withinPeriod(value, period) {
  const time = asDate(value).getTime()
  return time >= periodStart(period).getTime()
}

/* ----------------------------------------------------------------- records */
function noteRecords(note) {
  const list = note && Array.isArray(note.records) ? note.records : []
  return [...list].sort((left, right) => asDate(right.createdAt) - asDate(left.createdAt))
}

function latestRecord(note) {
  return noteRecords(note)[0] || null
}

function completionRecord(note) {
  const complete = noteRecords(note).filter((record) => record.kind === 'complete' && record.implementedAt)
  return complete.length ? complete[0] : null
}

function noteIsImplemented(note) {
  return (note && note.category === '已实现') || Boolean(completionRecord(note))
}

function implementedAt(note) {
  const record = completionRecord(note)
  return record ? record.implementedAt : ''
}

function relativeInterval(note) {
  const record = completionRecord(note)
  if (!record) return null
  const days = Math.round((asDate(record.implementedAt) - asDate(note.createdAt)) / 86400000)
  return Math.max(0, days)
}

/* ------------------------------------------------------- local summary ----
 * The wall must stay a zero-token surface: every operation here is local, so
 * the voice summary is produced by a small extractive summarizer instead of a
 * model call. It splits the transcript into sentences, ranks them by how many
 * of the transcript's recurring terms they carry (2-gram frequency for CJK,
 * whole words for latin scripts), and keeps the strongest few in reading
 * order. Nothing leaves the machine.
 */
function clipText(value, max) {
  const text = String(value || '').trim()
  if (!max || text.length <= max) return text
  return `${text.slice(0, Math.max(1, max - 1)).trimEnd()}…`
}

function termFrequency(text) {
  const freq = new Map()
  for (const token of String(text || '').split(/[^\u4e00-\u9fa5A-Za-z0-9]+/)) {
    if (!token) continue
    if (/^[A-Za-z0-9]+$/.test(token)) {
      if (token.length >= 2) {
        const key = token.toLowerCase()
        freq.set(key, (freq.get(key) || 0) + 1)
      }
      continue
    }
    for (let index = 0; index < token.length - 1; index += 1) {
      const gram = token.slice(index, index + 2)
      freq.set(gram, (freq.get(gram) || 0) + 1)
    }
  }
  return freq
}

function scoreSentence(sentence, freq) {
  let score = 0
  let hits = 0
  for (const token of String(sentence).split(/[^\u4e00-\u9fa5A-Za-z0-9]+/)) {
    if (!token) continue
    if (/^[A-Za-z0-9]+$/.test(token)) {
      const weight = token.length >= 2 ? freq.get(token.toLowerCase()) || 0 : 0
      score += weight
      hits += weight > 0 ? 1 : 0
      continue
    }
    for (let index = 0; index < token.length - 1; index += 1) {
      const weight = freq.get(token.slice(index, index + 2)) || 0
      score += weight
      hits += weight > 0 ? 1 : 0
    }
  }
  const length = Math.max(6, String(sentence).length)
  return (score * 10) / length + hits * 0.05
}

function summarizeText(text, maxChars = 76) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  if (clean.length <= maxChars) return clean
  const sentences = clean
    .split(/[。！？!?；;]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
  if (sentences.length < 2) {
    const clauses = clean.split(/[，,、]+/).map((clause) => clause.trim()).filter(Boolean)
    if (clauses.length >= 2) {
      const freq = termFrequency(clean)
      const ranked = clauses
        .map((clause, index) => ({ clause, index, score: scoreSentence(clause, freq) }))
        .sort((left, right) => right.score - left.score)
      const fitting = ranked.filter((item) => item.clause.length <= maxChars)
      const pool = fitting.length ? fitting : ranked.slice(0, 1)
      const picked = []
      let total = 0
      for (const item of pool) {
        if (picked.length >= 3) break
        const next = total + item.clause.length + (picked.length ? 1 : 0)
        if (next > maxChars && picked.length > 0) continue
        picked.push(item)
        total = next
        if (total >= maxChars * 0.8) break
      }
      if (!picked.length) return clipText(clean, maxChars)
      picked.sort((left, right) => left.index - right.index)
      return clipText(`${picked.map((item) => item.clause).join('，')}。`, Math.round(maxChars * 1.08))
    }
    return clipText(clean, maxChars)
  }
  const freq = termFrequency(clean)
  const total = sentences.length
  const ranked = sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: scoreSentence(sentence, freq) * (1 + (total - index) / (total * 4)),
    }))
    .sort((left, right) => right.score - left.score)
  const fitting = ranked.filter((item) => item.sentence.length <= maxChars)
  const pool = fitting.length ? fitting : ranked.slice(0, 1)
  const picked = []
  let length = 0
  for (const item of pool) {
    if (picked.length >= 3) break
    const next = length + item.sentence.length + (picked.length ? 1 : 0)
    if (next > maxChars && picked.length > 0) continue
    picked.push(item)
    length = next
    if (length >= maxChars * 0.8) break
  }
  if (!picked.length) return clipText(clean, maxChars)
  picked.sort((left, right) => left.index - right.index)
  return clipText(`${picked.map((item) => item.sentence).join('。')}。`, Math.round(maxChars * 1.08))
}

/* --------------------------------------------------- expected date ------- */
function dayInputValue(value) {
  if (!value) return ''
  const date = asDate(value)
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function daysUntil(value) {
  if (!value) return null
  const target = startOfDay(asDate(value)).getTime()
  const today = startOfDay(new Date()).getTime()
  return Math.round((target - today) / 86400000)
}

/** overdue | today | soon | later, from the note's own expected date. */
function expectedState(note) {
  if (!note || !note.expectedAt) return ''
  const days = daysUntil(note.expectedAt)
  if (days === null) return ''
  if (days < 0) return 'overdue'
  if (days === 0) return 'today'
  if (days <= 3) return 'soon'
  return 'later'
}

function expectedLabel(note) {
  if (!note || !note.expectedAt) return ''
  const days = daysUntil(note.expectedAt)
  if (days === null) return ''
  if (days < 0) return T('expectedOverdue', { days: Math.abs(days) })
  if (days === 0) return T('expectedToday')
  return T('expectedDays', { days })
}

/* -------------------------------------------------------- display fallback
 * A captured idea often has body text but no title yet. The card shows the
 * first sentence as its title — display only, the stored note is untouched.
 */
function firstSentence(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  const match = clean.match(/^[^。！？!?；;.\n]+/)
  return (match ? match[0] : clean).replace(/[\s。！？!?；;，,、.]+$/, '')
}

function noteTitle(note) {
  if (!note) return ''
  const title = String(note.title || '').trim()
  const placeholder = T('untitled')
  if (title && title !== placeholder) return title
  const fallback = firstSentence(note.body) || String(note.summary || '').trim()
  if (!fallback) return placeholder
  return fallback.length > 14 ? `${fallback.slice(0, 14)}…` : fallback
}

/** Plain-language score used by the card header (`4/5`). */
function scoreText(note) {
  const value = clamp(Number(note && note.stars) || 0, 0, 5)
  return `${value}/5`
}

/* ================= 05-css.js ================= */
const CSS = String.raw`
.iw-root {
  --iw-bg: var(--dsw-alias-bg-base, #F2F2F6);
  --iw-surface: var(--dsw-alias-bg-layer-1, #FFFFFF);
  --iw-sunken: var(--dsw-alias-bg-layer-2, #F1F1F4);
  --iw-border: var(--dsw-alias-border-l1, #E6E6EA);
  --iw-border-strong: var(--dsw-alias-border-l2, #D6D6DC);
  --iw-text: var(--dsw-alias-label-primary, #1C1C1E);
  --iw-text2: var(--dsw-alias-label-secondary, #6E6E73);
  --iw-text3: #9A9AA1;
  --iw-accent: var(--dsw-alias-brand-primary, #0A84FF);
  --iw-accent-soft: #EAF2FF;
  --iw-accent-ink: #FFFFFF;
  --iw-star: #FFB020;
  --iw-star-empty: #D9D9DF;
  --iw-shadow: rgba(20, 20, 26, 0.07);
  --iw-hover: rgba(0, 0, 0, 0.035);
  --iw-danger: #FF453A;
  --iw-success: #28A745;
  position: relative;
  display: block;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--iw-bg);
  color: var(--iw-text);
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.iw-root * { box-sizing: border-box; }
.iw-root button, .iw-root input, .iw-root textarea, .iw-root select { font-family: inherit; }

/* category chips — 4 states: 未开始 / 进行中 / 已实现 / 已放弃 */
.iw-cat { display: inline-flex; align-items: center; gap: 6px; height: 21px; padding: 0 9px; border-radius: 11px; font-size: 10.5px; font-weight: 600; white-space: nowrap; }
.iw-cat-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.iw-cat-0 { color: #8E8E93; background: #F1F1F5; }
.iw-cat-1 { color: #F08C00; background: #FFF4E4; }
.iw-cat-2 { color: #28A745; background: #E9F8EE; }
.iw-cat-3 { color: #9A9AA1; background: #F5F5F7; }

/* page */
.iw-page { max-width: 1280px; margin: 0 auto; padding: 30px 34px 90px; }
.iw-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
.iw-title { margin: 0; font-size: 28px; font-weight: 650; letter-spacing: -0.4px; line-height: 1.2; }
.iw-subtitle { margin: 6px 0 0; font-size: 12px; color: var(--iw-text2); }
.iw-head-actions { display: flex; align-items: center; gap: 10px; padding-top: 6px; }
.iw-search { display: flex; align-items: center; gap: 7px; height: 34px; padding: 0 12px; border-radius: 17px; background: var(--iw-sunken); min-width: 176px; }
.iw-search input { border: none; background: transparent; outline: none; color: var(--iw-text); font-size: 12px; width: 100%; }
.iw-search input::placeholder { color: var(--iw-text3); }

.iw-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 17px; border: 1px solid transparent; background: transparent; color: var(--iw-text); font-size: 12.5px; font-weight: 550; cursor: pointer; white-space: nowrap; transition: background .15s ease, border-color .15s ease, opacity .15s ease; }
.iw-btn:hover { background: var(--iw-hover); }
.iw-btn-primary { background: var(--iw-text); color: var(--iw-surface); }
.iw-btn-primary:hover { background: var(--iw-text); opacity: 0.9; }
.iw-btn-ghost { border-color: var(--iw-border); color: var(--iw-text2); }
.iw-btn-ghost:hover { background: var(--iw-hover); }
.iw-btn-danger { color: var(--iw-danger); }
.iw-btn-sm { height: 28px; padding: 0 11px; font-size: 11.5px; border-radius: 14px; }
.iw-btn:disabled { opacity: .45; cursor: default; }
.iw-icon-btn { width: 32px; height: 32px; border: none; border-radius: 50%; background: transparent; color: var(--iw-text2); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
.iw-icon-btn:hover { background: var(--iw-hover); color: var(--iw-text); }

.iw-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; background-clip: padding-box; }
.iw-dot.is-on { border-color: var(--iw-accent); }

.iw-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 22px 0 18px; }
.iw-toolbar .iw-spacer { flex: 1; }
.iw-seg { display: inline-flex; padding: 3px; border-radius: 9px; background: var(--iw-sunken); }
.iw-seg button { height: 26px; padding: 0 13px; border: none; background: transparent; border-radius: 7px; font-size: 11.5px; font-weight: 550; color: var(--iw-text2); cursor: pointer; }
.iw-seg button.is-on { background: var(--iw-surface); color: var(--iw-text); box-shadow: 0 1px 2px rgba(0, 0, 0, .1); }
.iw-chip { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; border-radius: 14px; border: 1px solid var(--iw-border); background: transparent; color: var(--iw-text2); font-size: 11.5px; cursor: pointer; white-space: nowrap; }
.iw-chip:hover { background: var(--iw-hover); }
.iw-chip.is-on { background: var(--iw-text); border-color: transparent; color: var(--iw-surface); }
.iw-chip .iw-count { font-size: 10px; opacity: .6; }

/* grid + cards */
.iw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; align-items: start; }
.iw-card { position: relative; display: flex; flex-direction: column; gap: 9px; padding: 18px; border-radius: 16px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); cursor: pointer; transition: transform .16s ease, box-shadow .16s ease; text-align: left; color: var(--iw-text); }
.iw-card:hover { transform: translateY(-1px); box-shadow: 0 10px 26px var(--iw-shadow); }
.iw-card-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.iw-card-date { font-size: 10.5px; color: var(--iw-text3); }
.iw-card-title { margin: 1px 0 0; font-size: 15.5px; font-weight: 640; line-height: 1.42; letter-spacing: -0.1px; }
.iw-card-body { margin: 0; font-size: 11.8px; line-height: 1.7; color: var(--iw-text2); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.iw-card-foot { display: flex; align-items: center; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding-top: 10px; border-top: 1px solid var(--iw-border); margin-top: 2px; }
.iw-card-foot .iw-card-meta { flex: 1 1 auto; min-width: 0; text-align: right; }
.iw-card-foot .iw-btn { margin-left: auto; }
.iw-card-meta { font-size: 10px; color: var(--iw-text3); white-space: nowrap; }
.iw-review-mini { display: flex; flex-direction: column; gap: 0; margin-top: 2px; padding: 10px 0 0; border-radius: 0; background: transparent; border-top: 1px solid var(--iw-hairline); }
.iw-review-mini .iw-timeline-head { justify-content: flex-start; gap: 6px; font-size: 12px; color: var(--iw-text3); }
.iw-review-mini .iw-timeline-kind { padding: 0; border-radius: 0; background: transparent; color: var(--iw-text3); font-size: 12px; font-weight: 400; }
.iw-review-link { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; color: var(--iw-accent); font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-decoration: none; }
.iw-review-text { font-size: 10.5px; line-height: 1.6; color: var(--iw-text2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.iw-review-meta { font-size: 9.5px; color: var(--iw-text3); }

/* stars */
.iw-stars { display: inline-flex; align-items: center; gap: 2px; }
.iw-stars svg { display: block; }
.iw-stars.is-input svg { cursor: pointer; }

/* media */
.iw-media-strip { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.iw-thumb { position: relative; width: 86px; height: 56px; border-radius: 9px; overflow: hidden; background: var(--iw-sunken); flex: none; display: block; }
.iw-thumb img, .iw-thumb video { width: 100%; height: 100%; object-fit: cover; display: block; }
.iw-thumb-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, .28); color: #fff; }
.iw-thumb-tag { position: absolute; left: 5px; bottom: 5px; padding: 1px 6px; border-radius: 6px; background: rgba(0, 0, 0, .55); color: #fff; font-size: 8px; font-weight: 500; }
.iw-audio { display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 11px; border-radius: 10px; background: var(--iw-sunken); flex: 1 1 150px; min-width: 140px; }
.iw-audio-play { width: 26px; height: 26px; border-radius: 50%; border: none; background: var(--iw-text); color: var(--iw-surface); display: flex; align-items: center; justify-content: center; cursor: pointer; flex: none; }
.iw-audio-play svg { display: block; }
.iw-wave { display: flex; align-items: center; gap: 2px; height: 24px; flex: 1; overflow: hidden; }
.iw-wave i { display: block; width: 2px; border-radius: 1px; background: var(--iw-text3); flex: none; }
.iw-audio-time { font-size: 9.5px; color: var(--iw-text2); white-space: nowrap; flex: none; }
.iw-audio-progress { height: 2px; border-radius: 1px; background: var(--iw-accent); }
.iw-media-caption { margin: 5px 0 0; font-size: 9.5px; color: var(--iw-text3); }
.iw-transcript { margin: 6px 0 0; padding: 8px 10px; border-radius: 8px; background: var(--iw-sunken); font-size: 10.5px; line-height: 1.55; color: var(--iw-text2); }

/* overview / insights */
.iw-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.iw-kpi { padding: 15px 17px; border-radius: 14px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); }
.iw-kpi-label { font-size: 10px; color: var(--iw-text2); }
.iw-kpi-value { margin-top: 6px; font-size: 25px; font-weight: 650; letter-spacing: -0.5px; line-height: 1.1; }
.iw-kpi-value small { font-size: 10.5px; font-weight: 500; color: var(--iw-text2); margin-left: 3px; letter-spacing: 0; }
.iw-kpi-delta { display: inline-block; margin-top: 7px; padding: 2px 8px; border-radius: 8px; background: var(--iw-sunken); color: var(--iw-text2); font-size: 9.5px; }
.iw-kpi-delta.good { background: rgba(40, 167, 69, .12); color: var(--iw-success); }
.iw-chart-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 14px; }
.iw-panel { padding: 16px 18px 12px; border-radius: 14px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 1px 2px var(--iw-shadow); }
.iw-panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.iw-panel-title { font-size: 12px; font-weight: 640; }
.iw-panel-sub { margin-top: 3px; font-size: 9.5px; color: var(--iw-text3); }
.iw-panel-note { font-size: 9.5px; color: var(--iw-text2); }
.iw-chart { margin-top: 6px; }
.iw-chart svg { display: block; width: 100%; height: auto; overflow: visible; }
.iw-legend { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; font-size: 9.5px; color: var(--iw-text2); }
.iw-legend i { display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 5px; }
.iw-legend .iw-legend-line { width: 12px; height: 2px; border-radius: 1px; display: inline-block; margin-right: 5px; vertical-align: middle; }
.iw-rows { display: flex; flex-direction: column; }
.iw-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--iw-border); font-size: 11px; }
.iw-row:first-child { border-top: none; }
.iw-row-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iw-row-muted { color: var(--iw-text3); font-size: 9.5px; white-space: nowrap; }
.iw-row-right { color: var(--iw-text2); font-size: 10px; white-space: nowrap; }
.iw-link { color: var(--iw-accent); cursor: pointer; text-decoration: none; font-size: 10.5px; font-weight: 550; background: none; border: none; padding: 0; }
.iw-link:hover { text-decoration: underline; }
.iw-tabs { display: flex; gap: 22px; margin-top: 14px; border-bottom: 1px solid var(--iw-border); }
.iw-tab { position: relative; padding: 0 1px 10px; border: none; background: none; font-size: 11.5px; font-weight: 550; color: var(--iw-text2); cursor: pointer; }
.iw-tab.is-on { color: var(--iw-text); }
.iw-tab.is-on::after { content: ''; position: absolute; left: -1px; right: -1px; bottom: -1px; height: 2px; border-radius: 1px; background: var(--iw-text); }
.iw-health { display: flex; gap: 8px; align-items: flex-start; padding: 11px 13px; border-radius: 12px; background: var(--iw-sunken); font-size: 10.5px; line-height: 1.6; color: var(--iw-text2); }

/* modal */
.iw-overlay { position: fixed; inset: 0; z-index: 400; display: flex; align-items: center; justify-content: center; padding: 30px; background: rgba(10, 10, 14, .42); }
.iw-modal { width: min(960px, 100%); max-height: calc(100vh - 60px); overflow: auto; padding: 28px 32px 26px; border-radius: 22px; border: 1px solid var(--iw-border); background: var(--iw-surface); box-shadow: 0 30px 90px rgba(0, 0, 0, .38); color: var(--iw-text); }
.iw-modal-sm { width: min(620px, 100%); }
.iw-modal-md { width: min(760px, 100%); }
.iw-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.iw-modal-title { margin: 0; font-size: 19px; font-weight: 650; letter-spacing: -0.2px; }
.iw-modal-date { font-size: 10.5px; color: var(--iw-text3); }
.iw-section { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--iw-border); }
.iw-section-label { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; font-size: 11px; font-weight: 640; }
.iw-field { display: flex; flex-direction: column; gap: 6px; }
.iw-field-label { font-size: 10px; color: var(--iw-text2); }
.iw-input, .iw-textarea, .iw-select { width: 100%; padding: 9px 12px; border-radius: 10px; border: 1px solid var(--iw-border); background: var(--iw-surface); color: var(--iw-text); font-size: 12.5px; outline: none; }
.iw-input:focus, .iw-textarea:focus, .iw-select:focus { border-color: var(--iw-accent); box-shadow: 0 0 0 3px var(--iw-accent-soft); }
.iw-textarea { resize: vertical; min-height: 72px; line-height: 1.65; }
.iw-title-input { font-size: 18px; font-weight: 640; padding: 6px 2px 10px; border: none; border-bottom: 1px solid var(--iw-border); border-radius: 0; }
.iw-title-input:focus { box-shadow: none; border-color: var(--iw-accent); }
.iw-modal-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--iw-border); }
.iw-modal-foot .iw-hint { font-size: 9.5px; color: var(--iw-text3); }
.iw-btn-row { display: flex; align-items: center; gap: 8px; }
.iw-attach-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.iw-attach-btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 10px; border: 1px dashed var(--iw-border-strong); background: transparent; color: var(--iw-text2); font-size: 11px; cursor: pointer; }
.iw-attach-btn:hover { background: var(--iw-hover); color: var(--iw-text); }
.iw-file-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.iw-file { position: relative; width: 132px; border-radius: 10px; border: 1px solid var(--iw-border); background: var(--iw-sunken); padding: 8px; font-size: 9.5px; color: var(--iw-text2); }
.iw-file .iw-thumb { width: 100%; height: 64px; }
.iw-file-remove { position: absolute; top: 4px; right: 4px; width: 20px; height: 20px; border-radius: 50%; border: none; background: rgba(0, 0, 0, .55); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.iw-recording { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--iw-sunken); font-size: 11px; }
.iw-rec-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--iw-danger); animation: iw-pulse 1.1s ease-in-out infinite; }
@keyframes iw-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
.iw-settings-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid var(--iw-border); }
.iw-settings-row:first-of-type { border-top: none; }
.iw-settings-label { font-size: 11.5px; font-weight: 550; }
.iw-settings-desc { margin-top: 3px; font-size: 9.5px; color: var(--iw-text3); max-width: 420px; }
.iw-path { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 9.5px; color: var(--iw-text2); background: var(--iw-sunken); padding: 4px 8px; border-radius: 6px; word-break: break-all; }
.iw-price-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.iw-toggle { width: 38px; height: 22px; border-radius: 11px; border: none; background: var(--iw-border-strong); position: relative; cursor: pointer; padding: 0; }
.iw-toggle.is-on { background: var(--iw-accent); }
.iw-toggle::after { content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .15s ease; }
.iw-toggle.is-on::after { transform: translateX(16px); }
.iw-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 70px 20px; border-radius: 18px; border: 1px dashed var(--iw-border-strong); color: var(--iw-text2); text-align: center; }
.iw-empty-title { font-size: 15px; font-weight: 620; color: var(--iw-text); }
.iw-toast { position: fixed; left: 50%; bottom: 34px; transform: translateX(-50%); z-index: 500; padding: 10px 18px; border-radius: 12px; background: var(--iw-text); color: var(--iw-surface); font-size: 11.5px; box-shadow: 0 10px 30px rgba(0, 0, 0, .3); }
.iw-spinner { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--iw-border); border-top-color: var(--iw-accent); animation: iw-spin .8s linear infinite; }
@keyframes iw-spin { to { transform: rotate(360deg); } }
.iw-center { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 60px; color: var(--iw-text2); }
.iw-muted { color: var(--iw-text3); }
.iw-small { font-size: 10px; }
.iw-divider { height: 1px; background: var(--iw-border); margin: 14px 0; }
.iw-token-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 9.5px; color: var(--iw-text3); }
.iw-token-bar { height: 8px; border-radius: 4px; background: var(--iw-sunken); overflow: hidden; }
.iw-token-bar i { display: block; height: 100%; border-radius: 4px; background: var(--iw-accent); }
.iw-inline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

@media (max-width: 980px) {
  .iw-page { padding: 22px 20px 70px; }
  .iw-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .iw-chart-grid { grid-template-columns: 1fr; }
  .iw-head { flex-direction: column; align-items: stretch; }
  .iw-head-actions { flex-wrap: wrap; }
}

/* status bar + more categories */
.iw-status-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.iw-status-label { font-size: 10px; color: var(--iw-text2); min-width: 30px; }
.iw-more-select { height: 28px; border-radius: 14px; border: 1px solid var(--iw-border); background: transparent; color: var(--iw-text2); font-size: 11.5px; padding: 0 8px; cursor: pointer; }
.iw-more-select:focus { outline: none; border-color: var(--iw-accent); }

/* records timeline */
.iw-timeline { display: flex; flex-direction: column; }
.iw-timeline-item { display: flex; gap: 10px; padding: 10px 0; border-top: 1px solid var(--iw-border); }
.iw-timeline-item:first-child { border-top: none; }
.iw-timeline-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex: none; background: var(--iw-accent); }
.iw-timeline-dot.is-complete { background: var(--iw-success); }
.iw-timeline-body { flex: 1; min-width: 0; }
.iw-timeline-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 9.5px; color: var(--iw-text3); }
.iw-timeline-text { margin-top: 4px; font-size: 11.5px; line-height: 1.7; color: var(--iw-text2); white-space: pre-wrap; word-break: break-word; }
.iw-timeline-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.iw-timeline-kind { display: inline-flex; align-items: center; gap: 4px; padding: 1px 7px; border-radius: 7px; font-size: 9px; font-weight: 600; background: var(--iw-accent-soft); color: var(--iw-accent); }
.iw-timeline-kind.is-complete { background: rgba(40, 167, 69, .14); color: var(--iw-success); }

/* file chips */
.iw-filechip { display: inline-flex; align-items: center; gap: 7px; max-width: 100%; padding: 8px 10px; border-radius: 9px; background: var(--iw-sunken); color: var(--iw-text2); font-size: 10px; text-decoration: none; border: none; cursor: pointer; }
.iw-filechip:hover { background: var(--iw-hover); color: var(--iw-text); }
.iw-filechip-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px; }
.iw-filechip-size { color: var(--iw-text3); flex: none; font-size: 9px; }
.iw-file-list-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }

/* complete modal links */
.iw-link-rows { display: flex; flex-direction: column; gap: 8px; }
.iw-link-row { display: flex; gap: 8px; align-items: center; }
.iw-link-row .iw-input { flex: 1; }
.iw-link-remove { flex: none; }

/* usage page */
.iw-usage-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.iw-usage-range { display: flex; align-items: center; gap: 8px; }
.iw-date-input { height: 30px; border-radius: 9px; border: 1px solid var(--iw-border); background: var(--iw-surface); color: var(--iw-text); font-size: 11px; padding: 0 8px; }
.iw-usage-model { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid var(--iw-border); font-size: 10.5px; }
.iw-usage-model:first-child { border-top: none; }
.iw-usage-model-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--iw-text); }
.iw-usage-model-bar { width: 150px; height: 8px; border-radius: 4px; background: var(--iw-sunken); overflow: hidden; flex: none; }
.iw-usage-model-bar i { display: block; height: 100%; border-radius: 4px; background: var(--iw-accent); }
.iw-usage-model-num { width: 70px; text-align: right; color: var(--iw-text2); flex: none; }
.iw-usage-model-cost { width: 70px; text-align: right; color: var(--iw-text3); flex: none; }
.iw-usage-day { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-top: 1px solid var(--iw-border); font-size: 10px; color: var(--iw-text2); }
.iw-usage-day:first-child { border-top: none; }
.iw-usage-day-date { width: 84px; flex: none; color: var(--iw-text3); }
.iw-usage-day-num { flex: 1; text-align: right; }
.iw-usage-day-cost { width: 80px; text-align: right; color: var(--iw-text3); flex: none; }
.iw-usage-note { margin-top: 10px; font-size: 9.5px; line-height: 1.7; color: var(--iw-text3); }

/* completion card in detail (standalone, not beside close) */
.iw-complete-card { display: flex; align-items: center; gap: 14px; width: 100%; margin-top: 20px; padding: 16px 18px; border-radius: 16px; border: 1px solid var(--iw-accent); background: linear-gradient(120deg, var(--iw-accent-soft), transparent 70%); color: var(--iw-text); cursor: pointer; text-align: left; transition: transform .15s ease, box-shadow .15s ease; }
.iw-complete-card:hover { transform: translateY(-1px); box-shadow: 0 10px 26px var(--iw-shadow); }
.iw-complete-card-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--iw-accent); color: var(--iw-accent-ink, #0E1013); flex: none; }
.iw-complete-card-body { flex: 1; min-width: 0; }
.iw-complete-card-title { font-size: 13px; font-weight: 650; }
.iw-complete-card-sub { margin-top: 2px; font-size: 10px; color: var(--iw-text2); }
.iw-complete-card.is-done { border-color: var(--iw-border); background: var(--iw-sunken); cursor: default; }
.iw-complete-card.is-done .iw-complete-card-icon { background: var(--iw-success); color: #fff; }
.iw-complete-card.is-done:hover { transform: none; box-shadow: none; }

/* record attachments */
.iw-record-attach { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.iw-record-media { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.iw-record-media .iw-thumb { width: 88px; height: 60px; }
.iw-record-media .iw-audio { height: 44px; min-width: 180px; }
.iw-record-media .iw-filechip { font-size: 9.5px; }

/* storage + paths entry inside insights */
.iw-storage { margin-top: 14px; }
.iw-storage-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 6px 0; }
.iw-storage-label { font-size: 10px; color: var(--iw-text2); width: 74px; flex: none; }
.iw-storage-path { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 9.5px; color: var(--iw-text2); background: var(--iw-sunken); padding: 4px 8px; border-radius: 6px; word-break: break-all; flex: 1; min-width: 0; }

/* ---------------------------------------------------------- drag & drop */
.iw-drop-wrap { position: relative; }
.iw-drop-overlay {
  position: absolute; inset: -10px; z-index: 6; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px; text-align: center;
  border: 1.5px dashed var(--iw-accent); border-radius: 16px;
  background: color-mix(in srgb, var(--iw-surface) 88%, var(--iw-accent));
  color: var(--iw-text); pointer-events: none;
}
.iw-drop-overlay-title { font-size: 13px; font-weight: 640; }
.iw-drop-overlay-sub { font-size: 10px; color: var(--iw-text2); }
.iw-drop-overlay-icon {
  display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;
  border-radius: 50%; background: var(--iw-accent-soft); color: var(--iw-accent);
}
.iw-attach-row.is-drag .iw-attach-btn { border-color: var(--iw-accent); color: var(--iw-accent); }

/* ------------------------------------------------------------ voice box */
.iw-voice {
  grid-column: 1 / -1; display: flex; flex-direction: column; gap: 8px;
  padding: 12px; border-radius: 12px; background: var(--iw-sunken);
  border: 1px solid var(--iw-border);
}
.iw-voice-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.iw-voice-head .iw-audio { flex: 1 1 200px; background: var(--iw-surface); }
.iw-voice-label { font-size: 9.5px; font-weight: 600; color: var(--iw-text2); display: flex; align-items: center; gap: 6px; }
.iw-voice-note { font-size: 9px; color: var(--iw-text3); }
.iw-voice-text { min-height: 66px !important; font-size: 11.5px !important; background: var(--iw-surface) !important; }
.iw-voice-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* --------------------------------------------------------- summary card */
.iw-summary-box {
  margin-top: 12px; padding: 12px 14px; border-radius: 12px;
  background: var(--iw-accent-soft); border: 1px solid transparent;
}
.iw-summary-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
.iw-summary-title { display: flex; align-items: center; gap: 6px; font-size: 9.5px; font-weight: 640; color: var(--iw-accent); }
.iw-summary-text { font-size: 11.5px; line-height: 1.7; color: var(--iw-text); white-space: pre-wrap; }
.iw-summary-text.is-empty { color: var(--iw-text3); }
.iw-summary .iw-textarea { min-height: 62px; background: var(--iw-surface); }
.iw-card-summary { margin: 0; font-size: 11.8px; line-height: 1.7; color: var(--iw-text2); }
.iw-card-summary-label {
  display: inline-flex; align-items: center; gap: 4px; margin-bottom: 3px;
  font-size: 9px; font-weight: 600; color: var(--iw-accent);
}

/* ------------------------------------------------------- expected date */
.iw-expect { min-width: 240px; }
.iw-expect-box {
  display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px;
  border-radius: 10px; border: 1px solid var(--iw-accent);
  background: var(--iw-accent-soft); color: var(--iw-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--iw-accent) 12%, transparent);
}
.iw-expect-box.is-empty { border-color: var(--iw-border-strong); background: var(--iw-surface); color: var(--iw-text3); box-shadow: none; }
.iw-expect-box input {
  border: none; background: transparent; outline: none; color: var(--iw-text);
  font-size: 11.5px; font-family: inherit; flex: 1; min-width: 0; padding: 0;
}
.iw-expect-box input::-webkit-calendar-picker-indicator { cursor: pointer; opacity: .55; }
.iw-expect-clear {
  border: none; background: transparent; color: var(--iw-text3); cursor: pointer;
  display: inline-flex; align-items: center; padding: 0; flex: none;
}
.iw-expect-clear:hover { color: var(--iw-danger); }
.iw-expect-hint { font-size: 9.5px; color: var(--iw-text3); }
.iw-expect-hint.is-soon { color: var(--iw-star); }
.iw-expect-hint.is-overdue { color: var(--iw-danger); }
.iw-expect-chip {
  display: inline-flex; align-items: center; gap: 5px; height: 21px; padding: 0 9px;
  border-radius: 11px; font-size: 10px; font-weight: 600; white-space: nowrap;
  background: var(--iw-accent-soft); color: var(--iw-accent);
}
.iw-expect-chip.is-soon { background: color-mix(in srgb, var(--iw-star) 16%, transparent); color: var(--iw-star); }
.iw-expect-chip.is-overdue { background: color-mix(in srgb, var(--iw-danger) 14%, transparent); color: var(--iw-danger); }
.iw-expect-chip.is-done { background: var(--iw-sunken); color: var(--iw-text3); }

/* ------------------------------------------------------- context menu */
.iw-ctx {
  position: fixed; z-index: 620; min-width: 190px; padding: 5px;
  border-radius: 11px; border: 1px solid var(--iw-border);
  background: var(--iw-surface); box-shadow: 0 14px 40px rgba(0, 0, 0, .26);
  animation: iw-ctx-in .1s ease-out;
}
@keyframes iw-ctx-in { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.iw-ctx-item {
  display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 9px;
  border: none; border-radius: 7px; background: transparent; color: var(--iw-text);
  font-size: 11px; font-family: inherit; text-align: left; cursor: pointer;
}
.iw-ctx-item:hover { background: var(--iw-hover); }
.iw-ctx-item.is-danger { color: var(--iw-danger); }
.iw-ctx-item:disabled { opacity: .4; cursor: default; }
.iw-ctx-sep { height: 1px; margin: 4px 6px; background: var(--iw-border); }
.iw-ctx-title { padding: 5px 9px 6px; font-size: 9px; color: var(--iw-text3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px; }

/* ----------------------------------------------------------- lightbox */
.iw-lightbox {
  position: fixed; inset: 0; z-index: 640; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: rgba(8, 8, 12, .82); backdrop-filter: blur(6px);
}
.iw-lightbox-inner { width: min(1080px, 100%); max-height: 100%; display: flex; flex-direction: column; gap: 10px; }
.iw-lightbox-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #fff; }
.iw-lightbox-title { font-size: 11.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iw-lightbox-actions { display: flex; align-items: center; gap: 8px; flex: none; }
.iw-lightbox-body {
  flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center;
  border-radius: 14px; overflow: hidden; background: rgba(255, 255, 255, .04);
}
.iw-lightbox-body img { max-width: 100%; max-height: 78vh; object-fit: contain; display: block; }
.iw-lightbox-body video { max-width: 100%; max-height: 78vh; display: block; }
.iw-lightbox-body .iw-audio { background: rgba(255, 255, 255, .1); min-width: 420px; }
.iw-lightbox-body .iw-audio-time { color: rgba(255, 255, 255, .8); }
.iw-lightbox-file {
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 48px 24px; color: #fff; text-align: center;
}
.iw-lightbox-btn {
  display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px;
  border-radius: 15px; border: 1px solid rgba(255, 255, 255, .22); background: rgba(255, 255, 255, .1);
  color: #fff; font-size: 11px; font-family: inherit; cursor: pointer;
}
.iw-lightbox-btn:hover { background: rgba(255, 255, 255, .18); }

/* previewable attachments */
.iw-attach-item { position: relative; }
.iw-attach-item.is-previewable { cursor: zoom-in; }
.iw-attach-item .iw-attach-hint {
  position: absolute; right: 6px; top: 6px; display: flex; align-items: center; gap: 4px;
  padding: 2px 6px; border-radius: 7px; background: rgba(0, 0, 0, .5); color: #fff;
  font-size: 8.5px; opacity: 0; transition: opacity .15s ease; pointer-events: none;
}
.iw-attach-item:hover .iw-attach-hint { opacity: 1; }

/* ===========================================================================
 * v0.6 — wall main area, polished
 * Every colour here comes from the Harness alias tokens above, so the wall and
 * the rest of the application always render the same palette. The only local
 * decisions are rhythm, radii and the recording-tape moment.
 * ========================================================================= */
.iw-root {
  --iw-hairline: var(--iw-border);
  --iw-text3: color-mix(in srgb, var(--iw-text2) 72%, transparent);
  --iw-accent-soft: color-mix(in srgb, var(--iw-accent) 12%, transparent);
  --iw-accent-ink: color-mix(in srgb, var(--iw-accent) 78%, var(--iw-text));
  --iw-mono: ui-monospace, "Cascadia Mono", "SF Mono", Consolas, "Courier New", monospace;
  --iw-shadow: none;
  --iw-shadow-pop: 0 8px 24px rgba(31, 27, 22, .08);
  /* The tape is a media object, not an ink stamp: it is tinted from the active
     palette accent so it moves with the theme instead of staying black. */
  --iw-tape: color-mix(in srgb, var(--iw-accent) 9%, var(--iw-surface));
  --iw-tape-edge: color-mix(in srgb, var(--iw-accent) 22%, transparent);
  --iw-tape-ink: color-mix(in srgb, var(--iw-accent) 78%, var(--iw-text));
  --iw-tape-wave: color-mix(in srgb, var(--iw-accent) 88%, var(--iw-text));
  --iw-tape-mute: color-mix(in srgb, var(--iw-text) 20%, transparent);
  --iw-tape-line: color-mix(in srgb, var(--iw-accent) 40%, transparent);
  --iw-tape-label: color-mix(in srgb, var(--iw-text) 52%, transparent);
  font-variant-numeric: tabular-nums;
}
.iw-root[data-scheme="dark"] {
  /* On a dark page a flat ink block reads as a hole. Lift it off the card and
     let the palette accent tint both the surface and the waveform. */
  --iw-tape: color-mix(in srgb, var(--iw-accent) 14%, var(--iw-surface));
  --iw-tape-edge: color-mix(in srgb, var(--iw-accent) 30%, transparent);
  --iw-tape-ink: color-mix(in srgb, var(--iw-accent) 82%, var(--iw-text));
  --iw-tape-wave: var(--iw-accent);
  --iw-tape-mute: color-mix(in srgb, var(--iw-text) 24%, transparent);
  --iw-tape-line: color-mix(in srgb, var(--iw-accent) 46%, transparent);
  --iw-tape-label: color-mix(in srgb, var(--iw-text) 50%, transparent);
  --iw-shadow-pop: 0 8px 24px rgba(0, 0, 0, .48);
}
.iw-num, .iw-mono { font-family: var(--iw-mono); font-variant-numeric: tabular-nums; }

/* ---------------------------------------------------------------- page head */
.iw-page { padding: 36px 44px 52px; max-width: 1520px; margin: 0 auto; }
.iw-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 30px; }
.iw-title { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0; color: var(--iw-text); }
.iw-subtitle { margin: 8px 0 0; font-size: 13px; color: var(--iw-text2); }
.iw-subtitle .iw-num { font-size: 12px; }
.iw-head-actions { display: flex; align-items: center; gap: 16px; }
.iw-search {
  display: flex; align-items: center; gap: 8px; width: 250px; height: 36px; padding: 0 12px;
  border-radius: 10px; background: var(--iw-sunken); color: var(--iw-text3);
}
.iw-search input {
  flex: 1; min-width: 0; border: 0; outline: 0; background: transparent;
  color: var(--iw-text); font-size: 13px;
}
.iw-search input::placeholder { color: var(--iw-text3); }
.iw-search:focus-within { box-shadow: inset 0 0 0 1px var(--iw-border-strong); }

/* appearance button + palette popover */
.iw-appearance { position: relative; display: flex; align-items: center; gap: 8px; }
.iw-appearance-btn {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  border: 0; border-radius: 10px; background: transparent; color: var(--iw-text3); cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.iw-appearance-btn:hover, .iw-appearance-btn.is-on { background: var(--iw-sunken); color: var(--iw-text); }
.iw-popover {
  position: absolute; right: 0; top: 44px; z-index: 40; width: 208px; padding: 12px;
  border-radius: 12px; background: var(--iw-surface); border: 1px solid var(--iw-hairline);
  box-shadow: var(--iw-shadow-pop);
}
.iw-popover-label { font-size: 12px; color: var(--iw-text3); margin: 2px 0 10px; }
.iw-palette-row {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 6px 6px;
  border: 0; border-radius: 8px; background: transparent; color: var(--iw-text);
  font-size: 13px; text-align: left; cursor: pointer;
}
.iw-palette-row:hover { background: var(--iw-sunken); }
.iw-palette-dot {
  width: 16px; height: 16px; flex: none; border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--iw-border-strong);
}
.iw-palette-row.is-on .iw-palette-dot { box-shadow: 0 0 0 2px var(--iw-surface), 0 0 0 3px var(--iw-accent); }
.iw-palette-row.is-on { color: var(--iw-text); font-weight: 500; }
.iw-popover-sep { height: 1px; margin: 8px 4px; background: var(--iw-hairline); }

/* primary button: inverted surface, amber glyph */
.iw-btn { height: 32px; padding: 0 12px; border-radius: 10px; font-size: 13px; font-weight: 500; }
.iw-btn-primary { background: var(--iw-text); color: var(--iw-bg); border: 0; }
.iw-btn-primary:hover { background: color-mix(in srgb, var(--iw-text) 88%, var(--iw-bg)); }
.iw-btn-primary svg { color: var(--iw-accent); }
.iw-head-actions .iw-btn-primary { height: 36px; padding: 0 14px; font-size: 13.5px; }
.iw-btn-ghost { background: var(--iw-surface); color: var(--iw-text); border: 1px solid var(--iw-hairline); }
.iw-btn-ghost:hover { background: var(--iw-sunken); }
.iw-btn-sm { height: 32px; padding: 0 12px; font-size: 13px; }
.iw-icon-btn { width: 36px; height: 36px; border-radius: 10px; border: 0; background: transparent; color: var(--iw-text3); }
.iw-icon-btn:hover { background: var(--iw-sunken); color: var(--iw-text); }

/* -------------------------------------------------------------- filter row */
.iw-toolbar { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
.iw-seg { display: inline-flex; align-items: center; gap: 4px; }
.iw-seg button {
  height: 30px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent;
  color: var(--iw-text2); font-size: 13px; cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.iw-seg button:hover { background: var(--iw-sunken); }
.iw-seg button.is-on { background: var(--iw-sunken); color: var(--iw-text); font-weight: 500; }
.iw-toolbar .iw-seg { margin-right: 10px; }
.iw-chip {
  height: 30px; display: inline-flex; align-items: center; gap: 5px; padding: 0 10px;
  border: 0; border-radius: 8px; background: transparent; color: var(--iw-text2);
  font-size: 13px; cursor: pointer; transition: background-color .15s ease, color .15s ease;
}
.iw-chip:hover { background: var(--iw-sunken); }
.iw-chip.is-on {
  background: var(--iw-sunken); color: var(--iw-text); font-weight: 500;
  box-shadow: inset 0 0 0 1px var(--iw-hairline);
}
.iw-chip .iw-count { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-text3); }
.iw-spacer { flex: 1; }
.iw-toolbar .iw-btn-sm { border: 1px solid var(--iw-hairline); background: var(--iw-surface); }
.iw-toolbar .iw-btn-sm svg { color: var(--iw-text3); }

/* -------------------------------------------------------------------- cards */
.iw-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: start; }
.iw-col { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
@media (max-width: 1240px) { .iw-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 880px) { .iw-grid { grid-template-columns: minmax(0, 1fr); } }

.iw-card {
  padding: 20px; border-radius: 12px; background: var(--iw-surface);
  border: 1px solid var(--iw-hairline); box-shadow: none;
  transition: border-color .15s ease, background-color .15s ease;
}
.iw-card:hover { border-color: var(--iw-border-strong); }
.iw-card-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.iw-card-date { font-size: 12px; color: var(--iw-text3); }
.iw-card-date .iw-num { font-size: 12px; }
.iw-score { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-text3); }
.iw-card-title {
  margin: 12px 0 0; font-size: 16px; font-weight: 600; line-height: 1.45;
  color: var(--iw-text); overflow-wrap: anywhere;
}
.iw-card-summary-wrap { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
.iw-card-summary-label {
  display: inline-flex; align-items: center; gap: 4px; flex: none;
  font-size: 12px; color: var(--iw-text2);
  text-decoration: underline; text-decoration-color: rgba(31, 27, 22, .25);
  text-decoration-thickness: 1px; text-underline-offset: 3px;
  cursor: pointer;
}
.iw-card-summary-label svg { color: var(--iw-text3); }
.iw-card-summary-label:hover { color: var(--iw-accent-ink); text-decoration-color: color-mix(in srgb, var(--iw-accent-ink) 50%, transparent); }
.iw-card-summary {
  margin: 8px 0 0; font-size: 13px; line-height: 1.7; color: var(--iw-text2);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.iw-card-body {
  margin: 10px 0 0; font-size: 13px; line-height: 1.7; color: var(--iw-text2);
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.iw-card .iw-review-mini { margin-top: 10px; padding: 0; background: transparent; border: 0; }
.iw-card .iw-timeline-head { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--iw-text3); }
.iw-card .iw-timeline-kind { background: transparent; padding: 0; color: var(--iw-text3); font-size: 12px; }
.iw-card .iw-review-text { font-size: 12px; color: var(--iw-text2); -webkit-line-clamp: 1; }
.iw-card .iw-review-link { font-size: 12px; color: var(--iw-text2); }

/* ------------------------------------------------------------ tape moment */
.iw-tape {
  display: flex; align-items: center; gap: 12px; height: 56px; margin-top: 14px;
  padding: 0 14px; border-radius: 10px; background: var(--iw-tape); color: var(--iw-tape-ink);
  box-shadow: inset 0 0 0 1px var(--iw-tape-edge);
}
.iw-tape-play {
  width: 26px; height: 26px; flex: none; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid var(--iw-tape-line); background: transparent;
  color: var(--iw-tape-ink); cursor: pointer; padding: 0;
}
.iw-tape-play svg { display: block; }
.iw-tape-wave { flex: 1; display: flex; align-items: center; gap: 2px; min-width: 0; height: 26px; }
.iw-tape-wave i { flex: none; width: 2.5px; border-radius: 1px; background: var(--iw-tape-mute); }
.iw-tape-wave i.is-played { background: var(--iw-tape-wave); }
.iw-tape-time { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-tape-ink); flex: none; }
.iw-tape-label { font-family: var(--iw-mono); font-size: 12px; color: var(--iw-tape-label); flex: none; }

.iw-media-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.iw-media-strip .iw-tape { margin-top: 0; flex: 1 1 100%; }
.iw-media-strip .iw-thumb {
  position: relative; width: 96px; height: 56px; border-radius: 8px; overflow: hidden;
  border: 1px solid var(--iw-hairline); background: var(--iw-sunken);
}
.iw-media-strip .iw-thumb img, .iw-media-strip .iw-thumb video { width: 100%; height: 100%; object-fit: cover; }
.iw-media-strip .iw-filechip {
  height: 56px; border-radius: 8px; background: var(--iw-bg); border: 1px solid var(--iw-hairline);
  padding: 7px 10px;
}

/* -------------------------------------------------------------- card foot */
.iw-card-foot {
  display: flex; align-items: center; gap: 10px; height: 32px; margin-top: 12px;
}
.iw-card-foot .iw-cat {
  display: inline-flex; align-items: center; gap: 0; height: auto; padding: 0;
  border-radius: 0; background: transparent; font-size: 12px; font-weight: 400; color: var(--iw-text3);
}
.iw-card-foot .iw-cat-dot { display: none; }
.iw-card-foot .iw-cat-1 {
  padding: 3px 8px; border-radius: 6px; font-weight: 500; color: var(--iw-accent-ink);
  background: color-mix(in srgb, var(--iw-accent) 12%, transparent);
}
.iw-expect-chip {
  display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--iw-text3);
  background: transparent; border: 0; padding: 0;
}
.iw-expect-chip svg { color: var(--iw-text3); }
.iw-expect-chip span { font-variant-numeric: tabular-nums; }
.iw-card-meta { margin-left: auto; font-size: 12px; color: var(--iw-text3); }
.iw-card-meta .iw-num { font-size: 12px; }

/* --------------------------------------------------------- week review card */
.iw-week {
  padding: 20px; border-radius: 12px; background: var(--iw-surface);
  border: 1px solid var(--iw-hairline);
}
.iw-week-head { display: flex; align-items: center; gap: 7px; color: var(--iw-text3); }
.iw-week-head svg { color: var(--iw-text3); }
.iw-week-head span { font-size: 13px; font-weight: 500; color: var(--iw-text); }
.iw-week-text { margin: 10px 0 0; font-size: 14px; line-height: 1.7; color: var(--iw-text); }
.iw-week-text b { font-family: var(--iw-mono); font-size: 13px; font-weight: 500; color: var(--iw-accent-ink); }
.iw-week-link {
  display: inline-block; margin-top: 10px; padding: 0; border: 0; background: transparent;
  font-size: 13px; color: var(--iw-text2); cursor: pointer;
  text-decoration: underline; text-decoration-color: rgba(31, 27, 22, .25);
  text-decoration-thickness: 1px; text-underline-offset: 3px;
}
.iw-week-link:hover { color: var(--iw-accent-ink); }

/* ---------------------------------------------------------------- empty */
.iw-empty { padding: 64px 20px; border-radius: 12px; border: 1px dashed var(--iw-border-strong); }

/* ------------------------------------------------------------- focus ring */
.iw-root :focus-visible {
  outline: 2px solid color-mix(in srgb, var(--iw-accent) 80%, transparent);
  outline-offset: 2px;
}
.iw-root :focus:not(:focus-visible) { outline: none; }
`

/* ================= 10-store.js ================= */
/* ------------------------------------------------------------------ fetch */
async function requestJson(url, options) {
  const response = await fetch(url, options)
  let body = {}
  try {
    body = await response.json()
  } catch {
    /* non-json */
  }
  if (!response.ok || body.ok === false) {
    throw new Error(body.error || `HTTP ${response.status}`)
  }
  return body.value
}

const api = {
  state: () => requestJson(`${API}/state`),
  rpc: (op, payload) => requestJson(`${API}/rpc`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ op, payload }),
  }),
  upload: async (blob, name) => {
    const response = await fetch(`${API}/media?name=${encodeURIComponent(name)}`, {
      method: 'POST',
      body: blob,
    })
    let body = {}
    try {
      body = await response.json()
    } catch {
      /* ignore */
    }
    if (!response.ok || body.ok === false) throw new Error(body.error || `HTTP ${response.status}`)
    return body.value
  },
  mediaUrl: (path) => `${API}/media?path=${encodeURIComponent(path)}`,
}

/* ------------------------------------------------------------------ store */
function createStore(deps) {
  let current = {
    loading: true,
    error: '',
    scheme: 'light',
    notes: [],
    settings: { ...EMPTY_SETTINGS },
    storage: null,
    toast: '',
    ui: {
      view: 'wall',
      insightsTab: 'overview',
      sort: 'date',
      category: '全部',
      query: '',
      compose: null,
      detailId: null,
      completeNoteId: null,
      settingsOpen: false,
      period: 'month',
      tokenRange: { preset: 'month', from: monthStartString(), to: todayString() },
    },
  }
  const listeners = new Set()
  let toastTimer = 0

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  const snapshot = () => current
  const publish = (patch) => {
    current = { ...current, ...patch }
    for (const listener of listeners) listener()
  }
  const publishUi = (patch) => publish({ ui: { ...current.ui, ...patch } })
  const toast = (message) => {
    publish({ toast: message })
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => publish({ toast: '' }), 2400)
  }

  return {
    subscribe,
    snapshot,
    deps,
    publish,
    publishUi,
    toast,
    getNotes: () => current.notes,

    async load() {
      // A cold Harness boot can mount this panel a moment before the Host HTTP
      // surface is registered, so a failed first read is retried briefly instead
      // of rendering the error state.
      let lastError
      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const value = await api.state()
          publish({
            loading: false,
            error: '',
            notes: Array.isArray(value.notes) ? value.notes : [],
            settings: { ...EMPTY_SETTINGS, ...(value.settings || {}) },
            ui: { ...current.ui, period: (value.settings && value.settings.period) || 'month' },
          })
          return
        } catch (error) {
          lastError = error
          await new Promise((resolve) => setTimeout(resolve, 300 + attempt * 250))
        }
      }
      publish({ loading: false, error: String(lastError && lastError.message ? lastError.message : lastError) })
    },

    async reload() {
      const value = await api.state()
      publish({ notes: Array.isArray(value.notes) ? value.notes : [], settings: { ...EMPTY_SETTINGS, ...(value.settings || {}) } })
    },

    async saveNote(note) {
      const value = await api.rpc('saveNote', { note })
      publish({ notes: value.notes })
      publishUi({ compose: null, completeNoteId: null })
      toast(T('saved'))
      return value.note
    },

    async deleteNote(id) {
      const value = await api.rpc('deleteNote', { id })
      publish({ notes: value.notes })
      publishUi({ detailId: null, completeNoteId: null })
      toast(T('deleted'))
    },

    async patchSettings(patch) {
      const value = await api.rpc('saveSettings', { settings: { ...current.settings, ...patch } })
      publish({ settings: { ...EMPTY_SETTINGS, ...value.settings } })
      return value.settings
    },

    /** Switch palette: repaints the whole Harness, then persists the choice. */
    async applyPalette(id) {
      const palette = PALETTES[id] ? id : 'paper'
      try {
        if (deps && typeof deps.applyPalette === 'function') deps.applyPalette(palette)
      } catch {
        /* the theme layer is best-effort: the wall still renders */
      }
      publish({ settings: { ...current.settings, palette } })
      try {
        const value = await api.rpc('saveSettings', { settings: { ...current.settings, palette } })
        publish({ settings: { ...EMPTY_SETTINGS, ...value.settings } })
      } catch {
        /* keep the in-memory choice */
      }
      return palette
    },

    async refreshStorage() {
      try {
        const value = await api.rpc('storage', {})
        publish({ storage: value })
      } catch {
        /* ignore */
      }
    },

    /** Hand a local file to the desktop shell (default app, or reveal). */
    async openFile(path, mode) {
      return await api.rpc('openPath', { path, mode: mode || 'open' })
    },

    async fetchUsage(from, to, refresh) {
      return await api.rpc('usage', { from, to, refresh: refresh === true })
    },

    async clearUsageCache() {
      await api.rpc('clearUsageCache', {})
      toast(T('tokenCacheCleared'))
    },

    setUi: publishUi,

    async transcribe(base64, language) {
      const fn = deps.transcribe
      if (!fn) throw new Error(T('nothingToTranscribe'))
      return fn(base64, language)
    },

    async pickDirectory() {
      const fn = deps.pickDirectory
      if (!fn) throw new Error(T('pickerUnavailable'))
      return fn()
    },
  }
}

function useStore(store) {
  const [snap, setSnap] = React.useState(store.snapshot())
  React.useEffect(() => store.subscribe(() => setSnap(store.snapshot())), [store])
  return snap
}

/* ================= 20-ui.js ================= */
/* ------------------------------------------------------------------ icons */
const ICONS = {
  sparkle: h('path', { d: 'M10 2.2c.55 3.4 1.7 5.2 5 5.8-3.3.6-4.45 2.4-5 5.8-.55-3.4-1.7-5.2-5-5.8 3.3-.6 4.45-2.4 5-5.8Z', fill: 'currentColor', stroke: 'none' }),
  search: h('g', null, h('circle', { cx: 9, cy: 9, r: 5.4 }), h('path', { d: 'M13.1 13.1 17 17' })),
  plus: h('path', { d: 'M10 4.2v11.6M4.2 10h11.6' }),
  mic: h('g', null, h('rect', { x: 7.4, y: 2.6, width: 5.2, height: 9.2, rx: 2.6 }), h('path', { d: 'M4.6 9.4a5.4 5.4 0 0 0 10.8 0M10 14.8v2.6M7.4 17.4h5.2' })),
  image: h('g', null, h('rect', { x: 2.8, y: 4.2, width: 14.4, height: 11.6, rx: 2.4 }), h('circle', { cx: 7.2, cy: 8.4, r: 1.5 }), h('path', { d: 'M3.6 14.2l4.2-4 3 2.8 2.4-2.2 3.2 3.4' })),
  video: h('g', null, h('rect', { x: 2.6, y: 4.6, width: 10.6, height: 10.8, rx: 2.2 }), h('path', { d: 'M13.2 9.2l4.1-2.4v6.4l-4.1-2.4z' })),
  close: h('path', { d: 'M5.2 5.2l9.6 9.6M14.8 5.2l-9.6 9.6' }),
  check: h('path', { d: 'M4.4 10.6l3.6 3.6 7.6-8' }),
  chevronRight: h('path', { d: 'M7.6 4.8 12.8 10l-5.2 5.2' }),
  chevronLeft: h('path', { d: 'M12.4 4.8 7.2 10l5.2 5.2' }),
  chevronDown: h('path', { d: 'M5 7.8 10 12.6 15 7.8' }),
  arrowUpRight: h('g', null, h('path', { d: 'M6 14 14 6' }), h('path', { d: 'M8.2 6H14v5.8' })),
  clock: h('g', null, h('circle', { cx: 10, cy: 10, r: 6.8 }), h('path', { d: 'M10 6.4V10l2.8 1.8' })),
  gear: h('g', null, h('circle', { cx: 10, cy: 10, r: 2.6 }), h('path', { d: 'M10 2.6v2M10 15.4v2M2.6 10h2M15.4 10h2M4.8 4.8l1.4 1.4M13.8 13.8l1.4 1.4M15.2 4.8l-1.4 1.4M6.2 13.8l-1.4 1.4' })),
  trash: h('g', null, h('path', { d: 'M3.8 6h12.4M8 6V4.2h4V6M5.6 6l.7 10.2h7.4L14.4 6M8.4 9v4.4M11.6 9v4.4' })),
  link: h('g', null, h('path', { d: 'M8.2 11.8l3.6-3.6' }), h('path', { d: 'M9.4 6.2 11 4.6a2.8 2.8 0 0 1 4 4l-1.6 1.6M10.6 13.8 9 15.4a2.8 2.8 0 0 1-4-4l1.6-1.6' })),
  play: h('path', { d: 'M6.8 4.8 15 10l-8.2 5.2z', fill: 'currentColor', stroke: 'none' }),
  pause: h('g', null, h('rect', { x: 6, y: 4.6, width: 2.8, height: 10.8, rx: 1, fill: 'currentColor', stroke: 'none' }), h('rect', { x: 11.2, y: 4.6, width: 2.8, height: 10.8, rx: 1, fill: 'currentColor', stroke: 'none' })),
  calendar: h('g', null, h('rect', { x: 3, y: 4.6, width: 14, height: 12, rx: 2.2 }), h('path', { d: 'M3 8.4h14M7 2.8v3.2M13 2.8v3.2' })),
  download: h('g', null, h('path', { d: 'M10 3v9M6.4 8.6 10 12.2l3.6-3.6M4 15.6h12' })),
  folder: h('path', { d: 'M3 6.2c0-1 .8-1.8 1.8-1.8h3l1.6 1.8h5.8c1 0 1.8.8 1.8 1.8v6c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8z' }),
  edit: h('g', null, h('path', { d: 'M12.6 4.2 15.8 7.4 8 15.2H4.8v-3.2z' }), h('path', { d: 'M10.8 6l3.2 3.2' })),
  refresh: h('g', null, h('path', { d: 'M16.2 10a6.2 6.2 0 1 1-1.8-4.4' }), h('path', { d: 'M16.4 3.4v4.2h-4.2' })),
  sort: h('g', null, h('path', { d: 'M6 4.2v11.6M6 15.8 3.6 13.2M6 15.8l2.4-2.6' }), h('path', { d: 'M14 15.8V4.2M14 4.2 11.6 6.8M14 4.2l2.4 2.6' })),
  dots: h('g', null, h('circle', { cx: 4.6, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' }), h('circle', { cx: 10, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' }), h('circle', { cx: 15.4, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' })),
  eye: h('g', null, h('path', { d: 'M1.8 10S4.8 4.6 10 4.6 18.2 10 18.2 10 15.2 15.4 10 15.4 1.8 10 1.8 10Z' }), h('circle', { cx: 10, cy: 10, r: 2.5 })),
  star: h('path', { d: 'M10 1.9l2.47 5.02 5.53.8-4 3.9.94 5.5L10 14.5l-4.94 2.62.94-5.5-4-3.9 5.53-.8z', fill: 'currentColor', stroke: 'none' }),
  sun: h('g', null, h('circle', { cx: 10, cy: 10, r: 3.4 }), h('path', { d: 'M10 2.2v2.1M10 15.7v2.1M2.2 10h2.1M15.7 10h2.1M4.5 4.5l1.5 1.5M14 14l1.5 1.5M15.5 4.5 14 6M6 14l-1.5 1.5' })),
}

function Icon({ name, size = 16, stroke = 1.7, className }) {
  return h(
    'svg',
    {
      className,
      width: size,
      height: size,
      viewBox: '0 0 20 20',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
      style: { display: 'block', flex: 'none' },
    },
    ICONS[name] || null,
  )
}

const STAR_PATH = 'M10 1.9l2.47 5.02 5.53.8-4 3.9.94 5.5L10 14.5l-4.94 2.62.94-5.5-4-3.9 5.53-.8z'

function Stars({ value, onChange, size = 14, gap = 3 }) {
  return h(
    'div',
    { className: `iw-stars${onChange ? ' is-input' : ''}`, style: { gap } },
    Array.from({ length: 5 }, (_, index) => {
      const filled = index < value
      return h(
        'svg',
        {
          key: index,
          width: size,
          height: size,
          viewBox: '0 0 20 20',
          'aria-label': T('starReadonly', { count: index + 1 }),
          onClick: onChange ? (event) => { event.stopPropagation(); onChange(index + 1) } : undefined,
          style: { display: 'block', cursor: onChange ? 'pointer' : 'default' },
        },
        h('path', {
          d: STAR_PATH,
          fill: filled ? 'var(--iw-accent)' : 'none',
          stroke: filled ? 'none' : 'var(--iw-border-strong)',
          strokeWidth: filled ? 0 : 1.3,
        }),
      )
    }),
  )
}

function CatChip({ category }) {
  const index = CAT_INDEX[category] === undefined ? 0 : CAT_INDEX[category]
  return h('span', { className: `iw-cat iw-cat-${index}` }, catLabel(category))
}

function Segmented({ value, options, onChange }) {
  return h(
    'div',
    { className: 'iw-seg' },
    options.map((option) => h(
      'button',
      {
        key: option.value,
        type: 'button',
        className: value === option.value ? 'is-on' : '',
        onClick: () => onChange(option.value),
      },
      option.label,
    )),
  )
}

function Btn({ children, variant = 'ghost', size = 'md', onClick, disabled, title, icon, type = 'button' }) {
  const classes = ['iw-btn', `iw-btn-${variant}`]
  if (size === 'sm') classes.push('iw-btn-sm')
  return h(
    'button',
    { type, className: classes.join(' '), onClick, disabled, title },
    icon ? h(Icon, { name: icon, size: 14 }) : null,
    children ? h('span', null, children) : null,
  )
}

function IconBtn({ name, onClick, title, size = 16 }) {
  return h('button', { type: 'button', className: 'iw-icon-btn', onClick, title, 'aria-label': title }, h(Icon, { name, size }))
}

function formatInlineCost(value) {
  return fmtCost(value)
}

/* ------------------------------------------------------------------ media */
function hashString(value) {
  let hash = 2166136261
  const text = String(value || 'seed')
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function waveBars(seed, count = 22) {
  const bars = []
  let state = hashString(seed) || 7
  for (let index = 0; index < count; index += 1) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0
    bars.push(4 + (state % 17))
  }
  return bars
}

function AudioPlayer({ src, duration, seed, compact }) {
  const audioRef = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const total = Number(duration) || 0

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const onTime = () => setTime(audio.currentTime)
    const onEnd = () => {
      setPlaying(false)
      setTime(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  const ratio = total > 0 ? Math.min(1, time / total) : 0
  const bars = waveBars(seed || src, compact ? 18 : 26)

  return h(
    'div',
    { className: 'iw-tape', onClick: (event) => event.stopPropagation() },
    h('audio', { ref: audioRef, src, preload: 'metadata', style: { display: 'none' } }),
    h(
      'button',
      {
        type: 'button',
        className: 'iw-tape-play',
        onClick: toggle,
        'aria-label': playing ? T('pause') : T('play'),
      },
      h(Icon, { name: playing ? 'pause' : 'play', size: 12 }),
    ),
    h(
      'div',
      { className: 'iw-tape-wave', 'aria-hidden': true },
      bars.map((height, index) => h('i', {
        key: index,
        className: index / bars.length <= ratio ? 'is-played' : '',
        style: { height },
      })),
    ),
    h('span', { className: 'iw-tape-time' }, fmtDuration(total || (audioRef.current && audioRef.current.duration) || 0)),
  )
}

/** A video attachment rendered with the same tape frame as a voice memo. */
function VideoTape({ item, onOpen }) {
  return h(
    'div',
    {
      className: 'iw-tape',
      role: onOpen ? 'button' : undefined,
      tabIndex: onOpen ? 0 : undefined,
      onClick: onOpen ? (event) => { event.stopPropagation(); onOpen() } : (event) => event.stopPropagation(),
      onKeyDown: onOpen
        ? (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen()
            }
          }
        : undefined,
      style: onOpen ? { cursor: 'pointer' } : undefined,
    },
    h('span', { className: 'iw-tape-play' }, h(Icon, { name: 'play', size: 12 })),
    h('span', { style: { flex: 1 } }),
    item.duration ? h('span', { className: 'iw-tape-time' }, fmtDuration(item.duration)) : null,
    h('span', { className: 'iw-tape-label' }, T('video')),
  )
}

function fileNameOf(item) {
  if (!item) return ''
  return item.caption || String(item.path || '').split(/[\\/]/).pop() || T('file')
}

function FileChip({ item, download }) {
  const name = fileNameOf(item)
  const link = api.mediaUrl(item.path)
  if (download) {
    return h(
      'a',
      { className: 'iw-filechip', href: link, download: name, onClick: (event) => event.stopPropagation(), title: name },
      h(Icon, { name: 'folder', size: 14 }),
      h('span', { className: 'iw-filechip-name' }, name),
      item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
    )
  }
  return h(
    'span',
    { className: 'iw-filechip', title: name },
    h(Icon, { name: 'folder', size: 14 }),
    h('span', { className: 'iw-filechip-name' }, name),
    item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
  )
}

function MediaThumb({ item, onOpen }) {
  if (!item) return null
  const src = api.mediaUrl(item.path)
  if (item.type === 'file') {
    return h(FileChip, { item })
  }
  if (item.type === 'image') {
    return h('span', { className: 'iw-thumb' }, h('img', { src, alt: item.caption || T('image') }))
  }
  if (item.type === 'video') {
    return h(
      'span',
      { className: 'iw-thumb' },
      h('video', { src, muted: true, preload: 'metadata' }),
      h('span', { className: 'iw-thumb-play' }, h(Icon, { name: 'play', size: 18 })),
      item.duration ? h('span', { className: 'iw-thumb-tag' }, fmtDuration(item.duration)) : null,
    )
  }
  return h('span', { className: 'iw-thumb', style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }, h(Icon, { name: 'mic', size: 18 }))
}

function MediaStrip({ media, onOpen }) {
  const items = Array.isArray(media) ? media : []
  if (items.length === 0) return null
  const open = onOpen || undefined
  return h(
    'div',
    { className: 'iw-media-strip' },
    items.map((item) => {
      if (item.type === 'audio') {
        return h(AudioPlayer, {
          key: item.id,
          src: api.mediaUrl(item.path),
          duration: item.duration,
          seed: item.id,
          compact: true,
        })
      }
      if (item.type === 'video') {
        return h(VideoTape, { key: item.id, item, onOpen: () => open && open(item) })
      }
      return h(
        'span',
        {
          key: item.id,
          className: item.type === 'image' ? 'iw-thumb is-previewable' : '',
          onClick: open
            ? (event) => {
                event.stopPropagation()
                open(item)
              }
            : undefined,
          style: open ? { cursor: 'zoom-in' } : undefined,
        },
        h(MediaThumb, { item }),
      )
    }),
  )
}

/* ------------------------------------------------------------------ chart */
function BarChart({ values, labels, color = 'var(--iw-accent)', muted = 'var(--iw-accent-soft-strong)', peak = -1, ymax, height = 132 }) {
  const width = 320
  const top = 8
  const bottom = 18
  const left = 24
  const right = 4
  const max = ymax || Math.max(1, ...values) * 1.2
  const plotH = height - top - bottom
  const plotW = width - left - right
  const gap = 5
  const barW = (plotW - gap * Math.max(0, values.length - 1)) / Math.max(1, values.length)
  const gridLines = [0, 0.5, 1]
  const elements = []
  gridLines.forEach((ratio, index) => {
    const y = top + plotH * (1 - ratio)
    elements.push(h('line', {
      key: `grid-${index}`,
      x1: left,
      x2: width - right,
      y1: y,
      y2: y,
      stroke: 'var(--iw-border)',
      strokeWidth: 1,
    }))
    elements.push(h('text', {
      key: `grid-label-${index}`,
      x: left - 6,
      y: y + 2.6,
      textAnchor: 'end',
      fontSize: 7,
      fill: 'var(--iw-text3)',
    }, String(Math.round(max * ratio))))
  })
  values.forEach((value, index) => {
    const barH = Math.max(1, plotH * value / max)
    const x = left + index * (barW + gap)
    const y = top + plotH - barH
    const active = peak === -1 || index === peak
    elements.push(h('rect', {
      key: `bar-${index}`,
      x,
      y,
      width: barW,
      height: barH,
      rx: Math.min(3, barW / 2),
      fill: active ? color : 'var(--iw-border-strong)',
      opacity: active ? 0.92 : 0.5,
    }))
    if (labels && labels[index]) {
      elements.push(h('text', {
        key: `label-${index}`,
        x: x + barW / 2,
        y: height - 3,
        textAnchor: 'middle',
        fontSize: 6.4,
        fill: 'var(--iw-text3)',
      }, labels[index]))
    }
  })
  return h('div', { className: 'iw-chart' }, h('svg', {
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-label': T('barChart'),
  }, elements))
}

function Donut({ segments, size = 132, stroke = 17, centerValue, centerLabel }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  let offset = 0
  const circles = []
  segments.forEach((segment, index) => {
    const ratio = segment.value / total
    const length = Math.max(0, ratio * circumference - 2)
    circles.push(h('circle', {
      key: index,
      cx: size / 2,
      cy: size / 2,
      r: radius,
      fill: 'none',
      stroke: segment.color,
      strokeWidth: stroke,
      strokeDasharray: `${length} ${circumference - length}`,
      strokeDashoffset: -offset,
      strokeLinecap: 'butt',
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
    }))
    offset += ratio * circumference
  })
  return h('div', { className: 'iw-chart' }, h('svg', {
    viewBox: `0 0 ${size} ${size}`,
    width: size,
    height: size,
    role: 'img',
    'aria-label': T('donutChart'),
  },
  h('circle', {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: 'none',
    stroke: 'var(--iw-sunken)',
    strokeWidth: stroke,
  }),
  circles,
  h('text', {
    x: size / 2,
    y: size / 2 - 1,
    textAnchor: 'middle',
    fontSize: 17,
    fontWeight: 650,
    fill: 'var(--iw-text)',
  }, centerValue || ''),
  h('text', {
    x: size / 2,
    y: size / 2 + 14,
    textAnchor: 'middle',
    fontSize: 7.2,
    fill: 'var(--iw-text3)',
  }, centerLabel || ''),
  ))
}

function HBars({ rows, max }) {
  const peak = max || Math.max(1, ...rows.map((row) => row.value))
  return h(
    'div',
    { className: 'iw-rows', style: { gap: 2 } },
    rows.map((row) => h(
      'div',
      { key: row.label, className: 'iw-row', style: { borderTop: 'none', padding: '5px 0' } },
      h('span', { className: 'iw-row-title', style: { fontSize: 10, color: 'var(--iw-text2)' } }, row.label),
      h(
        'div',
        { style: { flex: 1, height: 12, borderRadius: 6, background: 'var(--iw-sunken)', overflow: 'hidden', maxWidth: 200, minWidth: 70 } },
        h('div', { style: { width: `${Math.max(2, (row.value / peak) * 100)}%`, height: '100%', borderRadius: 6, background: row.color || 'var(--iw-accent)' } }),
      ),
      h('span', { className: 'iw-row-right', style: { minWidth: 44, textAlign: 'right', fontSize: 9.5 } }, row.display || String(row.value)),
    )),
  )
}

/* ------------------------------------------------------------------ modal */
function Modal({ children, onClose, className }) {
  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return h(
    'div',
    {
      className: 'iw-overlay',
      role: 'presentation',
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose()
      },
    },
    h('div', { className: `iw-modal${className ? ` ${className}` : ''}`, role: 'dialog', 'aria-modal': true }, children),
  )
}

function Toast({ message }) {
  if (!message) return null
  return h('div', { className: 'iw-toast', role: 'status' }, message)
}

function Loading() {
  return h('div', { className: 'iw-center' }, h('span', { className: 'iw-spinner' }), h('span', null, T('loading')))
}

/* ------------------------------------------------------------ attachments */
/** Classify a dropped/picked File into the wall's media kinds. */
function mediaKindOf(file) {
  const type = String((file && file.type) || '')
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if (type.startsWith('audio/')) return 'audio'
  return 'file'
}

function hasFileDrag(event) {
  const transfer = event && event.dataTransfer
  if (!transfer) return false
  const types = Array.from(transfer.types || [])
  return types.includes('Files')
}

/**
 * Drag-and-drop capture for a region: returns the drag flag plus the handlers
 * to spread on the target element. Depth counting keeps the overlay stable
 * while the pointer crosses child nodes.
 */
function useAttachDrop(onFiles) {
  const [dragging, setDragging] = React.useState(false)
  const depth = React.useRef(0)

  const reset = () => {
    depth.current = 0
    setDragging(false)
  }

  const dropProps = {
    onDragEnter: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      depth.current += 1
      setDragging(true)
    },
    onDragOver: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave: (event) => {
      if (!hasFileDrag(event)) return
      depth.current = Math.max(0, depth.current - 1)
      if (depth.current === 0) setDragging(false)
    },
    onDrop: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      reset()
      const files = Array.from((event.dataTransfer && event.dataTransfer.files) || [])
      if (files.length) onFiles(files)
    },
  }

  return { dragging, dropProps }
}

function DropOverlay({ hint }) {
  return h(
    'div',
    { className: 'iw-drop-overlay' },
    h('span', { className: 'iw-drop-overlay-icon' }, h(Icon, { name: 'plus', size: 20, stroke: 2 })),
    h('span', { className: 'iw-drop-overlay-title' }, hint || T('dropHint')),
    h('span', { className: 'iw-drop-overlay-sub' }, T('dropFormats')),
  )
}

/* ------------------------------------------------------------ context menu */
const CONTEXT_MENU_WIDTH = 200
const CONTEXT_MENU_ITEM_HEIGHT = 30

function ContextMenu({ x, y, title, items, onClose }) {
  const ref = React.useRef(null)
  const [pos, setPos] = React.useState({ left: x, top: y })

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const left = Math.min(x, window.innerWidth - rect.width - 8)
    const top = Math.min(y, window.innerHeight - rect.height - 8)
    setPos({ left: Math.max(8, left), top: Math.max(8, top) })
  }, [x, y])

  React.useEffect(() => {
    const close = () => onClose()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [onClose])

  return h(
    'div',
    {
      ref,
      className: 'iw-ctx',
      role: 'menu',
      style: { left: pos.left, top: pos.top },
      onMouseDown: (event) => event.stopPropagation(),
      onContextMenu: (event) => event.preventDefault(),
    },
    title ? h('div', { className: 'iw-ctx-title' }, title) : null,
    items.filter(Boolean).map((item, index) => (item.separator
      ? h('div', { key: `sep-${index}`, className: 'iw-ctx-sep' })
      : h(
          'button',
          {
            key: item.key || item.label,
            type: 'button',
            className: `iw-ctx-item${item.danger ? ' is-danger' : ''}`,
            disabled: item.disabled,
            onClick: () => {
              onClose()
              if (typeof item.onSelect === 'function') item.onSelect()
            },
          },
          item.icon ? h(Icon, { name: item.icon, size: 13 }) : null,
          h('span', null, item.label),
        ))),
  )
}

/* --------------------------------------------------------------- lightbox */
function Lightbox({ item, onClose, onOpenWith }) {
  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null
  const source = api.mediaUrl(item.path)
  const name = fileNameOf(item)
  let body
  if (item.type === 'image') {
    body = h('img', { src: source, alt: name })
  } else if (item.type === 'video') {
    body = h('video', { src: source, controls: true, autoPlay: true })
  } else if (item.type === 'audio') {
    body = h(AudioPlayer, { src: source, duration: item.duration, seed: item.id })
  } else {
    body = h(
      'div',
      { className: 'iw-lightbox-file' },
      h(Icon, { name: 'folder', size: 34, stroke: 1.2 }),
      h('span', { style: { fontSize: 13, fontWeight: 600 } }, name),
      h('span', { style: { fontSize: 10.5, opacity: .7 } }, [fmtBytes(item.size), item.mime].filter(Boolean).join(' · ')),
      h(
        'button',
        { type: 'button', className: 'iw-lightbox-btn', onClick: () => onOpenWith && onOpenWith(item) },
        h(Icon, { name: 'arrowUpRight', size: 13 }),
        h('span', null, T('openWith')),
      ),
    )
  }

  return h(
    'div',
    {
      className: 'iw-lightbox',
      role: 'presentation',
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose()
      },
    },
    h(
      'div',
      { className: 'iw-lightbox-inner' },
      h(
        'div',
        { className: 'iw-lightbox-bar' },
        h('span', { className: 'iw-lightbox-title' }, name),
        h(
          'span',
          { className: 'iw-lightbox-actions' },
          h('button', { type: 'button', className: 'iw-lightbox-btn', onClick: () => onOpenWith && onOpenWith(item) },
            h(Icon, { name: 'arrowUpRight', size: 13 }), h('span', null, T('openWith'))),
          h('button', { type: 'button', className: 'iw-lightbox-btn', onClick: onClose, 'aria-label': T('close') },
            h(Icon, { name: 'close', size: 13 }), h('span', null, T('close'))),
        ),
      ),
      h('div', { className: 'iw-lightbox-body' }, body),
    ),
  )
}

/* --------------------------------------------------------- expected date */
function ExpectField({ value, onChange, hint }) {
  const state = expectedState({ expectedAt: value })
  const boxClass = `iw-expect-box${value ? '' : ' is-empty'}`
  return h(
    'div',
    { className: 'iw-field iw-expect' },
    h('span', { className: 'iw-field-label', style: { color: 'var(--iw-accent)', fontWeight: 600 } }, T('expectedDate')),
    h(
      'div',
      { className: boxClass },
      h(Icon, { name: 'calendar', size: 14 }),
      h('input', {
        type: 'date',
        value: dayInputValue(value),
        onChange: (event) => onChange(event.target.value ? toIso(`${event.target.value}T18:00`).slice(0, 10) : ''),
        'aria-label': T('expectedDate'),
      }),
      value
        ? h('button', {
            type: 'button',
            className: 'iw-expect-clear',
            onClick: () => onChange(''),
            title: T('expectedClear'),
            'aria-label': T('expectedClear'),
          }, h(Icon, { name: 'close', size: 12 }))
        : null,
    ),
    h(
      'span',
      { className: `iw-expect-hint${state === 'overdue' ? ' is-overdue' : (state === 'soon' || state === 'today') ? ' is-soon' : ''}` },
      hint || (value ? expectedLabel({ expectedAt: value }) : T('expectedDateHint')),
    ),
  )
}

/* ================= 30-wall.js ================= */
/* --------------------------------------------------------------- wall page */

/** Display-only grouping of the cards into three masonry columns. */
function estimateNoteHeight(note) {
  let height = 132
  const text = String(note.summary || note.body || '')
  height += Math.min(2, Math.max(1, Math.ceil(text.length / 24))) * 22
  const media = Array.isArray(note.media) ? note.media : []
  if (media.some((item) => item.type === 'audio' || item.type === 'video')) height += 70
  if (media.some((item) => item.type === 'image')) height += 64
  if (media.some((item) => item.type === 'file')) height += 64
  if (noteRecords(note).length) height += 26
  return height
}

function layoutColumns(notes) {
  const columns = [[], [], []]
  const heights = [0, 0, 0]
  for (const note of notes) {
    let target = 0
    for (let index = 1; index < heights.length; index += 1) {
      if (heights[index] < heights[target]) target = index
    }
    columns[target].push(note)
    heights[target] += estimateNoteHeight(note) + 16
  }
  return columns
}

function sortNotes(notes, sort) {
  const list = [...notes]
  if (sort === 'stars') {
    list.sort((left, right) => (right.stars - left.stars) || (asDate(right.createdAt) - asDate(left.createdAt)))
  } else {
    list.sort((left, right) => asDate(right.createdAt) - asDate(left.createdAt))
  }
  return list
}

function matchQuery(note, query) {
  if (!query) return true
  const haystack = [
    note.title,
    note.body,
    note.summary,
    ...(note.tags || []),
    ...(note.media || []).map((item) => item.transcript),
    ...noteRecords(note).map((record) => record.text),
  ].join(' ').toLowerCase()
  return haystack.includes(query.toLowerCase())
}

/* --------------------------------------------------------- appearance menu */
function Appearance({ palette, onChange, onSettings }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return h(
    'div',
    { className: 'iw-appearance', ref },
    h(
      'button',
      {
        type: 'button',
        className: `iw-appearance-btn${open ? ' is-on' : ''}`,
        title: T('appearance'),
        'aria-label': T('appearance'),
        'aria-expanded': open,
        onClick: () => setOpen((value) => !value),
      },
      h(Icon, { name: 'sun', size: 17 }),
    ),
    open
      ? h(
          'div',
          { className: 'iw-popover', role: 'menu' },
          h('div', { className: 'iw-popover-label' }, T('paletteLabel')),
          PALETTE_VISIBLE.map((id) => h(
            'button',
            {
              key: id,
              type: 'button',
              role: 'menuitemradio',
              'aria-checked': palette === id,
              className: `iw-palette-row${palette === id ? ' is-on' : ''}`,
              onClick: () => {
                onChange(id)
                setOpen(false)
              },
            },
            h('span', { className: 'iw-palette-dot', style: { background: PALETTES[id].dot } }),
            h('span', { style: { flex: 1 } }, T(PALETTE_KEYS[id])),
            palette === id ? h(Icon, { name: 'check', size: 13 }) : null,
          )),
          h('div', { className: 'iw-popover-sep' }),
          h(
            'button',
            {
              type: 'button',
              role: 'menuitem',
              className: 'iw-palette-row',
              onClick: () => {
                setOpen(false)
                onSettings()
              },
            },
            h(Icon, { name: 'gear', size: 14 }),
            h('span', null, T('settings')),
          ),
        )
      : null,
  )
}

/* -------------------------------------------------------------------- card */
function WallCard({ note, onOpen, onSummary }) {
  const interval = relativeInterval(note)
  const records = noteRecords(note)
  const latest = records[0]
  const implemented = noteIsImplemented(note)
  const state = expectedState(note)
  return h(
    'article',
    {
      className: 'iw-card',
      role: 'button',
      tabIndex: 0,
      onClick: () => onOpen(note.id),
      onKeyDown: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(note.id)
        }
      },
    },
    h(
      'div',
      { className: 'iw-card-top' },
      h(
        'span',
        { className: 'iw-card-date' },
        fmtDayMonth(note.createdAt),
        ' ',
        h('span', { className: 'iw-num' }, fmtClock(note.createdAt)),
      ),
      h('span', { className: 'iw-score', title: T('scoreLabel', { value: scoreText(note) }) }, scoreText(note)),
    ),
    h('h3', { className: 'iw-card-title' }, noteTitle(note)),
    note.summary
      ? h(
          'div',
          { className: 'iw-card-summary-wrap' },
          h(
            'span',
            {
              className: 'iw-card-summary-label',
              onClick: (event) => {
                event.stopPropagation()
                onSummary(note.id)
              },
            },
            h(Icon, { name: 'sparkle', size: 11 }),
            h('span', null, T('summaryLabel')),
          ),
          h('p', { className: 'iw-card-summary' }, note.summary),
        )
      : (note.body ? h('p', { className: 'iw-card-body' }, note.body) : null),
    note.media && note.media.length
      ? h(MediaStrip, {
          media: note.media,
          onOpen: () => onOpen(note.id),
        })
      : null,
    latest
      ? h(
          'div',
          { className: 'iw-review-mini' },
          h(
            'div',
            { className: 'iw-timeline-head' },
            h('span', { className: 'iw-timeline-kind' }, T('recordKindProgress')),
            h('span', null, '·'),
            h('span', null, fmtRel(latest.createdAt)),
          ),
        )
      : null,
    h(
      'div',
      { className: 'iw-card-foot' },
      h(CatChip, { category: note.category }),
      note.expectedAt && !implemented
        ? h(
            'span',
            { className: `iw-expect-chip${state ? ` is-${state}` : ''}` },
            h(Icon, { name: 'calendar', size: 13 }),
            h('span', { className: 'iw-num' }, expectedLabel(note)),
          )
        : null,
      h(
        'span',
        { className: 'iw-card-meta' },
        implemented && interval !== null
          ? h('span', { className: 'iw-num' }, T('daysToDemo', { days: interval }))
          : (records.length ? h('span', { className: 'iw-num' }, T('recordsCount', { count: records.length })) : null),
      ),
    ),
  )
}

/** Wrap every numeric run of a template in a mono node — display only. */
function richNumbers(template, tagName, className) {
  return String(template)
    .split(/(\d+(?:[.,]\d+)?)/g)
    .filter((chunk) => chunk !== '')
    .map((chunk, index) => (
      /^\d+(?:[.,]\d+)?$/.test(chunk)
        ? h(tagName, { key: `n${index}`, className }, chunk)
        : chunk
    ))
}

function weekSpans(template) {
  return richNumbers(template, 'b')
}

function wallSummary(notes) {
  const weekStartTime = startOfWeek(new Date()).getTime()
  const week = notes.filter((note) => asDate(note.createdAt).getTime() >= weekStartTime)
  const implemented = week.filter((note) => {
    const record = completionRecord(note)
    return record !== null && asDate(record.implementedAt).getTime() >= weekStartTime
  })
  const intervals = notes.map(relativeInterval).filter((value) => value !== null)
  const average = intervals.length
    ? (intervals.reduce((sum, value) => sum + value, 0) / intervals.length).toFixed(1)
    : '—'
  return { created: week.length, implemented: implemented.length, average }
}

function WeekCard({ summary, onInsights }) {
  const template = T('weekReviewText', { created: summary.created, implemented: summary.implemented, average: summary.average })
  return h(
    'section',
    { className: 'iw-week' },
    h('div', { className: 'iw-week-head' }, h(Icon, { name: 'clock', size: 15 }), h('span', null, T('weekReview'))),
    h('p', { className: 'iw-week-text' }, weekSpans(template)),
    h('button', { type: 'button', className: 'iw-week-link', onClick: onInsights }, `${T('viewInsights')} →`),
  )
}

/* -------------------------------------------------------------------- page */
function WallPage({ store, snap, onRecord, onInsights }) {
  const { notes, settings, ui } = snap
  const [sort, setSort] = React.useState(ui.sort || 'date')
  const [category, setCategory] = React.useState(ui.category || '全部')
  const [query, setQuery] = React.useState(ui.query || '')
  const palette = settings.palette || 'paper'

  const counts = React.useMemo(() => {
    const result = { 全部: notes.length }
    for (const name of CATEGORIES) result[name] = 0
    for (const note of notes) {
      if (result[note.category] !== undefined) result[note.category] += 1
    }
    return result
  }, [notes])

  const filtered = React.useMemo(
    () => sortNotes(notes.filter((note) => (category === '全部' || note.category === category) && matchQuery(note, query)), sort),
    [notes, category, query, sort],
  )

  const summary = React.useMemo(() => wallSummary(notes), [notes])
  const implementedCount = notes.filter(noteIsImplemented).length

  const setPalette = (next) => {
    store.applyPalette(next)
  }

  const columns = React.useMemo(() => layoutColumns(filtered), [filtered])

  return h(
    'div',
    { className: 'iw-page' },
    h(
      'header',
      { className: 'iw-head' },
      h(
        'div',
        null,
        h('h1', { className: 'iw-title' }, T('wall')),
        h(
          'p',
          { className: 'iw-subtitle' },
          richNumbers(T('wallSub', { total: notes.length, implemented: implementedCount }), 'span', 'iw-num'),
        ),
      ),
      h(
        'div',
        { className: 'iw-head-actions' },
        h(
          'label',
          { className: 'iw-search' },
          h(Icon, { name: 'search', size: 14 }),
          h('input', {
            value: query,
            placeholder: T('search'),
            onChange: (event) => setQuery(event.target.value),
            'aria-label': T('search'),
          }),
        ),
        h(Appearance, {
          palette,
          onChange: setPalette,
          onSettings: () => store.setUi({ settingsOpen: true }),
        }),
        h(Btn, { variant: 'primary', icon: 'plus', onClick: onRecord }, T('record')),
      ),
    ),
    h(
      'div',
      { className: 'iw-toolbar' },
      h(Segmented, {
        value: sort,
        options: [{ value: 'date', label: T('sortDate') }, { value: 'stars', label: T('sortStars') }],
        onChange: (value) => {
          setSort(value)
          store.setUi({ sort: value })
        },
      }),
      ['全部', ...CATEGORIES].map((name) => h(
        'button',
        {
          key: name,
          type: 'button',
          className: `iw-chip${category === name ? ' is-on' : ''}`,
          onClick: () => {
            setCategory(name)
            store.setUi({ category: name })
          },
        },
        name === '全部' ? T('all') : catLabel(name),
        h('span', { className: 'iw-count' }, String(counts[name] || 0)),
      )),
      h('span', { className: 'iw-spacer' }),
      h(Btn, { size: 'sm', icon: 'arrowUpRight', onClick: onInsights }, T('insights')),
    ),
    filtered.length
      ? h(
          'div',
          { className: 'iw-grid' },
          columns.map((column, index) => h(
            'div',
            { key: `col-${index}`, className: 'iw-col' },
            column.map((note) => h(WallCard, {
              key: note.id,
              note,
              onOpen: (id) => store.setUi({ detailId: id }),
              onSummary: (id) => store.setUi({ detailId: id }),
            })),
            index === columns.length - 1 && notes.length
              ? h(WeekCard, { key: 'week', summary, onInsights })
              : null,
          )),
        )
      : h(
          'div',
          { className: 'iw-empty' },
          h(Icon, { name: 'sparkle', size: 24, stroke: 0 }),
          h('span', { className: 'iw-empty-title' }, query || category !== '全部' ? T('noMatch') : T('empty')),
          h('span', null, T('emptyHint')),
          h(Btn, { variant: 'primary', icon: 'plus', onClick: onRecord }, T('record')),
        ),
  )
}

/* ================= 40-compose.js ================= */
/* --------------------------------------------------------------- compose */
function fileExtension(name) {
  const match = String(name || '').match(/\.([A-Za-z0-9]{1,8})$/)
  return match ? match[1].toLowerCase() : 'bin'
}

function safeFileName(base, extension) {
  return `${String(base).replace(/[^A-Za-z0-9_-]/g, '_')}.${extension.replace(/[^a-z0-9]/g, '')}`
}

function encodeBase64(bytes) {
  let binary = ''
  const chunk = 0x8000
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(index, index + chunk))
  }
  return btoa(binary)
}

function encodeWav(samples, sampleRate) {
  const bytesPerSample = 2
  const dataSize = samples.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)
  const writeString = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) view.setUint8(offset + index, text.charCodeAt(index))
  }
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * bytesPerSample, true)
  view.setUint16(32, bytesPerSample, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)
  let offset = 44
  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]))
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
    offset += 2
  }
  return new Uint8Array(buffer)
}

async function blobToWavBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer()
  const AudioCtor = window.AudioContext || window.webkitAudioContext
  if (!AudioCtor) throw new Error(T('recorderUnavailable'))
  const context = new AudioCtor()
  let decoded
  try {
    decoded = await context.decodeAudioData(arrayBuffer.slice(0))
  } finally {
    context.close().catch(() => {})
  }
  const targetRate = 16000
  const length = Math.max(1, Math.ceil(decoded.duration * targetRate))
  const OfflineCtor = window.OfflineAudioContext || window.webkitOfflineAudioContext
  const offline = new OfflineCtor(1, length, targetRate)
  const source = offline.createBufferSource()
  source.buffer = decoded
  source.connect(offline.destination)
  source.start(0)
  const rendered = await offline.startRendering()
  return encodeBase64(encodeWav(rendered.getChannelData(0), targetRate))
}

function nowLocalInput() {
  const date = new Date()
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function toIso(localValue) {
  if (!localValue) return new Date().toISOString()
  const date = new Date(localValue)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

const MEDIA_LIMITS = { image: 12 * 1024 * 1024, video: 80 * 1024 * 1024, audio: 30 * 1024 * 1024, file: 50 * 1024 * 1024 }

function ComposeModal({ store, snap, noteId, onClose }) {
  const existing = noteId ? (snap.notes || []).find((item) => item.id === noteId) : null
  const settings = snap.settings
  const [draft, setDraft] = React.useState(() => existing
    ? JSON.parse(JSON.stringify(existing))
    : {
        id: uid('n'),
        title: '',
        body: '',
        summary: '',
        category: '未开始',
        stars: 3,
        tags: [],
        createdAt: new Date().toISOString(),
        expectedAt: '',
        updatedAt: new Date().toISOString(),
        media: [],
        records: [],
      })
  const [tagText, setTagText] = React.useState(existing ? (existing.tags || []).join(', ') : '')
  const [when, setWhen] = React.useState(() => {
    const date = new Date(existing ? existing.createdAt : Date.now())
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return local.toISOString().slice(0, 16)
  })
  const [busy, setBusy] = React.useState(false)
  const [uploading, setUploading] = React.useState(0)
  const [error, setError] = React.useState('')
  const [recording, setRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [transcribing, setTranscribing] = React.useState({})
  const [transcriptError, setTranscriptError] = React.useState('')
  // True while the summary is machine-generated: editing the transcript then
  // keeps it in sync; typing a summary by hand pins it.
  const [summaryAuto, setSummaryAuto] = React.useState(false)

  const recorderRef = React.useRef(null)
  const streamRef = React.useRef(null)
  const timerRef = React.useRef(0)
  const imageInputRef = React.useRef(null)
  const videoInputRef = React.useRef(null)
  const fileInputRef = React.useRef(null)

  React.useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop())
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
  }, [])

  const patch = (next) => setDraft((previous) => ({ ...previous, ...next }))
  const canSave = !busy && (draft.title.trim() || draft.body.trim() || draft.summary.trim() || draft.media.length > 0)

  const uploadBlob = async (blob, name) => {
    setUploading((value) => value + 1)
    try {
      return await api.upload(blob, name)
    } finally {
      setUploading((value) => Math.max(0, value - 1))
    }
  }

  const addFile = async (file, kind) => {
    setError('')
    if (!file) return
    const limit = MEDIA_LIMITS[kind] || MEDIA_LIMITS.file
    if (file.size > limit) {
      setError(`${T('fileTooLarge')}（${file.name}）`)
      return
    }
    try {
      const extension = fileExtension(file.name)
      const uploaded = await uploadBlob(file, safeFileName(`${draft.id}_${Date.now()}`, extension))
      const media = {
        id: uid('m'),
        type: kind,
        path: uploaded.path,
        mime: uploaded.mime,
        duration: 0,
        size: file.size,
        caption: file.name.slice(0, 120),
        transcript: '',
      }
      setDraft((previous) => ({ ...previous, media: [...previous.media, media] }))
    } catch (uploadError) {
      setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
    }
  }

  /** One entry point for both the pickers and a drag-and-drop. */
  const addFiles = async (files) => {
    for (const file of files) await addFile(file, mediaKindOf(file))
  }

  const { dragging, dropProps } = useAttachDrop(addFiles)

  const onPickImages = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, 'image')
  }

  const onPickVideos = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, 'video')
  }

  const onPickFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, mediaKindOf(file))
  }

  const startRecording = async () => {
    setError('')
    setTranscriptError('')
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(T('noMicrophone'))
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks = []
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size) chunks.push(event.data)
      }
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        const duration = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
        try {
          const uploaded = await uploadBlob(blob, safeFileName(`${draft.id}_${Date.now()}`, 'webm'))
          const media = {
            id: uid('m'),
            type: 'audio',
            path: uploaded.path,
            mime: uploaded.mime || 'audio/webm',
            duration,
            size: blob.size,
            caption: T('voiceMemo'),
            transcript: '',
            blob,
          }
          setDraft((previous) => ({ ...previous, media: [...previous.media, media] }))
          if (settings.transcribe) transcribeMedia(media.id, blob)
        } catch (uploadError) {
          setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
        }
      }
      const startedAt = Date.now()
      recorderRef.current = recorder
      streamRef.current = stream
      setRecording(true)
      setSeconds(0)
      timerRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - startedAt) / 1000)
        setSeconds(elapsed)
        if (elapsed >= MAX_AUDIO_SECONDS) stopRecording()
      }, 400)
      recorder.start()
    } catch (recordError) {
      setError(String(recordError && recordError.message ? recordError.message : recordError))
    }
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = 0
    }
    setRecording(false)
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive') recorder.stop()
  }

  /**
   * Speech → text. The transcript is the voice clip's own detail box (editable,
   * never written back to the audio), and the note summary is a SEPARATE,
   * compressed line produced locally by `summarizeText` — the two must never be
   * the same full paragraph.
   */
  const transcribeMedia = async (mediaId, blob) => {
    setTranscribing((previous) => ({ ...previous, [mediaId]: 'running' }))
    setTranscriptError('')
    try {
      const base64 = await blobToWavBase64(blob)
      const transcript = await store.transcribe(base64, settings.language || 'zh')
      const text = (typeof transcript === 'string' ? transcript : (transcript && transcript.text) || '').trim()
      if (!text) {
        setTranscribing((previous) => ({ ...previous, [mediaId]: 'empty' }))
        return
      }
      const keepTyped = Boolean(draft.summary && draft.summary.trim() && !summaryAuto)
      setDraft((previous) => {
        const media = previous.media.map((item) => (item.id === mediaId ? { ...item, transcript: text } : item))
        const summary = keepTyped ? previous.summary : summarizeText(text)
        return { ...previous, media, summary }
      })
      if (!keepTyped) setSummaryAuto(true)
      setTranscribing((previous) => ({ ...previous, [mediaId]: 'done' }))
    } catch (transcribeError) {
      setTranscribing((previous) => ({ ...previous, [mediaId]: 'error' }))
      setTranscriptError(String(transcribeError && transcribeError.message ? transcribeError.message : transcribeError))
    }
  }

  const retryTranscribe = async (item) => {
    if (item.blob) {
      await transcribeMedia(item.id, item.blob)
      return
    }
    try {
      setTranscribing((previous) => ({ ...previous, [item.id]: 'running' }))
      const response = await fetch(api.mediaUrl(item.path))
      const blob = await response.blob()
      await transcribeMedia(item.id, blob)
    } catch (retryError) {
      setTranscribing((previous) => ({ ...previous, [item.id]: 'error' }))
      setTranscriptError(String(retryError && retryError.message ? retryError.message : retryError))
    }
  }

  /**
   * Editing the transcript only changes the text box: the recording itself is
   * never re-encoded or replaced. An auto summary follows the edit; a summary
   * the user typed is left alone.
   */
  const updateTranscript = (mediaId, text) => {
    setDraft((previous) => {
      const media = previous.media.map((item) => (item.id === mediaId ? { ...item, transcript: text } : item))
      const summary = summaryAuto ? summarizeText(text) : previous.summary
      return { ...previous, media, summary }
    })
  }

  const regenSummary = (item) => {
    const source = (item && item.transcript) || ''
    setSummaryAuto(true)
    patch({ summary: summarizeText(source) })
  }

  const removeMedia = (mediaId) => {
    setDraft((previous) => ({ ...previous, media: previous.media.filter((item) => item.id !== mediaId) }))
  }

  const save = async () => {
    if (!canSave) return
    setBusy(true)
    setError('')
    try {
      const tags = tagText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 12)
      const payload = {
        ...draft,
        title: draft.title.trim() || T('untitled'),
        body: draft.body.trim(),
        summary: draft.summary.trim(),
        tags,
        createdAt: toIso(when),
        expectedAt: draft.expectedAt || '',
        media: draft.media.map(({ blob, ...rest }) => rest),
      }
      await store.saveNote(payload)
    } catch (saveError) {
      setError(String(saveError && saveError.message ? saveError.message : saveError))
      setBusy(false)
    }
  }

  const audioItems = draft.media.filter((item) => item.type === 'audio')
  const otherItems = draft.media.filter((item) => item.type !== 'audio')

  return h(
    Modal,
    { onClose, className: 'iw-modal-md' },
    h(
      'div',
      { className: 'iw-drop-wrap', ...dropProps },
      h(
        'div',
        { className: 'iw-modal-head' },
        h('h2', { className: 'iw-modal-title' }, existing ? T('editRecord') : T('record')),
        h(
          'div',
          { className: 'iw-btn-row' },
          h('span', { className: 'iw-modal-date' }, fmtDateTime(draft.createdAt)),
          h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
        ),
      ),
      h('input', {
        className: 'iw-input iw-title-input',
        value: draft.title,
        placeholder: T('titlePlaceholder'),
        onChange: (event) => patch({ title: event.target.value }),
        'aria-label': T('titleLabel'),
      }),
      h('textarea', {
        className: 'iw-textarea',
        style: { marginTop: 12, minHeight: 96, border: 'none' },
        value: draft.body,
        placeholder: T('bodyPlaceholder'),
        onChange: (event) => patch({ body: event.target.value }),
        'aria-label': T('bodyLabel'),
      }),
      h(
        'div',
        { className: 'iw-attach-row' },
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: recording ? stopRecording : startRecording },
          h(Icon, { name: 'mic', size: 14 }),
          recording ? `${T('stopRecording')} ${fmtDuration(seconds)}` : T('voice')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => imageInputRef.current && imageInputRef.current.click() },
          h(Icon, { name: 'image', size: 14 }), T('image')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => videoInputRef.current && videoInputRef.current.click() },
          h(Icon, { name: 'video', size: 14 }), T('video')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => fileInputRef.current && fileInputRef.current.click() },
          h(Icon, { name: 'folder', size: 14 }), T('fileUpload')),
        recording
          ? h('span', { className: 'iw-recording' }, h('i', { className: 'iw-rec-dot' }), T('recordingHint'))
          : h('span', { className: 'iw-small iw-muted' }, T('dropOrPick')),
      ),
      h('input', { ref: imageInputRef, type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' }, onChange: onPickImages }),
      h('input', { ref: videoInputRef, type: 'file', accept: 'video/*', multiple: true, style: { display: 'none' }, onChange: onPickVideos }),
      h('input', { ref: fileInputRef, type: 'file', multiple: true, style: { display: 'none' }, onChange: onPickFiles }),
      audioItems.length
        ? h(
            'div',
            { style: { display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginTop: 12 } },
            audioItems.map((item) => h(
              'div',
              { key: item.id, className: 'iw-voice' },
              h(
                'div',
                { className: 'iw-voice-head' },
                h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id, compact: true }),
                h('button', {
                  type: 'button',
                  className: 'iw-link',
                  onClick: () => retryTranscribe(item),
                  disabled: transcribing[item.id] === 'running',
                }, transcribing[item.id] === 'running'
                  ? T('transcribing')
                  : (item.transcript ? T('retranscribe') : T('transcribe'))),
                h(IconBtn, { name: 'trash', size: 13, title: T('remove'), onClick: () => removeMedia(item.id) }),
              ),
              h(
                'div',
                { className: 'iw-voice-label' },
                h(Icon, { name: 'mic', size: 11 }),
                h('span', null, T('voiceContent')),
                h('span', { className: 'iw-voice-note' }, T('voiceContentHint')),
              ),
              h('textarea', {
                className: 'iw-textarea iw-voice-text',
                value: item.transcript,
                placeholder: T('voiceContentPlaceholder'),
                onChange: (event) => updateTranscript(item.id, event.target.value),
              }),
              item.transcript
                ? h(
                    'div',
                    { className: 'iw-voice-actions' },
                    h('button', {
                      type: 'button',
                      className: 'iw-link',
                      onClick: () => regenSummary(item),
                    }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('regenSummary'))),
                    h('span', { className: 'iw-voice-note' }, T('voiceLocalNote')),
                  )
                : null,
            )),
          )
        : null,
      otherItems.length
        ? h(
            'div',
            { className: 'iw-file-list' },
            otherItems.map((item) => h(
              'div',
              { key: item.id, className: 'iw-file' },
              h('button', { type: 'button', className: 'iw-file-remove', onClick: () => removeMedia(item.id), 'aria-label': T('remove') }, h(Icon, { name: 'close', size: 11 })),
              item.type === 'image' || item.type === 'video'
                ? h(MediaThumb, { item })
                : h('div', { className: 'iw-filechip', style: { maxWidth: '100%' } }, h(Icon, { name: 'folder', size: 14 }), h('span', { className: 'iw-filechip-name' }, item.caption || T('file'))),
              h('div', { style: { marginTop: 6, fontSize: 9.5, color: 'var(--iw-text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                item.type === 'file' ? `${item.caption || T('file')} · ${fmtBytes(item.size)}` : (item.caption || T(item.type))),
            )),
          )
        : null,
      h(
        'div',
        { className: 'iw-summary-box iw-summary' },
        h(
          'div',
          { className: 'iw-summary-head' },
          h('span', { className: 'iw-summary-title' }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('summaryLabel'))),
          h('span', { className: 'iw-small iw-muted' }, summaryAuto ? T('summaryAutoHint') : T('summaryCardHint')),
        ),
        h('textarea', {
          className: 'iw-textarea',
          style: { minHeight: 62 },
          value: draft.summary,
          placeholder: T('summaryPlaceholder'),
          onChange: (event) => {
            setSummaryAuto(false)
            patch({ summary: event.target.value })
          },
        }),
        h(
          'div',
          { className: 'iw-voice-actions', style: { marginTop: 8 } },
          audioItems.length
            ? h('button', {
                type: 'button',
                className: 'iw-link',
                disabled: !audioItems.some((item) => item.transcript),
                onClick: () => regenSummary(audioItems.find((item) => item.transcript) || audioItems[0]),
              }, h(Icon, { name: 'refresh', size: 11 }), h('span', null, T('regenSummary')))
            : null,
          h('span', { className: 'iw-voice-note' }, T('summaryLocalNote')),
        ),
      ),
      transcriptError ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, transcriptError) : null,
      h(
        'div',
        { className: 'iw-section' },
        h(
          'div',
          { className: 'iw-field' },
          h('span', { className: 'iw-field-label' }, T('category')),
          h('div', { className: 'iw-inline', style: { marginTop: 2 } },
            CATEGORIES.map((name) => h('button', {
              key: name,
              type: 'button',
              className: `iw-chip${draft.category === name ? ' is-on' : ''}`,
              onClick: () => patch({ category: name }),
            }, catLabel(name)))),
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, flexWrap: 'wrap' } },
          h('div', { className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, T('stars')),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              h(Stars, { value: draft.stars, size: 18, gap: 3, onChange: (value) => patch({ stars: value }) }),
              h('span', { className: 'iw-small iw-muted' }, T(STAR_LABEL[draft.stars])))),
          h('div', { className: 'iw-field', style: { flex: 1, minWidth: 180 } },
            h('span', { className: 'iw-field-label' }, T('tags')),
            h('input', {
              className: 'iw-input',
              value: tagText,
              placeholder: T('tagsPlaceholder'),
              onChange: (event) => setTagText(event.target.value),
            })),
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'flex-start', gap: 18, marginTop: 16, flexWrap: 'wrap' } },
          h('div', { className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, T('recordTime')),
            h('input', {
              className: 'iw-input',
              type: 'datetime-local',
              value: when,
              onChange: (event) => setWhen(event.target.value),
              style: { width: 200 },
            }),
            h('span', { className: 'iw-expect-hint' }, T('recordTimeHint'))),
          h(ExpectField, { value: draft.expectedAt, onChange: (value) => patch({ expectedAt: value }) }),
        ),
      ),
      error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 12 } }, error) : null,
      h(
        'div',
        { className: 'iw-modal-foot' },
        h(
          'span',
          { className: 'iw-hint' },
          uploading ? T('uploading') : T('saveHint'),
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', onClick: onClose, disabled: busy }, T('cancel')),
          h(Btn, { variant: 'primary', onClick: save, disabled: !canSave || uploading > 0 }, busy ? T('saving') : (existing ? T('saveChanges') : T('save'))),
        ),
      ),
      dragging ? h(DropOverlay) : null,
    ),
  )
}

/* ================= 45-detail.js ================= */
/* ---------------------------------------------------------------- detail */
const MORE_CATEGORIES = ['已放弃']

const attachmentKindLabel = (item) => {
  const type = String((item && item.type) || '')
  if (type === 'image') return T('image')
  if (type === 'video') return T('video')
  if (type === 'audio') return T('audio')
  return T('file')
}

/** One place for the "open this attachment some other way" menu. */
function attachmentMenuItems(item, handlers) {
  return [
    { key: 'preview', icon: 'eye', label: T('preview'), onSelect: () => handlers.preview(item) },
    {
      key: 'browser',
      icon: 'arrowUpRight',
      label: T('openInBrowser'),
      onSelect: () => handlers.browser(item),
    },
    { separator: true },
    { key: 'open', icon: 'folder', label: T('openWith'), onSelect: () => handlers.run(item, 'open') },
    { key: 'reveal', icon: 'search', label: T('revealInFolder'), onSelect: () => handlers.run(item, 'reveal') },
    { key: 'copy', icon: 'link', label: T('copyPath'), onSelect: () => handlers.copy(item) },
  ]
}

function Attachment({ item, onPreview, onMenu, children, style }) {
  return h(
    'div',
    {
      className: 'iw-attach-item is-previewable',
      style,
      title: T('attachmentHint'),
      onClick: () => onPreview(item),
      onContextMenu: (event) => {
        event.preventDefault()
        event.stopPropagation()
        onMenu(event, item)
      },
    },
    children,
    h('span', { className: 'iw-attach-hint' }, h(Icon, { name: 'eye', size: 10 }), T('preview')),
  )
}

function DetailMedia({ media, onPreview, onMenu, onEditTranscript }) {
  const items = Array.isArray(media) ? media : []
  if (!items.length) return null
  const visual = items.filter((item) => item.type !== 'file')
  const files = items.filter((item) => item.type === 'file')
  return h(
    'div',
    null,
    visual.length
      ? h(
          'div',
          { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginTop: 4 } },
          visual.map((item) => {
            if (item.type === 'audio') {
              return h(
                'div',
                { key: item.id, style: { gridColumn: '1 / -1' } },
                h(
                  'div',
                  { className: 'iw-voice' },
                  h(
                    'div',
                    { className: 'iw-voice-head' },
                    h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id }),
                    h(IconBtn, {
                      name: 'dots',
                      size: 15,
                      title: T('moreActions'),
                      onClick: (event) => onMenu(event, item),
                    }),
                  ),
                  h(
                    'div',
                    { className: 'iw-voice-label' },
                    h(Icon, { name: 'mic', size: 11 }),
                    h('span', null, T('voiceContent')),
                    h('span', { className: 'iw-voice-note' }, T('voiceContentHint')),
                  ),
                  h('textarea', {
                    className: 'iw-textarea iw-voice-text',
                    defaultValue: item.transcript || '',
                    placeholder: T('noTranscript'),
                    onBlur: (event) => onEditTranscript(item, event.target.value),
                    onClick: (event) => event.stopPropagation(),
                  }),
                ),
              )
            }
            return h(
              Attachment,
              { key: item.id, item, onPreview, onMenu },
              item.type === 'image'
                ? h('img', {
                    src: api.mediaUrl(item.path),
                    alt: item.caption || T('image'),
                    style: { width: '100%', borderRadius: 12, display: 'block', background: 'var(--iw-sunken)' },
                  })
                : h('video', {
                    src: api.mediaUrl(item.path),
                    controls: true,
                    style: { width: '100%', borderRadius: 12, display: 'block', background: '#000' },
                  }),
              item.caption ? h('p', { className: 'iw-media-caption' }, item.caption) : null,
            )
          }),
        )
      : null,
    files.length
      ? h(
          'div',
          { className: 'iw-file-list-grid' },
          files.map((item) => h(
            Attachment,
            { key: item.id, item, onPreview, onMenu, style: { display: 'inline-block' } },
            h(
              'div',
              { className: 'iw-filechip' },
              h(Icon, { name: 'folder', size: 14 }),
              h('span', { className: 'iw-filechip-name' }, item.caption || T('file')),
              item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
            ),
          )),
        )
      : null,
  )
}

function recordKindOf(file) {
  return mediaKindOf(file)
}

function RecordMedia({ media, compact, onPreview, onMenu }) {
  const items = Array.isArray(media) ? media : []
  if (!items.length) return null
  return h(
    'div',
    { className: 'iw-record-media' },
    items.map((item) => {
      if (item.type === 'audio') {
        return h(
          'div',
          { key: item.id, style: { flex: '1 1 100%' } },
          h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id, compact: true }),
          item.transcript
            ? h('div', { className: 'iw-transcript', style: { marginTop: 6, maxHeight: 92, overflow: 'auto', fontSize: 10.5 } }, item.transcript)
            : null,
        )
      }
      return h(
        Attachment,
        { key: item.id, item, onPreview, onMenu },
        item.type === 'image'
          ? h('span', { className: 'iw-thumb' }, h('img', { src: api.mediaUrl(item.path), alt: item.caption || T('image') }))
          : item.type === 'video'
            ? h('span', { className: 'iw-thumb' },
                h('video', { src: api.mediaUrl(item.path), muted: true, preload: 'metadata' }),
                h('span', { className: 'iw-thumb-play' }, h(Icon, { name: 'play', size: 16 })),
              )
            : h('span', { className: 'iw-filechip' },
                h(Icon, { name: 'folder', size: 13 }),
                h('span', { className: 'iw-filechip-name' }, item.caption || T('file'))),
      )
    }),
  )
}

function RecordItem({ record, onDelete, confirming, onAskDelete, onCancelDelete, onPreview, onMenu }) {
  return h(
    'div',
    { className: 'iw-timeline-item' },
    h('span', { className: `iw-timeline-dot${record.kind === 'complete' ? ' is-complete' : ''}` }),
    h(
      'div',
      { className: 'iw-timeline-body' },
      h(
        'div',
        { className: 'iw-timeline-head' },
        h(
          'span',
          { className: 'iw-inline', style: { gap: 6 } },
          h('span', { className: `iw-timeline-kind${record.kind === 'complete' ? ' is-complete' : ''}` },
            record.kind === 'complete' ? T('recordKindComplete') : T('recordKindProgress')),
          h('span', null, fmtDateTime(record.createdAt)),
          record.implementedAt ? h('span', null, `${T('implementedOn')} ${fmtDate(record.implementedAt)}`) : null,
        ),
        confirming
          ? h(
              'span',
              { className: 'iw-inline', style: { gap: 6 } },
              h('span', { className: 'iw-row-muted' }, T('confirmDeleteRecord')),
              h('button', { type: 'button', className: 'iw-link', onClick: () => { onDelete(record.id) } }, T('delete')),
              h('button', { type: 'button', className: 'iw-link', onClick: onCancelDelete, style: { color: 'var(--iw-text3)' } }, T('cancel')),
            )
          : h(IconBtn, { name: 'trash', size: 13, title: T('deleteRecord'), onClick: onAskDelete }),
      ),
      record.text ? h('div', { className: 'iw-timeline-text' }, record.text) : null,
      h(RecordMedia, { media: record.media, onPreview, onMenu }),
      record.results && record.results.length
        ? h(
            'div',
            { className: 'iw-timeline-links' },
            record.results.map((link) => h('a', {
              key: link.url,
              className: 'iw-review-link',
              href: link.url,
              target: '_blank',
              rel: 'noreferrer',
              style: { padding: '4px 9px', background: 'var(--iw-accent-soft)', borderRadius: 8 },
            }, h(Icon, { name: 'arrowUpRight', size: 12 }), link.label || link.url)),
          )
        : null,
    ),
  )
}

function DetailModal({ store, snap, noteId, onClose }) {
  const note = (snap.notes || []).find((item) => item.id === noteId)
  const [recordText, setRecordText] = React.useState('')
  const [recordMedia, setRecordMedia] = React.useState([])
  const [uploading, setUploading] = React.useState(0)
  const [savingRecord, setSavingRecord] = React.useState(false)
  const [error, setError] = React.useState('')
  const [confirmingNote, setConfirmingNote] = React.useState(false)
  const [confirmRecordId, setConfirmRecordId] = React.useState('')
  const [switching, setSwitching] = React.useState(false)
  const [preview, setPreview] = React.useState(null)
  const [menu, setMenu] = React.useState(null)
  const imageInputRef = React.useRef(null)
  const videoInputRef = React.useRef(null)
  const fileInputRef = React.useRef(null)

  const uploadRecordMedia = async (file) => {
    if (!file) return
    if (file.size > (MEDIA_LIMITS[mediaKindOf(file)] || MEDIA_LIMITS.file)) {
      setError(`${T('fileTooLarge')}（${file.name}）`)
      return
    }
    setError('')
    setUploading((value) => value + 1)
    try {
      const extension = fileExtension(file.name)
      const uploaded = await api.upload(file, safeFileName(`${noteId || 'note'}_${Date.now()}_${Math.floor(Math.random() * 1e4)}`, extension))
      const media = {
        id: uid('m'),
        type: recordKindOf(file),
        path: uploaded.path,
        mime: uploaded.mime,
        duration: 0,
        size: file.size,
        caption: file.name.slice(0, 120),
        transcript: '',
      }
      setRecordMedia((previous) => [...previous, media])
    } catch (uploadError) {
      setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
    } finally {
      setUploading((value) => Math.max(0, value - 1))
    }
  }

  const addRecordFiles = async (files) => {
    for (const file of files) await uploadRecordMedia(file)
  }

  const { dragging, dropProps } = useAttachDrop(addRecordFiles)

  if (!note) return null

  const records = noteRecords(note)
  const implemented = noteIsImplemented(note)
  const interval = relativeInterval(note)
  const completion = completionRecord(note)
  const expectState = expectedState(note)

  const saveNote = async (next) => {
    await store.saveNote(next)
  }

  const setStatus = async (next) => {
    if (next === note.category) return
    if (next === '已实现') {
      store.setUi({ completeNoteId: note.id })
      return
    }
    setSwitching(true)
    setError('')
    try {
      await saveNote({ ...note, category: next })
    } catch (statusError) {
      setError(String(statusError && statusError.message ? statusError.message : statusError))
    } finally {
      setSwitching(false)
    }
  }

  const moreValue = STATUSES.includes(note.category) ? '' : note.category

  const pickRecordMedia = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    await addRecordFiles(files)
  }

  const addRecord = async () => {
    if (!recordText.trim() && recordMedia.length === 0) return
    setSavingRecord(true)
    setError('')
    try {
      const record = {
        id: uid('r'),
        createdAt: new Date().toISOString(),
        kind: 'progress',
        text: recordText.trim(),
        implementedAt: '',
        results: [],
        media: recordMedia,
      }
      await saveNote({ ...note, records: [record, ...records] })
      setRecordText('')
      setRecordMedia([])
    } catch (recordError) {
      setError(String(recordError && recordError.message ? recordError.message : recordError))
    } finally {
      setSavingRecord(false)
    }
  }

  const deleteRecord = async (id) => {
    setConfirmRecordId('')
    try {
      await saveNote({ ...note, records: records.filter((record) => record.id !== id) })
    } catch (deleteError) {
      setError(String(deleteError && deleteError.message ? deleteError.message : deleteError))
    }
  }

  /** Save an edited transcript in place; the audio file keeps its bytes. */
  const saveTranscript = async (item, text) => {
    if (!item || text === (item.transcript || '')) return
    try {
      await saveNote({
        ...note,
        media: (note.media || []).map((entry) => (entry.id === item.id ? { ...entry, transcript: text } : entry)),
      })
      store.toast(T('transcriptSaved'))
    } catch (transcriptError) {
      setError(String(transcriptError && transcriptError.message ? transcriptError.message : transcriptError))
    }
  }

  /* -------------------------------------------------------- attachments */
  const openAttachment = async (item, mode) => {
    try {
      await store.openFile(item.path, mode)
      if (mode === 'reveal') store.toast(T('revealed'))
    } catch (openError) {
      store.toast(T('openFailed'))
      setError(String(openError && openError.message ? openError.message : openError))
    }
  }

  const copyAttachmentPath = async (item) => {
    try {
      await navigator.clipboard.writeText(item.path)
      store.toast(T('copied'))
    } catch {
      store.toast(item.path)
    }
  }

  /**
   * Open the attachment in a real browser tab. The app window may refuse
   * `window.open`, so we fall back to the host, which spawns the system
   * browser on the same local media URL. Either way the bytes stay local.
   */
  const openInBrowser = async (item) => {
    const url = api.mediaUrl(item.path)
    let handle = null
    try {
      handle = window.open(url, '_blank')
    } catch {
      handle = null
    }
    if (handle) {
      try {
        handle.opener = null
      } catch {
        /* cross-origin */
      }
      return
    }
    try {
      await store.openFile(item.path, 'browser')
      store.toast(T('openedInBrowser'))
    } catch {
      try {
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.target = '_blank'
        anchor.rel = 'noopener noreferrer'
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      } catch {
        store.toast(T('openFailed'))
      }
    }
  }

  const attachmentHandlers = {
    preview: (item) => setPreview(item),
    browser: (item) => {
      openInBrowser(item)
    },
    run: (item, mode) => {
      openAttachment(item, mode)
    },
    copy: (item) => {
      copyAttachmentPath(item)
    },
  }

  const openMenu = (event, item) => {
    const source = event && (event.currentTarget || event.target)
    const rect = source && source.getBoundingClientRect ? source.getBoundingClientRect() : null
    setMenu({
      x: rect ? rect.left : (event && event.clientX) || 120,
      y: rect ? rect.bottom + 4 : (event && event.clientY) || 120,
      item,
    })
  }

  return h(
    Modal,
    { onClose, className: 'iw-modal-md' },
    h(
      'div',
      { className: 'iw-drop-wrap', ...dropProps },
      h(
        'div',
        { className: 'iw-modal-head' },
        h(
          'div',
          { className: 'iw-inline' },
          h(CatChip, { category: note.category }),
          h('span', { className: 'iw-modal-date' }, `${fmtDateTime(note.createdAt)} · ${fmtRel(note.createdAt)}`),
          interval !== null ? h('span', { className: 'iw-modal-date' }, `· ${T('intervalLabel', { days: interval })}`) : null,
          note.expectedAt
            ? h('span', { className: `iw-expect-chip${implemented ? ' is-done' : expectState ? ` is-${expectState}` : ''}` },
                h(Icon, { name: 'calendar', size: 11 }),
                h('span', null, `${T('expectedChip', { date: fmtDate(note.expectedAt) })}${implemented ? '' : ` · ${expectedLabel(note)}`}`))
            : null,
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Stars, { value: note.stars, size: 16, gap: 3 }),
          h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
        ),
      ),
      h(
        'div',
        { className: 'iw-status-row', style: { marginTop: 12, padding: '10px 12px', borderRadius: 12, background: 'var(--iw-sunken)' } },
        h('span', { className: 'iw-status-label' }, T('statusLabel')),
        STATUSES.map((status) => h(
          'button',
          {
            key: status,
            type: 'button',
            className: `iw-chip${note.category === status ? ' is-on' : ''}`,
            disabled: switching,
            onClick: () => setStatus(status),
          },
          note.category === status ? h(Icon, { name: 'check', size: 11 }) : null,
          catLabel(status),
        )),
        h(
          'select',
          {
            className: 'iw-more-select',
            value: moreValue,
            disabled: switching,
            onChange: (event) => {
              if (event.target.value) setStatus(event.target.value)
            },
            title: T('moreCategories'),
          },
          h('option', { value: '' }, T('moreCategories')),
          MORE_CATEGORIES.map((name) => h('option', { key: name, value: name }, catLabel(name))),
        ),
      ),
      h('h2', { style: { margin: '14px 0 0', fontSize: 22, fontWeight: 650, letterSpacing: '-0.3px' } }, note.title || T('untitled')),
      note.body ? h('p', { style: { margin: '10px 0 0', fontSize: 12.5, lineHeight: 1.75, color: 'var(--iw-text2)', whiteSpace: 'pre-wrap' } }, note.body) : null,
      note.summary
        ? h(
            'div',
            { className: 'iw-summary-box' },
            h(
              'div',
              { className: 'iw-summary-head' },
              h('span', { className: 'iw-summary-title' }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('summaryLabel'))),
              h('span', { className: 'iw-small iw-muted' }, T('summaryCardHint')),
            ),
            h('div', { className: 'iw-summary-text' }, note.summary),
          )
        : null,
      note.media && note.media.length
        ? h('div', { className: 'iw-section' }, h(DetailMedia, {
            media: note.media,
            onPreview: attachmentHandlers.preview,
            onMenu: openMenu,
            onEditTranscript: saveTranscript,
          }))
        : null,
      h(
        'div',
        { className: 'iw-section' },
        h(
          'div',
          { className: 'iw-section-label' },
          h('span', null, `${T('records')}${records.length ? ` · ${records.length}` : ''}`),
          h('span', { className: 'iw-small iw-muted' }, T('recordsHint')),
        ),
        records.length
          ? h(
              'div',
              { className: 'iw-timeline' },
              records.map((record) => h(RecordItem, {
                key: record.id,
                record,
                confirming: confirmRecordId === record.id,
                onAskDelete: () => setConfirmRecordId(record.id),
                onCancelDelete: () => setConfirmRecordId(''),
                onDelete: deleteRecord,
                onPreview: attachmentHandlers.preview,
                onMenu: openMenu,
              })),
            )
          : h('div', { className: 'iw-small iw-muted', style: { padding: '4px 0 8px' } }, T('noRecords')),
        h(
          'div',
          { style: { marginTop: 12, padding: 12, borderRadius: 12, background: 'var(--iw-sunken)' } },
          h('div', { className: 'iw-field-label', style: { marginBottom: 6 } }, T('addRecord')),
          h('textarea', {
            className: 'iw-textarea',
            style: { minHeight: 58, background: 'var(--iw-surface)' },
            value: recordText,
            placeholder: T('recordPlaceholder'),
            onChange: (event) => setRecordText(event.target.value),
          }),
          h(
            'div',
            { className: 'iw-record-attach' },
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => imageInputRef.current && imageInputRef.current.click() },
              h(Icon, { name: 'image', size: 13 }), T('image')),
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => videoInputRef.current && videoInputRef.current.click() },
              h(Icon, { name: 'video', size: 13 }), T('video')),
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => fileInputRef.current && fileInputRef.current.click() },
              h(Icon, { name: 'folder', size: 13 }), T('file')),
            uploading > 0 ? h('span', { className: 'iw-small iw-muted' }, T('uploading')) : h('span', { className: 'iw-small iw-muted' }, T('dropOrPickShort')),
          ),
          h('input', { ref: imageInputRef, type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          h('input', { ref: videoInputRef, type: 'file', accept: 'video/*', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          h('input', { ref: fileInputRef, type: 'file', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          recordMedia.length
            ? h(
                'div',
                { className: 'iw-record-media' },
                recordMedia.map((item) => h(
                  'div',
                  { key: item.id, style: { position: 'relative' } },
                  item.type === 'image'
                    ? h('span', { className: 'iw-thumb' }, h('img', { src: api.mediaUrl(item.path), alt: item.caption }))
                    : item.type === 'video'
                      ? h('span', { className: 'iw-thumb' }, h('video', { src: api.mediaUrl(item.path), muted: true, preload: 'metadata' }))
                      : h('span', { className: 'iw-filechip' }, h(Icon, { name: 'folder', size: 13 }), h('span', { className: 'iw-filechip-name' }, item.caption), item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null),
                  h('button', {
                    type: 'button',
                    className: 'iw-file-remove',
                    onClick: () => setRecordMedia((previous) => previous.filter((media) => media.id !== item.id)),
                    'aria-label': T('remove'),
                  }, h(Icon, { name: 'close', size: 10 })),
                )),
              )
            : null,
          h(
            'div',
            { style: { display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' } },
            h(Btn, { variant: 'primary', size: 'sm', onClick: addRecord, disabled: savingRecord || uploading > 0 },
              savingRecord ? T('saving') : T('saveRecord')),
          ),
        ),
        error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, margin: '8px 0 0' } }, error) : null,
      ),
      h(
        'button',
        {
          type: 'button',
          className: `iw-complete-card${implemented ? ' is-done' : ''}`,
          disabled: implemented,
          onClick: () => {
            if (!implemented) store.setUi({ completeNoteId: note.id })
          },
        },
        h('span', { className: 'iw-complete-card-icon' }, h(Icon, { name: 'check', size: 18 })),
        h(
          'div',
          { className: 'iw-complete-card-body' },
          h('div', { className: 'iw-complete-card-title' }, implemented ? T('completed') : T('completeCardTitle')),
          h('div', { className: 'iw-complete-card-sub' },
            implemented
              ? (completion ? T('completedAt', { time: fmtDate(completion.implementedAt) }) : T('completed'))
              : T('completeCardHint')),
        ),
        implemented ? null : h(Icon, { name: 'chevronRight', size: 16 }),
      ),
      h(
        'div',
        { className: 'iw-modal-foot' },
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', size: 'sm', icon: 'edit', onClick: () => store.setUi({ compose: note.id }) }, T('edit')),
          confirmingNote
            ? h(
                'span',
                { className: 'iw-btn-row' },
                h('span', { className: 'iw-small iw-muted' }, T('confirmDelete')),
                h(Btn, { variant: 'ghost', size: 'sm', onClick: () => setConfirmingNote(false) }, T('cancel')),
                h(Btn, { variant: 'ghost', size: 'sm', onClick: () => store.deleteNote(note.id).catch(() => {}) }, T('delete')),
              )
            : h(Btn, { variant: 'ghost', size: 'sm', icon: 'trash', onClick: () => setConfirmingNote(true) }, T('delete')),
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h('span', { className: 'iw-small iw-muted' }, T('updatedAt', { time: fmtRel(note.updatedAt) })),
          h(Btn, { variant: 'ghost', onClick: onClose }, T('close')),
        ),
      ),
      dragging ? h(DropOverlay) : null,
    ),
    menu
      ? h(ContextMenu, {
          x: menu.x,
          y: menu.y,
          title: fileNameOf(menu.item) || attachmentKindLabel(menu.item),
          items: attachmentMenuItems(menu.item, attachmentHandlers),
          onClose: () => setMenu(null),
        })
      : null,
    preview
      ? h(Lightbox, {
          item: preview,
          onClose: () => setPreview(null),
          onOpenWith: (item) => openAttachment(item, 'open'),
        })
      : null,
  )
}

/* ================= 47-complete.js ================= */
/* --------------------------------------------------------------- complete */
function localDateTimeInput(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function CompleteModal({ store, snap, noteId, onClose }) {
  const note = (snap.notes || []).find((item) => item.id === noteId)
  const [when, setWhen] = React.useState(() => localDateTimeInput(new Date()))
  const [text, setText] = React.useState('')
  const [links, setLinks] = React.useState([{ label: '', url: '' }])
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')

  if (!note) return null

  const patchLink = (index, patch) => {
    setLinks((previous) => previous.map((link, position) => (position === index ? { ...link, ...patch } : link)))
  }

  const finish = async (skipReview) => {
    setBusy(true)
    setError('')
    try {
      const record = {
        id: uid('r'),
        createdAt: new Date().toISOString(),
        kind: 'complete',
        text: skipReview ? '' : text.trim(),
        implementedAt: toIso(when),
        results: skipReview
          ? []
          : links
              .filter((link) => link.url.trim())
              .map((link) => ({ label: link.label.trim() || link.url.trim(), url: link.url.trim() })),
      }
      await store.saveNote({
        ...note,
        category: '已实现',
        records: [record, ...noteRecords(note)],
      })
    } catch (finishError) {
      setError(String(finishError && finishError.message ? finishError.message : finishError))
      setBusy(false)
    }
  }

  return h(
    Modal,
    { onClose, className: 'iw-modal-sm' },
    h(
      'div',
      { className: 'iw-modal-head' },
      h('div', null,
        h('h2', { className: 'iw-modal-title' }, T('completeTitle')),
        h('div', { className: 'iw-modal-date', style: { marginTop: 4 } }, note.title || T('untitled')),
      ),
      h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
    ),
    h(
      'div',
      { className: 'iw-field', style: { marginTop: 16 } },
      h('span', { className: 'iw-field-label' }, T('completionTime')),
      h('input', {
        className: 'iw-input',
        type: 'datetime-local',
        value: when,
        onChange: (event) => setWhen(event.target.value),
        style: { width: 220 },
      }),
    ),
    h(
      'div',
      { className: 'iw-section' },
      h('div', { className: 'iw-section-label' }, h('span', null, T('resultLinks')), h('span', { className: 'iw-small iw-muted' }, T('resultLinksHint'))),
      h(
        'div',
        { className: 'iw-link-rows' },
        links.map((link, index) => h(
          'div',
          { key: index, className: 'iw-link-row' },
          h('input', {
            className: 'iw-input',
            style: { flex: '0 0 150px' },
            value: link.label,
            placeholder: T('linkLabelPlaceholder'),
            onChange: (event) => patchLink(index, { label: event.target.value }),
          }),
          h('input', {
            className: 'iw-input',
            value: link.url,
            placeholder: T('linkUrlPlaceholder'),
            onChange: (event) => patchLink(index, { url: event.target.value }),
          }),
          links.length > 1
            ? h(IconBtn, {
                name: 'close',
                size: 13,
                title: T('remove'),
                onClick: () => setLinks((previous) => previous.filter((_, position) => position !== index)),
              })
            : null,
        )),
      ),
      h('div', { style: { marginTop: 8 } },
        h(Btn, { variant: 'ghost', size: 'sm', icon: 'plus', onClick: () => setLinks((previous) => [...previous, { label: '', url: '' }]) }, T('addLink')),
      ),
    ),
    h(
      'div',
      { className: 'iw-field', style: { marginTop: 16 } },
      h('span', { className: 'iw-field-label' }, T('completionReviewOptional')),
      h('textarea', {
        className: 'iw-textarea',
        style: { minHeight: 88 },
        value: text,
        placeholder: T('completionReviewPlaceholder'),
        onChange: (event) => setText(event.target.value),
      }),
    ),
    error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, error) : null,
    h(
      'div',
      { className: 'iw-modal-foot' },
      h('span', { className: 'iw-hint' }, T('completeHint')),
      h(
        'div',
        { className: 'iw-btn-row' },
        h(Btn, { variant: 'ghost', onClick: onClose, disabled: busy }, T('cancel')),
        h(Btn, { variant: 'ghost', onClick: () => finish(true), disabled: busy }, T('skipReview')),
        h(Btn, { variant: 'primary', onClick: () => finish(false), disabled: busy }, busy ? T('saving') : T('saveComplete')),
      ),
    ),
  )
}

/* ================= 50-settings.js ================= */
/* -------------------------------------------------------------- settings */
function SettingsModal({ store, snap, onClose }) {
  const settings = snap.settings
  const [picking, setPicking] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    store.refreshStorage()
  }, [store])

  const update = async (patch) => {
    setError('')
    try {
      await store.patchSettings(patch)
    } catch (patchError) {
      setError(String(patchError && patchError.message ? patchError.message : patchError))
    }
  }

  const chooseDir = async () => {
    setPicking(true)
    setError('')
    try {
      const path = await store.pickDirectory()
      if (path) await store.patchSettings({ mediaDir: path })
    } catch (pickError) {
      setError(String(pickError && pickError.message ? pickError.message : pickError))
    } finally {
      setPicking(false)
      store.refreshStorage()
    }
  }

  const storage = snap.storage

  return h(
    Modal,
    { onClose, className: 'iw-modal-sm' },
    h(
      'div',
      { className: 'iw-modal-head' },
      h('h2', { className: 'iw-modal-title' }, T('settingsTitle')),
      h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
    ),
    h(
      'div',
      { className: 'iw-section', style: { marginTop: 12 } },
      h(
        'div',
        { className: 'iw-field' },
        h('span', { className: 'iw-field-label' }, T('palette')),
        h('div', { className: 'iw-inline', style: { marginTop: 2 } },
          PALETTE_VISIBLE.map((key) => h('button', {
            key,
            type: 'button',
            className: `iw-chip${(settings.palette || 'paper') === key ? ' is-on' : ''}`,
            onClick: () => update({ palette: key }),
          }, T(PALETTE_KEYS[key])))),
        h('span', { className: 'iw-settings-desc' }, T('paletteHint')),
      ),
      h('div', { className: 'iw-settings-row', style: { marginTop: 8 } },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('mediaDir')),
          h('div', { className: 'iw-settings-desc' }, T('mediaDirHint')),
          h('div', { className: 'iw-path', style: { marginTop: 8 } }, settings.mediaDir || storage?.mediaRoot || '…'),
        ),
        h('div', { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', size: 'sm', icon: 'folder', onClick: chooseDir, disabled: picking }, picking ? T('picking') : T('chooseDir')),
          settings.mediaDir ? h(Btn, { variant: 'ghost', size: 'sm', onClick: () => update({ mediaDir: '' }) }, T('reset')) : null,
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('tokenPrices')),
          h('div', { className: 'iw-settings-desc' }, T('tokenPricesHint')),
        ),
        h(
          'div',
          { className: 'iw-price-grid', style: { flex: '0 1 380px' } },
          [['priceInput', T('priceInput')], ['priceOutput', T('priceOutput')], ['priceCache', T('priceCache')]].map(([key, label]) => h(
            'label',
            { key, className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, label),
            h('input', {
              className: 'iw-input',
              type: 'number',
              min: 0,
              step: 0.01,
              value: settings[key],
              onChange: (event) => update({ [key]: Number(event.target.value) || 0 }),
            }),
          )),
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('transcription')),
          h('div', { className: 'iw-settings-desc' }, T('transcriptionHint')),
        ),
        h('div', { className: 'iw-btn-row' },
          h('select', {
            className: 'iw-select',
            style: { width: 90 },
            value: settings.language,
            onChange: (event) => update({ language: event.target.value }),
          },
          h('option', { value: 'zh' }, '中文'),
          h('option', { value: 'en' }, 'English'),
          h('option', { value: 'ja' }, '日本語')),
          h('button', {
            type: 'button',
            className: `iw-toggle${settings.transcribe ? ' is-on' : ''}`,
            role: 'switch',
            'aria-checked': settings.transcribe,
            onClick: () => update({ transcribe: !settings.transcribe }),
            title: T('transcription'),
          }),
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('defaultPeriod')),
          h('div', { className: 'iw-settings-desc' }, T('defaultPeriodHint')),
        ),
        h(Segmented, {
          value: settings.period,
          options: [
            { value: 'month', label: T('thisMonth') },
            { value: '90d', label: T('last90') },
            { value: 'all', label: T('allTime') },
          ],
          onChange: (value) => update({ period: value }),
        }),
      ),
      storage
        ? h(
            'div',
            { className: 'iw-settings-row' },
            h('div', null,
              h('div', { className: 'iw-settings-label' }, T('storage')),
              h('div', { className: 'iw-path', style: { marginTop: 6 } }, storage.dataDir),
            ),
            h('span', { className: 'iw-small iw-muted' }, T('storageCounts', { notes: storage.notes || 0, media: storage.media || 0 })),
          )
        : null,
      error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, error) : null,
      h(
        'div',
        { className: 'iw-modal-foot' },
        h('span', { className: 'iw-hint' }, T('settingsHint')),
        h(Btn, { variant: 'primary', onClick: onClose }, T('done')),
      ),
    ),
  )
}

/* ================= 60-insights.js ================= */
/* -------------------------------------------------------------- insights */
const CAT_COLORS = ['#8E8E93', '#F08C00', '#28A745', '#C7C7CC']

function periodLabel(period) {
  if (period === 'month') return T('thisMonth')
  if (period === '90d') return T('last90')
  return T('allTime')
}

function streakDays(notes) {
  const days = new Set(notes.map((note) => startOfDay(new Date(note.createdAt)).getTime()))
  let cursor = startOfDay(new Date())
  if (!days.has(cursor.getTime())) cursor = new Date(cursor.getTime() - 86400000)
  let count = 0
  while (days.has(cursor.getTime())) {
    count += 1
    cursor = new Date(cursor.getTime() - 86400000)
  }
  return count
}

function intervalBins(notes) {
  const bins = [
    { label: T('bin0To3'), min: 0, max: 3, value: 0 },
    { label: T('bin4To7'), min: 4, max: 7, value: 0 },
    { label: T('bin8To14'), min: 8, max: 14, value: 0 },
    { label: T('bin15To30'), min: 15, max: 30, value: 0 },
    { label: T('bin30Plus'), min: 31, max: 100000, value: 0 },
  ]
  for (const note of notes) {
    const days = relativeInterval(note)
    if (days === null) continue
    const bin = bins.find((item) => days >= item.min && days <= item.max)
    if (bin) bin.value += 1
  }
  return bins
}

function medianOf(values) {
  if (!values.length) return null
  const sorted = [...values].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2)
}

function exportMarkdown(notes, period) {
  const lines = [
    T('exportHeading'),
    '',
    T('exportPeriod', { period: periodLabel(period), time: fmtDateTime(new Date()) }),
    '',
  ]
  for (const note of notes) {
    lines.push("## " + (note.title || T('untitled')))
    lines.push(T('exportMeta', {
      category: catLabel(note.category),
      stars: note.stars,
      created: fmtDateTime(note.createdAt),
    }))
    if (note.tags && note.tags.length) {
      lines.push(T('exportTags', { tags: note.tags.join(isZh() ? '\u3001' : ', ') }))
    }
    if (note.body) lines.push('', note.body)
    if (note.summary) lines.push('', T('exportSummary', { summary: note.summary }))
    for (const record of noteRecords(note)) {
      lines.push('')
      const heading = record.kind === 'complete' ? T('exportComplete') : T('exportRecord')
      lines.push('### ' + heading + ' \u00b7 ' + fmtDate(record.createdAt))
      if (record.text) lines.push(record.text)
      for (const link of record.results || []) lines.push('- [' + link.label + '](' + link.url + ')')
      if (record.implementedAt) lines.push(T('exportImplemented', { date: fmtDate(record.implementedAt) }))
    }
    lines.push('')
  }
  return lines.join('\n')
}

function downloadText(name, text) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function Kpi({ label, value, unit, delta, good }) {
  return h(
    'div',
    { className: 'iw-kpi' },
    h('div', { className: 'iw-kpi-label' }, label),
    h('div', { className: 'iw-kpi-value' }, value, unit ? h('small', null, unit) : null),
    delta ? h('div', { className: `iw-kpi-delta${good ? ' good' : ''}` }, delta) : null,
  )
}

/* ----------------------------------------------------------- usage chart */
function UsageChart({ days, costByDay, height = 138 }) {
  const width = 320
  const top = 8
  const bottom = 18
  const left = 28
  const right = 28
  const plotW = width - left - right
  const plotH = height - top - bottom
  const n = Math.max(1, days.length)
  const gap = n > 60 ? 1 : 4
  const barW = Math.max(1, (plotW - gap * (n - 1)) / n)
  const maxTokens = Math.max(1, ...days.map((day) => day.input + day.output)) * 1.15
  const maxCost = Math.max(0.000001, ...Object.values(costByDay)) * 1.2
  const elements = []
  ;[0, 0.5, 1].forEach((ratio, index) => {
    const y = top + plotH * (1 - ratio)
    elements.push(h('line', { key: `g-${index}`, x1: left, x2: width - right, y1: y, y2: y, stroke: 'var(--iw-border)', strokeWidth: 0.8 }))
    elements.push(h('text', { key: `gl-${index}`, x: left - 4, y: y + 2.5, textAnchor: 'end', fontSize: 6.2, fill: 'var(--iw-text3)' },
      fmtTokens(Math.round(maxTokens * ratio))))
    elements.push(h('text', { key: `gr-${index}`, x: width - right + 4, y: y + 2.5, fontSize: 6.2, fill: 'var(--iw-text3)' },
      fmtCost(maxCost * ratio)))
  })
  const labelStep = Math.max(1, Math.ceil(n / 6))
  days.forEach((day, index) => {
    const x = left + index * (barW + gap)
    const inputH = Math.max(0, plotH * (day.input / maxTokens))
    const outputH = Math.max(0, plotH * (day.output / maxTokens))
    if (inputH > 0) {
      elements.push(h('rect', { key: `i-${index}`, x, y: top + plotH - inputH, width: barW, height: inputH, rx: Math.min(2, barW / 2), fill: 'var(--iw-accent)', opacity: 0.35 }))
    }
    if (outputH > 0) {
      elements.push(h('rect', { key: `o-${index}`, x, y: top + plotH - inputH - outputH, width: barW, height: outputH, rx: Math.min(2, barW / 2), fill: 'var(--iw-accent)' }))
    }
    if (index % labelStep === 0) {
      elements.push(h('text', { key: `l-${index}`, x: x + barW / 2, y: height - 4, textAnchor: 'middle', fontSize: 5.8, fill: 'var(--iw-text3)' }, shortDay(day.date)))
    }
  })
  const points = days
    .map((day, index) => {
      const cost = costByDay[day.date] || 0
      return { x: left + index * (barW + gap) + barW / 2, y: top + plotH - plotH * (cost / maxCost) }
    })
  elements.push(h('polyline', {
    key: 'cost-line',
    points: points.map((point) => `${point.x},${point.y}`).join(' '),
    fill: 'none',
    stroke: '#F08C00',
    strokeWidth: 1.4,
    strokeLinejoin: 'round',
  }))
  points.forEach((point, index) => elements.push(h('circle', { key: `c-${index}`, cx: point.x, cy: point.y, r: 1.6, fill: '#F08C00' })))
  return h('div', { className: 'iw-chart' }, h('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': T('tokenUsageTrend') }, elements))
}

const RANGE_PRESETS = [
  { value: 'today', i18n: 'today' },
  { value: 'week', i18n: 'thisWeek' },
  { value: 'month', i18n: 'thisMonth' },
  { value: '90d', i18n: 'last90' },
]

function rangeForPreset(preset) {
  const today = todayString()
  if (preset === 'today') return { from: today, to: today }
  if (preset === 'week') return { from: weekStartString(), to: today }
  if (preset === '90d') return { from: daysBackString(89), to: today }
  return { from: monthStartString(), to: today }
}

function UsagePanel({ store, snap }) {
  const settings = snap.settings
  const [range, setRange] = React.useState({ preset: 'month', from: monthStartString(), to: todayString() })
  const [usage, setUsage] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    store
      .fetchUsage(range.from, range.to, false)
      .then((data) => {
        if (!cancelled) setUsage(data)
      })
      .catch((loadError) => {
        if (!cancelled) setError(String(loadError && loadError.message ? loadError.message : loadError))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [range.from, range.to, nonce, store])

  const choosePreset = (preset) => {
    const next = rangeForPreset(preset)
    setRange({ preset, ...next })
  }

  const setCustom = (patch) => setRange((previous) => {
    const next = { ...previous, preset: 'custom', ...patch }
    if (next.from > next.to) {
      if (patch.from) next.to = patch.from
      else next.from = patch.to
    }
    return next
  })

  const refresh = () => setNonce((value) => value + 1)

  const totals = (usage && usage.totals) || { input: 0, output: 0, cacheRead: 0, total: 0 }
  const totalCost = costOfUsage(totals.input, totals.output, totals.cacheRead, settings)
  const activeDays = usage ? usage.days.filter((day) => day.input || day.output).length : 0
  const cacheBase = totals.input + totals.cacheRead
  const cacheShare = cacheBase ? Math.round((totals.cacheRead / cacheBase) * 100) : 0
  const costByDay = {}
  if (usage) {
    for (const day of usage.days) {
      costByDay[day.date] = costOfUsage(day.input, day.output, day.cacheRead, settings)
    }
  }
  const maxModel = usage && usage.models.length ? Math.max(...usage.models.map((model) => model.total)) : 1
  const visibleDays = usage ? [...usage.days].filter((day) => day.input || day.output).reverse().slice(0, 15) : []

  return h(
    'div',
    null,
    h(
      'div',
      { className: 'iw-usage-bar' },
      h(Segmented, {
        value: range.preset,
        options: RANGE_PRESETS.map((preset) => ({ value: preset.value, label: T(preset.i18n) })),
        onChange: choosePreset,
      }),
      h(
        'div',
        { className: 'iw-usage-range' },
        h('input', {
          className: 'iw-date-input',
          type: 'date',
          value: range.from,
          max: range.to,
          onChange: (event) => setCustom({ from: event.target.value || range.from }),
        }),
        h('span', { className: 'iw-small iw-muted' }, '→'),
        h('input', {
          className: 'iw-date-input',
          type: 'date',
          value: range.to,
          min: range.from,
          onChange: (event) => setCustom({ to: event.target.value || range.to }),
        }),
        h(Btn, { variant: 'ghost', size: 'sm', icon: 'refresh', onClick: refresh, disabled: loading }, loading ? T('loading') : T('refresh')),
      ),
      h('span', { className: 'iw-spacer', style: { flex: 1 } }),
      h('span', { className: 'iw-small iw-muted' }, T('usageScope')),
    ),
    error
      ? h(
          'div',
          { className: 'iw-panel', style: { marginTop: 14 } },
          h('div', { className: 'iw-empty', style: { padding: '40px 20px' } },
            h('span', { className: 'iw-empty-title' }, T('usageError')),
            h('span', { className: 'iw-small' }, error),
            h(Btn, { variant: 'primary', onClick: refresh }, T('retry'))),
        )
      : !usage
        ? h('div', { className: 'iw-center', style: { padding: '70px' } }, h('span', { className: 'iw-spinner' }), h('span', null, T('usageLoading')))
        : h(
            'div',
            null,
            h(
              'div',
              { className: 'iw-kpis', style: { marginTop: 14 } },
              h(Kpi, { label: T('usageTotal'), value: fmtTokens(totals.total), unit: 'tokens', delta: `${T('usageInput')} ${fmtTokens(totals.input)} · ${T('usageOutput')} ${fmtTokens(totals.output)}` }),
              h(Kpi, { label: T('usageCost'), value: fmtCost(totalCost), delta: T('usageCostHint', { input: settings.priceInput, output: settings.priceOutput, cache: settings.priceCache }) }),
              h(Kpi, { label: T('usageCache'), value: fmtTokens(totals.cacheRead), unit: 'tokens', delta: `${T('usageCacheShare')} ${cacheShare}%` }),
              h(Kpi, { label: T('usageSessions'), value: String(usage.sessions), unit: T('usageSessionsUnit'), delta: T('usageDays', { days: activeDays }) }),
            ),
            h(
              'div',
              { className: 'iw-panel', style: { marginTop: 14 } },
              h(
                'div',
                { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('tokenUsageTrend')),
                  h('div', { className: 'iw-panel-sub' }, `${range.from} → ${range.to} · ${T('usageDaily')}`),
                ),
                h('div', { className: 'iw-legend' },
                  h('span', null, h('i', { style: { background: 'var(--iw-accent)', opacity: 0.35 } }), T('usageInput')),
                  h('span', null, h('i', { style: { background: 'var(--iw-accent)' } }), T('usageOutput')),
                  h('span', null, h('span', { className: 'iw-legend-line', style: { background: '#F08C00' } }), T('usageCostLine')),
                ),
              ),
              h(UsageChart, { days: usage.days, costByDay }),
              h('div', { className: 'iw-usage-note' }, T('usageSourceNote')),
            ),
            h(
              'div',
              { className: 'iw-chart-grid', style: { gridTemplateColumns: '1fr 1fr' } },
              h(
                'div',
                { className: 'iw-panel' },
                h('div', { className: 'iw-panel-head' },
                  h('div', { className: 'iw-panel-title' }, T('usageByModel')),
                  h('span', { className: 'iw-panel-note' }, `${usage.models.length} ${T('usageModels')}`),
                ),
                usage.models.length
                  ? h('div', { style: { marginTop: 6 } },
                      usage.models.slice(0, 6).map((model) => h(
                        'div',
                        { key: model.model, className: 'iw-usage-model' },
                        h('span', { className: 'iw-usage-model-name', title: model.model }, model.model),
                        h('div', { className: 'iw-usage-model-bar' }, h('i', { style: { width: `${Math.max(2, (model.total / maxModel) * 100)}%` } })),
                        h('span', { className: 'iw-usage-model-num' }, fmtTokens(model.total)),
                        h('span', { className: 'iw-usage-model-cost' }, fmtCost(costOfUsage(model.input, model.output, model.cacheRead, settings))),
                      )),
                    )
                  : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noData')),
              ),
              h(
                'div',
                { className: 'iw-panel' },
                h('div', { className: 'iw-panel-head' },
                  h('div', { className: 'iw-panel-title' }, T('usageDailyDetail')),
                  h('span', { className: 'iw-panel-note' }, T('usageRecent15')),
                ),
                visibleDays.length
                  ? h('div', { className: 'iw-rows', style: { marginTop: 6 } },
                      visibleDays.map((day) => h(
                        'div',
                        { key: day.date, className: 'iw-usage-day' },
                        h('span', { className: 'iw-usage-day-date' }, day.date),
                        h('span', { className: 'iw-usage-day-num' }, fmtTokens(day.input + day.output)),
                        h('span', { className: 'iw-usage-day-cost' }, fmtCost(costByDay[day.date] || 0)),
                      )),
                    )
                  : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noData')),
              ),
            ),
            h(
              'div',
              { className: 'iw-panel', style: { marginTop: 14 } },
              h('div', { className: 'iw-panel-title' }, T('usageScopeTitle')),
              h('div', { className: 'iw-usage-note', style: { marginTop: 6 } },
                T('usageScopeNote'),
                h('br'),
                T('usageCostFormula', { input: settings.priceInput, output: settings.priceOutput, cache: settings.priceCache }),
                h('br'),
                T('usageCacheNote'),
              ),
            ),
          ),
  )
}

function StoragePanel({ store, snap }) {
  const [picking, setPicking] = React.useState(false)
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    store.refreshStorage()
  }, [store])
  const storage = snap.storage || {}
  const mediaDir = snap.settings.mediaDir || storage.mediaRoot || '…'
  const chooseDir = async () => {
    setPicking(true)
    setError('')
    try {
      const path = await store.pickDirectory()
      if (path) {
        await store.patchSettings({ mediaDir: path })
        await store.refreshStorage()
      }
    } catch (pickError) {
      setError(String(pickError && pickError.message ? pickError.message : pickError))
    } finally {
      setPicking(false)
    }
  }
  const clearCache = () => {
    store.clearUsageCache().catch((cacheError) => setError(String(cacheError && cacheError.message ? cacheError.message : cacheError)))
  }
  return h(
    'div',
    { className: 'iw-panel iw-storage' },
    h('div', { className: 'iw-panel-head' },
      h('div', null,
        h('div', { className: 'iw-panel-title' }, T('storageTitle')),
        h('div', { className: 'iw-panel-sub' }, T('storageSub')),
      ),
      h('div', { className: 'iw-btn-row' },
        h(Btn, { size: 'sm', icon: 'folder', onClick: chooseDir, disabled: picking }, picking ? T('picking') : T('changeMediaDir')),
        h(Btn, { size: 'sm', icon: 'gear', onClick: () => store.setUi({ settingsOpen: true }) }, T('settings')),
        h(Btn, { size: 'sm', icon: 'refresh', onClick: clearCache }, T('clearTokenCache')),
      ),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('dataDirLabel')),
      h('span', { className: 'iw-storage-path' }, storage.dataDir || '…'),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('mediaDirLabel')),
      h('span', { className: 'iw-storage-path' }, mediaDir),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('cacheLabel')),
      h('span', { className: 'iw-small iw-muted' },
        "${T('storageCounts', { notes: storage.notes || 0, media: storage.media || 0 })} \u00b7 "
        + T('cacheHint')),
    ),
    error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, margin: '4px 0 0' } }, error) : null,
  )
}

function InsightsPage({ store, snap, onBack }) {
  const settings = snap.settings
  const [tab, setTab] = React.useState('overview')
  const [period, setPeriod] = React.useState(settings.period || 'month')
  const notes = snap.notes || []

  const filtered = React.useMemo(() => notes.filter((note) => withinPeriod(note.createdAt, period)), [notes, period])
  const implemented = filtered.filter(noteIsImplemented)
  const intervals = implemented.map(relativeInterval).filter((value) => value !== null)
  const averageInterval = intervals.length ? (intervals.reduce((sum, value) => sum + value, 0) / intervals.length).toFixed(1) : '—'
  const medianInterval = medianOf(intervals)
  const streak = streakDays(notes)
  const weeks = React.useMemo(() => weekSeries(12), [])

  const weekBuckets = React.useMemo(() => weeks.map((start) => {
    const from = start.getTime()
    const to = from + 7 * 86400000
    const created = notes.filter((note) => {
      const time = asDate(note.createdAt).getTime()
      return time >= from && time < to
    })
    const done = notes.filter((note) => {
      const value = implementedAt(note)
      if (!value) return false
      const time = asDate(value).getTime()
      return time >= from && time < to
    })
    return { start, created: created.length, done: done.length }
  }), [notes, weeks])

  const ideaValues = weekBuckets.map((bucket) => bucket.created)
  const doneValues = weekBuckets.map((bucket) => bucket.done)
  const ideaLabels = weekBuckets.map((bucket, index) => (index % 2 === 0 ? weekLabel(bucket.start) : ''))
  const bins = React.useMemo(() => intervalBins(implemented), [implemented])

  const categoryBuckets = React.useMemo(() => {
    const map = new Map()
    for (const note of filtered) map.set(note.category, (map.get(note.category) || 0) + 1)
    return [...map.entries()].sort((left, right) => right[1] - left[1])
  }, [filtered])

  const recentRecords = React.useMemo(() => {
    const rows = []
    for (const note of notes) {
      const record = latestRecord(note)
      if (record) rows.push({ note, record })
    }
    rows.sort((left, right) => asDate(right.record.createdAt) - asDate(left.record.createdAt))
    return rows.slice(0, 4)
  }, [notes])

  const exportNotes = () => {
    if (!filtered.length) {
      store.toast(T('nothingToExport'))
      return
    }
    downloadText(T('exportFileBase') + '-' + new Date().toISOString().slice(0, 10) + '.md', exportMarkdown(filtered, period))
    store.toast(T('exported'))
  }

  return h(
    'div',
    { className: 'iw-page' },
    h(
      'header',
      { className: 'iw-head' },
      h(
        'div',
        null,
        h('div', { className: 'iw-inline', style: { gap: 10 } },
          h('button', { type: 'button', className: 'iw-icon-btn', onClick: onBack, title: T('wall') }, h(Icon, { name: 'chevronLeft', size: 16, stroke: 2 })),
          h('h1', { className: 'iw-title' }, T('insightsTitle')),
        ),
        h('p', { className: 'iw-subtitle' }, T('insightsSub')),
      ),
      h(
        'div',
        { className: 'iw-head-actions' },
        tab === 'overview'
          ? h(Segmented, {
              value: period,
              options: [
                { value: 'month', label: T('thisMonth') },
                { value: '90d', label: T('last90') },
                { value: 'all', label: T('allTime') },
              ],
              onChange: setPeriod,
            })
          : null,
        tab === 'overview' ? h(Btn, { size: 'sm', icon: 'download', onClick: exportNotes }, T('export')) : null,
      ),
    ),
    h(
      'div',
      { className: 'iw-tabs' },
      h('button', { type: 'button', className: `iw-tab${tab === 'overview' ? ' is-on' : ''}`, onClick: () => setTab('overview') }, T('tabOverview')),
      h('button', { type: 'button', className: `iw-tab${tab === 'token' ? ' is-on' : ''}`, onClick: () => setTab('token') }, T('tabToken')),
    ),
    tab === 'overview'
      ? h(
          'div',
          null,
          h(
            'div',
            { className: 'iw-kpis', style: { marginTop: 16 } },
            h(Kpi, { label: T('kpiIdeas'), value: String(filtered.length), unit: T('unit'), delta: T('periodLabel', { period: periodLabel(period) }) }),
            h(Kpi, { label: T('kpiImplemented'), value: String(implemented.length), unit: T('unit'), delta: filtered.length ? `${Math.round((implemented.length / filtered.length) * 100)}%` : '—', good: implemented.length > 0 }),
            h(Kpi, { label: T('kpiInterval'), value: averageInterval, unit: T('unitDay'), delta: medianInterval === null ? T('noData') : `${T('median')} ${medianInterval} ${T('unitDay')}` }),
            h(Kpi, { label: T('kpiStreak'), value: String(streak), unit: T('unitDay'), delta: T('streakHint') }),
          ),
          h(
            'div',
            { className: 'iw-chart-grid' },
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartIdeas')),
                  h('div', { className: 'iw-panel-sub' }, T('chartIdeasSub')),
                ),
                h('span', { className: 'iw-panel-note' }, T('chartIdeasPeak', { value: Math.max(0, ...ideaValues) })),
              ),
              h(BarChart, { values: ideaValues, labels: ideaLabels, peak: ideaValues.indexOf(Math.max(...ideaValues)), color: 'var(--iw-accent)' }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartDone')),
                  h('div', { className: 'iw-panel-sub' }, T('chartDoneSub')),
                ),
                h('span', { className: 'iw-panel-note' }, T('chartDoneNote', { value: implemented.length })),
              ),
              h(BarChart, { values: doneValues, labels: ideaLabels, peak: doneValues.indexOf(Math.max(...doneValues)), color: '#28A745' }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartInterval')),
                  h('div', { className: 'iw-panel-sub' }, T('chartIntervalSub', { value: intervals.length })),
                ),
                h('span', { className: 'iw-panel-note' }, medianInterval === null ? T('noData') : `${T('median')} ${medianInterval} ${T('unitDay')}`),
              ),
              h(HBars, { rows: bins.map((bin) => ({ label: bin.label, value: bin.value, display: String(bin.value), color: bin.value === Math.max(...bins.map((item) => item.value)) && bin.value > 0 ? 'var(--iw-accent)' : '#A9C8FF' })) }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartStatus')),
                  h('div', { className: 'iw-panel-sub' }, T('chartStatusSub', { value: filtered.length })),
                ),
              ),
              h(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, flexWrap: 'wrap' } },
                h(Donut, {
                  segments: categoryBuckets.map(([name, value]) => ({ value, color: CAT_COLORS[CAT_INDEX[name] || 0] })),
                  centerValue: String(filtered.length),
                  centerLabel: T('unit'),
                }),
                h(
                  'div',
                  { className: 'iw-rows', style: { flex: 1, minWidth: 130 } },
                  categoryBuckets.map(([name, value]) => h(
                    'div',
                    { key: name, className: 'iw-row', style: { borderTop: 'none', padding: '4px 0' } },
                    h('span', { style: { width: 8, height: 8, borderRadius: 4, background: CAT_COLORS[CAT_INDEX[name] || 0], display: 'inline-block' } }),
                    h('span', { className: 'iw-row-title', style: { fontSize: 10.5 } }, catLabel(name)),
                    h('span', { className: 'iw-row-right', style: { fontSize: 9.5 } }, String(value)),
                  )),
                ),
              ),
            ),
          ),
          h(
            'div',
            { className: 'iw-panel', style: { marginTop: 14 } },
            h('div', { className: 'iw-panel-head' },
              h('div', { className: 'iw-panel-title' }, T('recentRecords')),
              h('button', { type: 'button', className: 'iw-link', onClick: () => setTab('token') }, `${T('tabToken')} →`),
            ),
            recentRecords.length
              ? h('div', { className: 'iw-rows', style: { marginTop: 6 } },
                  recentRecords.map(({ note, record }) => h(
                    'div',
                    { key: record.id, className: 'iw-row', style: { cursor: 'pointer' }, onClick: () => store.setUi({ detailId: note.id }) },
                    h(CatChip, { category: note.category }),
                    h('span', { className: 'iw-row-title' }, note.title || T('untitled')),
                    h('span', { className: 'iw-row-muted' }, `${record.kind === 'complete' ? T('recordKindComplete') : T('recordKindProgress')} · ${fmtDate(record.createdAt)}`),
                    h('span', { className: 'iw-row-right' },
                      relativeInterval(note) === null ? '' : T('daysToDemo', { days: relativeInterval(note) })),
                  )),
                )
              : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noRecords')),
          ),
        )
      : h(UsagePanel, { store, snap }),
    h(StoragePanel, { store, snap }),
  )
}

/* ================= 70-app.js ================= */
/* --------------------------------------------------------------- locale */
const ZH = {
  panel: '灵感墙',
  all: '全部',
  appearance: '外观',
  paletteLabel: '主题色',
  palettePaper: '暖纸',
  paletteGraphite: '石墨',
  paletteMist: '云雾',
  paletteSand: '暖砂',
  paletteMidnight: '深海',
  paletteCyber: '赛博朋克',
  paletteEmber: '碳棕',
  catNotStarted: '未开始',
  catInProgress: '进行中',
  catDone: '已实现',
  catDropped: '已放弃',
  play: '播放',
  pause: '暂停',
  starReadonly: '{count} 星',
  starHint1: '不看也行',
  starHint2: '先存着',
  starHint3: '有空再看',
  starHint4: '重要',
  starHint5: '本周优先',
  justNow: '刚刚',
  minutesAgo: '{count} 分钟前',
  hoursAgo: '{count} 小时前',
  yesterday: '昨天',
  scoreLabel: '重要程度 {value}',
  weekReviewText: '本周新增 {created} 条，平均 {average} 天出 Demo',
  wall: '灵感墙',
  wallSub: '留住一闪而过的念头 · 共 {total} 条 · {implemented} 条已实现',
  search: '搜索灵感',
  settings: '设置',
  record: '记录灵感',
  sortDate: '最新',
  sortStars: '重要',
  insights: '统计与复盘',
  noMatch: '没有匹配的灵感',
  empty: '还没有灵感',
  emptyHint: '把刚冒出来的念头先记下来，之后再慢慢整理。',
  weekReview: '本周回顾',
  viewInsights: '查看统计',
  untitled: '未命名灵感',
  daysToDemo: '{days} 天后出 Demo',
  recordsCount: '{count} 条记录',
  completed: '已完成',
  recordKindProgress: '记录',
  recordKindComplete: '完成',
  loading: '加载中…',
  close: '关闭',
  editRecord: '编辑灵感',
  titlePlaceholder: '给这条灵感起个名字…',
  titleLabel: '标题',
  bodyPlaceholder: '记下思路、背景、链接…',
  bodyLabel: '内容',
  stopRecording: '停止录音',
  voice: '录音',
  image: '图片',
  video: '视频',
  file: '文件',
  fileUpload: '文件',
  audio: '语音',
  voiceMemo: '语音备忘',
  recordingHint: '正在录音，点击上方按钮停止',
  remove: '移除',
  transcribing: '转写中…',
  retranscribe: '重新转写',
  transcribe: '转写',
  voiceContent: '语音内容',
  voiceContentHint: '可直接改文字，原始录音不变',
  voiceContentPlaceholder: '转写后的文字会出现在这里，可以随意修改',
  voiceLocalNote: '转写与概要都在本机完成',
  noTranscript: '这条语音还没有转写文字',
  summaryLabel: '语音概要',
  summaryCardHint: '只保留核心意思，显示在卡片上',
  summaryPlaceholder: '把这条灵感的核心意思写在这里，卡片上只显示这一句',
  summaryAutoHint: '由语音内容自动提取',
  summaryLocalNote: '概要由本地摘要算法提取，不调用模型',
  regenSummary: '重新提取概要',
  expectedDate: '期待实现日期',
  expectedDateHint: '可选，用来倒排时间',
  expectedChip: '期待 {date}',
  expectedDays: '{days} 天后',
  expectedToday: '今天到期',
  expectedOverdue: '已超期 {days} 天',
  expectedClear: '清除日期',
  dropHint: '松手即可添加附件',
  dropFormats: '图片 / 视频 / 音频 / 文档等任意格式',
  dropOrPick: '拖拽文件到这里，或点上面的按钮',
  dropOrPickShort: '可以拖拽文件进来',
  preview: '预览',
  attachmentHint: '左键预览 · 右键更多打开方式',
  moreActions: '更多操作',
  openWith: '用默认程序打开',
  revealInFolder: '在文件夹中显示',
  copyPath: '复制文件路径',
  openInBrowser: '在浏览器中打开',
  openedInBrowser: '已在浏览器中打开',
  transcriptSaved: '文字已更新，录音未改动',
  copied: '路径已复制',
  revealed: '已在文件夹中定位',
  openFailed: '无法打开这个文件',
  category: '分类',
  stars: '重要程度',
  tags: '标签',
  tagsPlaceholder: '逗号分隔，例如：时间轴, 可视化',
  recordTime: '记录时间',
  recordTimeHint: '可以改成过去的日期',
  uploading: '正在上传附件…',
  saveHint: '保存后会出现在灵感墙',
  cancel: '取消',
  saving: '保存中…',
  save: '保存灵感',
  fileTooLarge: '文件太大，请压缩后再试',
  noMicrophone: '未检测到麦克风',
  transcribeUnavailable: '语音转写不可用（请先启用语音输入插件）',
  transcribeFailed: '语音转写失败',
  statusLabel: '状态',
  moreCategories: '更多分类',
  intervalLabel: '从灵感到 Demo {days} 天',
  implementedOn: '完成于',
  records: '记录',
  recordsHint: '随时记下进程和想法',
  noRecords: '还没有记录',
  addRecord: '写一条记录',
  recordPlaceholder: '进展、卡点、下一步想法…',
  saveRecord: '保存记录',
  deleteRecord: '删除这条记录',
  confirmDeleteRecord: '确认删除这条记录？',
  edit: '编辑',
  delete: '删除',
  confirmDelete: '确认删除？',
  updatedAt: '更新于 {time}',
  saved: '已保存',
  saveChanges: '保存修改',
  completeCardTitle: '完成灵感',
  completeCardHint: '标记为已实现，并写一条完成复盘（可留空）',
  completedAt: '已完成 · {time}',
  storageTitle: '存储与路径',
  storageSub: '灵感墙的缓存与保存位置',
  changeMediaDir: '更换媒体目录',
  clearTokenCache: '清理 Token 缓存',
  tokenCacheCleared: 'Token 缓存已清理',
  dataDirLabel: '数据目录',
  mediaDirLabel: '媒体目录',
  cacheLabel: '缓存',
  done: '完成',
  completeTitle: '完成灵感',
  completionTime: '完成时间',
  resultLinks: '结果链接',
  resultLinksHint: '可以留空',
  linkLabelPlaceholder: '结果名称（如 Demo / PR）',
  linkUrlPlaceholder: '结果链接 https://…',
  addLink: '再加一条链接',
  completionReviewOptional: '思考复盘（可选）',
  completionReviewPlaceholder: '这次实现了什么？哪里没做好？下次怎么改进？',
  completeHint: '完成后灵感会进入「已实现」队列',
  skipReview: '跳过复盘直接完成',
  saveComplete: '保存完成',
  settingsTitle: '灵感墙设置',
  palette: '配色',
  paletteHint: '默认石墨；配色只影响灵感墙自身。',
  mediaDir: '媒体文件目录',
  mediaDirHint: '录音、图片、视频、文件保存的位置；不选则放在数据目录下的 media/。',
  chooseDir: '选择文件夹',
  picking: '选择中…',
  reset: '恢复默认',
  tokenPrices: 'Token 单价',
  tokenPricesHint: '用于「Token 消耗」页的费用估算：元 / 每百万 tokens。',
  priceInput: '输入',
  priceOutput: '输出',
  priceCache: '缓存命中',
  transcription: '语音自动转写',
  transcriptionHint: '录音保存后自动转写成文字，并填进概要。',
  defaultPeriod: '默认统计周期',
  defaultPeriodHint: '打开统计页时默认选中的周期。',
  thisMonth: '本月',
  today: '今天',
  thisWeek: '本周',
  deleted: '已删除',
  storageCounts: '{notes} 条 · {media} 个媒体文件',
  cacheHint: 'Token 数据按会话日志汇总',
  bin0To3: '0–3 天',
  bin4To7: '4–7 天',
  bin8To14: '8–14 天',
  bin15To30: '15–30 天',
  bin30Plus: '30 天以上',
  exportHeading: '# 灵感墙 · 归档导出',
  exportPeriod: '周期：{period} · 导出时间：{time}',
  exportMeta: '- 分类：{category} · 星级：{stars}/5 · 记录时间：{created}',
  exportTags: '- 标签：{tags}',
  exportSummary: '> 概要：{summary}',
  exportComplete: '完成',
  exportRecord: '记录',
  exportImplemented: '- 完成于 {date}',
  exportFileBase: '灵感墙归档',
  nothingToTranscribe: '没有可转写的内容',
  pickerUnavailable: '目录选择不可用',
  recorderUnavailable: '当前环境不支持录音',
  barChart: '柱状图',
  donutChart: '分布环形图',
  last90: '近 90 天',
  allTime: '全部',
  storage: '数据目录',
  settingsHint: '设置会自动保存',
  insightsTitle: '统计与复盘',
  insightsSub: '灵感迸发、实现节奏，以及本机终端真实消耗的 Token',
  export: '导出复盘',
  tabOverview: '统计总览',
  tabToken: 'Token 消耗',
  kpiIdeas: '灵感总数',
  unit: '条',
  periodLabel: '{period}',
  kpiImplemented: '已实现',
  kpiInterval: '平均间隔',
  unitDay: '天',
  median: '中位数',
  noData: '暂无数据',
  kpiStreak: '连续记录',
  streakHint: '每天记一条',
  chartIdeas: '灵感迸发分布',
  chartIdeasSub: '近 12 周 · 每周新增',
  chartIdeasPeak: '峰值 {value} 条',
  chartDone: '实现日期分布',
  chartDoneSub: '近 12 周 · 每周完成',
  chartDoneNote: '已实现 {value} 条',
  chartInterval: '从灵感到 Demo 的间隔',
  chartIntervalSub: '{value} 条已实现记录 · 按天分组',
  chartStatus: '状态分布',
  chartStatusSub: '共 {value} 条',
  recentRecords: '最近记录',
  nothingToExport: '当前周期还没有可导出的记录',
  exported: '已导出 Markdown',
  usageScope: '数据来自本机会话日志',
  usageError: 'Token 统计加载失败',
  usageLoading: '正在汇总本机会话日志…',
  retry: '重试',
  refresh: '刷新',
  usageTotal: '总消耗',
  usageInput: '输入',
  usageOutput: '输出',
  usageCost: '估算成本',
  usageCostHint: '输入 ¥{input} · 输出 ¥{output} · 缓存 ¥{cache} / 百万',
  usageCache: '缓存命中',
  usageCacheShare: '占输入+缓存',
  usageSessions: '覆盖会话',
  usageSessionsUnit: '个',
  usageDays: '{days} 天有消耗',
  usageDaily: '按天统计',
  usageCostLine: '成本',
  usageSourceNote: '数据来自 DSH 本机会话日志中的真实 usage，包含子智能体会话；首次汇总会读取全部会话，之后按会话指纹增量更新。',
  usageByModel: '按模型分布',
  usageModels: '个模型',
  usageDailyDetail: '每日明细',
  usageRecent15: '最近 15 天',
  tokenUsageTrend: 'Token 消耗趋势',
  usageScopeTitle: '统计口径',
  usageScopeNote: '范围：当前桌面 profile 下全部会话（含子智能体），按事件发生时间归入本地自然日。',
  usageCostFormula: '费用 = 输入 ¥{input} + 输出 ¥{output} + 缓存命中 ¥{cache}（每百万 tokens，分别计价）。',
  usageCacheNote: '缓存命中按缓存单价单独计费，不并入输入。',
  pickUnavailable: '目录选择不可用',
  loadFailed: '加载灵感墙失败',
}

const EN = {
  panel: 'Inspiration wall',
  all: 'All',
  appearance: 'Appearance',
  paletteLabel: 'Palette',
  palettePaper: 'Paper',
  paletteGraphite: 'Graphite',
  paletteMist: 'Mist',
  paletteSand: 'Sand',
  paletteMidnight: 'Midnight',
  paletteCyber: 'Cyberpunk',
  paletteEmber: 'Ember',
  catNotStarted: 'Not started',
  catInProgress: 'In progress',
  catDone: 'Shipped',
  catDropped: 'Dropped',
  play: 'Play',
  pause: 'Pause',
  starReadonly: '{count} stars',
  starHint1: 'Optional',
  starHint2: 'Saved',
  starHint3: 'Look later',
  starHint4: 'Important',
  starHint5: 'This week',
  justNow: 'just now',
  minutesAgo: '{count}m ago',
  hoursAgo: '{count}h ago',
  yesterday: 'yesterday',
  scoreLabel: 'Importance {value}',
  weekReviewText: '{created} new this week · {average} days to demo on average',
  wall: 'Inspiration wall',
  wallSub: 'Catch ideas before they fade · {total} notes · {implemented} implemented',
  search: 'Search notes',
  settings: 'Settings',
  record: 'New note',
  sortDate: 'Latest',
  sortStars: 'Importance',
  insights: 'Insights',
  noMatch: 'No matching notes',
  empty: 'No ideas yet',
  emptyHint: 'Write down the thought that just crossed your mind.',
  weekReview: 'This week',
  viewInsights: 'Open insights',
  untitled: 'Untitled idea',
  daysToDemo: '{days} days to demo',
  recordsCount: '{count} records',
  completed: 'Completed',
  recordKindProgress: 'Record',
  recordKindComplete: 'Complete',
  loading: 'Loading…',
  close: 'Close',
  editRecord: 'Edit note',
  titlePlaceholder: 'Name this idea…',
  titleLabel: 'Title',
  bodyPlaceholder: 'Thoughts, context, links…',
  bodyLabel: 'Body',
  stopRecording: 'Stop',
  voice: 'Voice',
  image: 'Image',
  video: 'Video',
  file: 'File',
  fileUpload: 'File',
  audio: 'Audio',
  voiceMemo: 'Voice memo',
  recordingHint: 'Recording — press the button above to stop',
  remove: 'Remove',
  transcribing: 'Transcribing…',
  retranscribe: 'Transcribe again',
  transcribe: 'Transcribe',
  voiceContent: 'Voice transcript',
  voiceContentHint: 'Edit the text freely; the recording stays untouched',
  voiceContentPlaceholder: 'The transcript lands here — edit it as you like',
  voiceLocalNote: 'Transcription and summary run locally',
  noTranscript: 'No transcript for this clip yet',
  summaryLabel: 'Voice summary',
  summaryCardHint: 'Only the core meaning, shown on the card',
  summaryPlaceholder: 'Write the core idea here — the card shows just this line',
  summaryAutoHint: 'Extracted from the transcript',
  summaryLocalNote: 'Summary is extracted locally, no model call',
  regenSummary: 'Extract summary again',
  expectedDate: 'Target date',
  expectedDateHint: 'Optional, works backwards from the date',
  expectedChip: 'Target {date}',
  expectedDays: 'in {days} days',
  expectedToday: 'due today',
  expectedOverdue: '{days} days overdue',
  expectedClear: 'Clear date',
  dropHint: 'Drop to attach',
  dropFormats: 'Images, video, audio, documents — any format',
  dropOrPick: 'Drop files here, or use the buttons above',
  dropOrPickShort: 'Drop files here too',
  preview: 'Preview',
  attachmentHint: 'Click to preview · right-click for more',
  moreActions: 'More actions',
  openWith: 'Open with default app',
  revealInFolder: 'Show in folder',
  copyPath: 'Copy file path',
  openInBrowser: 'Open in browser',
  openedInBrowser: 'Opened in your browser',
  transcriptSaved: 'Text updated, recording untouched',
  copied: 'Path copied',
  revealed: 'Revealed in folder',
  openFailed: 'Could not open this file',
  category: 'Category',
  stars: 'Importance',
  tags: 'Tags',
  tagsPlaceholder: 'Comma separated, e.g. timeline, visual',
  recordTime: 'Recorded at',
  recordTimeHint: 'You can backdate the note',
  uploading: 'Uploading attachments…',
  saveHint: 'Saved notes appear on the wall',
  cancel: 'Cancel',
  saving: 'Saving…',
  save: 'Save note',
  fileTooLarge: 'File is too large',
  noMicrophone: 'No microphone found',
  transcribeUnavailable: 'Speech transcription is unavailable (enable the voice input plugin)',
  transcribeFailed: 'Transcription failed',
  statusLabel: 'Status',
  moreCategories: 'More categories',
  intervalLabel: '{days} days from idea to demo',
  implementedOn: 'Implemented',
  records: 'Records',
  recordsHint: 'log progress and thoughts anytime',
  noRecords: 'No records yet',
  addRecord: 'Write a record',
  recordPlaceholder: 'Progress, blockers, next steps…',
  saveRecord: 'Save record',
  deleteRecord: 'Delete record',
  confirmDeleteRecord: 'Delete this record?',
  edit: 'Edit',
  delete: 'Delete',
  confirmDelete: 'Delete this note?',
  updatedAt: 'Updated {time}',
  saved: 'Saved',
  saveChanges: 'Save changes',
  completeCardTitle: 'Complete this idea',
  completeCardHint: 'Mark it implemented and add a completion note (optional)',
  completedAt: 'Completed {time}',
  storageTitle: 'Storage & paths',
  storageSub: 'Where the wall caches data and saves files',
  changeMediaDir: 'Change media folder',
  clearTokenCache: 'Clear token cache',
  tokenCacheCleared: 'Token cache cleared',
  dataDirLabel: 'Data folder',
  mediaDirLabel: 'Media folder',
  cacheLabel: 'Cache',
  done: 'Done',
  completeTitle: 'Complete this idea',
  completionTime: 'Completed at',
  resultLinks: 'Result links',
  resultLinksHint: 'optional',
  linkLabelPlaceholder: 'Result name (demo, PR…)',
  linkUrlPlaceholder: 'Result link https://…',
  addLink: 'Add another link',
  completionReviewOptional: 'Retrospective (optional)',
  completionReviewPlaceholder: 'What shipped? What did not go well? What changes next time?',
  completeHint: 'The note moves to the “Implemented” queue',
  skipReview: 'Complete without review',
  saveComplete: 'Save completion',
  settingsTitle: 'Inspiration wall settings',
  palette: 'Palette',
  paletteHint: 'Graphite by default; palettes only affect this panel.',
  mediaDir: 'Media directory',
  mediaDirHint: 'Where recordings, images, videos and files are stored. Defaults to media/ inside the data directory.',
  chooseDir: 'Choose folder',
  picking: 'Choosing…',
  reset: 'Reset',
  tokenPrices: 'Token prices',
  tokenPricesHint: 'Used for cost estimates on the Token usage page: currency units per million tokens.',
  priceInput: 'Input',
  priceOutput: 'Output',
  priceCache: 'Cache hit',
  transcription: 'Auto transcription',
  transcriptionHint: 'Transcribe new recordings into text and fill the summary.',
  defaultPeriod: 'Default period',
  defaultPeriodHint: 'Period selected when the insights page opens.',
  thisMonth: 'This month',
  today: 'Today',
  thisWeek: 'This week',
  deleted: 'Deleted',
  storageCounts: '{notes} notes · {media} media files',
  cacheHint: 'Token usage is aggregated from session logs',
  bin0To3: '0–3 days',
  bin4To7: '4–7 days',
  bin8To14: '8–14 days',
  bin15To30: '15–30 days',
  bin30Plus: '30+ days',
  exportHeading: '# Inspiration wall · archive export',
  exportPeriod: 'Period: {period} · Exported: {time}',
  exportMeta: '- Category: {category} · Stars: {stars}/5 · Created: {created}',
  exportTags: '- Tags: {tags}',
  exportSummary: '> Summary: {summary}',
  exportComplete: 'Completed',
  exportRecord: 'Record',
  exportImplemented: '- Implemented {date}',
  exportFileBase: 'inspiration-wall-archive',
  nothingToTranscribe: 'Nothing to transcribe',
  pickerUnavailable: 'Folder picker unavailable',
  recorderUnavailable: 'Recording is not available here',
  barChart: 'Bar chart',
  donutChart: 'Distribution donut',
  last90: 'Last 90 days',
  allTime: 'All time',
  storage: 'Data directory',
  settingsHint: 'Settings are saved automatically',
  insightsTitle: 'Insights & review',
  insightsSub: 'Idea bursts, shipping rhythm, and the real token usage of this terminal',
  export: 'Export',
  tabOverview: 'Overview',
  tabToken: 'Token usage',
  kpiIdeas: 'Ideas',
  unit: 'notes',
  periodLabel: '{period}',
  kpiImplemented: 'Implemented',
  kpiInterval: 'Average interval',
  unitDay: 'days',
  median: 'median',
  noData: 'No data',
  kpiStreak: 'Streak',
  streakHint: 'one note a day',
  chartIdeas: 'Idea distribution',
  chartIdeasSub: 'Last 12 weeks · new notes',
  chartIdeasPeak: 'peak {value}',
  chartDone: 'Implementation distribution',
  chartDoneSub: 'Last 12 weeks · shipped',
  chartDoneNote: '{value} implemented',
  chartInterval: 'Idea to demo interval',
  chartIntervalSub: '{value} implemented notes · grouped by days',
  chartStatus: 'Status distribution',
  chartStatusSub: '{value} notes',
  recentRecords: 'Recent records',
  nothingToExport: 'Nothing to export for this period',
  exported: 'Exported Markdown',
  usageScope: 'Source: local session logs',
  usageError: 'Could not load token usage',
  usageLoading: 'Aggregating local session logs…',
  retry: 'Retry',
  refresh: 'Refresh',
  usageTotal: 'Total tokens',
  usageInput: 'input',
  usageOutput: 'output',
  usageCost: 'Estimated cost',
  usageCostHint: 'input ¥{input} · output ¥{output} · cache ¥{cache} / M',
  usageCache: 'Cache hits',
  usageCacheShare: 'of input+cache',
  usageSessions: 'Sessions',
  usageSessionsUnit: 'sessions',
  usageDays: '{days} days with usage',
  usageDaily: 'daily',
  usageCostLine: 'cost',
  usageSourceNote: 'Real usage from DSH local session logs, subagent sessions included. The first aggregation reads every session; later loads update incrementally per session revision.',
  usageByModel: 'By model',
  usageModels: 'models',
  usageDailyDetail: 'Daily detail',
  usageRecent15: 'last 15 days',
  tokenUsageTrend: 'Token usage trend',
  usageScopeTitle: 'Scope',
  usageScopeNote: 'All sessions of this desktop profile (subagents included), bucketed by the local day of each event.',
  usageCostFormula: 'Cost = input ¥{input} + output ¥{output} + cache hits ¥{cache} per million tokens (each billed separately).',
  usageCacheNote: 'Cache-hit tokens are billed separately and are not merged into input.',
  pickUnavailable: 'Directory picker is unavailable',
  loadFailed: 'Could not load the inspiration wall',
}

let T = (key) => key

function formatTemplate(template, params) {
  if (typeof template !== 'string') return template
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, name) => (params[name] === undefined ? match : String(params[name])))
}

/* ------------------------------------------------------------------- app */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return h('div', { className: 'iw-root' },
        h('div', { className: 'iw-center', style: { flexDirection: 'column' } },
          h('span', null, T('loadFailed')),
          h('button', { type: 'button', className: 'iw-btn iw-btn-ghost', onClick: () => this.setState({ failed: false }) }, T('retry'))))
    }
    return this.props.children
  }
}

function App({ store }) {
  const snap = useStore(store)
  const loadedRef = React.useRef(false)

  React.useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    store.load()
  }, [store])

  const ui = snap.ui

  return h(
    'div',
    { className: 'iw-root', 'data-scheme': snap.scheme === 'dark' ? 'dark' : 'light' },
    h('style', null, CSS),
    snap.loading
      ? h('div', { className: 'iw-page' }, h(Loading))
      : snap.error
        ? h('div', { className: 'iw-page' }, h('div', { className: 'iw-empty' },
            h(Icon, { name: 'sparkle', size: 22 }),
            h('span', { className: 'iw-empty-title' }, T('loadFailed')),
            h('span', { className: 'iw-small' }, snap.error),
            h(Btn, { variant: 'primary', onClick: () => store.load() }, T('retry'))))
        : h(
            ErrorBoundary,
            null,
            ui.view === 'insights'
              ? h(InsightsPage, { store, snap, onBack: () => store.setUi({ view: 'wall' }) })
              : h(WallPage, {
                  store,
                  snap,
                  onRecord: () => store.setUi({ compose: 'new' }),
                  onInsights: () => store.setUi({ view: 'insights' }),
                }),
            ui.detailId ? h(DetailModal, { store, snap, noteId: ui.detailId, onClose: () => store.setUi({ detailId: null }) }) : null,
            ui.completeNoteId ? h(CompleteModal, { store, snap, noteId: ui.completeNoteId, onClose: () => store.setUi({ completeNoteId: null }) }) : null,
            ui.compose
              ? h(ComposeModal, {
                  store,
                  snap,
                  noteId: ui.compose === 'new' ? null : ui.compose,
                  onClose: () => store.setUi({ compose: null }),
                })
              : null,
            ui.settingsOpen ? h(SettingsModal, { store, snap, onClose: () => store.setUi({ settingsOpen: false }) }) : null,
            h(Toast, { message: snap.toast }),
          ),
  )
}

function WallIcon(props) {
  const size = (props && props.size) || 20
  const active = props && props.active
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 20 20',
      'aria-hidden': true,
      style: { display: 'block', color: active ? 'var(--dsw-alias-brand-primary)' : 'currentColor' },
    },
    h('path', {
      d: 'M10 2.2c.55 3.4 1.7 5.2 5 5.8-3.3.6-4.45 2.4-5 5.8-.55-3.4-1.7-5.2-5-5.8 3.3-.6 4.45-2.4 5-5.8Z',
      fill: 'currentColor',
    }),
    h('circle', { cx: 15.2, cy: 14.6, r: 2.1, fill: 'currentColor', opacity: 0.55 }),
  )
}

/* ------------------------------------------------------------------ apply */
const inject = ['slots', 'locale', 'uiWorkspace', 'theme']
let wallStore = null

/** One palette → the Harness' own alias tokens, both modes supplied. */
function paletteTokens(id) {
  const palette = PALETTES[id] || PALETTES.paper
  const tokens = {}
  for (const name of Object.keys(palette.light)) {
    tokens[name] = { light: palette.light[name], dark: palette.dark[name] }
  }
  return tokens
}

function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh: ZH, en: EN }), 'inspiration: dictionaries')

  const bound = ctx.locale.bind(NS)
  T = (key, params) => {
    let value
    try {
      value = bound(key, params)
    } catch {
      value = key
    }
    /* The host returns the key itself when it has no entry, and a real
       translation may legitimately equal the key ("yesterday" in English).
       Resolve through the language table before falling back to Chinese. */
    if (value === undefined || value === key) {
      const table = isZh() ? ZH : EN
      if (table[key] !== undefined) value = table[key]
      else if (ZH[key] !== undefined) value = ZH[key]
      else value = key
    }
    return formatTemplate(value, params)
  }

  /* Follow the Harness language. Only Chinese and English are shipped here;
     any other active language renders English. */
  const syncLocale = () => {
    let active = 'zh'
    try {
      active = typeof ctx.locale.getLocale === 'function' ? ctx.locale.getLocale().active : ctx.locale.active
    } catch {
      active = 'zh'
    }
    setLang(active || 'zh')
  }
  syncLocale()
  ctx.effect(() => {
    if (typeof ctx.locale.subscribe !== 'function') return () => {}
    return ctx.locale.subscribe(() => {
      syncLocale()
      if (wallStore) wallStore.publish({})
    })
  }, 'inspiration: locale sync')

  const themeOf = () => {
    try {
      return ctx.get('theme')
    } catch {
      return undefined
    }
  }

  const readScheme = () => {
    try {
      const snapshot = themeOf().getTheme()
      return snapshot && snapshot.active && snapshot.active.colorScheme === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  }

  let releasePalette = null
  const applyPalette = (id) => {
    const service = themeOf()
    if (!service || typeof service.overrideTokens !== 'function') return
    try {
      if (releasePalette) releasePalette()
    } catch {
      /* a stale layer is harmless */
    }
    try {
      releasePalette = service.overrideTokens('dsh-inspiration-wall', paletteTokens(id))
    } catch {
      releasePalette = null
    }
  }

  ctx.effect(() => {
    let lastPalette = ''
    const push = () => {
      const palette = (wallStore && wallStore.snapshot().settings.palette) || 'paper'
      if (palette === lastPalette) return
      lastPalette = palette
      applyPalette(palette)
    }
    push()
    const unsubscribe = wallStore ? wallStore.subscribe(push) : () => {}
    return () => {
      unsubscribe()
      try {
        if (releasePalette) releasePalette()
      } catch {
        /* ignore */
      }
      releasePalette = null
    }
  }, 'inspiration: palette')

  ctx.effect(() => {
    let last = ''
    const sync = () => {
      const scheme = readScheme()
      if (scheme === last) return
      last = scheme
      if (wallStore) wallStore.publish({ scheme })
    }
    sync()
    const timer = setInterval(sync, 1500)
    return () => clearInterval(timer)
  }, 'inspiration: color scheme')

  const speechOf = () => {
    try {
      return ctx.get('remote.speech')
    } catch {
      return undefined
    }
  }

  wallStore = createStore({
    async transcribe(base64, language) {
      const speech = speechOf()
      if (!speech || typeof speech.transcribe !== 'function') throw new Error(T('transcribeUnavailable'))
      const controller = new AbortController()
      const result = await speech.transcribe({ audioBase64: base64, language: language || 'zh' }, controller.signal)
      if (result && result.ok === false) {
        const message = result.error && (result.error.message || result.error.code)
        throw new Error(message || T('transcribeFailed'))
      }
      const value = result && result.ok === true ? result.value : result
      if (!value || (typeof value === 'object' && !('text' in value) && !('value' in value))) {
        throw new Error(T('transcribeFailed'))
      }
      return value && value.value !== undefined ? value.value : value
    },
    async pickDirectory() {
      if (!ctx.uiWorkspace || typeof ctx.uiWorkspace.pickDirectory !== 'function') throw new Error(T('pickUnavailable'))
      return ctx.uiWorkspace.pickDirectory()
    },
    applyPalette,
    scheme: readScheme,
  })

  ctx.slots.inject('sidebar.panellist', () =>
    ctx.slots.register(
      { name: 'sidebar.panellist', id: 'inspiration', order: 20, label: () => T('panel') },
      WallIcon,
    ),
  )

  ctx.slots.inject('main', () =>
    ctx.slots.register({ name: 'main', key: 'inspiration', inject: () => ({ store: wallStore }) }, App),
  )
}

return { inject, apply }

  },
})
