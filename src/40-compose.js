/* --------------------------------------------------------------- compose */
function fileExtension(name) {
  const match = String(name || '').match(/\.([A-Za-z0-9]{1,8})$/)
  return match ? match[1].toLowerCase() : 'bin'
}

function safeFileName(base, extension) {
  return `${String(base).replace(/[^A-Za-z0-9_-]/g, '_')}.${extension.replace(/[^a-z0-9]/g, '')}`
}

function encodeBase64(bytes) {
  let binary = ''
  const chunk = 0x8000
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(index, index + chunk))
  }
  return btoa(binary)
}

function encodeWav(samples, sampleRate) {
  const bytesPerSample = 2
  const dataSize = samples.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)
  const writeString = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) view.setUint8(offset + index, text.charCodeAt(index))
  }
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * bytesPerSample, true)
  view.setUint16(32, bytesPerSample, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)
  let offset = 44
  for (let index = 0; index < samples.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, samples[index]))
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
    offset += 2
  }
  return new Uint8Array(buffer)
}

async function blobToWavBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer()
  const AudioCtor = window.AudioContext || window.webkitAudioContext
  if (!AudioCtor) throw new Error(T('recorderUnavailable'))
  const context = new AudioCtor()
  let decoded
  try {
    decoded = await context.decodeAudioData(arrayBuffer.slice(0))
  } finally {
    context.close().catch(() => {})
  }
  const targetRate = 16000
  const length = Math.max(1, Math.ceil(decoded.duration * targetRate))
  const OfflineCtor = window.OfflineAudioContext || window.webkitOfflineAudioContext
  const offline = new OfflineCtor(1, length, targetRate)
  const source = offline.createBufferSource()
  source.buffer = decoded
  source.connect(offline.destination)
  source.start(0)
  const rendered = await offline.startRendering()
  return encodeBase64(encodeWav(rendered.getChannelData(0), targetRate))
}

