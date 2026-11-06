/* -------------------------------------------------------------- insights */
const CAT_COLORS = ['#8E8E93', '#F08C00', '#28A745', '#C7C7CC']

function periodLabel(period) {
  if (period === 'month') return T('thisMonth')
  if (period === '90d') return T('last90')
  return T('allTime')
}

function streakDays(notes) {
  const days = new Set(notes.map((note) => startOfDay(new Date(note.createdAt)).getTime()))
  let cursor = startOfDay(new Date())
  if (!days.has(cursor.getTime())) cursor = new Date(cursor.getTime() - 86400000)
  let count = 0
  while (days.has(cursor.getTime())) {
    count += 1
    cursor = new Date(cursor.getTime() - 86400000)
  }
  return count
}

function intervalBins(notes) {
  const bins = [
    { label: T('bin0To3'), min: 0, max: 3, value: 0 },
    { label: T('bin4To7'), min: 4, max: 7, value: 0 },
    { label: T('bin8To14'), min: 8, max: 14, value: 0 },
    { label: T('bin15To30'), min: 15, max: 30, value: 0 },
    { label: T('bin30Plus'), min: 31, max: 100000, value: 0 },
  ]
  for (const note of notes) {
    const days = relativeInterval(note)
    if (days === null) continue
    const bin = bins.find((item) => days >= item.min && days <= item.max)
    if (bin) bin.value += 1
  }
  return bins
}

function medianOf(values) {
  if (!values.length) return null
  const sorted = [...values].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2)
}

function exportMarkdown(notes, period) {
  const lines = [
    T('exportHeading'),
    '',
    T('exportPeriod', { period: periodLabel(period), time: fmtDateTime(new Date()) }),
    '',
  ]
  for (const note of notes) {
    lines.push("## " + (note.title || T('untitled')))
    lines.push(T('exportMeta', {
      category: catLabel(note.category),
      stars: note.stars,
      created: fmtDateTime(note.createdAt),
    }))
    if (note.tags && note.tags.length) {
      lines.push(T('exportTags', { tags: note.tags.join(isZh() ? '\u3001' : ', ') }))
    }
    if (note.body) lines.push('', note.body)
    if (note.summary) lines.push('', T('exportSummary', { summary: note.summary }))
    for (const record of noteRecords(note)) {
      lines.push('')
      const heading = record.kind === 'complete' ? T('exportComplete') : T('exportRecord')
      lines.push('### ' + heading + ' \u00b7 ' + fmtDate(record.createdAt))
      if (record.text) lines.push(record.text)
      for (const link of record.results || []) lines.push('- [' + link.label + '](' + link.url + ')')
      if (record.implementedAt) lines.push(T('exportImplemented', { date: fmtDate(record.implementedAt) }))
    }
    lines.push('')
  }
  return lines.join('\n')
}

function downloadText(name, text) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function Kpi({ label, value, unit, delta, good }) {
  return h(
    'div',
    { className: 'iw-kpi' },
    h('div', { className: 'iw-kpi-label' }, label),
    h('div', { className: 'iw-kpi-value' }, value, unit ? h('small', null, unit) : null),
    delta ? h('div', { className: `iw-kpi-delta${good ? ' good' : ''}` }, delta) : null,
  )
}

