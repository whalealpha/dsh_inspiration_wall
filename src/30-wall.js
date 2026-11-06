/* --------------------------------------------------------------- wall page */

/** Display-only grouping of the cards into three masonry columns. */
function estimateNoteHeight(note) {
  let height = 132
  const text = String(note.summary || note.body || '')
  height += Math.min(2, Math.max(1, Math.ceil(text.length / 24))) * 22
  const media = Array.isArray(note.media) ? note.media : []
  if (media.some((item) => item.type === 'audio' || item.type === 'video')) height += 70
  if (media.some((item) => item.type === 'image')) height += 64
  if (media.some((item) => item.type === 'file')) height += 64
  if (noteRecords(note).length) height += 26
  return height
}

function layoutColumns(notes) {
  const columns = [[], [], []]
  const heights = [0, 0, 0]
  for (const note of notes) {
    let target = 0
    for (let index = 1; index < heights.length; index += 1) {
      if (heights[index] < heights[target]) target = index
    }
    columns[target].push(note)
    heights[target] += estimateNoteHeight(note) + 16
  }
  return columns
}

function sortNotes(notes, sort) {
  const list = [...notes]
  if (sort === 'stars') {
    list.sort((left, right) => (right.stars - left.stars) || (asDate(right.createdAt) - asDate(left.createdAt)))
  } else {
    list.sort((left, right) => asDate(right.createdAt) - asDate(left.createdAt))
  }
  return list
}

function matchQuery(note, query) {
  if (!query) return true
  const haystack = [
    note.title,
    note.body,
    note.summary,
    ...(note.tags || []),
    ...(note.media || []).map((item) => item.transcript),
    ...noteRecords(note).map((record) => record.text),
  ].join(' ').toLowerCase()
  return haystack.includes(query.toLowerCase())
}

/* --------------------------------------------------------- appearance menu */
function Appearance({ palette, onChange, onSettings }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!open) return undefined
    const onDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return h(
    'div',
    { className: 'iw-appearance', ref },
    h(
      'button',
      {
        type: 'button',
        className: `iw-appearance-btn${open ? ' is-on' : ''}`,
        title: T('appearance'),
        'aria-label': T('appearance'),
        'aria-expanded': open,
        onClick: () => setOpen((value) => !value),
      },
      h(Icon, { name: 'sun', size: 17 }),
    ),
    open
      ? h(
          'div',
          { className: 'iw-popover', role: 'menu' },
          h('div', { className: 'iw-popover-label' }, T('paletteLabel')),
          PALETTE_VISIBLE.map((id) => h(
            'button',
            {
              key: id,
              type: 'button',
              role: 'menuitemradio',
              'aria-checked': palette === id,
              className: `iw-palette-row${palette === id ? ' is-on' : ''}`,
              onClick: () => {
                onChange(id)
                setOpen(false)
              },
            },
            h('span', { className: 'iw-palette-dot', style: { background: PALETTES[id].dot } }),
            h('span', { style: { flex: 1 } }, T(PALETTE_KEYS[id])),
            palette === id ? h(Icon, { name: 'check', size: 13 }) : null,
          )),
          h('div', { className: 'iw-popover-sep' }),
          h(
            'button',
            {
              type: 'button',
              role: 'menuitem',
              className: 'iw-palette-row',
              onClick: () => {
                setOpen(false)
                onSettings()
              },
            },
            h(Icon, { name: 'gear', size: 14 }),
            h('span', null, T('settings')),
          ),
        )
      : null,
  )
}

