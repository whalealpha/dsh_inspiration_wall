/* ---------------------------------------------------------------- detail */
const MORE_CATEGORIES = ['已放弃']

const attachmentKindLabel = (item) => {
  const type = String((item && item.type) || '')
  if (type === 'image') return T('image')
  if (type === 'video') return T('video')
  if (type === 'audio') return T('audio')
  return T('file')
}

/** One place for the "open this attachment some other way" menu. */
function attachmentMenuItems(item, handlers) {
  return [
    { key: 'preview', icon: 'eye', label: T('preview'), onSelect: () => handlers.preview(item) },
    {
      key: 'browser',
      icon: 'arrowUpRight',
      label: T('openInBrowser'),
      onSelect: () => handlers.browser(item),
    },
    { separator: true },
    { key: 'open', icon: 'folder', label: T('openWith'), onSelect: () => handlers.run(item, 'open') },
    { key: 'reveal', icon: 'search', label: T('revealInFolder'), onSelect: () => handlers.run(item, 'reveal') },
    { key: 'copy', icon: 'link', label: T('copyPath'), onSelect: () => handlers.copy(item) },
  ]
}

function Attachment({ item, onPreview, onMenu, children, style }) {
  return h(
    'div',
    {
      className: 'iw-attach-item is-previewable',
      style,
      title: T('attachmentHint'),
      onClick: () => onPreview(item),
      onContextMenu: (event) => {
        event.preventDefault()
        event.stopPropagation()
        onMenu(event, item)
      },
    },
    children,
    h('span', { className: 'iw-attach-hint' }, h(Icon, { name: 'eye', size: 10 }), T('preview')),
  )
}

function DetailMedia({ media, onPreview, onMenu, onEditTranscript }) {
  const items = Array.isArray(media) ? media : []
  if (!items.length) return null
  const visual = items.filter((item) => item.type !== 'file')
  const files = items.filter((item) => item.type === 'file')
  return h(
    'div',
    null,
    visual.length
      ? h(
          'div',
          { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginTop: 4 } },
          visual.map((item) => {
            if (item.type === 'audio') {
              return h(
                'div',
                { key: item.id, style: { gridColumn: '1 / -1' } },
                h(
                  'div',
                  { className: 'iw-voice' },
                  h(
                    'div',
                    { className: 'iw-voice-head' },
                    h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id }),
                    h(IconBtn, {
                      name: 'dots',
                      size: 15,
                      title: T('moreActions'),
                      onClick: (event) => onMenu(event, item),
                    }),
                  ),
                  h(
                    'div',
                    { className: 'iw-voice-label' },
                    h(Icon, { name: 'mic', size: 11 }),
                    h('span', null, T('voiceContent')),
                    h('span', { className: 'iw-voice-note' }, T('voiceContentHint')),
                  ),
                  h('textarea', {
                    className: 'iw-textarea iw-voice-text',
                    defaultValue: item.transcript || '',
                    placeholder: T('noTranscript'),
                    onBlur: (event) => onEditTranscript(item, event.target.value),
                    onClick: (event) => event.stopPropagation(),
                  }),
                ),
              )
            }
            return h(
              Attachment,
              { key: item.id, item, onPreview, onMenu },
              item.type === 'image'
                ? h('img', {
                    src: api.mediaUrl(item.path),
                    alt: item.caption || T('image'),
                    style: { width: '100%', borderRadius: 12, display: 'block', background: 'var(--iw-sunken)' },
                  })
                : h('video', {
                    src: api.mediaUrl(item.path),
                    controls: true,
                    style: { width: '100%', borderRadius: 12, display: 'block', background: '#000' },
                  }),
              item.caption ? h('p', { className: 'iw-media-caption' }, item.caption) : null,
            )
          }),
        )
      : null,
    files.length
      ? h(
          'div',
          { className: 'iw-file-list-grid' },
          files.map((item) => h(
            Attachment,
            { key: item.id, item, onPreview, onMenu, style: { display: 'inline-block' } },
            h(
              'div',
              { className: 'iw-filechip' },
              h(Icon, { name: 'folder', size: 14 }),
              h('span', { className: 'iw-filechip-name' }, item.caption || T('file')),
              item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null,
            ),
          )),
        )
      : null,
  )
}

