# Contributing

Thanks for taking a look. This bundle is small on purpose: one host file, one prebuilt client bundle, and a handful of
test scripts.

## Setup

```bash
git clone https://github.com/your-name/dsh-inspiration-wall.git
cd dsh-inspiration-wall
node build.mjs          # generates client.js from src/
node check.mjs          # i18n coverage + pure-function checks
```

There is no package manager step for development: the host half uses only Node built-ins and services injected by the
dsh, and the client half receives `React` from the module loader.

## Repository layout

```
index.js            host half (Cordis plugin): persistence, HTTP API, media, token usage
client.js           GENERATED from src/ — do not edit by hand
build.mjs           concatenates src/*.js into client.js
src/                client sources, in build order (00-prelude … 70-app)
locale/             meta title/description for the bundle list
cordis.patch.yml    bundle patch that inserts the plugin
icon.svg            sidebar icon
scripts/            verification scripts (see docs/architecture.md)
docs/               user and developer documentation
assets/             demo GIF, design boards, social preview
```

## Making a change

1. Edit files under `src/` (client) or `index.js` (host). Never edit `client.js` — it is overwritten.
2. Run `node build.mjs && node --check client.js`.
3. Run the checks below; all must pass.
4. Add user-facing strings to **both** `ZH` and `EN` in `src/70-app.js` — `check.mjs` fails on a missing key.
5. If the change is visible to users, add a line to `CHANGELOG.md` under a new version heading and bump
   `package.json`'s `version`.
6. Commit `src/` together with the rebuilt `client.js`.

## Checks

```bash
node build.mjs
node --check client.js
node check.mjs                 # i18n keys + pure functions
node scripts/verify-v05.mjs    # summarizer, expected dates, drag, menu, guards
node scripts/verify-v051.mjs   # browser-open chain, palette tokens, removed UI
node scripts/ui-smoke.mjs      # renders every component with a stub React
node scripts/label-check.mjs   # button wording, single completion entry
node scripts/host-selftest.mjs # host half registers with inject: ['webServer']
```

`tests` that need a running dsh (`scripts/verify-v05-api.py`) are optional and documented in the script header.

## Code conventions

- **No build tooling beyond `build.mjs`.** Plain ES2020, no JSX (use `h()` = `React.createElement`), no bundler.
- **Host is the source of truth.** Any new note field must be sanitized in `index.js` (`sanitizeNote`) and have a
  migration fallback in `migrateNote`.
- **Design tokens only.** Style with `--iw-*` custom properties; a new palette is a token block, not new rules.
- **No model calls from the panel.** Anything that would spend tokens (summarizing, transcribing) must stay local: local
  algorithms or the user's own on-device service.
- **Media by reference.** Never inline file contents into `notes.json`.
- **Text is localizable.** Every visible string goes through `T('key')`.

## Reporting a problem

Include:

- the version (`package.json`),
- what you clicked and what happened,
- whether `curl http://127.0.0.1:<port>/api/inspiration/ping` answers `{"ok":true}`,
- for data problems, the relevant fragment of `~/.dsh/inspiration/notes.json` (redact paths).

## License

Contributions are accepted under the [MIT license](LICENSE).