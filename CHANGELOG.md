# Changelog

All notable changes to this bundle. Versions follow `MAJOR.MINOR.PATCH` loosely: `MINOR` for a new capability,
`PATCH` for fixes and small polish.

## 0.7.5 — 2026-11-06

### Fixed
- A UTF-8 BOM at the top of `package.json` (left behind by a Windows editor) made the plugin
  manager reject the package as invalid JSON, so the host never loaded the plugin: the sidebar
  entry and the wall disappeared after a restart. The BOM is gone and the sources stay BOM-free.
- The plugin no longer installs a global font. `@deepseek-ai/dsh-client-ui-theme` already ships
  正文字体 / 代码字体 / 终端字体 settings (`textFontFamily`, `codeFontFamily`,
  `terminalFontFamily` → `--dsh-font-family-text|code|terminal`), and an injected stylesheet
  cannot beat the shell's own inline value for those variables; the wall simply inherits them.

### Added
- `docs/introduction.md`: a plain-language introduction — what the panel is for, which
  problems it removes, its nine distinguishing features, quick start, and what it does not
  do — with one real screenshot under `docs/images/`.
- The introduction is linked from the README's Documentation section.

### Notes
- The READMEs keep a single picture - a real screenshot of the wall - and both open with a
  notice that this is an unofficial project. Markdown docs say dsh instead of the full
  product name.

## 0.7.4 — 2026-11-06

The picker offers three palettes again.

### Changed
- **Only Paper, Graphite and Ember are selectable.** The other four (Mist, Sand,
  Midnight, Cyber) keep their token definitions in the source - nothing is
  deleted - but the appearance popover and the settings row no longer list them,
  so the choice stays small and deliberate.
- A palette that was already stored as one of the hidden four snaps to its
  closest sibling on load and on save (Mist/Midnight/Cyber to Graphite, Sand to
  Paper), so the panel can never sit on a theme the picker cannot show.

## 0.7.3 — 2026-11-06

The tape follows the palette instead of staying black.

### Changed
- **The voice/video tape is now tinted from the active palette accent.** It used
  to be a fixed ink block (`#1f1b16`), which only made sense on warm paper where
  a deep stamp is the one dark object on the card. In every other palette it
  stayed black and read as a hole. It is now
  `color-mix(in srgb, var(--iw-accent) 9%, var(--iw-surface))` in light schemes
  and `14%` in dark ones, with an accent-tinted 1px ring, an accent waveform for
  the played span and an accent-derived time code. Switching palettes recolours
  the tape along with the rest of the panel.
- This deliberately supersedes the "single amber accent" rule for media blocks:
  a tape is a media object, so it carries the palette's own accent rather than
  pretending to be ink on paper.

## 0.7.2 — 2026-11-06

Dark-mode correction for the tape moment.

### Fixed
- **The voice/video tape turned into a black hole on dark palettes.** The
  reference design is authored against warm paper, where a deep-ink block is the
  one high-contrast object on the card. The dark override painted it `#080706`
  on a `#15171b` card - 1.10:1, no readable edge - leaving only a dim amber
  waveform floating in the void. On dark schemes the tape is now lifted off the
  card with `color-mix(text 8%, surface)`, gets a 1px `rgba(255,255,255,.10)`
  inner ring, and its waveform, play ring and time code are brightened. Light
  schemes keep the original ink block unchanged.
- **The card record line was spread across the whole card.** `记录 · 昨天` used
  the detail timeline's `space-between` header, so the separator drifted into
  the middle. It is now one quiet left-aligned 12px line under a hairline, and
  the record body/link stay in the detail view where they belong.

## 0.7.1 — 2026-11-06

Localization pass: the panel now follows the dsh language everywhere, not
only in the places that happened to be wired up.

### Fixed
- **Token usage range presets showed English in a Chinese UI** — `Today` and
  `This week` were rendered from two dictionary keys (`today`, `thisWeek`) that
  the 0.7.0 unused-key cleanup had removed, so `T()` fell back to the raw key.
  Both keys are restored, and the presets now carry an explicit `i18n` field
  instead of a value-derived lookup.