/* -------------------------------------------------------------------- card */
function WallCard({ note, onOpen, onSummary }) {
  const interval = relativeInterval(note)
  const records = noteRecords(note)
  const latest = records[0]
  const implemented = noteIsImplemented(note)
  const state = expectedState(note)
  return h(
    'article',
    {
      className: 'iw-card',
      role: 'button',
      tabIndex: 0,
      onClick: () => onOpen(note.id),
      onKeyDown: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(note.id)
        }
      },
    },
    h(
      'div',
      { className: 'iw-card-top' },
      h(
        'span',
        { className: 'iw-card-date' },
        fmtDayMonth(note.createdAt),
        ' ',
        h('span', { className: 'iw-num' }, fmtClock(note.createdAt)),
      ),
      h('span', { className: 'iw-score', title: T('scoreLabel', { value: scoreText(note) }) }, scoreText(note)),
    ),
    h('h3', { className: 'iw-card-title' }, noteTitle(note)),
    note.summary
      ? h(
          'div',
          { className: 'iw-card-summary-wrap' },
          h(
            'span',
            {
              className: 'iw-card-summary-label',
              onClick: (event) => {
                event.stopPropagation()
                onSummary(note.id)
              },
            },
            h(Icon, { name: 'sparkle', size: 11 }),
            h('span', null, T('summaryLabel')),
          ),
          h('p', { className: 'iw-card-summary' }, note.summary),
        )
      : (note.body ? h('p', { className: 'iw-card-body' }, note.body) : null),
    note.media && note.media.length
      ? h(MediaStrip, {
          media: note.media,
          onOpen: () => onOpen(note.id),
        })
      : null,
    latest
      ? h(
          'div',
          { className: 'iw-review-mini' },
          h(
            'div',
            { className: 'iw-timeline-head' },
            h('span', { className: 'iw-timeline-kind' }, T('recordKindProgress')),
            h('span', null, '·'),
            h('span', null, fmtRel(latest.createdAt)),
          ),
        )
      : null,
    h(
      'div',
      { className: 'iw-card-foot' },
      h(CatChip, { category: note.category }),
      note.expectedAt && !implemented
        ? h(
            'span',
            { className: `iw-expect-chip${state ? ` is-${state}` : ''}` },
            h(Icon, { name: 'calendar', size: 13 }),
            h('span', { className: 'iw-num' }, expectedLabel(note)),
          )
        : null,
      h(
        'span',
        { className: 'iw-card-meta' },
        implemented && interval !== null
          ? h('span', { className: 'iw-num' }, T('daysToDemo', { days: interval }))
          : (records.length ? h('span', { className: 'iw-num' }, T('recordsCount', { count: records.length })) : null),
      ),
    ),
  )
}

/** Wrap every numeric run of a template in a mono node — display only. */
function richNumbers(template, tagName, className) {
  return String(template)
    .split(/(\d+(?:[.,]\d+)?)/g)
    .filter((chunk) => chunk !== '')
    .map((chunk, index) => (
      /^\d+(?:[.,]\d+)?$/.test(chunk)
        ? h(tagName, { key: `n${index}`, className }, chunk)
        : chunk
    ))
}

function weekSpans(template) {
  return richNumbers(template, 'b')
}

function wallSummary(notes) {
  const weekStartTime = startOfWeek(new Date()).getTime()
  const week = notes.filter((note) => asDate(note.createdAt).getTime() >= weekStartTime)
  const implemented = week.filter((note) => {
    const record = completionRecord(note)
    return record !== null && asDate(record.implementedAt).getTime() >= weekStartTime
  })
  const intervals = notes.map(relativeInterval).filter((value) => value !== null)
  const average = intervals.length
    ? (intervals.reduce((sum, value) => sum + value, 0) / intervals.length).toFixed(1)
    : '—'
  return { created: week.length, implemented: implemented.length, average }
}

function WeekCard({ summary, onInsights }) {
  const template = T('weekReviewText', { created: summary.created, implemented: summary.implemented, average: summary.average })
  return h(
    'section',
    { className: 'iw-week' },
    h('div', { className: 'iw-week-head' }, h(Icon, { name: 'clock', size: 15 }), h('span', null, T('weekReview'))),
    h('p', { className: 'iw-week-text' }, weekSpans(template)),
    h('button', { type: 'button', className: 'iw-week-link', onClick: onInsights }, `${T('viewInsights')} →`),
  )
}

