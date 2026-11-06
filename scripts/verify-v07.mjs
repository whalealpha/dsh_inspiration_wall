/**
 * v0.7 checks: palettes as Harness tokens, English adaptation, display-only
 * title fallback, mono score, and the recording-tape markup.
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

const extra = [
  'PALETTES', 'PALETTE_IDS', 'PALETTE_VISIBLE', 'PALETTE_KEYS', 'visiblePalette',
  'setLang', 'isZh', 'catLabel', 'noteTitle', 'scoreText',
  'firstSentence', 'fmtDate', 'fmtClock', 'fmtDateTime', 'fmtRel', 'fmtDayMonth', 'weekSpans',
  'layoutColumns', 'estimateNoteHeight', 'CATEGORIES',
]

const body = files
  .map((file) => readFileSync(join(srcDir, file), 'utf8'))
  .join('\n')
  .replace('return { inject, apply }', `return { inject, apply, getT: () => T, components: { WallPage, WallCard }, ${extra.join(', ')} }`)

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

/** Minimal locale service: keeps the dicts the panel registers and resolves T. */
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
      const raw = (dictionary && dictionary[key] !== undefined && dictionary[key]) || (table.zh && table.zh[key]) || key
      if (!params) return raw
      return raw.replace(/\{(\w+)\}/g, (match, name) => (params[name] === undefined ? match : String(params[name])))
    }
  },
  getLocale: () => ({ active: 'zh', locales: [], revision: 1 }),
  subscribe: () => () => {},
}

