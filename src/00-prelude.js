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