function recordKindOf(file) {
  return mediaKindOf(file)
}

function RecordMedia({ media, compact, onPreview, onMenu }) {
  const items = Array.isArray(media) ? media : []
  if (!items.length) return null
  return h(
    'div',
    { className: 'iw-record-media' },
    items.map((item) => {
      if (item.type === 'audio') {
        return h(
          'div',
          { key: item.id, style: { flex: '1 1 100%' } },
          h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id, compact: true }),
          item.transcript
            ? h('div', { className: 'iw-transcript', style: { marginTop: 6, maxHeight: 92, overflow: 'auto', fontSize: 10.5 } }, item.transcript)
            : null,
        )
      }
      return h(
        Attachment,
        { key: item.id, item, onPreview, onMenu },
        item.type === 'image'
          ? h('span', { className: 'iw-thumb' }, h('img', { src: api.mediaUrl(item.path), alt: item.caption || T('image') }))
          : item.type === 'video'
            ? h('span', { className: 'iw-thumb' },
                h('video', { src: api.mediaUrl(item.path), muted: true, preload: 'metadata' }),
                h('span', { className: 'iw-thumb-play' }, h(Icon, { name: 'play', size: 16 })),
              )
            : h('span', { className: 'iw-filechip' },
                h(Icon, { name: 'folder', size: 13 }),
                h('span', { className: 'iw-filechip-name' }, item.caption || T('file'))),
      )
    }),
  )
}

function RecordItem({ record, onDelete, confirming, onAskDelete, onCancelDelete, onPreview, onMenu }) {
  return h(
    'div',
    { className: 'iw-timeline-item' },
    h('span', { className: `iw-timeline-dot${record.kind === 'complete' ? ' is-complete' : ''}` }),
    h(
      'div',
      { className: 'iw-timeline-body' },
      h(
        'div',
        { className: 'iw-timeline-head' },
        h(
          'span',
          { className: 'iw-inline', style: { gap: 6 } },
          h('span', { className: `iw-timeline-kind${record.kind === 'complete' ? ' is-complete' : ''}` },
            record.kind === 'complete' ? T('recordKindComplete') : T('recordKindProgress')),
          h('span', null, fmtDateTime(record.createdAt)),
          record.implementedAt ? h('span', null, `${T('implementedOn')} ${fmtDate(record.implementedAt)}`) : null,
        ),
        confirming
          ? h(
              'span',
              { className: 'iw-inline', style: { gap: 6 } },
              h('span', { className: 'iw-row-muted' }, T('confirmDeleteRecord')),
              h('button', { type: 'button', className: 'iw-link', onClick: () => { onDelete(record.id) } }, T('delete')),
              h('button', { type: 'button', className: 'iw-link', onClick: onCancelDelete, style: { color: 'var(--iw-text3)' } }, T('cancel')),
            )
          : h(IconBtn, { name: 'trash', size: 13, title: T('deleteRecord'), onClick: onAskDelete }),
      ),
      record.text ? h('div', { className: 'iw-timeline-text' }, record.text) : null,
      h(RecordMedia, { media: record.media, onPreview, onMenu }),
      record.results && record.results.length
        ? h(
            'div',
            { className: 'iw-timeline-links' },
            record.results.map((link) => h('a', {
              key: link.url,
              className: 'iw-review-link',
              href: link.url,
              target: '_blank',
              rel: 'noreferrer',
              style: { padding: '4px 9px', background: 'var(--iw-accent-soft)', borderRadius: 8 },
            }, h(Icon, { name: 'arrowUpRight', size: 12 }), link.label || link.url)),
          )
        : null,
    ),
  )
}

