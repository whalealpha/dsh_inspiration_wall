/* --------------------------------------------------------------- complete */
function localDateTimeInput(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function CompleteModal({ store, snap, noteId, onClose }) {
  const note = (snap.notes || []).find((item) => item.id === noteId)
  const [when, setWhen] = React.useState(() => localDateTimeInput(new Date()))
  const [text, setText] = React.useState('')
  const [links, setLinks] = React.useState([{ label: '', url: '' }])
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')

  if (!note) return null

  const patchLink = (index, patch) => {
    setLinks((previous) => previous.map((link, position) => (position === index ? { ...link, ...patch } : link)))
  }

  const finish = async (skipReview) => {
    setBusy(true)
    setError('')
    try {
      const record = {
        id: uid('r'),
        createdAt: new Date().toISOString(),
        kind: 'complete',
        text: skipReview ? '' : text.trim(),
        implementedAt: toIso(when),
        results: skipReview
          ? []
          : links
              .filter((link) => link.url.trim())
              .map((link) => ({ label: link.label.trim() || link.url.trim(), url: link.url.trim() })),
      }
      await store.saveNote({
        ...note,
        category: '已实现',
        records: [record, ...noteRecords(note)],
      })
    } catch (finishError) {
      setError(String(finishError && finishError.message ? finishError.message : finishError))
      setBusy(false)
    }
  }

  return h(
    Modal,
    { onClose, className: 'iw-modal-sm' },
    h(
      'div',
      { className: 'iw-modal-head' },
      h('div', null,
        h('h2', { className: 'iw-modal-title' }, T('completeTitle')),
        h('div', { className: 'iw-modal-date', style: { marginTop: 4 } }, note.title || T('untitled')),
      ),
      h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
    ),
    h(
      'div',
      { className: 'iw-field', style: { marginTop: 16 } },
      h('span', { className: 'iw-field-label' }, T('completionTime')),
      h('input', {
        className: 'iw-input',
        type: 'datetime-local',
        value: when,
        onChange: (event) => setWhen(event.target.value),
        style: { width: 220 },
      }),
    ),
    h(
      'div',
      { className: 'iw-section' },
      h('div', { className: 'iw-section-label' }, h('span', null, T('resultLinks')), h('span', { className: 'iw-small iw-muted' }, T('resultLinksHint'))),
      h(
        'div',
        { className: 'iw-link-rows' },
        links.map((link, index) => h(
          'div',
          { key: index, className: 'iw-link-row' },
          h('input', {
            className: 'iw-input',
            style: { flex: '0 0 150px' },
            value: link.label,
            placeholder: T('linkLabelPlaceholder'),
            onChange: (event) => patchLink(index, { label: event.target.value }),
          }),
          h('input', {
            className: 'iw-input',
            value: link.url,
            placeholder: T('linkUrlPlaceholder'),
            onChange: (event) => patchLink(index, { url: event.target.value }),
          }),
          links.length > 1
            ? h(IconBtn, {
                name: 'close',
                size: 13,
                title: T('remove'),
                onClick: () => setLinks((previous) => previous.filter((_, position) => position !== index)),
              })
            : null,
        )),
      ),
      h('div', { style: { marginTop: 8 } },
        h(Btn, { variant: 'ghost', size: 'sm', icon: 'plus', onClick: () => setLinks((previous) => [...previous, { label: '', url: '' }]) }, T('addLink')),
      ),
    ),
    h(
      'div',
      { className: 'iw-field', style: { marginTop: 16 } },
      h('span', { className: 'iw-field-label' }, T('completionReviewOptional')),
      h('textarea', {
        className: 'iw-textarea',
        style: { minHeight: 88 },
        value: text,
        placeholder: T('completionReviewPlaceholder'),
        onChange: (event) => setText(event.target.value),
      }),
    ),
    error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, error) : null,
    h(
      'div',
      { className: 'iw-modal-foot' },
      h('span', { className: 'iw-hint' }, T('completeHint')),
      h(
        'div',
        { className: 'iw-btn-row' },
        h(Btn, { variant: 'ghost', onClick: onClose, disabled: busy }, T('cancel')),
        h(Btn, { variant: 'ghost', onClick: () => finish(true), disabled: busy }, T('skipReview')),
        h(Btn, { variant: 'primary', onClick: () => finish(false), disabled: busy }, busy ? T('saving') : T('saveComplete')),
      ),
    ),
  )
}
