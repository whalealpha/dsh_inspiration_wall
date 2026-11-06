# Installing, upgrading and removing dsh-inspiration-wall

The panel is a **Cordis bundle**: a directory with a `package.json` that declares `dsh.bundle.patch`, a host half
(`index.js`) and a prebuilt client half (`client.js`). It is installed into a dsh profile by the bundled
plugin manager — you never edit the profile's `package.json` or `cordis.patch.yml` by hand.

## Requirements

| Requirement | Notes |
| --- | --- |
| dsh with `plugin_manager` | The tool is part of the app; no extra install |
| Node.js ≥ 18 | Only needed to rebuild `client.js` (`node build.mjs`) |
| Microphone + dsh speech service | Optional. Without it, voice notes record and play but are not transcribed |
| ~1 MB disk for code, plus your own media | Media grows with what you attach |

## Install

```bash
git clone https://github.com/your-name/dsh-inspiration-wall.git
```

In dsh, ask:

> install the bundle at `C:\path\to\dsh-inspiration-wall`

The agent calls:

```jsonc
{ "action": "install_bundle", "target": "C:/path/to/dsh-inspiration-wall" }
```

`install_bundle` links the checkout into the active profile and enables it. Two consequences worth knowing:

- The installed bundle **is** your working directory. Editing files there affects the running panel after a reload —
  there is no copy step.
- Because `index.js` (host) is loaded at process start, **host-side changes need an app restart**; client-side changes
  (`client.js`) only need the bundle re-applied/reloaded.

After installing, the left navigation shows **灵感墙 / Inspiration wall** below *Automation tasks*. If the sidebar
looks unchanged, refresh the window once.

### Verify

Ask the agent to check the panel is registered, or do it directly:

```bash
curl http://127.0.0.1:<port>/api/inspiration/ping
# {"ok":true}
```

A 404 here means the host half did not register (see *Troubleshooting*).

## Upgrade

```bash
cd dsh-inspiration-wall
git pull                # or apply your own changes
node build.mjs          # rebuild client.js from src/
node check.mjs          # optional: i18n coverage + unit checks
```

Then ask the agent to re-apply the bundle (`set_bundle` with the package name, or `install_bundle` again), and restart
the app if `index.js` changed.

## Uninstall

Ask the agent:

```jsonc
{ "action": "remove_bundle", "target": "dsh-inspiration-wall" }
```

Your data is **not** touched: `~/.dsh/inspiration/` keeps every note and attachment, so reinstalling picks up where you
left off. Delete that folder yourself if you want a clean slate.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Sidebar has no 灵感墙 entry | Bundle not enabled for this profile | `plugin_manager` → `list_bundles`, enable `dsh-inspiration-wall` |
| Panel opens but shows *加载灵感墙失败* | Host routes not registered (404) | Restart the app once; the host half needs the HTTP server |
| `unknown-op:xxx` from `/rpc` | App is running an older `index.js` | Restart the app |
| Voice note records but no text | Speech service unavailable or transcription off | Enable the dsh speech plugin, or turn on *Voice auto transcription* in settings |
| Transcription fails with a network error | The speech service is remote in your setup | Use a local speech service, or attach audio without transcription |
| Attachments 403 on download | Path outside the allowed roots (data dir / media dir) | Move the file into the media directory |
| *Open in browser* does nothing | Very restrictive environment, or the OS has no default browser | Use *Open with default app* or *Reveal in folder* |
| Empty wall after moving machines | Data lives per user profile | Copy `~/.dsh/inspiration/` across |
| Very large media directory | Video/audio attachments | Point *Media directory* to another disk in settings |

## Where files go

```
<install dir>/            # this repo: host half, src/, client.js, docs
~/.dsh/inspiration/       # your data (never inside the repo)
├── notes.json
├── settings.json
└── media/
```

The install directory and the data directory are independent: reinstalling or moving the checkout does not move your
notes.