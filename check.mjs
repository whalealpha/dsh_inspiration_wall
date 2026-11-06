import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const srcDir = join(root, 'src')
const files = ['00-prelude.js', '05-css.js', '10-store.js', '20-ui.js', '30-wall.js', '40-compose.js', '45-detail.js', '47-complete.js', '50-settings.js', '60-insights.js', '70-app.js']

const app = readFileSync(join(srcDir, '70-app.js'), 'utf8')
const zhBlock = app.slice(app.indexOf('const ZH = {'), app.indexOf('const EN = {'))
const enBlock = app.slice(app.indexOf('const EN = {'), app.indexOf('let T = (key) => key'))
const keysOf = (block) => new Set([...block.matchAll(/^\s{2}([A-Za-z][A-Za-z0-9]*):\s/gm)].map((match) => match[1]))
const zhKeys = keysOf(zhBlock)
const enKeys = keysOf(enBlock)

const used = new Set()
for (const file of files) {
  const text = readFileSync(join(srcDir, file), 'utf8')
  for (const match of text.matchAll(/\bT\('([A-Za-z][A-Za-z0-9]*)'/g)) used.add(match[1])
  for (const match of text.matchAll(/\.bind\(NS\)\(\)/g)) void match
}
/* keys referenced through lookup tables (palettes, categories, presets) */
for (const file of files) {
  const text = readFileSync(join(srcDir, file), 'utf8')
  for (const match of text.matchAll(/\bi18n: '([A-Za-z][A-Za-z0-9]*)'/g)) used.add(match[1])
}
/* keys referenced through lookup tables rather than literals */
const preludeText = readFileSync(join(srcDir, '00-prelude.js'), 'utf8')
for (const match of preludeText.matchAll(/'(palette[A-Z][A-Za-z]*|cat[A-Z][A-Za-z]*|starHint\d|starReadonly)'/g)) {
  used.add(match[1])
}

const missingZh = [...used].filter((key) => !zhKeys.has(key))
const missingEn = [...used].filter((key) => !enKeys.has(key))
const unused = [...zhKeys].filter((key) => !used.has(key))

console.log('used keys:', used.size)
console.log('ZH keys:', zhKeys.size, '| EN keys:', enKeys.size)
console.log('missing in ZH:', missingZh.length ? missingZh.join(', ') : 'none')
console.log('missing in EN:', missingEn.length ? missingEn.join(', ') : 'none')
console.log('unused ZH keys:', unused.length ? unused.join(', ') : 'none')

const prelude = readFileSync(join(srcDir, '00-prelude.js'), 'utf8')
const exportsList = [
  'fmtTokens', 'fmtCost', 'startOfWeek', 'weekSeries', 'weekLabel', 'fmtDate', 'fmtDateTime',
  'relativeInterval', 'implementedAt', 'noteIsImplemented', 'latestRecord', 'completionRecord',
  'dayString', 'rangeDays', 'costOfUsage', 'shortDay', 'fmtBytes', 'monthStartString', 'todayString',
]
const helpers = new Function('React', prelude + '\nreturn { ' + exportsList.join(', ') + ' }')({ createElement() {} })
const ok = []
ok.push(['fmtTokens', helpers.fmtTokens(1234), '1.2K'])
ok.push(['fmtTokens', helpers.fmtTokens(1280000), '1.28M'])
ok.push(['fmtCost', helpers.fmtCost(0.0042), '¥0.0042'])
ok.push(['fmtDate', helpers.fmtDate('2026-11-05T09:42:00+08:00'), '11月05日'])
ok.push(['fmtBytes', helpers.fmtBytes(1536), '1.5 KB'])
ok.push(['rangeDays', helpers.rangeDays('2026-11-01', '2026-11-03').length, 3])
ok.push(['shortDay', helpers.shortDay('2026-11-05'), '11/05'])
const note = {
  title: '',
  body: '',
  createdAt: '2026-11-05T09:42:00+08:00',
  records: [{ kind: 'complete', implementedAt: '2026-11-08T09:42:00+08:00', createdAt: '2026-11-08T09:42:00+08:00', text: '', results: [] }],
}
ok.push(['relativeInterval', helpers.relativeInterval(note), 3])
ok.push(['noteIsImplemented', helpers.noteIsImplemented(note), true])
ok.push(['costOfUsage', helpers.costOfUsage(1000000, 100000, 400000, { priceInput: 2, priceOutput: 8, priceCache: 1 }), 3.2])
for (const [name, value, expected] of ok) {
  const pass = expected === null || JSON.stringify(value) === JSON.stringify(expected)
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name} = ${JSON.stringify(value)}${expected === null ? '' : ` (expected ${JSON.stringify(expected)})`}`)
}