/* ----------------------------------------------------------- usage chart */
function UsageChart({ days, costByDay, height = 138 }) {
  const width = 320
  const top = 8
  const bottom = 18
  const left = 28
  const right = 28
  const plotW = width - left - right
  const plotH = height - top - bottom
  const n = Math.max(1, days.length)
  const gap = n > 60 ? 1 : 4
  const barW = Math.max(1, (plotW - gap * (n - 1)) / n)
  const maxTokens = Math.max(1, ...days.map((day) => day.input + day.output)) * 1.15
  const maxCost = Math.max(0.000001, ...Object.values(costByDay)) * 1.2
  const elements = []
  ;[0, 0.5, 1].forEach((ratio, index) => {
    const y = top + plotH * (1 - ratio)
    elements.push(h('line', { key: `g-${index}`, x1: left, x2: width - right, y1: y, y2: y, stroke: 'var(--iw-border)', strokeWidth: 0.8 }))
    elements.push(h('text', { key: `gl-${index}`, x: left - 4, y: y + 2.5, textAnchor: 'end', fontSize: 6.2, fill: 'var(--iw-text3)' },
      fmtTokens(Math.round(maxTokens * ratio))))
    elements.push(h('text', { key: `gr-${index}`, x: width - right + 4, y: y + 2.5, fontSize: 6.2, fill: 'var(--iw-text3)' },
      fmtCost(maxCost * ratio)))
  })
  const labelStep = Math.max(1, Math.ceil(n / 6))
  days.forEach((day, index) => {
    const x = left + index * (barW + gap)
    const inputH = Math.max(0, plotH * (day.input / maxTokens))
    const outputH = Math.max(0, plotH * (day.output / maxTokens))
    if (inputH > 0) {
      elements.push(h('rect', { key: `i-${index}`, x, y: top + plotH - inputH, width: barW, height: inputH, rx: Math.min(2, barW / 2), fill: 'var(--iw-accent)', opacity: 0.35 }))
    }
    if (outputH > 0) {
      elements.push(h('rect', { key: `o-${index}`, x, y: top + plotH - inputH - outputH, width: barW, height: outputH, rx: Math.min(2, barW / 2), fill: 'var(--iw-accent)' }))
    }
    if (index % labelStep === 0) {
      elements.push(h('text', { key: `l-${index}`, x: x + barW / 2, y: height - 4, textAnchor: 'middle', fontSize: 5.8, fill: 'var(--iw-text3)' }, shortDay(day.date)))
    }
  })
  const points = days
    .map((day, index) => {
      const cost = costByDay[day.date] || 0
      return { x: left + index * (barW + gap) + barW / 2, y: top + plotH - plotH * (cost / maxCost) }
    })
  elements.push(h('polyline', {
    key: 'cost-line',
    points: points.map((point) => `${point.x},${point.y}`).join(' '),
    fill: 'none',
    stroke: '#F08C00',
    strokeWidth: 1.4,
    strokeLinejoin: 'round',
  }))
  points.forEach((point, index) => elements.push(h('circle', { key: `c-${index}`, cx: point.x, cy: point.y, r: 1.6, fill: '#F08C00' })))
  return h('div', { className: 'iw-chart' }, h('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': T('tokenUsageTrend') }, elements))
}

const RANGE_PRESETS = [
  { value: 'today', i18n: 'today' },
  { value: 'week', i18n: 'thisWeek' },
  { value: 'month', i18n: 'thisMonth' },
  { value: '90d', i18n: 'last90' },
]

function rangeForPreset(preset) {
  const today = todayString()
  if (preset === 'today') return { from: today, to: today }
  if (preset === 'week') return { from: weekStartString(), to: today }
  if (preset === '90d') return { from: daysBackString(89), to: today }
  return { from: monthStartString(), to: today }
}

