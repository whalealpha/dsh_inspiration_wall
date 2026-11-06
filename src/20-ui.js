/* ------------------------------------------------------------------ icons */
const ICONS = {
  sparkle: h('path', { d: 'M10 2.2c.55 3.4 1.7 5.2 5 5.8-3.3.6-4.45 2.4-5 5.8-.55-3.4-1.7-5.2-5-5.8 3.3-.6 4.45-2.4 5-5.8Z', fill: 'currentColor', stroke: 'none' }),
  search: h('g', null, h('circle', { cx: 9, cy: 9, r: 5.4 }), h('path', { d: 'M13.1 13.1 17 17' })),
  plus: h('path', { d: 'M10 4.2v11.6M4.2 10h11.6' }),
  mic: h('g', null, h('rect', { x: 7.4, y: 2.6, width: 5.2, height: 9.2, rx: 2.6 }), h('path', { d: 'M4.6 9.4a5.4 5.4 0 0 0 10.8 0M10 14.8v2.6M7.4 17.4h5.2' })),
  image: h('g', null, h('rect', { x: 2.8, y: 4.2, width: 14.4, height: 11.6, rx: 2.4 }), h('circle', { cx: 7.2, cy: 8.4, r: 1.5 }), h('path', { d: 'M3.6 14.2l4.2-4 3 2.8 2.4-2.2 3.2 3.4' })),
  video: h('g', null, h('rect', { x: 2.6, y: 4.6, width: 10.6, height: 10.8, rx: 2.2 }), h('path', { d: 'M13.2 9.2l4.1-2.4v6.4l-4.1-2.4z' })),
  close: h('path', { d: 'M5.2 5.2l9.6 9.6M14.8 5.2l-9.6 9.6' }),
  check: h('path', { d: 'M4.4 10.6l3.6 3.6 7.6-8' }),
  chevronRight: h('path', { d: 'M7.6 4.8 12.8 10l-5.2 5.2' }),
  chevronLeft: h('path', { d: 'M12.4 4.8 7.2 10l5.2 5.2' }),
  chevronDown: h('path', { d: 'M5 7.8 10 12.6 15 7.8' }),
  arrowUpRight: h('g', null, h('path', { d: 'M6 14 14 6' }), h('path', { d: 'M8.2 6H14v5.8' })),
  clock: h('g', null, h('circle', { cx: 10, cy: 10, r: 6.8 }), h('path', { d: 'M10 6.4V10l2.8 1.8' })),
  gear: h('g', null, h('circle', { cx: 10, cy: 10, r: 2.6 }), h('path', { d: 'M10 2.6v2M10 15.4v2M2.6 10h2M15.4 10h2M4.8 4.8l1.4 1.4M13.8 13.8l1.4 1.4M15.2 4.8l-1.4 1.4M6.2 13.8l-1.4 1.4' })),
  trash: h('g', null, h('path', { d: 'M3.8 6h12.4M8 6V4.2h4V6M5.6 6l.7 10.2h7.4L14.4 6M8.4 9v4.4M11.6 9v4.4' })),
  link: h('g', null, h('path', { d: 'M8.2 11.8l3.6-3.6' }), h('path', { d: 'M9.4 6.2 11 4.6a2.8 2.8 0 0 1 4 4l-1.6 1.6M10.6 13.8 9 15.4a2.8 2.8 0 0 1-4-4l1.6-1.6' })),
  play: h('path', { d: 'M6.8 4.8 15 10l-8.2 5.2z', fill: 'currentColor', stroke: 'none' }),
  pause: h('g', null, h('rect', { x: 6, y: 4.6, width: 2.8, height: 10.8, rx: 1, fill: 'currentColor', stroke: 'none' }), h('rect', { x: 11.2, y: 4.6, width: 2.8, height: 10.8, rx: 1, fill: 'currentColor', stroke: 'none' })),
  calendar: h('g', null, h('rect', { x: 3, y: 4.6, width: 14, height: 12, rx: 2.2 }), h('path', { d: 'M3 8.4h14M7 2.8v3.2M13 2.8v3.2' })),
  download: h('g', null, h('path', { d: 'M10 3v9M6.4 8.6 10 12.2l3.6-3.6M4 15.6h12' })),
  folder: h('path', { d: 'M3 6.2c0-1 .8-1.8 1.8-1.8h3l1.6 1.8h5.8c1 0 1.8.8 1.8 1.8v6c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8z' }),
  edit: h('g', null, h('path', { d: 'M12.6 4.2 15.8 7.4 8 15.2H4.8v-3.2z' }), h('path', { d: 'M10.8 6l3.2 3.2' })),
  refresh: h('g', null, h('path', { d: 'M16.2 10a6.2 6.2 0 1 1-1.8-4.4' }), h('path', { d: 'M16.4 3.4v4.2h-4.2' })),
  sort: h('g', null, h('path', { d: 'M6 4.2v11.6M6 15.8 3.6 13.2M6 15.8l2.4-2.6' }), h('path', { d: 'M14 15.8V4.2M14 4.2 11.6 6.8M14 4.2l2.4 2.6' })),
  dots: h('g', null, h('circle', { cx: 4.6, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' }), h('circle', { cx: 10, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' }), h('circle', { cx: 15.4, cy: 10, r: 1.1, fill: 'currentColor', stroke: 'none' })),
  eye: h('g', null, h('path', { d: 'M1.8 10S4.8 4.6 10 4.6 18.2 10 18.2 10 15.2 15.4 10 15.4 1.8 10 1.8 10Z' }), h('circle', { cx: 10, cy: 10, r: 2.5 })),
  star: h('path', { d: 'M10 1.9l2.47 5.02 5.53.8-4 3.9.94 5.5L10 14.5l-4.94 2.62.94-5.5-4-3.9 5.53-.8z', fill: 'currentColor', stroke: 'none' }),
  sun: h('g', null, h('circle', { cx: 10, cy: 10, r: 3.4 }), h('path', { d: 'M10 2.2v2.1M10 15.7v2.1M2.2 10h2.1M15.7 10h2.1M4.5 4.5l1.5 1.5M14 14l1.5 1.5M15.5 4.5 14 6M6 14l-1.5 1.5' })),
}

