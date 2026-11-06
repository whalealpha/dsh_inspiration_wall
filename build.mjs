import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const files = [
  '00-prelude.js',
  '05-css.js',
  '10-store.js',
  '20-ui.js',
  '30-wall.js',
  '40-compose.js',
  '45-detail.js',
  '47-complete.js',
  '50-settings.js',
  '60-insights.js',
  '70-app.js',
]

const body = files
  .map((file) => {
    const source = readFileSync(join(root, 'src', file), 'utf8')
    return `\n/* ================= ${file} ================= */\n${source.trimEnd()}\n`
  })
  .join('')

const client = `/* 鐏垫劅澧?鈥?browser half. Assembled from src/ by build.mjs. */
window.__ModuleLoader__.load({
  id: 'dsh-inspiration-wall',
  factory(require) {
    const React = require('react')
${body}
  },
})
`

writeFileSync(join(root, 'client.js'), client, 'utf8')
console.log(`built client.js (${client.length} bytes)`)