function UsagePanel({ store, snap }) {
  const settings = snap.settings
  const [range, setRange] = React.useState({ preset: 'month', from: monthStartString(), to: todayString() })
  const [usage, setUsage] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    store
      .fetchUsage(range.from, range.to, false)
      .then((data) => {
        if (!cancelled) setUsage(data)
      })
      .catch((loadError) => {
        if (!cancelled) setError(String(loadError && loadError.message ? loadError.message : loadError))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [range.from, range.to, nonce, store])

  const choosePreset = (preset) => {
    const next = rangeForPreset(preset)
    setRange({ preset, ...next })
  }

  const setCustom = (patch) => setRange((previous) => {
    const next = { ...previous, preset: 'custom', ...patch }
    if (next.from > next.to) {
      if (patch.from) next.to = patch.from
      else next.from = patch.to
    }
    return next
  })

  const refresh = () => setNonce((value) => value + 1)

  const totals = (usage && usage.totals) || { input: 0, output: 0, cacheRead: 0, total: 0 }
  const totalCost = costOfUsage(totals.input, totals.output, totals.cacheRead, settings)
  const activeDays = usage ? usage.days.filter((day) => day.input || day.output).length : 0
  const cacheBase = totals.input + totals.cacheRead
  const cacheShare = cacheBase ? Math.round((totals.cacheRead / cacheBase) * 100) : 0
  const costByDay = {}
  if (usage) {
    for (const day of usage.days) {
      costByDay[day.date] = costOfUsage(day.input, day.output, day.cacheRead, settings)
    }
  }
  const maxModel = usage && usage.models.length ? Math.max(...usage.models.map((model) => model.total)) : 1
  const visibleDays = usage ? [...usage.days].filter((day) => day.input || day.output).reverse().slice(0, 15) : []

  return h(
    'div',
    null,
    h(
      'div',
      { className: 'iw-usage-bar' },
      h(Segmented, {
        value: range.preset,
        options: RANGE_PRESETS.map((preset) => ({ value: preset.value, label: T(preset.i18n) })),
        onChange: choosePreset,
      }),
      h(
        'div',
        { className: 'iw-usage-range' },
        h('input', {
          className: 'iw-date-input',
          type: 'date',
          value: range.from,
          max: range.to,
          onChange: (event) => setCustom({ from: event.target.value || range.from }),
        }),
        h('span', { className: 'iw-small iw-muted' }, '→'),
        h('input', {
          className: 'iw-date-input',
          type: 'date',
          value: range.to,
          min: range.from,
          onChange: (event) => setCustom({ to: event.target.value || range.to }),
        }),
        h(Btn, { variant: 'ghost', size: 'sm', icon: 'refresh', onClick: refresh, disabled: loading }, loading ? T('loading') : T('refresh')),
      ),
      h('span', { className: 'iw-spacer', style: { flex: 1 } }),
      h('span', { className: 'iw-small iw-muted' }, T('usageScope')),
    ),
    error
      ? h(
          'div',
          { className: 'iw-panel', style: { marginTop: 14 } },
          h('div', { className: 'iw-empty', style: { padding: '40px 20px' } },
            h('span', { className: 'iw-empty-title' }, T('usageError')),
            h('span', { className: 'iw-small' }, error),
            h(Btn, { variant: 'primary', onClick: refresh }, T('retry'))),
        )
      : !usage
        ? h('div', { className: 'iw-center', style: { padding: '70px' } }, h('span', { className: 'iw-spinner' }), h('span', null, T('usageLoading')))
        : h(
            'div',
            null,
            h(
              'div',
              { className: 'iw-kpis', style: { marginTop: 14 } },
              h(Kpi, { label: T('usageTotal'), value: fmtTokens(totals.total), unit: 'tokens', delta: `${T('usageInput')} ${fmtTokens(totals.input)} · ${T('usageOutput')} ${fmtTokens(totals.output)}` }),
              h(Kpi, { label: T('usageCost'), value: fmtCost(totalCost), delta: T('usageCostHint', { input: settings.priceInput, output: settings.priceOutput, cache: settings.priceCache }) }),
              h(Kpi, { label: T('usageCache'), value: fmtTokens(totals.cacheRead), unit: 'tokens', delta: `${T('usageCacheShare')} ${cacheShare}%` }),
              h(Kpi, { label: T('usageSessions'), value: String(usage.sessions), unit: T('usageSessionsUnit'), delta: T('usageDays', { days: activeDays }) }),
            ),
            h(
              'div',
              { className: 'iw-panel', style: { marginTop: 14 } },
              h(
                'div',
                { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('tokenUsageTrend')),
                  h('div', { className: 'iw-panel-sub' }, `${range.from} → ${range.to} · ${T('usageDaily')}`),
                ),
                h('div', { className: 'iw-legend' },
                  h('span', null, h('i', { style: { background: 'var(--iw-accent)', opacity: 0.35 } }), T('usageInput')),
                  h('span', null, h('i', { style: { background: 'var(--iw-accent)' } }), T('usageOutput')),
                  h('span', null, h('span', { className: 'iw-legend-line', style: { background: '#F08C00' } }), T('usageCostLine')),
                ),
              ),
              h(UsageChart, { days: usage.days, costByDay }),
              h('div', { className: 'iw-usage-note' }, T('usageSourceNote')),
            ),
            h(
              'div',
              { className: 'iw-chart-grid', style: { gridTemplateColumns: '1fr 1fr' } },
              h(
                'div',
                { className: 'iw-panel' },
                h('div', { className: 'iw-panel-head' },
                  h('div', { className: 'iw-panel-title' }, T('usageByModel')),
                  h('span', { className: 'iw-panel-note' }, `${usage.models.length} ${T('usageModels')}`),
                ),
                usage.models.length
                  ? h('div', { style: { marginTop: 6 } },
                      usage.models.slice(0, 6).map((model) => h(
                        'div',
                        { key: model.model, className: 'iw-usage-model' },
                        h('span', { className: 'iw-usage-model-name', title: model.model }, model.model),
                        h('div', { className: 'iw-usage-model-bar' }, h('i', { style: { width: `${Math.max(2, (model.total / maxModel) * 100)}%` } })),
                        h('span', { className: 'iw-usage-model-num' }, fmtTokens(model.total)),
                        h('span', { className: 'iw-usage-model-cost' }, fmtCost(costOfUsage(model.input, model.output, model.cacheRead, settings))),
                      )),
                    )
                  : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noData')),
              ),
              h(
                'div',
                { className: 'iw-panel' },
                h('div', { className: 'iw-panel-head' },
                  h('div', { className: 'iw-panel-title' }, T('usageDailyDetail')),
                  h('span', { className: 'iw-panel-note' }, T('usageRecent15')),
                ),
                visibleDays.length
                  ? h('div', { className: 'iw-rows', style: { marginTop: 6 } },
                      visibleDays.map((day) => h(
                        'div',
                        { key: day.date, className: 'iw-usage-day' },
                        h('span', { className: 'iw-usage-day-date' }, day.date),
                        h('span', { className: 'iw-usage-day-num' }, fmtTokens(day.input + day.output)),
                        h('span', { className: 'iw-usage-day-cost' }, fmtCost(costByDay[day.date] || 0)),
                      )),
                    )
                  : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noData')),
              ),
            ),
            h(
              'div',
              { className: 'iw-panel', style: { marginTop: 14 } },
              h('div', { className: 'iw-panel-title' }, T('usageScopeTitle')),
              h('div', { className: 'iw-usage-note', style: { marginTop: 6 } },
                T('usageScopeNote'),
                h('br'),
                T('usageCostFormula', { input: settings.priceInput, output: settings.priceOutput, cache: settings.priceCache }),
                h('br'),
                T('usageCacheNote'),
              ),
            ),
          ),
  )
}