function Icon({ name, size = 16, stroke = 1.7, className }) {
  return h(
    'svg',
    {
      className,
      width: size,
      height: size,
      viewBox: '0 0 20 20',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
      style: { display: 'block', flex: 'none' },
    },
    ICONS[name] || null,
  )
}

const STAR_PATH = 'M10 1.9l2.47 5.02 5.53.8-4 3.9.94 5.5L10 14.5l-4.94 2.62.94-5.5-4-3.9 5.53-.8z'

function Stars({ value, onChange, size = 14, gap = 3 }) {
  return h(
    'div',
    { className: `iw-stars${onChange ? ' is-input' : ''}`, style: { gap } },
    Array.from({ length: 5 }, (_, index) => {
      const filled = index < value
      return h(
        'svg',
        {
          key: index,
          width: size,
          height: size,
          viewBox: '0 0 20 20',
          'aria-label': T('starReadonly', { count: index + 1 }),
          onClick: onChange ? (event) => { event.stopPropagation(); onChange(index + 1) } : undefined,
          style: { display: 'block', cursor: onChange ? 'pointer' : 'default' },
        },
        h('path', {
          d: STAR_PATH,
          fill: filled ? 'var(--iw-accent)' : 'none',
          stroke: filled ? 'none' : 'var(--iw-border-strong)',
          strokeWidth: filled ? 0 : 1.3,
        }),
      )
    }),
  )
}

function CatChip({ category }) {
  const index = CAT_INDEX[category] === undefined ? 0 : CAT_INDEX[category]
  return h('span', { className: `iw-cat iw-cat-${index}` }, catLabel(category))
}

function Segmented({ value, options, onChange }) {
  return h(
    'div',
    { className: 'iw-seg' },
    options.map((option) => h(
      'button',
      {
        key: option.value,
        type: 'button',
        className: value === option.value ? 'is-on' : '',
        onClick: () => onChange(option.value),
      },
      option.label,
    )),
  )
}

function Btn({ children, variant = 'ghost', size = 'md', onClick, disabled, title, icon, type = 'button' }) {
  const classes = ['iw-btn', `iw-btn-${variant}`]
  if (size === 'sm') classes.push('iw-btn-sm')
  return h(
    'button',
    { type, className: classes.join(' '), onClick, disabled, title },
    icon ? h(Icon, { name: icon, size: 14 }) : null,
    children ? h('span', null, children) : null,
  )
}

function IconBtn({ name, onClick, title, size = 16 }) {
  return h('button', { type: 'button', className: 'iw-icon-btn', onClick, title, 'aria-label': title }, h(Icon, { name, size }))
}