function nowLocalInput() {
  const date = new Date()
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function toIso(localValue) {
  if (!localValue) return new Date().toISOString()
  const date = new Date(localValue)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

const MEDIA_LIMITS = { image: 12 * 1024 * 1024, video: 80 * 1024 * 1024, audio: 30 * 1024 * 1024, file: 50 * 1024 * 1024 }

function ComposeModal({ store, snap, noteId, onClose }) {
  const existing = noteId ? (snap.notes || []).find((item) => item.id === noteId) : null
  const settings = snap.settings
  const [draft, setDraft] = React.useState(() => existing
    ? JSON.parse(JSON.stringify(existing))
    : {
        id: uid('n'),
        title: '',
        body: '',
        summary: '',
        category: '未开始',
        stars: 3,
        tags: [],
        createdAt: new Date().toISOString(),
        expectedAt: '',
        updatedAt: new Date().toISOString(),
        media: [],
        records: [],
      })
  const [tagText, setTagText] = React.useState(existing ? (existing.tags || []).join(', ') : '')
  const [when, setWhen] = React.useState(() => {
    const date = new Date(existing ? existing.createdAt : Date.now())
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return local.toISOString().slice(0, 16)
  })
  const [busy, setBusy] = React.useState(false)
  const [uploading, setUploading] = React.useState(0)
  const [error, setError] = React.useState('')
  const [recording, setRecording] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [transcribing, setTranscribing] = React.useState({})
  const [transcriptError, setTranscriptError] = React.useState('')
  // True while the summary is machine-generated: editing the transcript then
  // keeps it in sync; typing a summary by hand pins it.
  const [summaryAuto, setSummaryAuto] = React.useState(false)

  const recorderRef = React.useRef(null)
  const streamRef = React.useRef(null)
  const timerRef = React.useRef(0)
  const imageInputRef = React.useRef(null)
  const videoInputRef = React.useRef(null)
  const fileInputRef = React.useRef(null)

  React.useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop())
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
  }, [])

  const patch = (next) => setDraft((previous) => ({ ...previous, ...next }))
  const canSave = !busy && (draft.title.trim() || draft.body.trim() || draft.summary.trim() || draft.media.length > 0)

  const uploadBlob = async (blob, name) => {
    setUploading((value) => value + 1)
    try {
      return await api.upload(blob, name)
    } finally {
      setUploading((value) => Math.max(0, value - 1))
    }
  }

  const addFile = async (file, kind) => {
    setError('')
    if (!file) return
    const limit = MEDIA_LIMITS[kind] || MEDIA_LIMITS.file
    if (file.size > limit) {
      setError(`${T('fileTooLarge')}（${file.name}）`)
      return
    }
    try {
      const extension = fileExtension(file.name)
      const uploaded = await uploadBlob(file, safeFileName(`${draft.id}_${Date.now()}`, extension))
      const media = {
        id: uid('m'),
        type: kind,
        path: uploaded.path,
        mime: uploaded.mime,
        duration: 0,
        size: file.size,
        caption: file.name.slice(0, 120),
        transcript: '',
      }
      setDraft((previous) => ({ ...previous, media: [...previous.media, media] }))
    } catch (uploadError) {
      setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
    }
  }

  /** One entry point for both the pickers and a drag-and-drop. */
  const addFiles = async (files) => {
    for (const file of files) await addFile(file, mediaKindOf(file))
  }

  const { dragging, dropProps } = useAttachDrop(addFiles)

  const onPickImages = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, 'image')
  }

  const onPickVideos = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, 'video')
  }

  const onPickFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    for (const file of files) await addFile(file, mediaKindOf(file))
  }

  const startRecording = async () => {
    setError('')
    setTranscriptError('')
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(T('noMicrophone'))
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks = []
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size) chunks.push(event.data)
      }
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        streamRef.current = null
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        const duration = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
        try {
          const uploaded = await uploadBlob(blob, safeFileName(`${draft.id}_${Date.now()}`, 'webm'))
          const media = {
            id: uid('m'),
            type: 'audio',
            path: uploaded.path,
            mime: uploaded.mime || 'audio/webm',
            duration,
            size: blob.size,
            caption: T('voiceMemo'),
            transcript: '',
            blob,
          }
          setDraft((previous) => ({ ...previous, media: [...previous.media, media] }))
          if (settings.transcribe) transcribeMedia(media.id, blob)
        } catch (uploadError) {
          setError(String(uploadError && uploadError.message ? uploadError.message : uploadError))
        }
      }
      const startedAt = Date.now()
      recorderRef.current = recorder
      streamRef.current = stream
      setRecording(true)
      setSeconds(0)
      timerRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - startedAt) / 1000)
        setSeconds(elapsed)
        if (elapsed >= MAX_AUDIO_SECONDS) stopRecording()
      }, 400)
      recorder.start()
    } catch (recordError) {
      setError(String(recordError && recordError.message ? recordError.message : recordError))
    }
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = 0
    }
    setRecording(false)
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive') recorder.stop()
  }

  /**
   * Speech → text. The transcript is the voice clip's own detail box (editable,
   * never written back to the audio), and the note summary is a SEPARATE,
   * compressed line produced locally by `summarizeText` — the two must never be
   * the same full paragraph.
   */
  const transcribeMedia = async (mediaId, blob) => {
    setTranscribing((previous) => ({ ...previous, [mediaId]: 'running' }))
    setTranscriptError('')
    try {
      const base64 = await blobToWavBase64(blob)
      const transcript = await store.transcribe(base64, settings.language || 'zh')
      const text = (typeof transcript === 'string' ? transcript : (transcript && transcript.text) || '').trim()
      if (!text) {
        setTranscribing((previous) => ({ ...previous, [mediaId]: 'empty' }))
        return
      }
      const keepTyped = Boolean(draft.summary && draft.summary.trim() && !summaryAuto)
      setDraft((previous) => {
        const media = previous.media.map((item) => (item.id === mediaId ? { ...item, transcript: text } : item))
        const summary = keepTyped ? previous.summary : summarizeText(text)
        return { ...previous, media, summary }
      })
      if (!keepTyped) setSummaryAuto(true)
      setTranscribing((previous) => ({ ...previous, [mediaId]: 'done' }))
    } catch (transcribeError) {
      setTranscribing((previous) => ({ ...previous, [mediaId]: 'error' }))
      setTranscriptError(String(transcribeError && transcribeError.message ? transcribeError.message : transcribeError))
    }
  }

  const retryTranscribe = async (item) => {
    if (item.blob) {
      await transcribeMedia(item.id, item.blob)
      return
    }
    try {
      setTranscribing((previous) => ({ ...previous, [item.id]: 'running' }))
      const response = await fetch(api.mediaUrl(item.path))
      const blob = await response.blob()
      await transcribeMedia(item.id, blob)
    } catch (retryError) {
      setTranscribing((previous) => ({ ...previous, [item.id]: 'error' }))
      setTranscriptError(String(retryError && retryError.message ? retryError.message : retryError))
    }
  }

  /**
   * Editing the transcript only changes the text box: the recording itself is
   * never re-encoded or replaced. An auto summary follows the edit; a summary
   * the user typed is left alone.
   */
  const updateTranscript = (mediaId, text) => {
    setDraft((previous) => {
      const media = previous.media.map((item) => (item.id === mediaId ? { ...item, transcript: text } : item))
      const summary = summaryAuto ? summarizeText(text) : previous.summary
      return { ...previous, media, summary }
    })
  }

  const regenSummary = (item) => {
    const source = (item && item.transcript) || ''
    setSummaryAuto(true)
    patch({ summary: summarizeText(source) })
  }

  const removeMedia = (mediaId) => {
    setDraft((previous) => ({ ...previous, media: previous.media.filter((item) => item.id !== mediaId) }))
  }

  const save = async () => {
    if (!canSave) return
    setBusy(true)
    setError('')
    try {
      const tags = tagText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 12)
      const payload = {
        ...draft,
        title: draft.title.trim() || T('untitled'),
        body: draft.body.trim(),
        summary: draft.summary.trim(),
        tags,
        createdAt: toIso(when),
        expectedAt: draft.expectedAt || '',
        media: draft.media.map(({ blob, ...rest }) => rest),
      }
      await store.saveNote(payload)
    } catch (saveError) {
      setError(String(saveError && saveError.message ? saveError.message : saveError))
      setBusy(false)
    }
  }

  const audioItems = draft.media.filter((item) => item.type === 'audio')
  const otherItems = draft.media.filter((item) => item.type !== 'audio')

  return h(
    Modal,
    { onClose, className: 'iw-modal-md' },
    h(
      'div',
      { className: 'iw-drop-wrap', ...dropProps },
      h(
        'div',
        { className: 'iw-modal-head' },
        h('h2', { className: 'iw-modal-title' }, existing ? T('editRecord') : T('record')),
        h(
          'div',
          { className: 'iw-btn-row' },
          h('span', { className: 'iw-modal-date' }, fmtDateTime(draft.createdAt)),
          h(IconBtn, { name: 'close', onClick: onClose, title: T('close') }),
        ),
      ),
      h('input', {
        className: 'iw-input iw-title-input',
        value: draft.title,
        placeholder: T('titlePlaceholder'),
        onChange: (event) => patch({ title: event.target.value }),
        'aria-label': T('titleLabel'),
      }),
      h('textarea', {
        className: 'iw-textarea',
        style: { marginTop: 12, minHeight: 96, border: 'none' },
        value: draft.body,
        placeholder: T('bodyPlaceholder'),
        onChange: (event) => patch({ body: event.target.value }),
        'aria-label': T('bodyLabel'),
      }),
      h(
        'div',
        { className: 'iw-attach-row' },
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: recording ? stopRecording : startRecording },
          h(Icon, { name: 'mic', size: 14 }),
          recording ? `${T('stopRecording')} ${fmtDuration(seconds)}` : T('voice')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => imageInputRef.current && imageInputRef.current.click() },
          h(Icon, { name: 'image', size: 14 }), T('image')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => videoInputRef.current && videoInputRef.current.click() },
          h(Icon, { name: 'video', size: 14 }), T('video')),
        h('button', { type: 'button', className: 'iw-attach-btn', onClick: () => fileInputRef.current && fileInputRef.current.click() },
          h(Icon, { name: 'folder', size: 14 }), T('fileUpload')),
        recording
          ? h('span', { className: 'iw-recording' }, h('i', { className: 'iw-rec-dot' }), T('recordingHint'))
          : h('span', { className: 'iw-small iw-muted' }, T('dropOrPick')),
      ),
      h('input', { ref: imageInputRef, type: 'file', accept: 'image/*', multiple: true, style: { display: 'none' }, onChange: onPickImages }),
      h('input', { ref: videoInputRef, type: 'file', accept: 'video/*', multiple: true, style: { display: 'none' }, onChange: onPickVideos }),
      h('input', { ref: fileInputRef, type: 'file', multiple: true, style: { display: 'none' }, onChange: onPickFiles }),
      audioItems.length
        ? h(
            'div',
            { style: { display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginTop: 12 } },
            audioItems.map((item) => h(
              'div',
              { key: item.id, className: 'iw-voice' },
              h(
                'div',
                { className: 'iw-voice-head' },
                h(AudioPlayer, { src: api.mediaUrl(item.path), duration: item.duration, seed: item.id, compact: true }),
                h('button', {
                  type: 'button',
                  className: 'iw-link',
                  onClick: () => retryTranscribe(item),
                  disabled: transcribing[item.id] === 'running',
                }, transcribing[item.id] === 'running'
                  ? T('transcribing')
                  : (item.transcript ? T('retranscribe') : T('transcribe'))),
                h(IconBtn, { name: 'trash', size: 13, title: T('remove'), onClick: () => removeMedia(item.id) }),
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
                value: item.transcript,
                placeholder: T('voiceContentPlaceholder'),
                onChange: (event) => updateTranscript(item.id, event.target.value),
              }),
              item.transcript
                ? h(
                    'div',
                    { className: 'iw-voice-actions' },
                    h('button', {
                      type: 'button',
                      className: 'iw-link',
                      onClick: () => regenSummary(item),
                    }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('regenSummary'))),
                    h('span', { className: 'iw-voice-note' }, T('voiceLocalNote')),
                  )
                : null,
            )),
          )
        : null,
      otherItems.length
        ? h(
            'div',
            { className: 'iw-file-list' },
            otherItems.map((item) => h(
              'div',
              { key: item.id, className: 'iw-file' },
              h('button', { type: 'button', className: 'iw-file-remove', onClick: () => removeMedia(item.id), 'aria-label': T('remove') }, h(Icon, { name: 'close', size: 11 })),
              item.type === 'image' || item.type === 'video'
                ? h(MediaThumb, { item })
                : h('div', { className: 'iw-filechip', style: { maxWidth: '100%' } }, h(Icon, { name: 'folder', size: 14 }), h('span', { className: 'iw-filechip-name' }, item.caption || T('file'))),
              h('div', { style: { marginTop: 6, fontSize: 9.5, color: 'var(--iw-text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                item.type === 'file' ? `${item.caption || T('file')} · ${fmtBytes(item.size)}` : (item.caption || T(item.type))),
            )),
          )
        : null,
      h(
        'div',
        { className: 'iw-summary-box iw-summary' },
        h(
          'div',
          { className: 'iw-summary-head' },
          h('span', { className: 'iw-summary-title' }, h(Icon, { name: 'sparkle', size: 11 }), h('span', null, T('summaryLabel'))),
          h('span', { className: 'iw-small iw-muted' }, summaryAuto ? T('summaryAutoHint') : T('summaryCardHint')),
        ),
        h('textarea', {
          className: 'iw-textarea',
          style: { minHeight: 62 },
          value: draft.summary,
          placeholder: T('summaryPlaceholder'),
          onChange: (event) => {
            setSummaryAuto(false)
            patch({ summary: event.target.value })
          },
        }),
        h(
          'div',
          { className: 'iw-voice-actions', style: { marginTop: 8 } },
          audioItems.length
            ? h('button', {
                type: 'button',
                className: 'iw-link',
                disabled: !audioItems.some((item) => item.transcript),
                onClick: () => regenSummary(audioItems.find((item) => item.transcript) || audioItems[0]),
              }, h(Icon, { name: 'refresh', size: 11 }), h('span', null, T('regenSummary')))
            : null,
          h('span', { className: 'iw-voice-note' }, T('summaryLocalNote')),
        ),
      ),
      transcriptError ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 8 } }, transcriptError) : null,
      h(
        'div',
        { className: 'iw-section' },
        h(
          'div',
          { className: 'iw-field' },
          h('span', { className: 'iw-field-label' }, T('category')),
          h('div', { className: 'iw-inline', style: { marginTop: 2 } },
            CATEGORIES.map((name) => h('button', {
              key: name,
              type: 'button',
              className: `iw-chip${draft.category === name ? ' is-on' : ''}`,
              onClick: () => patch({ category: name }),
            }, catLabel(name)))),
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, flexWrap: 'wrap' } },
          h('div', { className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, T('stars')),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              h(Stars, { value: draft.stars, size: 18, gap: 3, onChange: (value) => patch({ stars: value }) }),
              h('span', { className: 'iw-small iw-muted' }, T(STAR_LABEL[draft.stars])))),
          h('div', { className: 'iw-field', style: { flex: 1, minWidth: 180 } },
            h('span', { className: 'iw-field-label' }, T('tags')),
            h('input', {
              className: 'iw-input',
              value: tagText,
              placeholder: T('tagsPlaceholder'),
              onChange: (event) => setTagText(event.target.value),
            })),
        ),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'flex-start', gap: 18, marginTop: 16, flexWrap: 'wrap' } },
          h('div', { className: 'iw-field' },
            h('span', { className: 'iw-field-label' }, T('recordTime')),
            h('input', {
              className: 'iw-input',
              type: 'datetime-local',
              value: when,
              onChange: (event) => setWhen(event.target.value),
              style: { width: 200 },
            }),
            h('span', { className: 'iw-expect-hint' }, T('recordTimeHint'))),
          h(ExpectField, { value: draft.expectedAt, onChange: (value) => patch({ expectedAt: value }) }),
        ),
      ),
      error ? h('p', { style: { color: 'var(--iw-danger)', fontSize: 10.5, marginTop: 12 } }, error) : null,
      h(
        'div',
        { className: 'iw-modal-foot' },
        h(
          'span',
          { className: 'iw-hint' },
          uploading ? T('uploading') : T('saveHint'),
        ),
        h(
          'div',
          { className: 'iw-btn-row' },
          h(Btn, { variant: 'ghost', onClick: onClose, disabled: busy }, T('cancel')),
          h(Btn, { variant: 'primary', onClick: save, disabled: !canSave || uploading > 0 }, busy ? T('saving') : (existing ? T('saveChanges') : T('save'))),
        ),
      ),
      dragging ? h(DropOverlay) : null,
    ),
  )
}