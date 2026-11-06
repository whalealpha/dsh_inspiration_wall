/**
 * Headless UI smoke test: runs the assembled browser half with a tiny React
 * stub so component bodies execute against real seeded data. Catches runtime
 * ReferenceErrors that `node --check` cannot see (hooks, helpers, JSX shape).
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
const body = files.map((file) => readFileSync(join(srcDir, file), 'utf8')).join('\n')
  // Expose the component functions for direct invocation (they are hoisted
  // function declarations inside the module body).
  .replace(
    'return { inject, apply }',
    'return { inject, apply, components: { App, WallPage, WallCard, DetailModal, CompleteModal, ComposeModal, SettingsModal, InsightsPage, UsagePanel, WallIcon, ExpectField, DropOverlay, ContextMenu, Lightbox, Attachment, DetailMedia, RecordMedia } }',
  )

const calls = []
const ReactStub = {
  createElement(type, props, ...children) {
    calls.push(typeof type === 'string' ? type : (type && type.name) || 'component')
    return { type, props: props || {}, children }
  },
  useState(initial) {
    return [typeof initial === 'function' ? initial() : initial, () => {}]
  },
  useEffect() {},
  useMemo(factory) {
    return factory()
  },
  useRef(value) {
    return { current: value }
  },
  useCallback(fn) {
    return fn
  },
  Component: class Component {
    constructor(props) {
      this.props = props
    }
  },
}
const windowStub = { AudioContext: undefined, OfflineAudioContext: undefined }

const factory = new Function('React', 'window', body)
const moduleExports = factory(ReactStub, windowStub)
const { apply } = moduleExports

const listeners = []
const fakeStore = {
  snapshot: () => ({ ui: { view: 'wall', sort: 'date', category: '全部', query: '', period: 'month' }, toast: '', loading: false, error: '', notes: [], settings: {}, storage: null }),
  subscribe: (listener) => {
    listeners.push(listener)
    return () => {}
  },
  setUi() {},
  patchSettings() {
    return Promise.resolve({})
  },
  saveNote() {
    return Promise.resolve({})
  },
  deleteNote() {
    return Promise.resolve()
  },
  toast() {},
  refreshStorage() {
    return Promise.resolve()
  },
  load() {
    return Promise.resolve()
  },
  fetchUsage() {
    return Promise.resolve({ from: '', to: '', days: [], totals: { input: 0, output: 0, cacheRead: 0, total: 0 }, models: [], sessions: 0 })
  },
  transcribe() {
    return Promise.resolve('')
  },
  pickDirectory() {
    return Promise.resolve(null)
  },
}

const effects = []
const slots = []
const ctx = {
  locale: {
    register() {
      return () => {}
    },
    bind() {
      return (key) => key
    },
    getLocale() {
      return { active: 'zh', locales: [], revision: 1 }
    },
    subscribe() {
      return () => {}
    },
  },
  theme: {
    getTheme() {
      return { active: { id: 'light', colorScheme: 'light', tokens: {} }, themes: [], revision: 1 }
    },
    overrideTokens() {
      return () => {}
    },
  },
  slots: {
    inject(key, callback) {
      slots.push(key)
      callback()
      return () => {}
    },
    register(options, component) {
      slots.push(`${options.name}:${options.id || options.key}`)
      return component
    },
  },
  get() {
    return undefined
  },
  effect(factoryFn) {
    const disposer = factoryFn()
    const cleanup = typeof disposer === 'function' ? disposer : () => {}
    effects.push(cleanup)
    return cleanup
  },
  uiWorkspace: { pickDirectory: () => Promise.resolve(null) },
}

apply(ctx)
console.log('slots registered:', slots.join(' | '))

const note = {
  id: 'n_smoke',
  title: '把会话上下文画成可缩放的时间轴',
  body: '每次工具调用的耗时、token 消耗和缓存命中都铺在一条时间轴上。',
  summary: '语音概要示例',
  category: '进行中',
  stars: 5,
  tags: ['时间轴'],
  createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  expectedAt: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
  updatedAt: new Date().toISOString(),
  media: [
    { id: 'm1', type: 'image', path: 'C:/x/a.png', mime: 'image/png', size: 1024, duration: 0, caption: '截图.png', transcript: '' },
    { id: 'm2', type: 'audio', path: 'C:/x/a.webm', mime: 'audio/webm', size: 2048, duration: 47, caption: '语音备忘', transcript: '转写内容' },
    { id: 'm3', type: 'file', path: 'C:/x/a.pdf', mime: 'application/pdf', size: 4096, duration: 0, caption: '方案.pdf', transcript: '' },
  ],
  records: [
    { id: 'r1', createdAt: new Date().toISOString(), kind: 'progress', text: '先画了草图。', implementedAt: '', results: [{ label: '草图', url: 'https://example.com/sketch' }], media: [{ id: 'rm1', type: 'image', path: 'C:/x/b.png', mime: 'image/png', size: 512, duration: 0, caption: '草图.png', transcript: '' }] },
  ],
}

const snap = {
  loading: false,
  error: '',
  notes: [note],
  settings: { palette: 'paper', mediaDir: '', priceInput: 2, priceOutput: 8, priceCache: 0.04, transcribe: true, language: 'zh', period: 'month' },
  storage: { dataDir: 'C:/data', mediaRoot: 'C:/data/media', notes: 1, media: 3 },
  ui: { view: 'wall', sort: 'date', category: '全部', query: '', period: 'month', tokenRange: { preset: 'month', from: '2026-11-01', to: '2026-11-05' } },
  toast: '',
}

const C = moduleExports.components

const probe = (name, fn) => {
  calls.length = 0
  try {
    const tree = fn()
    if (!tree) throw new Error('component returned no tree')
    console.log(`PASS ${name} (types: ${[...new Set(calls)].join(',')})`)
    return tree
  } catch (error) {
    console.log(`FAIL ${name}: ${error && error.stack ? error.stack.split('\n')[0] : error}`)
    process.exitCode = 1
    return undefined
  }
}

probe('WallIcon', () => C.WallIcon({ size: 20, active: true }))
probe('WallCard', () => C.WallCard({ note, onOpen() {}, onComplete() {} }))
probe('WallPage', () => C.WallPage({ store: fakeStore, snap, onRecord() {}, onInsights() {} }))
probe('DetailModal', () => C.DetailModal({ store: fakeStore, snap, noteId: note.id, onClose() {} }))
probe('CompleteModal', () => C.CompleteModal({ store: fakeStore, snap, noteId: note.id, onClose() {} }))
probe('ComposeModal (new)', () => C.ComposeModal({ store: fakeStore, snap, noteId: null, onClose() {} }))
probe('ComposeModal (edit)', () => C.ComposeModal({ store: fakeStore, snap, noteId: note.id, onClose() {} }))
probe('SettingsModal', () => C.SettingsModal({ store: fakeStore, snap, onClose() {} }))
probe('InsightsPage', () => C.InsightsPage({ store: fakeStore, snap, onBack() {} }))
probe('UsagePanel', () => C.UsagePanel({ store: fakeStore, snap }))
probe('ExpectField', () => C.ExpectField({ value: note.expectedAt, onChange() {} }))
probe('ExpectField (empty)', () => C.ExpectField({ value: '', onChange() {} }))
probe('DropOverlay', () => C.DropOverlay({}))
probe('ContextMenu', () => C.ContextMenu({ x: 20, y: 20, title: 'x.png', items: [{ key: 'a', label: 'A', onSelect() {} }, { separator: true }, { key: 'b', label: 'B', danger: true, onSelect() {} }], onClose() {} }))
probe('Lightbox (image)', () => C.Lightbox({ item: note.media[0], onClose() {}, onOpenWith() {} }))
probe('Lightbox (file)', () => C.Lightbox({ item: note.media[2], onClose() {}, onOpenWith() {} }))
probe('Attachment', () => C.Attachment({ item: note.media[0], onPreview() {}, onMenu() {}, children: null }))
probe('DetailMedia', () => C.DetailMedia({ media: note.media, onPreview() {}, onMenu() {} }))
probe('RecordMedia', () => C.RecordMedia({ media: note.records[0].media, onPreview() {}, onMenu() {} }))
probe('App', () => C.App({ store: fakeStore }))

/* ---- v0.5 behaviour: the card text is the compressed summary, not the body -- */
const card = C.WallCard({ note, onOpen() {}, onComplete() {} })
const flatten = (node) => {
  if (node === null || node === undefined || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flatten).join(' ')
  if (node.children) return flatten(node.children)
  return ''
}
const cardText = flatten(card)
const cardOk = cardText.includes('summaryLabel') || cardText.includes('语音概要')
console.log(`${cardOk ? 'PASS' : 'FAIL'} WallCard prefers the summary line`)
if (!cardOk) process.exitCode = 1

for (const cleanup of effects) {
  try {
    cleanup()
  } catch {
    /* ignore */
  }
}