function formatInlineCost(value) {
  return fmtCost(value)
}

/* ------------------------------------------------------------------ media */
function hashString(value) {
  let hash = 2166136261
  const text = String(value || 'seed')
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function waveBars(seed, count = 22) {
  const bars = []
  let state = hashString(seed) || 7
  for (let index = 0; index < count; index += 1) {
    state = (Math.imul(state, 1103515245) + 12345) >>> 0
    bars.push(4 + (state % 17))
  }
  return bars
}

function AudioPlayer({ src, duration, seed, compact }) {
  const audioRef = React.useRef(null)
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const total = Number(duration) || 0

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    const onTime = () => setTime(audio.currentTime)
    const onEnd = () => {
      setPlaying(false)
      setTime(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  const ratio = total > 0 ? Math.min(1, time / total) : 0
  const bars = waveBars(seed || src, compact ? 18 : 26)

  return h(
    'div',
    { className: 'iw-tape', onClick: (event) => event.stopPropagation() },
    h('audio', { ref: audioRef, src, preload: 'metadata', style: { display: 'none' } }),
    h(
      'button',
      {
        type: 'button',
        className: 'iw-tape-play',
        onClick: toggle,
        'aria-label': playing ? T('pause') : T('play'),
      },
      h(Icon, { name: playing ? 'pause' : 'play', size: 12 }),
    ),
    h(
      'div',
      { className: 'iw-tape-wave', 'aria-hidden': true },
      bars.map((height, index) => h('i', {
        key: index,
        className: index / bars.length <= ratio ? 'is-played' : '',
        style: { height },
      })),
    ),
    h('span', { className: 'iw-tape-time' }, fmtDuration(total || (audioRef.current && audioRef.current.duration) || 0)),
  )
}

/** A video attachment rendered with the same tape frame as a voice memo. */
function VideoTape({ item, onOpen }) {
  return h(
    'div',
    {
      className: 'iw-tape',
      role: onOpen ? 'button' : undefined,
      tabIndex: onOpen ? 0 : undefined,
      onClick: onOpen ? (event) => { event.stopPropagation(); onOpen() } : (event) => event.stopPropagation(),
      onKeyDown: onOpen
        ? (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen()
            }
          }
        : undefined,
      style: onOpen ? { cursor: 'pointer' } : undefined,
    },
    h('span', { className: 'iw-tape-play' }, h(Icon, { name: 'play', size: 12 })),
    h('span', { style: { flex: 1 } }),
    item.duration ? h('span', { className: 'iw-tape-time' }, fmtDuration(item.duration)) : null,
    h('span', { className: 'iw-tape-label' }, T('video')),
  )
}

function fileNameOf(item) {
  if (!item) return ''
  return item.caption || String(item.path || '').split(/[\\/]/).pop() || T('file')
}

function FileChip({ item, download }) {
  const name = fileNameOf(item)
  const link = api.mediaUrl(item.path)
  if (download) {
    return h(
      'a',
      { className: 'iw-filechip', href: link, download: name, onClick: (event) => event.stopPropagation(), title: name },
      h(Icon, { name: 'folder', size: 14 }),
      h('span', { className: 'iw-filechip-name' }, name),
      item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
    )
  }
  return h(
    'span',
    { className: 'iw-filechip', title: name },
    h(Icon, { name: 'folder', size: 14 }),
    h('span', { className: 'iw-filechip-name' }, name),
    item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
  )
}

function MediaThumb({ item, onOpen }) {
  if (!item) return null
  const src = api.mediaUrl(item.path)
  if (item.type === 'file') {
    return h(FileChip, { item })
  }
  if (item.type === 'image') {
    return h('span', { className: 'iw-thumb' }, h('img', { src, alt: item.caption || T('image') }))
  }
  if (item.type === 'video') {
    return h(
      'span',
      { className: 'iw-thumb' },
      h('video', { src, muted: true, preload: 'metadata' }),
      h('span', { className: 'iw-thumb-play' }, h(Icon, { name: 'play', size: 18 })),
      item.duration ? h('span', { className: 'iw-thumb-tag' }, fmtDuration(item.duration)) : null,
    )
  }
  return h('span', { className: 'iw-thumb', style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }, h(Icon, { name: 'mic', size: 18 }))
}

function MediaStrip({ media, onOpen }) {
  const items = Array.isArray(media) ? media : []
  if (items.length === 0) return null
  const open = onOpen || undefined
  return h(
    'div',
    { className: 'iw-media-strip' },
    items.map((item) => {
      if (item.type === 'audio') {
        return h(AudioPlayer, {
          key: item.id,
          src: api.mediaUrl(item.path),
          duration: item.duration,
          seed: item.id,
          compact: true,
        })
      }
      if (item.type === 'video') {
        return h(VideoTape, { key: item.id, item, onOpen: () => open && open(item) })
      }
      return h(
        'span',
        {
          key: item.id,
          className: item.type === 'image' ? 'iw-thumb is-previewable' : '',
          onClick: open
            ? (event) => {
                event.stopPropagation()
                open(item)
              }
            : undefined,
          style: open ? { cursor: 'zoom-in' } : undefined,
        },
        h(MediaThumb, { item }),
      )
    }),
  )
}

/* ------------------------------------------------------------------ chart */
function BarChart({ values, labels, color = 'var(--iw-accent)', muted = 'var(--iw-accent-soft-strong)', peak = -1, ymax, height = 132 }) {
  const width = 320
  const top = 8
  const bottom = 18
  const left = 24
  const right = 4
  const max = ymax || Math.max(1, ...values) * 1.2
  const plotH = height - top - bottom
  const plotW = width - left - right
  const gap = 5
  const barW = (plotW - gap * Math.max(0, values.length - 1)) / Math.max(1, values.length)
  const gridLines = [0, 0.5, 1]
  const elements = []
  gridLines.forEach((ratio, index) => {
    const y = top + plotH * (1 - ratio)
    elements.push(h('line', {
      key: `grid-${index}`,
      x1: left,
      x2: width - right,
      y1: y,
      y2: y,
      stroke: 'var(--iw-border)',
      strokeWidth: 1,
    }))
    elements.push(h('text', {
      key: `grid-label-${index}`,
      x: left - 6,
      y: y + 2.6,
      textAnchor: 'end',
      fontSize: 7,
      fill: 'var(--iw-text3)',
    }, String(Math.round(max * ratio))))
  })
  values.forEach((value, index) => {
    const barH = Math.max(1, plotH * value / max)
    const x = left + index * (barW + gap)
    const y = top + plotH - barH
    const active = peak === -1 || index === peak
    elements.push(h('rect', {
      key: `bar-${index}`,
      x,
      y,
      width: barW,
      height: barH,
      rx: Math.min(3, barW / 2),
      fill: active ? color : 'var(--iw-border-strong)',
      opacity: active ? 0.92 : 0.5,
    }))
    if (labels && labels[index]) {
      elements.push(h('text', {
        key: `label-${index}`,
        x: x + barW / 2,
        y: height - 3,
        textAnchor: 'middle',
        fontSize: 6.4,
        fill: 'var(--iw-text3)',
      }, labels[index]))
    }
  })
  return h('div', { className: 'iw-chart' }, h('svg', {
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-label': T('barChart'),
  }, elements))
}

function Donut({ segments, size = 132, stroke = 17, centerValue, centerLabel }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  let offset = 0
  const circles = []
  segments.forEach((segment, index) => {
    const ratio = segment.value / total
    const length = Math.max(0, ratio * circumference - 2)
    circles.push(h('circle', {
      key: index,
      cx: size / 2,
      cy: size / 2,
      r: radius,
      fill: 'none',
      stroke: segment.color,
      strokeWidth: stroke,
      strokeDasharray: `${length} ${circumference - length}`,
      strokeDashoffset: -offset,
      strokeLinecap: 'butt',
      transform: `rotate(-90 ${size / 2} ${size / 2})`,
    }))
    offset += ratio * circumference
  })
  return h('div', { className: 'iw-chart' }, h('svg', {
    viewBox: `0 0 ${size} ${size}`,
    width: size,
    height: size,
    role: 'img',
    'aria-label': T('donutChart'),
  },
  h('circle', {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: 'none',
    stroke: 'var(--iw-sunken)',
    strokeWidth: stroke,
  }),
  circles,
  h('text', {
    x: size / 2,
    y: size / 2 - 1,
    textAnchor: 'middle',
    fontSize: 17,
    fontWeight: 650,
    fill: 'var(--iw-text)',
  }, centerValue || ''),
  h('text', {
    x: size / 2,
    y: size / 2 + 14,
    textAnchor: 'middle',
    fontSize: 7.2,
    fill: 'var(--iw-text3)',
  }, centerLabel || ''),
  ))
}

function HBars({ rows, max }) {
  const peak = max || Math.max(1, ...rows.map((row) => row.value))
  return h(
    'div',
    { className: 'iw-rows', style: { gap: 2 } },
    rows.map((row) => h(
      'div',
      { key: row.label, className: 'iw-row', style: { borderTop: 'none', padding: '5px 0' } },
      h('span', { className: 'iw-row-title', style: { fontSize: 10, color: 'var(--iw-text2)' } }, row.label),
      h(
        'div',
        { style: { flex: 1, height: 12, borderRadius: 6, background: 'var(--iw-sunken)', overflow: 'hidden', maxWidth: 200, minWidth: 70 } },
        h('div', { style: { width: `${Math.max(2, (row.value / peak) * 100)}%`, height: '100%', borderRadius: 6, background: row.color || 'var(--iw-accent)' } }),
      ),
      h('span', { className: 'iw-row-right', style: { minWidth: 44, textAlign: 'right', fontSize: 9.5 } }, row.display || String(row.value)),
    )),
  )
}

/* ------------------------------------------------------------------ modal */
function Modal({ children, onClose, className }) {
  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return h(
    'div',
    {
      className: 'iw-overlay',
      role: 'presentation',
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose()
      },
    },
    h('div', { className: `iw-modal${className ? ` ${className}` : ''}`, role: 'dialog', 'aria-modal': true }, children),
  )
}

function Toast({ message }) {
  if (!message) return null
  return h('div', { className: 'iw-toast', role: 'status' }, message)
}

function Loading() {
  return h('div', { className: 'iw-center' }, h('span', { className: 'iw-spinner' }), h('span', null, T('loading')))
}

/* ------------------------------------------------------------ attachments */
/** Classify a dropped/picked File into the wall's media kinds. */
function mediaKindOf(file) {
  const type = String((file && file.type) || '')
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if (type.startsWith('audio/')) return 'audio'
  return 'file'
}

function hasFileDrag(event) {
  const transfer = event && event.dataTransfer
  if (!transfer) return false
  const types = Array.from(transfer.types || [])
  return types.includes('Files')
}

/**
 * Drag-and-drop capture for a region: returns the drag flag plus the handlers
 * to spread on the target element. Depth counting keeps the overlay stable
 * while the pointer crosses child nodes.
 */
function useAttachDrop(onFiles) {
  const [dragging, setDragging] = React.useState(false)
  const depth = React.useRef(0)

  const reset = () => {
    depth.current = 0
    setDragging(false)
  }

  const dropProps = {
    onDragEnter: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      depth.current += 1
      setDragging(true)
    },
    onDragOver: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'
    },
    onDragLeave: (event) => {
      if (!hasFileDrag(event)) return
      depth.current = Math.max(0, depth.current - 1)
      if (depth.current === 0) setDragging(false)
    },
    onDrop: (event) => {
      if (!hasFileDrag(event)) return
      event.preventDefault()
      reset()
      const files = Array.from((event.dataTransfer && event.dataTransfer.files) || [])
      if (files.length) onFiles(files)
    },
  }

  return { dragging, dropProps }
}

