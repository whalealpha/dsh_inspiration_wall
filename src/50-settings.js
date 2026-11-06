/* -------------------------------------------------------------- settings */
function SettingsModal({ store, snap, onClose }) {
  const settings = snap.settings
  const [picking, setPicking] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    store.refreshStorage()
  }, [store])

  const update = async (patch) => {
    setError('')
    try {
      await store.patchSettings(patch)
    } catch (patchError) {
      setError(String(patchError && patchError.message ? patchError.message : patchError))
    }
  }

  const chooseDir = async () => {
    setPicking(true)
    setError('')
    try {
      const path = await store.pickDirectory()
      if (path) await store.patchSettings({ mediaDir: path })
    } catch (pickError) {
      setError(String(pickError && pickError.message ? pickError.message : pickError))
    } finally {
      setPicking(false)
      store.refreshStorage()
    }
  }

  const storage = snap.storage

  return h(
    Modal,
    { onClose, className: 'iw-modal-sm' },
    h(
      'div',
      { className: 'iw-modal-head' },
      h('h2', { className: 'iw-modal-title' }, T('settingsTitle')),
      h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
    ),
    h(
      'div',
      { className: 'iw-section', style: { marginTop: 12 } },
      h(
        'div',
        { className: 'iw-field' },
        h('span', { className: 'iw-field-label' }, T('palette')),
        h('div', { className: 'iw-inline', style: { marginTop: 2 } },
          PALETTE_VISIBLE.map((key) => h('button', {
            key,
            type: 'button',
            className: `iw-chip${(settings.palette || 'paper') === key ? ' is-on' : ''}`,
            onClick: () => update({ palette: key }),
          }, T(PALETTE_KEYS[key])))),
        h('span', { className: 'iw-settings-desc' }, T('paletteHint')),
      ),
      h('div', { className: 'iw-settings-row', style: { marginTop: 8 } },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('mediaDir')),
          h('div', { className: 'iw-settings-desc' }, T('mediaDirHint')),
          h('div', { className: 'iw-path', style: { marginTop: 8 } }, settings.mediaDir || storage?.mediaRoot || '…'),
        ),
        h('div', { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', size: 'sm', icon: 'folder', onClick: chooseDir, disabled: picking }, picking ? T('picking') : T('chooseDir')),
          settings.mediaDir ? h(Btn, { variant: 'ghost', size: 'sm', onClick: () => update({ mediaDir: '' }) }, T('reset')) : null,
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('tokenPrices')),
          h('div', { className: 'iw-settings-desc' }, T('tokenPricesHint')),
        ),
        h(
          'div',
          { className: 'iw-price-grid', style: { flex: '0 1 380px' } },
          [['priceInput', T('priceInput')], ['priceOutput', T('priceOutput')], ['priceCache', T('priceCache')]].map(([key, label]) => h(
            'label',
            { key, className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, label),
            h('input', {
              className: 'iw-input',
              type: 'number',
              min: 0,
              step: 0.01,
              value: settings[key],
              onChange: (event) => update({ [key]: Number(event.target.value) || 0 }),
            }),
          )),
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('transcription')),
          h('div', { className: 'iw-settings-desc' }, T('transcriptionHint')),
        ),
        h('div', { className: 'iw-btn-row' },
          h('select', {
            className: 'iw-select',
            style: { width: 90 },
            value: settings.language,
            onChange: (event) => update({ language: event.target.value }),
          },
          h('option', { value: 'zh' }, '中文'),
          h('option', { value: 'en' }, 'English'),
          h('option', { value: 'ja' }, '日本語')),
          h('button', {
            type: 'button',
            className: `iw-toggle${settings.transcribe ? ' is-on' : ''}`,
            role: 'switch',
            'aria-checked': settings.transcribe,
            onClick: () => update({ transcribe: !settings.transcribe }),
            title: T('transcription'),
          }),
        ),
      ),
      h('div', { className: 'iw-settings-row' },
        h('div', null,
          h('div', { className: 'iw-settings-label' }, T('defaultPeriod')),
          h('div', { className: 'iw-settings-desc' }, T('defaultPeriodHint')),
        ),
        h(Segmented, {
          value: settings.period,
          options: [
            { value: 'month', label: T('thisMonth') },
            { value: '90d', label: T('last90') },
            { value: 'all', label: T('allTime') },
          ],
          onChange: (value) => update({ period: value }),
        }),
      ),
      storage
        ? h(
            'div',
            { className: 'iw-settings-row' },
            h('div', null,
              h('div', { className: 'iw-settings-label' }, T('storage')),
              h('div', { className: 'iw-path', style: { marginTop: 6 } }, storage.dataDir),
            ),
            h('span', { className: 'iw-small iw-muted' }, T('storageCounts', { notes: storage.notes || 0, media: storage.media || 0 })),
          )
        : null,
      error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, error) : null,
      h(
        'div',
        { className: 'iw-modal-foot' },
        h('span', { className: 'iw-hint' }, T('settingsHint')),
        h(Btn, { variant: 'primary', onClick: onClose }, T('done')),
      ),
    ),
  )
}