const disposers = []
const ctx = {
  locale: localeStub,
  theme: {
    getTheme: () => ({ preference: 'system', active: { id: 'dark', colorScheme: 'dark', tokens: {} }, themes: [], revision: 1 }),
    overrideTokens: () => () => {},
  },
  slots: {
    inject(key, callback) {
      callback()
      return () => {}
    },
    register: (options) => null,
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


const noteForRender = {
  id: 'n_render',
  title: '',
  body: '把会话上下文画成可缩放的时间轴，卡住的地方一眼就能看见。',
  summary: '',
  category: '进行中',
  stars: 4,
  tags: [],
  createdAt: new Date().toISOString(),
  expectedAt: '',
  updatedAt: new Date().toISOString(),
  media: [],
  records: [],
}

let failures = 0
function check(label, condition, detail) {
  if (condition) {
    console.log(`PASS ${label}`)
  } else {
    failures += 1
    console.log(`FAIL ${label}${detail === undefined ? '' : ` — ${JSON.stringify(detail)}`}`)
  }
}

/* ---------------------------------------------------------------- palettes */
const ids = module.PALETTE_IDS
check('seven palettes exist', ids.length === 7, ids)
check('paper is the default palette', ids[0] === 'paper', ids[0])
const requiredTokens = [
  '--dsw-alias-bg-base', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2', '--dsw-alias-bg-overlay',
  '--dsw-alias-border-l1', '--dsw-alias-border-l2', '--dsw-alias-brand-primary',
  '--dsw-alias-label-primary', '--dsw-alias-label-secondary',
  '--dsw-alias-state-error-primary', '--dsw-alias-state-idle-primary',
  '--dsw-alias-state-success-primary', '--dsw-alias-state-warn-primary',
  '--dsw-specific-sidebar-fill',
]
for (const id of ids) {
  const palette = module.PALETTES[id]
  const missing = requiredTokens.filter((token) => !palette.light[token] || !palette.dark[token])
  check(`palette ${id} defines all alias tokens in both modes`, missing.length === 0, missing)
  check(`palette ${id} has a swatch colour`, /^#[0-9a-f]{6}$/i.test(palette.dot), palette.dot)
  check(`palette ${id} is labelled`, typeof module.PALETTE_KEYS[id] === 'string', module.PALETTE_KEYS[id])
}
check('paper keeps the amber accent', module.PALETTES.paper.light['--dsw-alias-brand-primary'] === '#d97706')
check('cyber keeps its cyan accent', module.PALETTES.cyber.dark['--dsw-alias-brand-primary'] === '#38cdf8')
check('no dark palette leaks a light canvas', ids.every((id) => module.PALETTES[id].dark['--dsw-alias-bg-base'] !== module.PALETTES[id].light['--dsw-alias-bg-base']))

/* ------------------------------------------------------------------ locale */
module.setLang('zh')
check('zh date', module.fmtDate('2026-11-05T09:42:00+08:00') === '11月05日', module.fmtDate('2026-11-05T09:42:00+08:00'))
check('zh clock', module.fmtClock('2026-11-05T09:42:00+08:00') === '09:42')
check('zh category label', module.catLabel('进行中') === '进行中', module.catLabel('进行中'))

module.setLang('en')
check('en date', module.fmtDate('2026-11-05T09:42:00+08:00') === 'Nov 5', module.fmtDate('2026-11-05T09:42:00+08:00'))
check('en date-time', module.fmtDateTime('2026-11-05T09:42:00+08:00') === 'Nov 5 · 09:42', module.fmtDateTime('2026-11-05T09:42:00+08:00'))
check('en day-month', module.fmtDayMonth('2026-11-05T09:42:00+08:00') === 'Nov 5')
check('en all chip', module.getT()('all') === 'All', module.getT()('all'))
check('en category label', module.catLabel('进行中') === 'In progress', module.catLabel('进行中'))
check('en dropped label', module.catLabel('已放弃') === 'Dropped', module.catLabel('已放弃'))
check('en not-started label', module.catLabel('未开始') === 'Not started', module.catLabel('未开始'))
check('unknown locale falls back to english', (module.setLang('ja'), module.catLabel('未开始') === 'Not started'))
module.setLang('zh-CN')
check('zh-CN stays chinese', module.fmtDate('2026-11-05T09:42:00+08:00') === '11月05日')
check('zh-CN labels stay chinese', module.catLabel('进行中') === '进行中', module.catLabel('进行中'))

/* ----------------------------------------------------------- title fallback */
const bodyOnly = { title: '', body: '把会话上下文画成可缩放的时间轴，卡住的地方一眼就能看见。', category: '未开始' }
const fallbackTitle = module.noteTitle(bodyOnly)
check('title falls back to the first sentence', fallbackTitle === '把会话上下文画成可缩放的时间…', fallbackTitle)
check('fallback is capped at 15 characters', fallbackTitle.length <= 15, fallbackTitle.length)
check('fallback drops the trailing punctuation', !/[。，]$/.test(fallbackTitle.replace('…', '')), fallbackTitle)
check('short body is used as-is', module.noteTitle({ title: '', body: '一句话想法' }) === '一句话想法')
check('title is preserved when present', module.noteTitle({ title: '真标题', body: '正文' }) === '真标题')
check('empty note uses the placeholder', module.noteTitle({ title: '', body: '' }) === module.getT()('untitled'), module.noteTitle({ title: '', body: '' }))

/* -------------------------------------------------------------------- score */
check('score renders as n/5', module.scoreText({ stars: 4 }) === '4/5', module.scoreText({ stars: 4 }))
check('score clamps above five', module.scoreText({ stars: 9 }) === '5/5')
check('score clamps below zero', module.scoreText({ stars: -2 }) === '0/5')

/* --------------------------------------------------------- number wrapping */
const spans = module.weekSpans('本周新增 5 条，平均 1.5 天出 Demo')
const bolded = spans.filter((node) => node && node.type === 'b').map((node) => node.children[0])
check('week sentence bolds its numbers', JSON.stringify(bolded) === JSON.stringify(['5', '1.5']), bolded)
check('week sentence keeps its text', spans.filter((node) => typeof node === 'string').join('') === '本周新增  条，平均  天出 Demo')

/* ------------------------------------------------------------------ columns */
const tall = { id: 'a', body: 'x'.repeat(400), media: [{ type: 'audio' }], records: [] }
const short = { id: 'b', body: '短' }
const columns = module.layoutColumns([tall, short, short, short])
check('layout creates three columns', columns.length === 3)
check('layout balances the tall card first', columns[0][0].id === 'a')
check('layout spreads short cards', columns.every((column) => column.length >= 1))


/* ------------------------------------------------------- english rendering */
{
  const want = { setUi() {}, applyPalette() {}, publish() {}, subscribe: () => () => {}, snapshot: () => ({}) }
  const store = new Proxy(want, { get: (target, key) => target[key] || (() => {}) })
  const snap = {
    loading: false,
    error: '',
    notes: [noteForRender],
    settings: { palette: 'paper', mediaDir: '', priceInput: 2, priceOutput: 8, priceCache: 0.04, transcribe: true, language: 'zh', period: 'month' },
    storage: { dataDir: 'C:/data', mediaRoot: 'C:/data/media', notes: 1, media: 0 },
    ui: { view: 'wall', sort: 'date', category: '全部', query: '', period: 'month', tokenRange: { preset: 'month', from: '2026-11-01', to: '2026-11-05' } },
    toast: '',
    scheme: 'dark',
  }
  const flatten = (node) => {
    if (node === null || node === undefined || node === false) return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(flatten).join(' ')
    if (node.children) return flatten(node.children)
    return ''
  }
  module.setLang('en')
  const english = flatten(module.components.WallPage({ store, snap, onRecord() {}, onInsights() {} }))
  check('english wall shows "All"', english.includes('All'), english.slice(0, 90))
  check('english wall translates the category chip', english.includes('Not started') || english.includes('In progress'), english.slice(0, 160))
  check('english wall has no leftover chinese labels', !/未开始|进行中|已实现|已放弃|全部|本周回顾/.test(english), english.slice(0, 200))
  check('english weekly review copy is translated', /week/i.test(module.getT()('weekReview')), module.getT()('weekReview'))
  check('english weekly review template keeps its placeholders', /\{created\}|\{implemented\}|\{average\}/.test(module.getT()('weekReviewText')), module.getT()('weekReviewText'))
  check('english wall renders the same shape as chinese', Array.isArray(module.components.WallPage({ store, snap, onRecord() {}, onInsights() {} }).children))

  module.setLang('zh')
  const chinese = flatten(module.components.WallPage({ store, snap, onRecord() {}, onInsights() {} }))
  check('chinese wall stays chinese', /全部|本周回顾|进行中/.test(chinese), chinese.slice(0, 120))
}

/* ------------------------------------------------------------- bundle shape */
const bundle = readFileSync(join(root, '..', 'client.js'), 'utf8')
check('bundle no longer switches an iw-theme class', !/iw-root iw-theme-/.test(bundle))
check('bundle reads the color scheme', bundle.includes("'data-scheme'"))
check('bundle applies palette through the theme service', bundle.includes('overrideTokens'))
check('bundle has no hard-coded graphite default', !bundle.includes("theme: 'graphite'"))
check('only paper, graphite and ember are offered', (
  module.PALETTE_VISIBLE.length === 3 &&
  module.PALETTE_VISIBLE.join(',') === 'paper,graphite,ember'
))
check('the hidden palettes keep their definitions', ['mist', 'sand', 'midnight', 'cyber'].every(
  (id) => module.PALETTES[id] && module.PALETTES[id].light['--dsw-alias-bg-base']
))
check('a hidden palette snaps to a kept one', (
  module.visiblePalette('mist') === 'graphite' &&
  module.visiblePalette('sand') === 'paper' &&
  module.visiblePalette('cyber') === 'graphite' &&
  module.visiblePalette('ember') === 'ember'
))
check('tape markup exists', bundle.includes("className: 'iw-tape'"))
check('renderer localises date rows', bundle.includes('fmtDayMonth(note.createdAt)'))

for (const dispose of disposers) {
  try {
    dispose()
  } catch {
    /* ignore */
  }
}

console.log(failures === 0 ? '\nALL v0.7 CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exitCode = failures === 0 ? 0 : 1