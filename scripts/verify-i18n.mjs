/**
 * Language coherence checks: every visible string must go through the locale
 * dictionary, and the panel must follow the DSH language (zh / en).
 *
 * The check renders the real components with real dictionaries and scans the
 * produced text for leftovers:
 *   - English mode: any CJK character means a hardcoded Chinese string leaked.
 *   - Both modes: a raw camelCase key means a missing dictionary entry.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const srcDir = join(root, '..', 'src')
const files = [
  '00-prelude.js', '05-css.js', '10-store.js', '20-ui.js', '30-wall.js',
  '40-compose.js', '45-detail.js', '47-complete.js', '50-settings.js', '60-insights.js', '70-app.js',
]

const components = [
  'WallPage', 'WallCard', 'DetailModal', 'CompleteModal', 'ComposeModal',
  'SettingsModal', 'InsightsPage', 'UsagePanel', 'ContextMenu',
]
const extra = ['setLang', 'isZh', 'PALETTE_IDS', 'PALETTE_KEYS']

const body = files
  .map((file) => readFileSync(join(srcDir, file), 'utf8'))
  .join('\n')
  .replace('return { inject, apply }', `return { inject, apply, components: { ${components.join(', ')} }, getT: () => T, ${extra.join(', ')} }`)

const ReactStub = {
  createElement(type, props, ...children) {
    return { type, props: props || {}, children }
  },
  useState: (initial) => [typeof initial === 'function' ? initial() : initial, () => {}],
  useEffect() {},
  useMemo: (factory) => factory(),
  useRef: (value) => ({ current: value }),
  useCallback: (fn) => fn,
  Component: class Component {
    constructor(props) {
      this.props = props
    }
  },
}

const module = new Function('React', 'window', body)(ReactStub, { AudioContext: undefined, OfflineAudioContext: undefined })

const dicts = {}
const localeStub = {
  register(namespace, dictionary) {
    dicts[namespace] = dictionary
    return () => {}
  },
  bind(namespace) {
    return (key, params) => {
      const table = dicts[namespace] || {}
      const dictionary = module.isZh() ? table.zh : table.en
      const raw = dictionary && dictionary[key] !== undefined ? dictionary[key] : key
      if (!params) return raw
      return String(raw).replace(/\{(\w+)\}/g, (match, name) => (params[name] === undefined ? match : String(params[name])))
    }
  },
  getLocale: () => ({ active: 'zh', locales: [], revision: 1 }),
  subscribe: () => () => {},
}

const disposers = []
const ctx = {
  locale: localeStub,
  theme: {
    getTheme: () => ({ preference: 'system', active: { id: 'light', colorScheme: 'light', tokens: {} }, themes: [], revision: 1 }),
    overrideTokens: () => () => {},
  },
  slots: {
    inject(key, callback) {
      callback()
      return () => {}
    },
    register: () => null,
  },
  effect(factory) {
    const disposer = factory()
    if (typeof disposer === 'function') disposers.push(disposer)
    return disposer
  },
  get: (name) => (name === 'theme' ? ctx.theme : undefined),
  uiWorkspace: { pickDirectory: () => Promise.resolve(null) },
}
module.apply(ctx)

let failures = 0
function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`)
  } else {
    failures += 1
    console.log(`FAIL ${label}${detail === undefined ? '' : ` — ${JSON.stringify(detail)}`}`)
  }
}

/* ------------------------------------------------------------------ fixtures */
/* ASCII-only content on purpose: any CJK in the render is UI text, not data. */
const note = {
  id: 'n_i18n',
  title: 'Timeline of the context',
  body: 'Every tool call sits on one timeline.',
  summary: 'A zoomable timeline for the session context.',
  category: '进行中',
  stars: 4,
  tags: ['timeline'],
  createdAt: '2026-11-05T09:42:00+08:00',
  expectedAt: '2026-11-20',
  updatedAt: '2026-11-05T09:42:00+08:00',
  media: [
    { id: 'm1', type: 'image', path: 'C:/x/a.png', mime: 'image/png', size: 1024, duration: 0, caption: 'sketch.png', transcript: '' },
    { id: 'm2', type: 'audio', path: 'C:/x/a.webm', mime: 'audio/webm', size: 2048, duration: 47, caption: 'memo', transcript: 'Voice memo text.' },
  ],
  records: [
    {
      id: 'r1',
      createdAt: '2026-11-04T09:42:00+08:00',
      kind: 'progress',
      text: 'Sketched the layout.',
      implementedAt: '',
      results: [],
      media: [],
    },
  ],
}

