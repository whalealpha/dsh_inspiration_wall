#!/usr/bin/env node
/**
 * Create a versioned snapshot archive of this bundle.
 *
 *   node scripts/snapshot.mjs [--out <dir>] [--label <extra>]
 *
 * Archives the working tree (excluding node_modules, .git, backups, archives and editor noise) into
 *   <parent of repo>/inspiration-wall-backups/dsh-inspiration-wall-<version>-<stamp>.zip
 * and rewrites latest.json next to it.
 *
 * Snapshots are the "rollback without git" path: expand the archive somewhere and point install_bundle at it.
 * The zip is written by this script (deflate + central directory) so it needs no external `zip`/`tar` binary.
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateRawSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

function arg(name, fallback) {
  const index = args.indexOf(`--${name}`)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}

const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const version = manifest.version || '0.0.0'
const label = arg('label', '')
const outDir = resolve(arg('out', join(dirname(root), 'inspiration-wall-backups')))

const SKIP_DIRS = new Set(['node_modules', '.git', 'backups', 'dist', '__pycache__', '.idea', '.vscode'])
const SKIP_FILE = /(^|\/)(\.DS_Store|Thumbs\.db)$|\.(zip|tar\.gz|log|pyc)$|(^|\/)_[^/]*\.(py|mjs|txt)$/

function walk(dir, collected = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    const rel = relative(root, full).split('\\').join('/')
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name) && !SKIP_FILE.test(rel)) walk(full, collected)
    } else if (entry.isFile() && !SKIP_FILE.test(rel)) {
      collected.push(rel)
    }
  }
  return collected
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let index = 0; index < 256; index += 1) {
    let value = index
    for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1
    table[index] = value >>> 0
  }
  return table
})()

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function dosTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2)
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  return { time, day }
}

function buildZip(entries) {
  const chunks = []
  const central = []
  let offset = 0

  for (const entry of entries) {
    const nameBytes = Buffer.from(entry.name, 'utf8')
    const { time, day } = dosTime(entry.mtime)
    const crc = crc32(entry.data)
    const deflated = deflateRawSync(entry.data, { level: 9 })
    const useDeflate = deflated.length < entry.data.length
    const payload = useDeflate ? deflated : entry.data

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6) // UTF-8 names
    local.writeUInt16LE(useDeflate ? 8 : 0, 8)
    local.writeUInt16LE(time, 10)
    local.writeUInt16LE(day, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(payload.length, 18)
    local.writeUInt32LE(entry.data.length, 22)
    local.writeUInt16LE(nameBytes.length, 26)
    local.writeUInt16LE(0, 28)

    chunks.push(local, nameBytes, payload)

    const header = Buffer.alloc(46)
    header.writeUInt32LE(0x02014b50, 0)
    header.writeUInt16LE(20, 4)
    header.writeUInt16LE(20, 6)
    header.writeUInt16LE(0x0800, 8)
    header.writeUInt16LE(useDeflate ? 8 : 0, 10)
    header.writeUInt16LE(time, 12)
    header.writeUInt16LE(day, 14)
    header.writeUInt32LE(crc, 16)
    header.writeUInt32LE(payload.length, 20)
    header.writeUInt32LE(entry.data.length, 24)
    header.writeUInt16LE(nameBytes.length, 28)
    header.writeUInt16LE(0, 30)
    header.writeUInt16LE(0, 32)
    header.writeUInt16LE(0, 34)
    header.writeUInt16LE(0, 36)
    header.writeUInt32LE(0, 38)
    header.writeUInt32LE(offset, 42)
    central.push(Buffer.concat([header, nameBytes]))

    offset += local.length + nameBytes.length + payload.length
  }

  const centralBytes = Buffer.concat(central)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(0, 4)
  end.writeUInt16LE(0, 6)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralBytes.length, 12)
  end.writeUInt32LE(offset, 16)
  end.writeUInt16LE(0, 20)

  return Buffer.concat([...chunks, centralBytes, end])
}

const names = walk(root).sort()
if (names.length === 0) {
  console.error('nothing to archive')
  process.exit(1)
}

const entries = names.map((name) => {
  const full = join(root, name)
  return { name, data: readFileSync(full), mtime: statSync(full).mtime }
})

const stamp = new Date()
const pad = (value) => String(value).padStart(2, '0')
const stampText = `${stamp.getFullYear()}${pad(stamp.getMonth() + 1)}${pad(stamp.getDate())}-${pad(stamp.getHours())}${pad(stamp.getMinutes())}${pad(stamp.getSeconds())}`
const suffix = label ? `-${label.replace(/[^A-Za-z0-9._-]/g, '')}` : ''
const archiveName = `dsh-inspiration-wall-${version}-${stampText}${suffix}.zip`

mkdirSync(outDir, { recursive: true })
const archivePath = join(outDir, archiveName)
const archive = buildZip(entries)
writeFileSync(archivePath, archive)

const digest = createHash('sha256').update(archive).digest('hex')
const summary = {
  version,
  createdAt: stamp.toISOString(),
  archive: basename(archivePath),
  path: archivePath,
  files: entries.length,
  bytes: archive.length,
  sha256: digest,
}
writeFileSync(join(outDir, 'latest.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

console.log(`snapshot: ${archivePath}`)
console.log(`  version ${version} · ${entries.length} files · ${archive.length} bytes`)
console.log(`  sha256 ${digest}`)
console.log(`  manifest ${join(outDir, 'latest.json')}`)

if (!existsSync(join(root, 'client.js'))) {
  console.warn('warning: client.js is missing — run `node build.mjs` before snapshotting')
}