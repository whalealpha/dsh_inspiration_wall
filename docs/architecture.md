# Architecture

A Cordis bundle for dsh with two halves that never share a process boundary:

```
┌──────────────────────────── browser ────────────────────────────┐
│ client.js   (prebuilt, React)                                    │
│  App ─┬─ WallPage / DetailModal / ComposeModal / InsightsPage    │
│       └─ store (createStore + useStore)                          │
│                          │ fetch                                  │
└──────────────────────────┼───────────────────────────────────────┘
                           │  /api/inspiration/{ping,state,rpc,media}
┌──────────────────────────┼───────────────────────────────────────┐
│ index.js   (host, Cordis plugin, inject: ['webServer'])          │
│  notes.json / settings.json / media/  ──  sessionPersistence     │
└──────────────────────────────────────────────────────────────────┘
```

## Host half — `index.js`

A Cordis plugin exported as `{ inject: ['webServer'], apply }`.

`inject: ['webServer']` is load-order critical: the plugin registers its HTTP routes against the dsh web server, so
Cordis must wait until that service exists. Registering from `apply` without the injection made every route answer 404
on a cold start (fixed in 0.3.0).

Responsibilities:

- **Persistence.** Loads `notes.json` and `settings.json` from the data directory (default `~/.dsh/inspiration`,
  overridable via plugin config `dataDir`), migrates legacy shapes on read, and writes atomically on change.
- **Sanitizing.** Every write is normalized (`sanitizeNote` / `sanitizeRecords` / `sanitizeMedia`): fixed fields,
  length caps, and an allow-list for attachment types (`audio | image | video | file`).
- **Media storage.** Uploads land in the media directory (default `<dataDir>/media`, or `settings.mediaDir`), with a
  generated name. Downloads are path-checked against the allowed roots.
- **Usage aggregation.** Reads this profile's session logs through `sessionPersistence`, aggregates
  `assistant/message.usage` per local day and per model, and caches the parse per session revision.
- **OS integration.** `openPath` opens an attachment with the system default application, reveals it in the file
  manager, or hands a local media URL to the OS browser.