function DropOverlay({ hint }) {
  return h(
    'div',
    { className: 'iw-drop-overlay' },
    h('span', { className: 'iw-drop-overlay-icon' }, h(Icon, { name: 'plus', size: 20, stroke: 2 })),
    h('span', { className: 'iw-drop-overlay-title' }, hint || T('dropHint')),
    h('span', { className: 'iw-drop-overlay-sub' }, T('dropFormats')),
  )
}

/* ------------------------------------------------------------ context menu */
const CONTEXT_MENU_WIDTH = 200
const CONTEXT_MENU_ITEM_HEIGHT = 30

function ContextMenu({ x, y, title, items, onClose }) {
  const ref = React.useRef(null)
  const [pos, setPos] = React.useState({ left: x, top: y })

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const left = Math.min(x, window.innerWidth - rect.width - 8)
    const top = Math.min(y, window.innerHeight - rect.height - 8)
    setPos({ left: Math.max(8, left), top: Math.max(8, top) })
  }, [x, y])

  React.useEffect(() => {
    const close = () => onClose()
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [onClose])

  return h(
    'div',
    {
      ref,
      className: 'iw-ctx',
      role: 'menu',
      style: { left: pos.left, top: pos.top },
      onMouseDown: (event) => event.stopPropagation(),
      onContextMenu: (event) => event.preventDefault(),
    },
    title ? h('div', { className: 'iw-ctx-title' }, title) : null,
    items.filter(Boolean).map((item, index) => (item.separator
      ? h('div', { key: `sep-${index}`, className: 'iw-ctx-sep' })
      : h(
          'button',
          {
            key: item.key || item.label,
            type: 'button',
            className: `iw-ctx-item${item.danger ? ' is-danger' : ''}`,
            disabled: item.disabled,
            onClick: () => {
              onClose()
              if (typeof item.onSelect === 'function') item.onSelect()
            },
          },
          item.icon ? h(Icon, { name: item.icon, size: 13 }) : null,
          h('span', null, item.label),
        ))),
  )
}

