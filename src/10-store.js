/* ------------------------------------------------------------------ fetch */
async function requestJson(url, options) {
  const response = await fetch(url, options)
  let body = {}
  try {
    body = await response.json()
  } catch {
    /* non-json */
  }
  if (!response.ok || body.ok === false) {
    throw new Error(body.error || `HTTP ${response.status}`)
  }
  return body.value
}

const api = {
  state: () => requestJson(`${API}/state`),
  rpc: (op, payload) => requestJson(`${API}/rpc`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ op, payload }),
  }),
  upload: async (blob, name) => {
    const response = await fetch(`${API}/media?name=${encodeURIComponent(name)}`, {
      method: 'POST',
      body: blob,
    })
    let body = {}
    try {
      body = await response.json()
    } catch {
      /* ignore */
    }
    if (!response.ok || body.ok === false) throw new Error(body.error || `HTTP ${response.status}`)
    return body.value
  },
  mediaUrl: (path) => `${API}/media?path=${encodeURIComponent(path)}`,
}

/* ------------------------------------------------------------------ store */
function createStore(deps) {
  let current = {
    loading: true,
    error: '',
    scheme: 'light',
    notes: [],
    settings: { ...EMPTY_SETTINGS },
    storage: null,
    toast: '',
    ui: {
      view: 'wall',
      insightsTab: 'overview',
      sort: 'date',
      category: '全部',
      query: '',
      compose: null,
      detailId: null,
      completeNoteId: null,
      settingsOpen: false,
      period: 'month',
      tokenRange: { preset: 'month', from: monthStartString(), to: todayString() },
    },
  }
  const listeners = new Set()
  let toastTimer = 0

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  const snapshot = () => current
  const publish = (patch) => {
    current = { ...current, ...patch }
    for (const listener of listeners) listener()
  }
  const publishUi = (patch) => publish({ ui: { ...current.ui, ...patch } })
  const toast = (message) => {
    publish({ toast: message })
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => publish({ toast: '' }), 2400)
  }

  return {
    subscribe,
    snapshot,
    deps,
    publish,
    publishUi,
    toast,
    getNotes: () => current.notes,

    async load() {
      // A cold Harness boot can mount this panel a moment before the Host HTTP
      // surface is registered, so a failed first read is retried briefly instead
      // of rendering the error state.
      let lastError
      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const value = await api.state()
          publish({
            loading: false,
            error: '',
            notes: Array.isArray(value.notes) ? value.notes : [],
            settings: { ...EMPTY_SETTINGS, ...(value.settings || {}) },
            ui: { ...current.ui, period: (value.settings && value.settings.period) || 'month' },
          })
          return
        } catch (error) {
          lastError = error
          await new Promise((resolve) => setTimeout(resolve, 300 + attempt * 250))
        }
      }
      publish({ loading: false, error: String(lastError && lastError.message ? lastError.message : lastError) })
    },

    async reload() {
      const value = await api.state()
      publish({ notes: Array.isArray(value.notes) ? value.notes : [], settings: { ...EMPTY_SETTINGS, ...(value.settings || {}) } })
    },

    async saveNote(note) {
      const value = await api.rpc('saveNote', { note })
      publish({ notes: value.notes })
      publishUi({ compose: null, completeNoteId: null })
      toast(T('saved'))
      return value.note
    },

    async deleteNote(id) {
      const value = await api.rpc('deleteNote', { id })
      publish({ notes: value.notes })
      publishUi({ detailId: null, completeNoteId: null })
      toast(T('deleted'))
    },

    async patchSettings(patch) {
      const value = await api.rpc('saveSettings', { settings: { ...current.settings, ...patch } })
      publish({ settings: { ...EMPTY_SETTINGS, ...value.settings } })
      return value.settings
    },

    /** Switch palette: repaints the whole Harness, then persists the choice. */
    async applyPalette(id) {
      const palette = PALETTES[id] ? id : 'paper'
      try {
        if (deps && typeof deps.applyPalette === 'function') deps.applyPalette(palette)
      } catch {
        /* the theme layer is best-effort: the wall still renders */
      }
      publish({ settings: { ...current.settings, palette } })
      try {
        const value = await api.rpc('saveSettings', { settings: { ...current.settings, palette } })
        publish({ settings: { ...EMPTY_SETTINGS, ...value.settings } })
      } catch {
        /* keep the in-memory choice */
      }
      return palette
    },

    async refreshStorage() {
      try {
        const value = await api.rpc('storage', {})
        publish({ storage: value })
      } catch {
        /* ignore */
      }
    },

    /** Hand a local file to the desktop shell (default app, or reveal). */
    async openFile(path, mode) {
      return await api.rpc('openPath', { path, mode: mode || 'open' })
    },

    async fetchUsage(from, to, refresh) {
      return await api.rpc('usage', { from, to, refresh: refresh === true })
    },

    async clearUsageCache() {
      await api.rpc('clearUsageCache', {})
      toast(T('tokenCacheCleared'))
    },

    setUi: publishUi,

    async transcribe(base64, language) {
      const fn = deps.transcribe
      if (!fn) throw new Error(T('nothingToTranscribe'))
      return fn(base64, language)
    },

    async pickDirectory() {
      const fn = deps.pickDirectory
      if (!fn) throw new Error(T('pickerUnavailable'))
      return fn()
    },
  }
}

function useStore(store) {
  const [snap, setSnap] = React.useState(store.snapshot())
  React.useEffect(() => store.subscribe(() => setSnap(store.snapshot())), [store])
  return snap
}
