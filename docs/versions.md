# Version management and rollback

Two mechanisms, used together:

1. **Git repository** — the source of truth. Every release is a commit plus an annotated tag, so any earlier state can be
   restored with `git checkout`.
2. **Snapshot archives** — zipped copies of the whole bundle directory (including the built `client.js`), so a rollback
   works even if git is not available or you changed files outside the repo.

## Snapshot archives

Snapshots live **outside** the repository, next to it:

```
~/inspiration-wall-backups/
├── dsh-inspiration-wall-0.5.1-20261106-003043.zip
└── latest.json
```

`latest.json` records the newest snapshot:

```json
{
  "version": "0.5.1",
  "createdAt": "2026-11-06T00:30:43+08:00",
  "archive": "dsh-inspiration-wall-0.5.1-20261106-003043.zip",
  "files": 30,
  "bytes": 139610,
  "sha256": "3c9c218c9044ac0f1a246e52e1b9b33ef3d6195017edf862bd10cd3ddfecee61"
}
```

Create one with:

```bash
npm run snapshot            # node scripts/snapshot.mjs
```

The script archives the tracked files (skipping `node_modules`, `.git`, `backups`, existing archives), names the archive
with the version from `package.json` and a timestamp, and rewrites `latest.json`. It prints the sha256 so you can verify
the archive later.

### Roll back from a snapshot

```bash
# 1. stop the panel from serving the current code
#    (ask the agent: remove_bundle dsh-inspiration-wall)

# 2. expand the snapshot into a fresh directory
Expand-Archive -Path .\dsh-inspiration-wall-0.5.1-20261106-003043.zip -DestinationPath .\rollback-0.5.1

# 3. reinstall from that directory
#    (ask the agent: install_bundle at .\rollback-0.5.1)

# 4. restart the app so the host half reloads
```

Your notes are untouched by this: `~/.dsh/inspiration/` is separate from the bundle.

## Git tags

| Tag | Meaning |
| --- | --- |
| `v0.1.0` … `v0.7.0` | Released versions, one commit each |
| `HEAD` | Working state, may be ahead of the newest tag |

```bash
git tag                          # list releases
# v0.5.1, v0.7.0
git log --oneline --decorate     # history with tags
git checkout v0.4.0              # inspect an older release
git switch -                     # back to the branch
```

A release commit should bump `package.json`'s `version`, update `CHANGELOG.md`, and rebuild `client.js` — that is the
whole checklist. `scripts/snapshot.mjs` reads the version from `package.json`, so bump first, then snapshot.

### Restore a single file from history

```bash
git log --oneline -- src/45-detail.js
git checkout v0.5.0 -- src/45-detail.js
node build.mjs
```

## Version numbers

`0.MINOR.PATCH`:

- `MINOR` — a new capability or a visible behaviour change (new attachment type, new palette, new chart).
- `PATCH` — fixes and polish (a broken button, a colour contrast fix, wording).

Data compatibility is guaranteed across `0.x`: newer code migrates older `notes.json` in place, and older code ignores
fields it does not know (they survive a round-trip through the sanitizer only if the older version knows them, so
downgrading more than one minor version is best done from a snapshot).

## Recommended practice

- Snapshot before any change that touches `index.js` (host behaviour) — a bad host half is the only failure that needs
  a restart to diagnose.
- Commit `client.js` together with `src/` in the same commit, so a checkout always builds and runs.
- Keep the tag name and `package.json` version identical; the snapshot script and the docs both read the version.