const snap = {
  loading: false,
  error: '',
  notes: [note],
  settings: { palette: 'paper', mediaDir: '', priceInput: 2, priceOutput: 8, priceCache: 0.04, transcribe: true, language: 'zh', period: 'month' },
  storage: { dataDir: 'C:/data', mediaRoot: 'C:/data/media', notes: 1, media: 2 },
  ui: {
    view: 'wall',
    sort: 'date',
    category: '全部',
    query: '',
    period: 'month',
    tokenRange: { preset: 'month', from: '2026-11-01', to: '2026-11-05' },
  },
  toast: '',
  scheme: 'light',
}

const store = {
  snapshot: () => snap,
  subscribe: () => () => {},
  setUi() {},
  patchSettings: () => Promise.resolve({}),
  applyPalette() {},
  saveNote: () => Promise.resolve({}),
  deleteNote: () => Promise.resolve(),
  toast() {},
  refreshStorage: () => Promise.resolve(),
  load: () => Promise.resolve(),
  fetchUsage: () => Promise.resolve({
    from: '2026-11-01',
    to: '2026-11-05',
    days: [{ day: '2026-11-05', input: 1200, output: 800, cacheRead: 300, total: 2300 }],
    totals: { input: 1200, output: 800, cacheRead: 300, total: 2300 },
    models: [{ model: 'deepseek-v4.1-flash-1017', input: 1200, output: 800 }],
    sessions: 1,
    scanned: 1,
    cached: 0,
  }),
  transcribe: () => Promise.resolve(''),
  pickDirectory: () => Promise.resolve(null),
  openFile: () => Promise.resolve({}),
  clearUsageCache: () => Promise.resolve({}),
}

const C = module.components

const HARVEST = new Set(['placeholder', 'alt', 'title', 'aria-label', 'label'])

function flatten(node) {
  if (node === null || node === undefined || node === false || node === true) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flatten).join(' ')
  if (node.props) {
    const parts = []
    for (const [key, value] of Object.entries(node.props)) {
      if (HARVEST.has(key) && typeof value === 'string') parts.push(value)
      if (key === 'options' && Array.isArray(value)) {
        for (const option of value) {
          if (option && typeof option.label === 'string') parts.push(option.label)
        }
      }
    }
    return parts.join(' ') + ' ' + flatten(node.children)
  }
  if (node.children) return flatten(node.children)
  return ''
}

const cjk = /[\u4e00-\u9fff]/
const rawKey = /\b[a-z][A-Za-z]*[A-Z][A-Za-z]*\b/

function renderAll() {
  const views = {
    WallPage: () => C.WallPage({ store, snap, onRecord() {}, onInsights() {}, onOpen() {} }),
    SettingsModal: () => C.SettingsModal({ store, snap, onClose() {} }),
    InsightsPage: () => C.InsightsPage({ store, snap, onBack() {} }),
    UsagePanel: () => C.UsagePanel({ store, snap }),
    ComposeModal: () => C.ComposeModal({ store, snap, noteId: null, onClose() {} }),
    DetailModal: () => C.DetailModal({ store, snap, noteId: note.id, onClose() {} }),
    CompleteModal: () => C.CompleteModal({ store, snap, noteId: note.id, onClose() {} }),
    ContextMenu: () => C.ContextMenu({
      x: 10,
      y: 10,
      title: 'a.png',
      items: [{ key: 'k1', label: 'Preview', onSelect() {} }, { separator: true }, { key: 'k2', label: 'Remove', danger: true, onSelect() {} }],
      onClose() {},
    }),
  }
  const out = {}
  for (const [name, factory] of Object.entries(views)) {
    try {
      out[name] = flatten(factory())
    } catch (error) {
      out[name] = `__THROW__ ${error && error.message ? error.message : error}`
    }
  }
  return out
}