- **`T()` treated a translation equal to its key as missing.** English
  `yesterday` returned the Chinese word because the wrapper compared
  `value === key` and jumped straight to the Chinese table. It now resolves
  through the active language table first.
- **Detail status chips rendered raw Chinese categories** (`未开始 / 进行中 /
  已实现`) in the English UI; they go through `catLabel()` now.
- **The completion card label** used hard-coded full-width parentheses around a
  separately translated "optional"; it is a single `completionReviewOptional`
  key.

### Changed
- Every remaining hard-coded string moved into the dictionary: interval bins,
  Markdown export (headings, metadata, record titles, file name), storage
  counts in settings and insights, toast/error messages, file-name fallback,
  image `alt`, chart `aria-label`s and the recorder error.
- `check.mjs` also recognises keys referenced through `i18n:` lookup tables, so
  a key used only indirectly is no longer reported as unused.
- New regression script `scripts/verify-i18n.mjs` renders every panel in both
  languages and fails on: Chinese leaking into the English UI, raw camelCase
  keys in the Chinese UI, dictionary size/symmetry drift, empty values or
  Chinese inside the English dictionary, and any Chinese literal outside the
  dictionary.

## 0.7.0 — 2026-11-06

### Changed
- **Palettes now re-theme the whole dsh.** The seven palettes (Paper, Graphite, Mist, Sand, Midnight, Cyber, Ember)
  are no longer panel-local CSS skins: each maps to the dsh alias tokens (`--dsw-alias-*`, light and dark) and is
  applied with `ctx.theme.overrideTokens('dsh-inspiration-wall', …)`. Choosing a palette in the wall changes the colours
  of the entire dsh window. Paper (warm paper + amber accent) is the new default.
- **The wall's own colours derive from those tokens** instead of hard-coded hex values, so the panel always matches the
  active dsh theme, including light/dark switching.
- **English UI.** The panel follows the dsh locale: Chinese and English are shipped, anything else falls back to
  English. `fmtDate` / `fmtDateTime` / `fmtRel` / category labels / star hints / all copy are localized at runtime.
- **Desk-workbench polish pass** (per the un-slop review): one amber accent used in exactly three places, palette dots
  folded into a sun-button popover, stars reduced to a mono `n/5` readout, every pill removed, meta row normalised to a
  32px baseline (status → due date → record count), recording-tape treatment for audio and video (mono timecode,
  measured waveform, no fake bars), tabular numerals everywhere, 4px spacing grid, and the weekly review turned into a
  balancing third-column card with numeric copy.
- **Display-only title fallback.** A note without a title shows the first sentence of its body on the card; the stored
  title is untouched.
- Removed the optional result-link input from the record composer — progress records carry text and attachments only.

### Migration
- `settings.json` `theme` → `palette`; an unknown or missing value migrates to `paper` (a previously saved valid theme
  name is reused when possible). No note data is touched.
- Category values keep their original keys; only their labels are translated.

## 0.5.1 — 2026-11-06

Fixes reported after 0.5.0.

- **Open in browser actually opens.** Right-click → *Open in browser* used `window.open`, which the dsh window
  blocks (it returns `null` and nothing happens). It now tries `window.open`, then asks the host to hand the media URL
  to the OS browser (`openPath` with `mode: 'browser'`, served through the local HTTP route), then falls back to a
  synthetic `<a target="_blank">` click. The menu item reports success with a toast.
- **Completion checkmark is visible on Graphite.** `--iw-accent-ink` was defined for Ember only, so the ✓ on the
  completion card inherited a dark fallback over the blue accent. The token is now defined in the base theme
  (`#FFFFFF` for graphite/mist/sand, dark ink for midnight/cyber/ember).
- **Cyber palette recoloured** to the supplied cold-black-metal-neon card: `#0A0F14` deep space black, `#1F2937` cold
  grey blue, `#38CDF8` electric cyan, `#647488` metallic silver, `#F8FAFC` cold white. Retuned cards, borders, chips,
  primary button gradient and category colours; stars use the cyan accent instead of the old magenta.
