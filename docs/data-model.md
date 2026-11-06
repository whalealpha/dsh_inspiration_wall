# Data model

Everything lives in one directory, by default `~/.dsh/inspiration/`:

```
~/.dsh/inspiration/
├── notes.json       # state file, schemaVersion 2
├── settings.json    # panel settings
└── media/           # uploaded recordings, images, video, files
```

The directory is configurable per plugin instance (`config.dataDir`), and the media directory separately
(`settings.mediaDir`, default `<dataDir>/media`). Attachment paths are stored **absolute**, so changing the media
directory keeps existing notes readable as long as the old files stay where they are.

## notes.json

```jsonc
{
  "version": 2,
  "notes": [ /* Note[] */ ]
}
```

### Note

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Generated, `n_` prefix |
| `title` | string | ≤ 240 chars |
| `body` | string | ≤ 20000 chars |
| `summary` | string | ≤ 8000 chars; the gist that cards show (voice notes, or hand-written) |
| `category` | enum | `未开始` / `进行中` / `已实现` / `已放弃` (stored in Chinese, localized in the UI) |
| `stars` | number | 1–5 |
| `tags` | string[] | ≤ 12 items |
| `createdAt` | ISO string | Recorded time (backdatable) |
| `updatedAt` | ISO string | Last modification |
| `expectedAt` | string | Optional `YYYY-MM-DD` expected implementation date |
| `media` | Media[] | ≤ 24 items |
| `records` | Record[] | Progress + completion records, newest first |

### Record

```jsonc
{
  "id": "r_…",
  "createdAt": "2026-11-05T18:12:00+08:00",
  "kind": "progress" | "complete",
  "text": "what happened / what blocked / what changed",
  "implementedAt": "2026-11-08T17:30:00+08:00",   // only meaningful for kind = complete
  "results": [{ "label": "PR #128", "url": "https://…" }],
  "media": [ /* Media[] — ≤ 12 */ ]
}
```

- `kind: "progress"` records are the timeline entries you add at any time.
- `kind: "complete"` is the completion record: exactly one matters (the newest), and its `implementedAt` freezes the
  idea-to-demo interval that the wall and the charts use.
- `results` are links attached to that specific record (used by the completion form).

### Media

```jsonc
{
  "id": "m_…",
  "type": "audio" | "image" | "video" | "file",
  "path": "C:/Users/<you>/.dsh/inspiration/media/n_abc_1699.webm",
  "mime": "audio/webm",
  "duration": 47,            // seconds, audio/video only
  "size": 20480,             // bytes
  "caption": "voice memo",   // display name / original filename
  "transcript": "…"          // ≤ 8000 chars, editable; audio keeps its own bytes untouched
}
```

`type: "file"` is the catch-all for anything that is not audio, image or video (PDFs, spreadsheets, archives, code).

### Migration

`migrateNote()` runs on read and keeps old shapes working:

| Old shape | Becomes |
| --- | --- |
| `reviews: [...]` | `records: [...]`, entries with `implementedAt` marked `kind: "complete"`, others `kind: "progress"` |
| `category: 新想法 / 思路 / 待验证` | `category: 未开始` |
| missing `media` / `summary` / `records` / `expectedAt` | `[]` / `""` |
| `summary` identical to a `media.transcript` and longer than the cap | re-summarized with the local summarizer |

Migration happens in memory and is persisted on the next write; you do not need to run anything.

## settings.json

```jsonc
{
  "theme": "graphite",       // graphite | mist | sand | midnight | cyber | ember
  "mediaDir": "",            // "" = <dataDir>/media
  "priceInput": 2,           // currency units per 1M input tokens
  "priceOutput": 8,          // per 1M output tokens
  "priceCache": 0.04,        // per 1M cache-hit tokens
  "transcribe": true,        // auto-transcribe new recordings
  "language": "zh",          // transcription language
  "period": "month"          // default insights period
}
```

Cost is computed per component and summed:

```
cost = input × priceInput/1e6 + output × priceOutput/1e6 + cacheRead × priceCache/1e6
```

## Token usage source

Token statistics are **not** stored in this directory. They are recomputed from the dsh session logs under the
profile (via `sessionPersistence`) and cached in memory per session revision:

```
local day (YYYY-MM-DD) × model → { input, output, cacheRead }
```

Only `assistant/message` events that carry a `usage` object contribute, which means the numbers reflect what this
machine actually sent and received — including sub-agent sessions, excluding anything that never reached a model.

Cache invalidation: a session's cached rows are reused while its `revision` is unchanged; asking for a range forces a
re-scan only of sessions that changed. `clearUsageCache` drops everything.

## Backing up / moving

- Full backup: copy `~/.dsh/inspiration/` (or your custom `dataDir`) — notes, settings and media together.
- Notes only: `notes.json` is enough to keep the records; attachments will show as missing if their files are gone.
- Moving to another machine: copy the folder, then set the media directory if you relocated the files.
- Hand editing is safe: the host sanitizes on write and drops unknown fields, so a malformed field cannot break the UI.
  Keep `version: 2` at the top level.