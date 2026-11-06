/**
 * v0.5 verification: local summarizer, expected-date helpers, and the static
 * guarantees behind the three bug fixes + three optimizations.
 *
 * Run: node scripts/verify-v05.mjs
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const src = (name) => readFileSync(join(root, 'src', name), 'utf8')
const prelude = src('00-prelude.js')
const compose = src('40-compose.js')
const detail = src('45-detail.js')
const wall = src('30-wall.js')
const ui = src('20-ui.js')
const css = src('05-css.js')
const host = readFileSync(join(root, 'index.js'), 'utf8')

const T = (key, params) => (params ? `${key}(${JSON.stringify(params)})` : key)
const helpers = new Function(
  'React',
  'T',
  `${prelude}\nreturn { summarizeText, clipText, dayInputValue, daysUntil, expectedState, expectedLabel, asDate }`,
)({ createElement() {} }, T)

let failures = 0
const check = (label, condition, detailText) => {
  if (condition) {
    console.log(`PASS ${label}`)
  } else {
    failures += 1
    console.log(`FAIL ${label}${detailText ? ` — ${detailText}` : ''}`)
  }
}

/* ---------------------------------------------------------- summarizer --- */
const transcript =
  '今天下午在改灵感墙的时候突然想到一个问题，就是语音备忘转写出来的文字特别长，整段话都塞进概要里了。' +
  '其实概要应该只保留核心意思，比如这条就是想给语音单独一个详情框，然后概要只放一句话。' +
  '另外我觉得转写文字应该可以改，因为识别有时候会错几个词，但原始录音肯定不能动。' +
  '这样卡片上看到的是一句话的概要，点进去才看到完整的转写内容。'

const summary = helpers.summarizeText(transcript)
check('summary is produced', summary.length > 0)
check('summary is much shorter than the transcript', summary.length < transcript.length / 2, `${summary.length} vs ${transcript.length}`)
check('summary is not the transcript itself', summary !== transcript)
check('summary keeps a core keyword', /概要|语音|详情/.test(summary), summary)
console.log(`   summary => ${summary}`)

const short = '这个想法很简单。'
check('short text is returned unchanged', helpers.summarizeText(short) === short)

const blank = helpers.summarizeText('   ')
check('blank text gives empty summary', blank === '')

const repeated = '语音概要要压缩。语音概要要压缩。语音概要要压缩。语音概要要压缩。其他内容随便写一点东西凑长度。'
const repeatedSummary = helpers.summarizeText(repeated)
check('repetitive text still yields a short summary', repeatedSummary.length <= 76, repeatedSummary)