- **Removed the optional result-link input** from the note detail's record composer. Records are for progress,
  blockers and thoughts; result links belong to the completion form.

## 0.5.0 — 2026-11-06

- **Voice notes no longer duplicate their transcript.** The local summarizer (`summarizeText`) distils a short summary
  from the transcript: sentence split → 2-gram term frequency → position weighting → 1–3 sentences, length-capped.
  The wall card shows that summary; the full transcript lives in the detail's *voice content* box.
- **Voice transcript is editable in place.** Editing the text updates `note.media[].transcript` only — the recorded
  audio bytes are never re-encoded. A *re-extract summary* action re-reads the summary from the edited text.
- **Host-side repair** for notes that already stored a full transcript as their summary (`migrateNote` re-summarizes
  when summary === transcript and is longer than the cap).
- **Drag and drop uploads** for the note editor and the record composer: images, video, audio and arbitrary files,
  with a drop overlay and per-kind size limits (image 12 MB, video 80 MB, audio 30 MB, file 50 MB).
- **Expected implementation date** next to the recorded-at field, highlighted in the editor and shown as a card chip
  (`overdue` / today / soon), plus a `daysUntil` state machine.
- **Attachment preview and OS actions.** Attachments can be previewed in a lightbox, opened in the browser, opened
  with the OS default application, revealed in the file manager, or copied as a path.
- **Files as a first-class attachment type** (`type: "file"`) in both notes and records.

## 0.4.0 — 2026-11-05

- Categories collapsed to four (`Not started / In progress / Implemented / Dropped`) with automatic migration from the
  earlier six.
- Single completion entry point (the dedicated completion card in the note detail); the list card no longer exposes a
  second one.
- Records accept image / video / arbitrary file attachments (≤ 50 MB each).
- New Ember (carbon brown) palette — six palettes total.
- Insights gained a *Storage and paths* panel: data directory, media directory, change media directory, settings,
  clear the token cache, note and media counts.
- Cache-hit token price default `0.04`, migrated from the earlier `1`; price inputs step by `0.01`.

## 0.3.0 — 2026-11-05

- **Fixed cold-start 404s**: the host half registered its HTTP routes inside `apply` while `webServer` was still
  unavailable, so `/api/inspiration/*` answered 404 on a fresh launch. The half now declares
  `export const inject = ['webServer']` and registers from `apply` once the server exists; it re-registers when the
  server is replaced.
- Same-origin guard on the HTTP routes (a foreign `Origin` is rejected with 403 `cross-origin-not-allowed`; local
  scripts without an `Origin` still work).
- Client boot retries the first fetch (6 attempts, `300 + 250 * attempt` ms).

## 0.2.0 — 2026-11-05

- **Token statistics switched to real usage.** Instead of estimating tokens from note text, the host aggregates
  `assistant/message.usage` from the dsh session logs (`sessionPersistence`), buckets by local day and model, and
  caches per session revision. Range presets (today / this week / this month / last 90 days) plus a custom start–end
  date range; per-model breakdown, daily table, cost by configurable prices.
- Note model gained `records: [{ kind: 'progress' | 'complete', text, results, media, implementedAt }]`, with a
  migration from the old `reviews` array.
- Completion form: completion time, multiple result links, retrospective (optional).
- Removed the per-note token estimate UI.

## 0.1.0 — 2026-11-05

First working panel.

- `sidebar.panellist` entry `inspiration` (order 20) below Plugins and Automation tasks, and the matching `main` panel.
- Local storage under `~/.dsh/inspiration/` (notes, settings, media), host HTTP API, client bundle built from `src/`.
- Wall: masonry cards, 1–5 stars, category filters, newest / importance sorting, search, weekly summary strip.
- Note detail: mixed text + voice + image + video, result links and retrospective, completion.
- Editor: title, body, category, stars, tags, recorded-at, voice recording with transcription.
- Insights: idea distribution, implementation distribution, idea-to-demo interval, status donut, recent records,
  Markdown export.
- Four palettes: Graphite, Mist, Sand, Midnight.