/* --------------------------------------------------------------- lightbox */
function Lightbox({ item, onClose, onOpenWith }) {
  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null
  const source = api.mediaUrl(item.path)
  const name = fileNameOf(item)
  let body
  if (item.type === 'image') {
    body = h('img', { src: source, alt: name })
  } else if (item.type === 'video') {
    body = h('video', { src: source, controls: true, autoPlay: true })
  } else if (item.type === 'audio') {
    body = h(AudioPlayer, { src: source, duration: item.duration, seed: item.id })
  } else {
    body = h(
      'div',
      { className: 'iw-lightbox-file' },
      h(Icon, { name: 'folder', size: 34, stroke: 1.2 }),
      h('span', { style: { fontSize: 13, fontWeight: 600 } }, name),
      h('span', { style: { fontSize: 10.5, opacity: .7 } }, [fmtBytes(item.size), item.mime].filter(Boolean).join(' · ')),
      h(
        'button',
        { type: 'button', className: 'iw-lightbox-btn', onClick: () => onOpenWith && onOpenWith(item) },
        h(Icon, { name: 'arrowUpRight', size: 13 }),
        h('span', null, T('openWith')),
      ),
    )
  }

  return h(
    'div',
    {
      className: 'iw-lightbox',
      role: 'presentation',
      onMouseDown: (event) => {
        if (event.target === event.currentTarget) onClose()
      },
    },
    h(
      'div',
      { className: 'iw-lightbox-inner' },
      h(
        'div',
        { className: 'iw-lightbox-bar' },
        h('span', { className: 'iw-lightbox-title' }, name),
        h(
          'span',
          { className: 'iw-lightbox-actions' },
          h('button', { type: 'button', className: 'iw-lightbox-btn', onClick: () => onOpenWith && onOpenWith(item) },
            h(Icon, { name: 'arrowUpRight', size: 13 }), h('span', null, T('openWith'))),
          h('button', { type: 'button', className: 'iw-lightbox-btn', onClick: onClose, 'aria-label': T('close') },
            h(Icon, { name: 'close', size: 13 }), h('span', null, T('close'))),
        ),
      ),
      h('div', { className: 'iw-lightbox-body' }, body),
    ),
  )
}