function StoragePanel({ store, snap }) {
  const [picking, setPicking] = React.useState(false)
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    store.refreshStorage()
  }, [store])
  const storage = snap.storage || {}
  const mediaDir = snap.settings.mediaDir || storage.mediaRoot || '…'
  const chooseDir = async () => {
    setPicking(true)
    setError('')
    try {
      const path = await store.pickDirectory()
      if (path) {
        await store.patchSettings({ mediaDir: path })
        await store.refreshStorage()
      }
    } catch (pickError) {
      setError(String(pickError && pickError.message ? pickError.message : pickError))
    } finally {
      setPicking(false)
    }
  }
  const clearCache = () => {
    store.clearUsageCache().catch((cacheError) => setError(String(cacheError && cacheError.message ? cacheError.message : cacheError)))
  }
  return h(
    'div',
    { className: 'iw-panel iw-storage' },
    h('div', { className: 'iw-panel-head' },
      h('div', null,
        h('div', { className: 'iw-panel-title' }, T('storageTitle')),
        h('div', { className: 'iw-panel-sub' }, T('storageSub')),
      ),
      h('div', { className: 'iw-btn-row' },
        h(Btn, { size: 'sm', icon: 'folder', onClick: chooseDir, disabled: picking }, picking ? T('picking') : T('changeMediaDir')),
        h(Btn, { size: 'sm', icon: 'gear', onClick: () => store.setUi({ settingsOpen: true }) }, T('settings')),
        h(Btn, { size: 'sm', icon: 'refresh', onClick: clearCache }, T('clearTokenCache')),
      ),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('dataDirLabel')),
      h('span', { className: 'iw-storage-path' }, storage.dataDir || '…'),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('mediaDirLabel')),
      h('span', { className: 'iw-storage-path' }, mediaDir),
    ),
    h('div', { className: 'iw-storage-row' },
      h('span', { className: 'iw-storage-label' }, T('cacheLabel')),
      h('span', { className: 'iw-small iw-muted' },
        "${T('storageCounts', { notes: storage.notes || 0, media: storage.media || 0 })} \u00b7 "
        + T('cacheHint')),
    ),
    error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, margin: '4px 0 0' } }, error) : null,
  )
}