### HTTP surface

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/inspiration/ping` | Liveness — `{"ok":true}` |
| `GET` | `/api/inspiration/state` | Full state: settings + notes |
| `POST` | `/api/inspiration/rpc` | JSON-RPC-ish `{ op, payload }` |
| `POST` | `/api/inspiration/media?name=…` | Upload raw bytes, returns the stored path |
| `GET` | `/api/inspiration/media?path=…` | Serve an attachment (path-checked) |

`POST /rpc` operations:

| `op` | Payload | Result |
| --- | --- | --- |
| `state` | — | `{ settings, notes }` |
| `saveNote` | `{ note }` | `{ note }` (created or updated, sanitized) |
| `deleteNote` | `{ id }` | `{ deleted }` |
| `saveSettings` | `{ settings }` | `{ settings }` |
| `storage` | — | `{ dataDir, mediaRoot, notes, media }` |
| `usage` | `{ from, to }` (`YYYY-MM-DD`) | `{ from, to, days[], totals, models[], sessions, scanned, cached }` |
| `clearUsageCache` | — | `{ cleared }` |
| `openPath` | `{ path, mode }` (`open` \| `browser` \| `reveal`) | `{ opened, path, url? }` |

Requests carrying a foreign `Origin` are rejected with 403 (`cross-origin-not-allowed`); local scripts without an
`Origin` header are allowed. Body limits: 8 MB for `/rpc`, 200 MB for media uploads.

## Client half — `client.js`

One ES module registered through `window.__ModuleLoader__.load({ id, factory })`, where `factory(require)` receives
`React`. The bundle is **generated** from `src/*.js` by `build.mjs`, in this order:

| File | Contents |
| --- | --- |
| `00-prelude.js` | Constants, date/number formatting, `summarizeText`, expected-date state machine, `costOfUsage` |
| `05-css.js` | `--iw-*` design tokens derived from `--dsw-alias-*`, component styles (a single `<style>` element) |
| `10-store.js` | `api` (fetch wrappers), `createStore`, `useStore` |
| `20-ui.js` | Icons, Stars, CatChip, Segmented, buttons, audio player, media strip/file chip, charts, modal, drag hook, context menu, lightbox, `ExpectField` |
| `30-wall.js` | `WallPage`, `WallCard`, sorting, search, filters |
| `40-compose.js` | `ComposeModal` — editor, recording, transcription, attachments, drag and drop |
| `45-detail.js` | `DetailModal` — status bar, media, timeline, record composer, attachment actions |
| `47-complete.js` | `CompleteModal` — completion time, result links, retrospective |
| `50-settings.js` | `SettingsModal` |
| `60-insights.js` | `InsightsPage`, `UsagePanel`, `StoragePanel`, charts, export |
| `70-app.js` | `ZH` / `EN` dictionaries, `ErrorBoundary`, `App`, sidebar icon, `apply` |

Splitting is build-time only: separate files cannot `require('react')` independently inside the module loader factory,
so `build.mjs` concatenates them into a single module body. `client.js` is committed because the dsh loads it
directly from the installed directory.

### Slots

The panel registers into two dsh slots:

```js
ctx.slots.inject('sidebar.panellist', () =>
  ctx.slots.register({ name: 'sidebar.panellist', id: 'inspiration', order: 20, label: () => T('panel') }, WallIcon))

ctx.slots.inject('main', () =>
  ctx.slots.register({ name: 'main', key: 'inspiration', inject: () => ({ store }) }, App))
```

- `sidebar.panellist` is a list slot: a fresh `id` adds an entry beside the shipped ones. `order: 20` places it after
  `plugins` (0) and `schedules` (10). The `label` is a thunk so the locale can change without re-registering.
- `main` is a keyed slot: registering the key `inspiration` provides the panel body the sidebar entry opens.

Localization uses the dsh locale service: `ctx.locale.register(NS, { zh, en })` plus `ctx.locale.bind(NS)` to get a
`T(key, params)` function. `T` falls back to the Chinese dictionary and then to the key itself, so a missing string is
visible rather than fatal.

### Palettes are dsh theme overrides

`inject` includes `theme`. A palette is a table of 14 dsh alias tokens, each with a light and a dark value:

```js
ctx.theme.overrideTokens('dsh-inspiration-wall', {
  '--dsw-alias-bg-base': { light: '#f7f4ee', dark: '#12100d' },
  '--dsw-alias-brand-primary': { light: '#d97706', dark: '#e08a3c' },
  // …12 more
})
```

The returned disposer is kept so the override can be replaced cleanly. Because the override layer is a *token* layer
rather than a registered theme, it composes with whatever theme the user has selected and keeps working when they switch
between light, dark and system — the panel re-reads `ctx.theme.getTheme().active.colorScheme` and marks the root with
`data-scheme`, and every `--iw-*` token is defined in terms of `--dsw-alias-*`, so the wall never drifts from the rest of
the app.

### Locale

`inject` includes `locale`. `apply` reads `ctx.locale.getLocale().active`, exposes it through `setLang()` (Chinese for
`zh*`, English otherwise), and re-publishes the store when `ctx.locale.subscribe` fires, so switching the dsh language
re-renders the panel immediately. Stored data keeps stable Chinese category keys and only the label is translated.

## Data flow

1. `App` mounts → `store.load()` → `GET /state` (with retry on boot).
2. Any mutation goes through `api.rpc(op, payload)`; the host answers with the authoritative sanitized object, and the
   store replaces its state from the response. There is no optimistic local schema: the host is the source of truth.
3. Attachments are uploaded first (`POST /media`), then the returned path is stored in the note/record payload.
4. Voice: `MediaRecorder` → `blob` → upload as `audio/webm` → optional local transcription (WAV re-encode at 16 kHz for
   the speech service) → transcript stored on the media item; the summary is derived locally.

## Deliberate constraints

- **No model calls from the panel.** Summaries use a local extractive algorithm; transcription uses your local speech
  service. Nothing else leaves the machine, and panel operations never spend tokens.
- **No cross-origin requests.** The client only talks to its own `/api/inspiration/*` routes.
- **No client-side schema drift.** Every write round-trips through the host sanitizer, so a hand-edited `notes.json`
  cannot inject unknown fields into the UI.
- **Media never inlined.** Attachments are referenced by path and served over HTTP, so `notes.json` stays small.

## Tests

| Script | What it guards |
| --- | --- |
| `check.mjs` | i18n key coverage (both dictionaries) and pure-function unit checks |
| `scripts/verify-v05.mjs` | Summarizer cap, expected-date states, drag helpers, attachment menu, `openPath` guard, no outbound fetch |
| `scripts/verify-i18n.mjs` | Both languages render without leaks |
| `scripts/verify-v07.mjs` | Seven palettes expose all 14 alias tokens in both modes, English/Chinese formatting, title fallback, mono score, three-column layout |
| `scripts/verify-v051.mjs` | Browser-open fallback chain, `--iw-accent-ink` on every palette, cyber token set, removal of the link input |
| `scripts/ui-smoke.mjs` | Renders each component with a stub React and asserts key strings/markup |
| `scripts/label-check.mjs` | Button wording and single-completion-entrypoint rules |
| `scripts/host-selftest.mjs` | Host half: `inject` contains `webServer`, routes register |
| `scripts/verify-v05-api.py` | Live API round-trip (needs a running dsh) |