/* --------------------------------------------------------- expected date */
function ExpectField({ value, onChange, hint }) {
  const state = expectedState({ expectedAt: value })
  const boxClass = `iw-expect-box${value ? '' : ' is-empty'}`
  return h(
    'div',
    { className: 'iw-field iw-expect' },
    h('span', { className: 'iw-field-label', style: { color: 'var(--iw-accent)', fontWeight: 600 } }, T('expectedDate')),
    h(
      'div',
      { className: boxClass },
      h(Icon, { name: 'calendar', size: 14 }),
      h('input', {
        type: 'date',
        value: dayInputValue(value),
        onChange: (event) => onChange(event.target.value ? toIso(`${event.target.value}T18:00`).slice(0, 10) : ''),
        'aria-label': T('expectedDate'),
      }),
      value
        ? h('button', {
            type: 'button',
            className: 'iw-expect-clear',
            onClick: () => onChange(''),
            title: T('expectedClear'),
            'aria-label': T('expectedClear'),
          }, h(Icon, { name: 'close', size: 12 }))
        : null,
    ),
    h(
      'span',
      { className: `iw-expect-hint${state === 'overdue' ? ' is-overdue' : (state === 'soon' || state === 'today') ? ' is-soon' : ''}` },
      hint || (value ? expectedLabel({ expectedAt: value }) : T('expectedDateHint')),
    ),
  )
}