/* --------------------------------------------------------- expected ----- */
const today = new Date()
const pad = (value) => String(value).padStart(2, '0')
const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
const plus = (days) => {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
check('daysUntil(today) === 0', helpers.daysUntil(todayStr) === 0, String(helpers.daysUntil(todayStr)))
check('daysUntil(+5) === 5', helpers.daysUntil(plus(5)) === 5, String(helpers.daysUntil(plus(5))))
check('daysUntil(-2) === -2', helpers.daysUntil(plus(-2)) === -2, String(helpers.daysUntil(plus(-2))))
check('expectedState overdue', helpers.expectedState({ expectedAt: plus(-2) }) === 'overdue')
check('expectedState today', helpers.expectedState({ expectedAt: todayStr }) === 'today')
check('expectedState soon', helpers.expectedState({ expectedAt: plus(2) }) === 'soon')
check('expectedState later', helpers.expectedState({ expectedAt: plus(20) }) === 'later')
check('expectedState empty without date', helpers.expectedState({}) === '')
check('expectedLabel mentions overdue days', helpers.expectedLabel({ expectedAt: plus(-3) }).includes('3'))
check('dayInputValue round-trips a date string', helpers.dayInputValue(todayStr) === todayStr)
check('dayInputValue handles ISO', helpers.dayInputValue(`${todayStr}T09:42:00.000Z`) === todayStr)

/* --------------------------------------------- bug 1: summary vs voice --- */
check('compose no longer copies the transcript into the summary', !/const summary = previous\.summary && previous\.summary\.trim\(\) \? previous\.summary : text/.test(compose))
check('compose generates the summary locally', /summary = keepTyped \? previous\.summary : summarizeText\(text\)/.test(compose))
check('compose keeps the transcript on the media item', /item\.id === mediaId \? \{ \.\.\.item, transcript: text \}/.test(compose))
check('transcript is editable in its own box', /updateTranscript\(item\.id, event\.target\.value\)/.test(compose))
check('editing does not touch the audio file', !/transcript[\s\S]{0,120}api\.upload/.test(compose))
check('voice content box is labelled', compose.includes("T('voiceContent')"))
check('card shows the summary line', wall.includes("note.summary") && wall.includes('iw-card-summary'))
check('card falls back to the body when no summary', /: \(note\.body \? h\('p', \{ className: 'iw-card-body' \}, note\.body\) : null\)/.test(wall))
check('detail shows the summary box', detail.includes('iw-summary-box'))

/* ------------------------------------------------ opt 1: drag & drop ---- */
check('drop hook exists', ui.includes('function useAttachDrop'))
check('drop overlay exists', ui.includes('function DropOverlay') && css.includes('.iw-drop-overlay'))
check('compose wires the drop region', compose.includes('useAttachDrop(addFiles)') && compose.includes('...dropProps'))
check('detail record editor accepts drops', detail.includes('useAttachDrop(addRecordFiles)'))
check('dropped files are classified by mime', ui.includes("type.startsWith('image/')") && ui.includes("type.startsWith('video/')") && ui.includes("type.startsWith('audio/')"))
check('any other format lands as a generic file', ui.includes("return 'file'"))

/* --------------------------------------- opt 2: expected implementation -- */
check('expected date field component exists', ui.includes('function ExpectField'))
check('expected date is in the compose form', compose.includes("h(ExpectField, { value: draft.expectedAt"))
check('expected date is saved', compose.includes("expectedAt: draft.expectedAt || ''"))
check('expected date has its own highlight style', css.includes('.iw-expect-box') && css.includes('border: 1px solid var(--iw-accent)'))
check('expected chip shows on the detail header', detail.includes('expectedChip'))
check('host keeps expectedAt', host.includes('expectedAt: typeof input.expectedAt ===')) 
check('host backfills expectedAt on old notes', /typeof note\.expectedAt !== 'string'/.test(host))

/* ------------------------------------------- opt 3: preview + open with -- */
check('lightbox component exists', ui.includes('function Lightbox') && css.includes('.iw-lightbox'))
check('context menu component exists', ui.includes('function ContextMenu') && css.includes('.iw-ctx'))
check('attachments are previewable', detail.includes('function Attachment') && detail.includes('onContextMenu'))
check('menu offers the OS opener', detail.includes("T('openWith')") && detail.includes("run(item, 'open')"))
check('menu offers reveal in folder', detail.includes("run(item, 'reveal')"))
check('menu offers copy path', detail.includes('copyPath'))
check('host exposes openPath', /case 'openPath'/.test(host) && /function openWithOs/.test(host))
check('host restricts openPath to allowed roots', /if \(!target \|\| !allowedRoots\(\)\.some/.test(host))
check('store exposes openFile', src('10-store.js').includes("api.rpc('openPath'"))

/* -------------------------------------------------- zero-token guarantee -- */
check('no model call in the client bundle sources', !/fetch\(\s*['"]https?:/.test(src('40-compose.js') + src('45-detail.js') + src('30-wall.js')))
check('transcription uses the local speech service', src('70-app.js').includes("ctx.get('remote.speech')"))
check('summary note states it stays local', src('70-app.js').includes('概要由本地摘要算法提取'))

console.log(`\n${failures ? `${failures} FAILED` : 'all v0.5 checks passed'}`)
process.exit(failures ? 1 : 0)