function DetailModal({ store, snap, noteId, onClose }) {
  const note = (snap.notes || []).find((item) => item.id === noteId)
  const [recordText, setRecordText] = React.useState('')
  const [recordMedia, setRecordMedia] = React.useState([])
  const [uploading, setUploading] = React.useState(0)
  const [savingRecord, setSavingRecord] = React.useState(false)
  const [error, setError] = React.useState('')
  const [confirmingNote, setConfirmingNote] = React.useState(false)
  const [confirmRecordId, setConfirmRecordId] = React.useState('')
  const [switching, setSwitching] = React.useState(false)
  const [preview, setPreview] = React.useState(null)
  const [menu, setMenu] = React.useState(null)
  const imageInputRef = React.useRef(null)
  const videoInputRef = React.useRef(null)
  const fileInputRef = React.useRef(null)

  const uploadRecordMedia = async (file) => {
    if (!file) return
    if (file.size > (MEDIA_LIMITS[mediaKindOf(file)] || MEDIA_LIMITS.file)) {
      setError(`${T('fileTooLarge')}（${file.name}）`)
      return
    }
    setError('')
    setUploading((value) => value + 1)
    try {
      const extension = fileExtension(file.name)
      const uploaded = await api.upload(file, safeFileName(`${noteId || 'note'}_${Date.now()}_${Math.floor(Math.random() * 1e4)}`, extension))
      const media = {
        id: uid('m'),
        type: recordKindOf(file),
        path: uploaded.path,
        mime: uploaded.mime,
        duration: 0,
        size: file.size,
        caption: file.name.slice(0, 120),
        transcript: '',
      }
      setRecordMedia((previous) => [...previous, media])
    } catch (uploadError) {
      setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
    } finally {
      setUploading((value) => Math.max(0, value - 1))
    }
  }

  const addRecordFiles = async (files) => {
    for (const file of files) await uploadRecordMedia(file)
  }

  const { dragging, dropProps } = useAttachDrop(addRecordFiles)

  if (!note) return null

  const records = noteRecords(note)
  const implemented = noteIsImplemented(note)
  const interval = relativeInterval(note)
  const completion = completionRecord(note)
  const expectState = expectedState(note)

  const saveNote = async (next) => {
    await store.saveNote(next)
  }

  const setStatus = async (next) => {
    if (next === note.category) return
    if (next === '已实现') {
      store.setUi({ completeNoteId: note.id })
      return
    }
    setSwitching(true)
    setError('')
    try {
      await saveNote({ ...note, category: next })
    } catch (statusError) {
      setError(String(statusError && statusError.message ? statusError.message : statusError))
    } finally {
      setSwitching(false)
    }
  }

  const moreValue = STATUSES.includes(note.category) ? '' : note.category

  const pickRecordMedia = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    await addRecordFiles(files)
  }

  const addRecord = async () => {
    if (!recordText.trim() && recordMedia.length === 0) return
    setSavingRecord(true)
    setError('')
    try {
      const record = {
        id: uid('r'),
        createdAt: new Date().toISOString(),
        kind: 'progress',
        text: recordText.trim(),
        implementedAt: '',
        results: [],
        media: recordMedia,
      }
      await saveNote({ ...note, records: [record, ...records] })
      setRecordText('')
      setRecordMedia([])
    } catch (recordError) {
      setError(String(recordError && recordError.message ? recordError.message : recordError))
    } finally {
      setSavingRecord(false)
    }
  }

  const deleteRecord = async (id) => {
    setConfirmRecordId('')
    try {
      await saveNote({ ...note, records: records.filter((record) => record.id !== id) })
    } catch (deleteError) {
      setError(String(deleteError && deleteError.message ? deleteError.message : deleteError))
    }
  }

  /** Save an edited transcript in place; the audio file keeps its bytes. */
  const saveTranscript = async (item, text) => {
    if (!item || text === (item.transcript || '')) return
    try {
      await saveNote({
        ...note,
        media: (note.media || []).map((entry) => (entry.id === item.id ? { ...entry, transcript: text } : entry)),
      })
      store.toast(T('transcriptSaved'))
    } catch (transcriptError) {
      setError(String(transcriptError && transcriptError.message ? transcriptError.message : transcriptError))
    }
  }

  /* -------------------------------------------------------- attachments */
  const openAttachment = async (item, mode) => {
    try {
      await store.openFile(item.path, mode)
      if (mode === 'reveal') store.toast(T('revealed'))
    } catch (openError) {
      store.toast(T('openFailed'))
      setError(String(openError && openError.message ? openError.message : openError))
    }
  }

  const copyAttachmentPath = async (item) => {
    try {
      await navigator.clipboard.writeText(item.path)
      store.toast(T('copied'))
    } catch {
      store.toast(item.path)
    }
  }

  /**
   * Open the attachment in a real browser tab. The app window may refuse
   * `window.open`, so we fall back to the host, which spawns the system
   * browser on the same local media URL. Either way the bytes stay local.
   */
  const openInBrowser = async (item) => {
    const url = api.mediaUrl(item.path)
    let handle = null
    try {
      handle = window.open(url, '_blank')
    } catch {
      handle = null
    }
    if (handle) {
      try {
        handle.opener = null
      } catch {
        /* cross-origin */
      }
      return
    }
    try {
      await store.openFile(item.path, 'browser')
      store.toast(T('openedInBrowser'))
    } catch {
      try {
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.target = '_blank'
        anchor.rel = 'noopener noreferrer'
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
      } catch {
        store.toast(T('openFailed'))
      }
    }
  }

  const attachmentHandlers = {
    preview: (item) => setPreview(item),
    browser: (item) => {
      openInBrowser(item)
    },
    run: (item, mode) => {
      openAttachment(item, mode)
    },
    copy: (item) => {
      copyAttachmentPath(item)
    },
  }

  const openMenu = (event, item) => {
    const source = event && (event.currentTarget || event.target)
    const rect = source && source.getBoundingClientRect ? source.getBoundingClientRect() : null
    setMenu({
      x: rect ? rect.left : (event && event.clientX) || 120,
      y: rect ? rect.bottom + 4 : (event && event.clientY) || 120,
      item,
    })
  }

  return h(
    Modal,
    { onClose, className: 'iw-modal-md' },
    h(
      'div',
      { className: 'iw-drop-wrap', ...dropProps },
      h(
        'div',
        { className: 'iw-modal-head' },
        h(
          'div',
          { className: 'iw-inline' },
          h(CatChip, { category: note.category }),
          h('span', { className: 'iw-modal-date' }, `${fmtDateTime(note.createdAt)} · ${fmtRel(note.createdAt)}`),
          interval !== null ? h('span', { className: 'iw-modal-date' }, `· ${T('intervalLabel', { days: interval })}`) : null,
          note.expectedAt
            ? h('span', { className: `iw-expect-chip${implemented ? ' is-done' : expectState ? ` is-${expectState}` : ''}` },
                h(Icon, { name: 'calendar', size: 11 }),
                h('span', null, `${T('expectedChip', { date: fmtDate(note.expectedAt) })}${implemented ? '' : ` · ${expectedLabel(note)}`}`))
            : null,
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Stars, { value: note.stars, size: 16, gap: 3 }),
          h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
        ),
      ),
      h(
        'div',
        { className: 'iw-status-row', style: { marginTop: 12, padding: '10px 12px', borderRadius: 12, background: 'var(--iw-sunken)' } },
        h('span', { className: 'iw-status-label' }, T('statusLabel')),
        STATUSES.map((status) => h(
          'button',
          {
            key: status,
            type: 'button',
            className: `iw-chip${note.category === status ? ' is-on' : ''}`,
            disabled: switching,
            onClick: () => setStatus(status),
          },
          note.category === status ? h(Icon, { name: 'check', size: 11 }) : null,
          catLabel(status),
        )),
        h(
          'select',
          {
            className: 'iw-more-select',
            value: moreValue,
            disabled: switching,
            onChange: (event) => {
              if (event.target.value) setStatus(event.target.value)
            },
            title: T('moreCategories'),
          },
          h('option', { value: '' }, T('moreCategories')),
          MORE_CATEGORIES.map((name) => h('option', { key: name, value: name }, catLabel(name))),
        ),
      ),
      h('h2', { style: { margin: '14px 0 0', fontSize: 22, fontWeight: 650, letterSpacing: '-0.3px' } }, note.title || T('untitled')),
      note.body ? h('p', { style: { margin: '10px 0 0', fontSize: 12.5, lineHeight: 1.75, color: 'var(--iw-text2)', whiteSpace: 'pre-wrap' } }, note.body) : null,
      note.summary
        ? h(
            'div',
            { className: 'iw-summary-box' },
            h(
              'div',
              { className: 'iw-summary-head' },
              h('span', { className: 'iw-summary-title' }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('summaryLabel'))),
              h('span', { className: 'iw-small iw-muted' }, T('summaryCardHint')),
            ),
            h('div', { className: 'iw-summary-text' }, note.summary),
          )
        : null,
      note.media && note.media.length
        ? h('div', { className: 'iw-section' }, h(DetailMedia, {
            media: note.media,
            onPreview: attachmentHandlers.preview,
            onMenu: openMenu,
            onEditTranscript: saveTranscript,
          }))
        : null,
      h(
        'div',
        { className: 'iw-section' },
        h(
          'div',
          { className: 'iw-section-label' },
          h('span', null, `${T('records')}${records.length ? ` · ${records.length}` : ''}`),
          h('span', { className: 'iw-small iw-muted' }, T('recordsHint')),
        ),
        records.length
          ? h(
              'div',
              { className: 'iw-timeline' },
              records.map((record) => h(RecordItem, {
                key: record.id,
                record,
                confirming: confirmRecordId === record.id,
                onAskDelete: () => setConfirmRecordId(record.id),
                onCancelDelete: () => setConfirmRecordId(''),
                onDelete: deleteRecord,
                onPreview: attachmentHandlers.preview,
                onMenu: openMenu,
              })),
            )
          : h('div', { className: 'iw-small iw-muted', style: { padding: '4px 0 8px' } }, T('noRecords')),
        h(
          'div',
          { style: { marginTop: 12, padding: 12, borderRadius: 12, background: 'var(--iw-sunken)' } },
          h('div', { className: 'iw-field-label', style: { marginBottom: 6 } }, T('addRecord')),
          h('textarea', {
            className: 'iw-textarea',
            style: { minHeight: 58, background: 'var(--iw-surface)' },
            value: recordText,
            placeholder: T('recordPlaceholder'),
            onChange: (event) => setRecordText(event.target.value),
          }),
          h(
            'div',
            { className: 'iw-record-attach' },
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => imageInputRef.current && imageInputRef.current.click() },
              h(Icon, { name: 'image', size: 13 }), T('image')),
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => videoInputRef.current && videoInputRef.current.click() },
              h(Icon, { name: 'video', size: 13 }), T('video')),
            h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => fileInputRef.current && fileInputRef.current.click() },
              h(Icon, { name: 'folder', size: 13 }), T('file')),
            uploading > 0 ? h('span', { className: 'iw-small iw-muted' }, T('uploading')) : h('span', { className: 'iw-small iw-muted' }, T('dropOrPickShort')),
          ),
          h('input', { ref: imageInputRef, type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          h('input', { ref: videoInputRef, type: 'file', accept: 'video/*', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          h('input', { ref: fileInputRef, type: 'file', multiple: true, style: { display: 'none' }, onChange: pickRecordMedia }),
          recordMedia.length
            ? h(
                'div',
                { className: 'iw-record-media' },
                recordMedia.map((item) => h(
                  'div',
                  { key: item.id, style: { position: 'relative' } },
                  item.type === 'image'
                    ? h('span', { className: 'iw-thumb' }, h('img', { src: api.mediaUrl(item.path), alt: item.caption }))
                    : item.type === 'video'
                      ? h('span', { className: 'iw-thumb' }, h('video', { src: api.mediaUrl(item.path), muted: true, preload: 'metadata' }))
                      : h('span', { className: 'iw-filechip' }, h(Icon, { name: 'folder', size: 13 }), h('span', { className: 'iw-filechip-name' }, item.caption), item.size ? h('span', { className: 'iw-filechip-size' }, fmtBytes(item.size)) : null),
                  h('button', {
                    type: 'button',
                    className: 'iw-file-remove',
                    onClick: () => setRecordMedia((previous) => previous.filter((media) => media.id !== item.id)),
                    'aria-label': T('remove'),
                  }, h(Icon, { name: 'close', size: 10 })),
                )),
              )
            : null,
          h(
            'div',
            { style: { display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' } },
            h(Btn, { variant: 'primary', size: 'sm', onClick: addRecord, disabled: savingRecord || uploading > 0 },
              savingRecord ? T('saving') : T('saveRecord')),
          ),
        ),
        error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, margin: '8px 0 0' } }, error) : null,
      ),
      h(
        'button',
        {
          type: 'button',
          className: `iw-complete-card${implemented ? ' is-done' : ''}`,
          disabled: implemented,
          onClick: () => {
            if (!implemented) store.setUi({ completeNoteId: note.id })
          },
        },
        h('span', { className: 'iw-complete-card-icon' }, h(Icon, { name: 'check', size: 18 })),
        h(
          'div',
          { className: 'iw-complete-card-body' },
          h('div', { className: 'iw-complete-card-title' }, implemented ? T('completed') : T('completeCardTitle')),
          h('div', { className: 'iw-complete-card-sub' },
            implemented
              ? (completion ? T('completedAt', { time: fmtDate(completion.implementedAt) }) : T('completed'))
              : T('completeCardHint')),
        ),
        implemented ? null : h(Icon, { name: 'chevronRight', size: 16 }),
      ),
      h(
        'div',
        { className: 'iw-modal-foot' },
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', size: 'sm', icon: 'edit', onClick: () => store.setUi({ compose: note.id }) }, T('edit')),
          confirmingNote
            ? h(
                'span',
                { className: 'iw-btn-row' },
                h('span', { className: 'iw-small iw-muted' }, T('confirmDelete')),
                h(Btn, { variant: 'ghost', size: 'sm', onClick: () => setConfirmingNote(false) }, T('cancel')),
                h(Btn, { variant: 'ghost', size: 'sm', onClick: () => store.deleteNote(note.id).catch(() => {}) }, T('delete')),
              )
            : h(Btn, { variant: 'ghost', size: 'sm', icon: 'trash', onClick: () => setConfirmingNote(true) }, T('delete')),
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h('span', { className: 'iw-small iw-muted' }, T('updatedAt', { time: fmtRel(note.updatedAt) })),
          h(Btn, { variant: 'ghost', onClick: onClose }, T('close')),
        ),
      ),
      dragging ? h(DropOverlay) : null,
    ),
    menu
      ? h(ContextMenu, {
          x: menu.x,
          y: menu.y,
          title: fileNameOf(menu.item) || attachmentKindLabel(menu.item),
          items: attachmentMenuItems(menu.item, attachmentHandlers),
          onClose: () => setMenu(null),
        })
      : null,
    preview
      ? h(Lightbox, {
          item: preview,
          onClose: () => setPreview(null),
          onOpenWith: (item) => openAttachment(item, 'open'),
        })
      : null,
  )
}