/* -------------------------------------------------------------------- page */
function WallPage({ store, snap, onRecord, onInsights }) {
  const { notes, settings, ui } = snap
  const [sort, setSort] = React.useState(ui.sort || 'date')
  const [category, setCategory] = React.useState(ui.category || '全部')
  const [query, setQuery] = React.useState(ui.query || '')
  const palette = settings.palette || 'paper'

  const counts = React.useMemo(() => {
    const result = { 全部: notes.length }
    for (const name of CATEGORIES) result[name] = 0
    for (const note of notes) {
      if (result[note.category] !== undefined) result[note.category] += 1
    }
    return result
  }, [notes])

  const filtered = React.useMemo(
    () => sortNotes(notes.filter((note) => (category === '全部' || note.category === category) && matchQuery(note, query)), sort),
    [notes, category, query, sort],
  )

  const summary = React.useMemo(() => wallSummary(notes), [notes])
  const implementedCount = notes.filter(noteIsImplemented).length

  const setPalette = (next) => {
    store.applyPalette(next)
  }

  const columns = React.useMemo(() => layoutColumns(filtered), [filtered])

  return h(
    'div',
    { className: 'iw-page' },
    h(
      'header',
      { className: 'iw-head' },
      h(
        'div',
        null,
        h('h1', { className: 'iw-title' }, T('wall')),
        h(
          'p',
          { className: 'iw-subtitle' },
          richNumbers(T('wallSub', { total: notes.length, implemented: implementedCount }), 'span', 'iw-num'),
        ),
      ),
      h(
        'div',
        { className: 'iw-head-actions' },
        h(
          'label',
          { className: 'iw-search' },
          h(Icon, { name: 'search', size: 14 }),
          h('input', {
            value: query,
            placeholder: T('search'),
            onChange: (event) => setQuery(event.target.value),
            'aria-label': T('search'),
          }),
        ),
        h(Appearance, {
          palette,
          onChange: setPalette,
          onSettings: () => store.setUi({ settingsOpen: true }),
        }),
        h(Btn, { variant: 'primary', icon: 'plus', onClick: onRecord }, T('record')),
      ),
    ),
    h(
      'div',
      { className: 'iw-toolbar' },
      h(Segmented, {
        value: sort,
        options: [{ value: 'date', label: T('sortDate') }, { value: 'stars', label: T('sortStars') }],
        onChange: (value) => {
          setSort(value)
          store.setUi({ sort: value })
        },
      }),
      ['全部', ...CATEGORIES].map((name) => h(
        'button',
        {
          key: name,
          type: 'button',
          className: `iw-chip${category === name ? ' is-on' : ''}`,
          onClick: () => {
            setCategory(name)
            store.setUi({ category: name })
          },
        },
        name === '全部' ? T('all') : catLabel(name),
        h('span', { className: 'iw-count' }, String(counts[name] || 0)),
      )),
      h('span', { className: 'iw-spacer' }),
      h(Btn, { size: 'sm', icon: 'arrowUpRight', onClick: onInsights }, T('insights')),
    ),
    filtered.length
      ? h(
          'div',
          { className: 'iw-grid' },
          columns.map((column, index) => h(
            'div',
            { key: `col-${index}`, className: 'iw-col' },
            column.map((note) => h(WallCard, {
              key: note.id,
              note,
              onOpen: (id) => store.setUi({ detailId: id }),
              onSummary: (id) => store.setUi({ detailId: id }),
            })),
            index === columns.length - 1 && notes.length
              ? h(WeekCard, { key: 'week', summary, onInsights })
              : null,
          )),
        )
      : h(
          'div',
          { className: 'iw-empty' },
          h(Icon, { name: 'sparkle', size: 24, stroke: 0 }),
          h('span', { className: 'iw-empty-title' }, query || category !== '全部' ? T('noMatch') : T('empty')),
          h('span', null, T('emptyHint')),
          h(Btn, { variant: 'primary', icon: 'plus', onClick: onRecord }, T('record')),
        ),
  )
}