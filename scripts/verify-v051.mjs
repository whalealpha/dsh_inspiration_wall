/**
 * v0.5.1 checks — the four fixes from the user's review:
 *   1. "Open in browser" must actually reach a browser (window.open → host spawn).
 *   2. The check mark inside the completion card must stay visible on every palette.
 *   3. Cyberpunk palette follows the cold-black / electric-cyan reference card.
 *   4. The optional result-link input is gone from the record composer.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const read = (rel) => readFileSync(join(root, rel), 'utf8')

const css = read('src/05-css.js')
const detail = read('src/45-detail.js')
const host = read('index.js')
const app = read('src/70-app.js')
const wall = read('src/30-wall.js')
const store = read('src/10-store.js')

let failures = 0
function check(label, condition) {
  if (condition) {
    console.log(`PASS ${label}`)
  } else {
    failures += 1
    console.log(`FAIL ${label}`)
  }
}
const prelude = read('src/00-prelude.js')
const has = (haystack, needle) => haystack.indexOf(needle) >= 0

/* ---------------------------------------------------- 1. browser opening */
check('menu item dispatches through the browser handler', has(detail, 'onSelect: () => handlers.browser(item)'))
check('browser handler tries window.open first', has(detail, "window.open(url, '_blank')"))
check('browser handler falls back to the host opener', has(detail, "store.openFile(item.path, 'browser')"))
check('browser handler keeps an anchor fallback', has(detail, "anchor.target = '_blank'"))
check('host accepts browser mode', has(host, "mode === 'browser'"))
check('host builds the media url from the request origin', has(host, '/api/inspiration/media?path=${encodeURIComponent(target)}'))
check('host remembers the request origin', has(host, 'requestOrigin = `http://${req.headers.host'))
check('store.openFile forwards the mode', has(store, "api.rpc('openPath', { path, mode: mode || 'open' })"))

/* ------------------------------------------------ 2. completion card icon */
/* accent fills pair `brand-primary` with a label colour, so the ink now comes
   from the palette tokens (src/00-prelude.js) instead of per-theme overrides. */
const paletteBlock = prelude.slice(prelude.indexOf('const PALETTES = {'), prelude.indexOf('const PALETTE_IDS'))
check('accent fills pair a brand colour with a readable label', has(css, 'background: var(--iw-text);') && has(css, 'color: var(--iw-bg);'))
for (const palette of ['paper', 'graphite', 'mist', 'sand', 'midnight', 'cyber', 'ember']) {
  const at = paletteBlock.indexOf(`${palette}: {`)
  const slice = paletteBlock.slice(at, at + 2600)
  check(`${palette} defines brand + label tokens for both modes`, has(slice, '--dsw-alias-brand-primary') && has(slice, '--dsw-alias-label-primary') && has(slice, 'light: {') && has(slice, 'dark: {'))
}
check('done state forces a white check', has(css, '.iw-complete-card.is-done .iw-complete-card-icon { background: var(--iw-success); color: #fff; }'))
check('dead per-panel theme layer is gone', !has(css, '.iw-theme-'))

/* ----------------------------------------------------- 3. cyber palette */
const cyberStart = paletteBlock.indexOf('cyber: {')
const cyberBlock = paletteBlock.slice(cyberStart, cyberStart + 1800).toLowerCase()
for (const hex of ['#0a0f14', '#38cdf8', '#647488', '#f8fafc']) {
  check(`cyber palette carries ${hex}`, has(cyberBlock, hex))
}
check('cyber drops the old neon magenta', !has(css + prelude, '#FF2E97'))
check('cyber drops the old violet accent', !has(css + prelude, '#00F0FF'))
check('cyber drops the old purple surface', !has(css + prelude, '#262040'))
check('cyber swatch matches the colour card', has(prelude, "dot: '#38cdf8'"))

/* --------------------------------------------------- 4. link input removed */
check('detail no longer holds a record link state', !has(detail, 'recordUrl'))
check('detail no longer renders the link placeholder', !has(detail, 'recordUrlPlaceholder'))
check('records are saved without a synthetic result', has(detail, 'results: [],'))
check('i18n dropped the link placeholder', !has(app, 'recordUrlPlaceholder'))

/* ------------------------------------------------------------- i18n keys */
check('zh knows openedInBrowser', has(app, "openedInBrowser: '已在浏览器中打开'"))
check('en knows openedInBrowser', has(app, "openedInBrowser: 'Opened in your browser'"))

/* --------------------------------------------------------- local only */
check('no model call in the changed sources', !/fetch\(['"]https?:/.test(detail + host))

if (failures) {
  console.log(`\n${failures} check(s) failed`)
  process.exit(1)
}
console.log('\nall v0.5.1 checks passed')