function InsightsPage({ store, snap, onBack }) {
  const settings = snap.settings
  const [tab, setTab] = React.useState('overview')
  const [period, setPeriod] = React.useState(settings.period || 'month')
  const notes = snap.notes || []

  const filtered = React.useMemo(() => notes.filter((note) => withinPeriod(note.createdAt, period)), [notes, period])
  const implemented = filtered.filter(noteIsImplemented)
  const intervals = implemented.map(relativeInterval).filter((value) => value !== null)
  const averageInterval = intervals.length ? (intervals.reduce((sum, value) => sum + value, 0) / intervals.length).toFixed(1) : '—'
  const medianInterval = medianOf(intervals)
  const streak = streakDays(notes)
  const weeks = React.useMemo(() => weekSeries(12), [])

  const weekBuckets = React.useMemo(() => weeks.map((start) => {
    const from = start.getTime()
    const to = from + 7 * 86400000
    const created = notes.filter((note) => {
      const time = asDate(note.createdAt).getTime()
      return time >= from && time < to
    })
    const done = notes.filter((note) => {
      const value = implementedAt(note)
      if (!value) return false
      const time = asDate(value).getTime()
      return time >= from && time < to
    })
    return { start, created: created.length, done: done.length }
  }), [notes, weeks])

  const ideaValues = weekBuckets.map((bucket) => bucket.created)
  const doneValues = weekBuckets.map((bucket) => bucket.done)
  const ideaLabels = weekBuckets.map((bucket, index) => (index % 2 === 0 ? weekLabel(bucket.start) : ''))
  const bins = React.useMemo(() => intervalBins(implemented), [implemented])

  const categoryBuckets = React.useMemo(() => {
    const map = new Map()
    for (const note of filtered) map.set(note.category, (map.get(note.category) || 0) + 1)
    return [...map.entries()].sort((left, right) => right[1] - left[1])
  }, [filtered])

  const recentRecords = React.useMemo(() => {
    const rows = []
    for (const note of notes) {
      const record = latestRecord(note)
      if (record) rows.push({ note, record })
    }
    rows.sort((left, right) => asDate(right.record.createdAt) - asDate(left.record.createdAt))
    return rows.slice(0, 4)
  }, [notes])

  const exportNotes = () => {
    if (!filtered.length) {
      store.toast(T('nothingToExport'))
      return
    }
    downloadText(T('exportFileBase') + '-' + new Date().toISOString().slice(0, 10) + '.md', exportMarkdown(filtered, period))
    store.toast(T('exported'))
  }

  return h(
    'div',
    { className: 'iw-page' },
    h(
      'header',
      { className: 'iw-head' },
      h(
        'div',
        null,
        h('div', { className: 'iw-inline', style: { gap: 10 } },
          h('button', { type: 'button', className: 'iw-icon-btn', onClick: onBack, title: T('wall') }, h(Icon, { name: 'chevronLeft', size: 16, stroke: 2 })),
          h('h1', { className: 'iw-title' }, T('insightsTitle')),
        ),
        h('p', { className: 'iw-subtitle' }, T('insightsSub')),
      ),
      h(
        'div',
        { className: 'iw-head-actions' },
        tab === 'overview'
          ? h(Segmented, {
              value: period,
              options: [
                { value: 'month', label: T('thisMonth') },
                { value: '90d', label: T('last90') },
                { value: 'all', label: T('allTime') },
              ],
              onChange: setPeriod,
            })
          : null,
        tab === 'overview' ? h(Btn, { size: 'sm', icon: 'download', onClick: exportNotes }, T('export')) : null,
      ),
    ),
    h(
      'div',
      { className: 'iw-tabs' },
      h('button', { type: 'button', className: `iw-tab${tab === 'overview' ? ' is-on' : ''}`, onClick: () => setTab('overview') }, T('tabOverview')),
      h('button', { type: 'button', className: `iw-tab${tab === 'token' ? ' is-on' : ''}`, onClick: () => setTab('token') }, T('tabToken')),
    ),
    tab === 'overview'
      ? h(
          'div',
          null,
          h(
            'div',
            { className: 'iw-kpis', style: { marginTop: 16 } },
            h(Kpi, { label: T('kpiIdeas'), value: String(filtered.length), unit: T('unit'), delta: T('periodLabel', { period: periodLabel(period) }) }),
            h(Kpi, { label: T('kpiImplemented'), value: String(implemented.length), unit: T('unit'), delta: filtered.length ? `${Math.round((implemented.length / filtered.length) * 100)}%` : '—', good: implemented.length > 0 }),
            h(Kpi, { label: T('kpiInterval'), value: averageInterval, unit: T('unitDay'), delta: medianInterval === null ? T('noData') : `${T('median')} ${medianInterval} ${T('unitDay')}` }),
            h(Kpi, { label: T('kpiStreak'), value: String(streak), unit: T('unitDay'), delta: T('streakHint') }),
          ),
          h(
            'div',
            { className: 'iw-chart-grid' },
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartIdeas')),
                  h('div', { className: 'iw-panel-sub' }, T('chartIdeasSub')),
                ),
                h('span', { className: 'iw-panel-note' }, T('chartIdeasPeak', { value: Math.max(0, ...ideaValues) })),
              ),
              h(BarChart, { values: ideaValues, labels: ideaLabels, peak: ideaValues.indexOf(Math.max(...ideaValues)), color: 'var(--iw-accent)' }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartDone')),
                  h('div', { className: 'iw-panel-sub' }, T('chartDoneSub')),
                ),
                h('span', { className: 'iw-panel-note' }, T('chartDoneNote', { value: implemented.length })),
              ),
              h(BarChart, { values: doneValues, labels: ideaLabels, peak: doneValues.indexOf(Math.max(...doneValues)), color: '#28A745' }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartInterval')),
                  h('div', { className: 'iw-panel-sub' }, T('chartIntervalSub', { value: intervals.length })),
                ),
                h('span', { className: 'iw-panel-note' }, medianInterval === null ? T('noData') : `${T('median')} ${medianInterval} ${T('unitDay')}`),
              ),
              h(HBars, { rows: bins.map((bin) => ({ label: bin.label, value: bin.value, display: String(bin.value), color: bin.value === Math.max(...bins.map((item) => item.value)) && bin.value > 0 ? 'var(--iw-accent)' : '#A9C8FF' })) }),
            ),
            h(
              'div',
              { className: 'iw-panel' },
              h('div', { className: 'iw-panel-head' },
                h('div', null,
                  h('div', { className: 'iw-panel-title' }, T('chartStatus')),
                  h('div', { className: 'iw-panel-sub' }, T('chartStatusSub', { value: filtered.length })),
                ),
              ),
              h(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, flexWrap: 'wrap' } },
                h(Donut, {
                  segments: categoryBuckets.map(([name, value]) => ({ value, color: CAT_COLORS[CAT_INDEX[name] || 0] })),
                  centerValue: String(filtered.length),
                  centerLabel: T('unit'),
                }),
                h(
                  'div',
                  { className: 'iw-rows', style: { flex: 1, minWidth: 130 } },
                  categoryBuckets.map(([name, value]) => h(
                    'div',
                    { key: name, className: 'iw-row', style: { borderTop: 'none', padding: '4px 0' } },
                    h('span', { style: { width: 8, height: 8, borderRadius: 4, background: CAT_COLORS[CAT_INDEX[name] || 0], display: 'inline-block' } }),
                    h('span', { className: 'iw-row-title', style: { fontSize: 10.5 } }, catLabel(name)),
                    h('span', { className: 'iw-row-right', style: { fontSize: 9.5 } }, String(value)),
                  )),
                ),
              ),
            ),
          ),
          h(
            'div',
            { className: 'iw-panel', style: { marginTop: 14 } },
            h('div', { className: 'iw-panel-head' },
              h('div', { className: 'iw-panel-title' }, T('recentRecords')),
              h('button', { type: 'button', className: 'iw-link', onClick: () => setTab('token') }, `${T('tabToken')} →`),
            ),
            recentRecords.length
              ? h('div', { className: 'iw-rows', style: { marginTop: 6 } },
                  recentRecords.map(({ note, record }) => h(
                    'div',
                    { key: record.id, className: 'iw-row', style: { cursor: 'pointer' }, onClick: () => store.setUi({ detailId: note.id }) },
                    h(CatChip, { category: note.category }),
                    h('span', { className: 'iw-row-title' }, note.title || T('untitled')),
                    h('span', { className: 'iw-row-muted' }, `${record.kind === 'complete' ? T('recordKindComplete') : T('recordKindProgress')} · ${fmtDate(record.createdAt)}`),
                    h('span', { className: 'iw-row-right' },
                      relativeInterval(note) === null ? '' : T('daysToDemo', { days: relativeInterval(note) })),
                  )),
                )
              : h('div', { className: 'iw-small iw-muted', style: { padding: '10px 0' } }, T('noRecords')),
          ),
        )
      : h(UsagePanel, { store, snap }),
    h(StoragePanel, { store, snap }),
  )
}
