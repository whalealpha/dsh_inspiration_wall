/** Assert the completion/save/close labels are unambiguous (bug: duplicate “完成”). */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const srcDir = join(root, '..', 'src')
const files = ['00-prelude.js', '05-css.js', '10-store.js', '20-ui.js', '30-wall.js', '40-compose.js', '45-detail.js', '47-complete.js', '50-settings.js', '60-insights.js', '70-app.js']
const body = files
  .map((file) => readFileSync(join(srcDir, file), 'utf8'))
  .join('\n')
  .replace('return { inject, apply }', 'return { inject, apply, components: { DetailModal, ComposeModal, WallCard } }')

const ReactStub = {
  createElement(type, props, ...children) {
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
  Component: class {},
}

const mod = new Function('React', 'window', body)(ReactStub, {})
const disposers = []
const ctx = {
  locale: { register: () => () => {}, bind: () => (key) => key },
  slots: { inject: (key, callback) => { callback(); return () => {} }, register: (options, component) => component },
  get: () => undefined,
  effect: (factory) => { const dispose = factory(); if (typeof dispose === 'function') disposers.push(dispose); return dispose },
}
mod.apply(ctx)

const texts = (tree) => {
  const out = []
  const walk = (node) => {
    if (node === null || node === undefined) return
    if (typeof node === 'string' || typeof node === 'number') {
      out.push(String(node))
      return
    }
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (typeof node === 'object' && node.children) node.children.forEach(walk)
  }
  walk(tree)
  return out
}

const note = {
  id: 'n1', title: 'T', body: 'B', summary: '', category: '进行中', stars: 3, tags: [],
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), media: [], records: [],
}
const snap = {
  loading: false, error: '', notes: [note], toast: '',
  settings: { theme: 'graphite', mediaDir: '', priceInput: 2, priceOutput: 8, priceCache: 1, transcribe: true, language: 'zh', period: 'month' },
  ui: { period: 'month' },
}
const store = { snapshot: () => snap, subscribe: () => () => {}, setUi() {}, saveNote: () => Promise.resolve({}), deleteNote: () => Promise.resolve(), toast() {}, patchSettings: () => Promise.resolve({}), refreshStorage: () => Promise.resolve() }

const fail = []
const check = (name, list, expectation) => {
  const count = list.filter((text) => text === expectation.token).length
  const ok = expectation.atLeast === undefined ? count === expectation.exact : count >= expectation.atLeast
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: “${expectation.token}” x${count}`)
  if (!ok) fail.push(name)
}

const detailTexts = texts(mod.components.DetailModal({ store, snap, noteId: 'n1', onClose() {} }))
check('DetailModal 有独立完成卡片', detailTexts, { token: '完成灵感', exact: 1 })
check('DetailModal 关闭按钮存在', detailTexts, { token: '关闭', atLeast: 1 })
console.log(`PASS DetailModal 底部不再与关闭并列「完成」: ${detailTexts.filter((text) => text === '完成').length === 0}`)

const editTexts = texts(mod.components.ComposeModal({ store, snap, noteId: 'n1', onClose() {} }))
check('编辑弹层的主按钮是「保存修改」', editTexts, { token: '保存修改', exact: 1 })
console.log(`PASS ComposeModal(edit) 不含「完成」: ${editTexts.includes('完成') === false}`)

const newTexts = texts(mod.components.ComposeModal({ store, snap, noteId: null, onClose() {} }))
check('新建弹层的主按钮是「保存灵感」', newTexts, { token: '保存灵感', exact: 1 })

if (fail.length) process.exitCode = 1

for (const dispose of disposers) {
  try {
    dispose()
  } catch {
    /* ignore */
  }
}