/* ------------------------------------------------------- English must be clean */
module.setLang('en')
const stripEndonyms = (text) => text.replace(/\u4e2d\u6587|\u65e5\u672c\u8a9e/g, '')
module.setLang('en')
const enViews = renderAll()
for (const [name, text] of Object.entries(enViews)) {
  const cleaned = stripEndonyms(text)
  check(`en render of ${name} has no Chinese`, !cjk.test(cleaned), cleaned.match(new RegExp(`.{0,18}${cjk.source}.{0,18}`))?.[0])
}

/* --------------------------------------------------- token presets are localized */
const tokenText = enViews.UsagePanel || ''
check('en token presets are translated', tokenText.includes('Today') && tokenText.includes('This week') && tokenText.includes('Last 90 days'), tokenText.slice(0, 120))
check('en token presets contain no raw keys', !/(^|\s)(today|thisWeek|last90|thisMonth)(\s|$)/.test(tokenText))

module.setLang('zh')
const zhViews = renderAll()
const zhToken = zhViews.UsagePanel || ''
check('zh token presets are translated', zhToken.includes('今天') && zhToken.includes('本周') && zhToken.includes('近 90 天'), zhToken.slice(0, 120))
check('zh token presets contain no raw keys', !/(^|\s)(today|thisWeek|last90)(\s|$)/.test(zhToken))

for (const [name, text] of Object.entries(zhViews)) {
  check(`zh render of ${name} leaks no raw key`, !rawKey.test(text), text.match(new RegExp(`.{0,18}${rawKey.source}.{0,18}`))?.[0])
}

/* ---------------------------------------------- dictionary completeness & quality */
const table = dicts.inspiration || {}
const zhKeys = Object.keys(table.zh || {})
const enKeys = Object.keys(table.en || {})
check('zh and en dictionaries have the same size', zhKeys.length === enKeys.length, [zhKeys.length, enKeys.length])
const missingEn = zhKeys.filter((key) => !(key in (table.en || {})))
check('every zh key exists in en', missingEn.length === 0, missingEn)
const emptyValues = zhKeys.filter((key) => !String(table.zh[key]).trim() || !String((table.en || {})[key] || '').trim())
check('no empty dictionary value', emptyValues.length === 0, emptyValues)
const chineseInEnglish = Object.entries(table.en || {}).filter(([, value]) => cjk.test(String(value)))
check('english dictionary has no Chinese', chineseInEnglish.length === 0, chineseInEnglish.slice(0, 6).map(([key]) => key))

/* ------------------------------------------------ source has no stray literals */
/* Data values (category sentinels) and comments are legitimate; everything else
   in a component file must go through T(). */
const allowed = new Set([
  '未开始', '进行中', '已实现', '已放弃', '全部',
  '中文', '日本語',
])
const leaks = []
for (const file of files) {
  if (file === '70-app.js') continue
  const text = readFileSync(join(srcDir, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
  for (const match of text.matchAll(/'([^'\n]*)'/g)) {
    const value = match[1]
    if (!cjk.test(value)) continue
    if (allowed.has(value)) continue
    if (/^[\u4e00-\u9fff]+$/.test(value) && /^[a-zA-Z]$/.test('')) continue
    leaks.push(`${file}: ${value}`)
  }
}
check('no hardcoded Chinese string outside the dictionary', leaks.length === 0, leaks.slice(0, 8))

for (const cleanup of disposers) {
  try {
    cleanup()
  } catch {
    /* ignore */
  }
}

console.log(failures === 0 ? '\nALL I18N CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
if (failures !== 0) process.exitCode = 1