import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import type { DictationCallbacks } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import { AiDialogueDraftController } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/fn/AiDialogueDraftController'
import { canSendDraft, draftStatus } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/fn/aiDialogueDraftState'
import type { AiDialogueClientEvent } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'

function deferred<T>() {
	let resolve!: (value: T) => void
	const promise = new Promise<T>((done) => {
		resolve = done
	})
	return { promise, resolve }
}

function harness() {
	let callbacks!: DictationCallbacks
	const recording = { stop: mock.fn(), cancel: mock.fn() }
	const dependencies = {
		openDictation: mock.fn((handlers: DictationCallbacks) => {
			callbacks = handlers
			return recording
		}),
		send: mock.fn(async (_event: AiDialogueClientEvent): Promise<string | null> => null),
	}
	const controller = new AiDialogueDraftController(dependencies)
	return { controller, dependencies, recording, callbacks: () => callbacks, state: controller.getSnapshot }
}

test('tabs keep independent drafts and send both parts in one request', async () => {
	const h = harness()
	assert.equal(draftStatus(h.state()), 'empty')
	assert.equal(canSendDraft(h.state()), false)
	h.controller.edit('speech', '  Hi  ', { start: 1, end: 1 })
	h.controller.selectPart('action')
	h.controller.edit('action', 'I smile.')
	h.controller.selectPart('speech')
	assert.equal(h.state().parts.action.text, 'I smile.')
	assert.deepEqual(h.state().parts.speech.selection, { start: 1, end: 1 })
	assert.equal(canSendDraft(h.state()), true)
	await h.controller.send()
	const [{ requestId, ...event }] = h.dependencies.send.mock.calls[0].arguments
	assert.match(requestId, /^[0-9a-f-]{36}$/)
	assert.deepEqual(event, {
		type: 'userActions',
		actions: [
			{ type: 'speech', content: 'Hi' },
			{ type: 'action', content: 'I smile.' },
		],
	})
	assert.equal(h.state().parts.speech.text, '')
	assert.equal(h.state().parts.action.text, '')
})

test('can send only an action even from the empty speech tab', async () => {
	const h = harness()
	h.controller.edit('speech', '  ')
	h.controller.edit('action', 'I open the door.')
	assert.equal(canSendDraft(h.state()), true)
	await h.controller.send()
	const [{ requestId, ...event }] = h.dependencies.send.mock.calls[0].arguments
	assert.deepEqual(event, { type: 'userActions', actions: [{ type: 'action', content: 'I open the door.' }] })
})

test('dictation replaces the selected range, updates a provisional tail and never appends done twice', () => {
	const h = harness()
	h.controller.edit('speech', 'Before OLD after.', { start: 7, end: 10 })
	h.controller.startDictation()
	h.callbacks().onPhase('recording')
	assert.equal(draftStatus(h.state()), 'listening')
	h.callbacks().onText('Hello ', 'очер')
	assert.equal(h.state().parts.speech.text, 'Before Hello очер after.')
	h.callbacks().onText('Hello ', 'очередь')
	assert.equal(h.state().parts.speech.text, 'Before Hello очередь after.')
	h.controller.stopDictation()
	assert.equal(draftStatus(h.state()), 'finishingRecognition')
	h.callbacks().onDone('Hello очередь.')
	assert.equal(h.state().parts.speech.text, 'Before Hello очередь. after.')
	assert.equal(h.state().dictation, null)
	assert.deepEqual(h.state().parts.speech.selection, { start: 21, end: 21 })
	assert.equal(draftStatus(h.state()), null)
})

test('dictation inserts at a caret without moving surrounding text, and cannot switch tabs or send while active', async () => {
	const h = harness()
	h.controller.edit('speech', 'abc def', { start: 4, end: 4 })
	h.controller.startDictation()
	h.controller.selectPart('action')
	h.controller.edit('speech', 'changed')
	await h.controller.send()
	assert.equal(h.state().activePart, 'speech')
	h.callbacks().onDone('new ')
	assert.equal(h.state().parts.speech.text, 'abc new def')
	assert.equal(h.dependencies.send.mock.callCount(), 0)
})

test('no speech and permission errors preserve the selected original text', () => {
	const h = harness()
	h.controller.edit('speech', 'keep selected text', { start: 5, end: 13 })
	h.controller.startDictation()
	h.callbacks().onError('microphoneAccessDenied')
	assert.equal(h.state().parts.speech.text, 'keep selected text')
	h.controller.startDictation()
	h.callbacks().onDone('')
	assert.equal(h.state().parts.speech.text, 'keep selected text')
})

test('provider errors keep committed speech and discard the uncertain provisional tail', () => {
	const h = harness()
	h.controller.startDictation()
	h.callbacks().onText('Hello ', 'maybe')
	h.callbacks().onError('recognitionConnectionLost')
	assert.equal(h.state().parts.speech.text, 'Hello ')
	assert.equal(h.state().parts.speech.error, 'recognitionConnectionLost')
	assert.equal(canSendDraft(h.state()), true)
})

test('cancelling connection setup cancels resources and ignores stale callbacks of an earlier dictation', () => {
	const h = harness()
	h.controller.startDictation()
	const old = h.callbacks()
	h.controller.stopDictation()
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	h.controller.startDictation()
	old.onDone('stale')
	old.onError('recognitionInterrupted')
	assert.equal(h.state().parts.speech.text, '')
	assert.ok(h.state().dictation)
	h.controller.dispose()
	assert.equal(h.recording.cancel.mock.callCount(), 2)
})

test('text limits never truncate the original suffix; excessive dictation is stopped and reported', () => {
	const h = harness()
	h.controller.edit('speech', 'a'.repeat(3999), { start: 0, end: 0 })
	h.controller.startDictation()
	h.callbacks().onText('', 'too much')
	assert.equal(h.state().parts.speech.text, 'a'.repeat(3999))
	assert.equal(h.state().dictation, null)
	assert.equal(h.state().parts.speech.error, 'dictationTextLimit')
})

test('NPC generation cancels microphone activity and blocks send and leave', async () => {
	const h = harness()
	h.controller.startDictation()
	h.controller.setBlocked(true)
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	await h.controller.send()
	await h.controller.leave()
	assert.equal(h.dependencies.send.mock.callCount(), 0)
})

test('a failed send keeps both drafts and retries with the same ID', async () => {
	const h = harness()
	h.controller.edit('speech', 'Hi')
	h.controller.edit('action', 'I wave.')
	const request = deferred<string | null>()
	h.dependencies.send.mock.mockImplementationOnce(() => request.promise)
	const pending = h.controller.send()
	assert.equal(draftStatus(h.state()), 'sending')
	h.controller.edit('speech', 'Cannot replace this during send')
	h.controller.selectPart('action')
	await h.controller.send()
	assert.equal(h.dependencies.send.mock.callCount(), 1)
	assert.equal(h.state().activePart, 'speech')
	request.resolve('The review timed out.')
	await pending
	assert.deepEqual(h.state().submitError, { message: 'The review timed out.' })
	assert.equal(h.state().parts.speech.text, 'Hi')
	assert.equal(h.state().parts.action.text, 'I wave.')
	assert.equal(canSendDraft(h.state()), true)
	h.controller.edit('speech', ' Hi ')
	await h.controller.send()
	assert.deepEqual(h.dependencies.send.mock.calls[1].arguments, h.dependencies.send.mock.calls[0].arguments)
	assert.equal(h.state().submitError, null)
	assert.equal(h.state().parts.speech.text, '')
	assert.equal(h.state().parts.action.text, '')
})

test('an edited draft uses a new ID after a failed submit', async () => {
	const h = harness()
	h.dependencies.send.mock.mockImplementationOnce(async () => {
		throw new Error('Network failure')
	})
	h.controller.edit('speech', 'Hi')
	await h.controller.send()
	assert.deepEqual(h.state().submitError, {})
	h.controller.edit('speech', 'Hello')
	assert.equal(h.state().submitError, null)
	await h.controller.send()
	assert.notEqual(
		h.dependencies.send.mock.calls[1].arguments[0].requestId,
		h.dependencies.send.mock.calls[0].arguments[0].requestId,
	)
})

test('leaving cancels dictation and sends a separate event', async () => {
	const h = harness()
	h.controller.edit('speech', 'draft')
	h.controller.startDictation()
	await h.controller.leave()
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	assert.equal(h.dependencies.send.mock.calls[0].arguments[0].type, 'userAvoidsNPC')
	assert.equal(h.state().parts.speech.text, '')
})

test('waveform stream belongs to the current recording and is cleared when recognition finishes', () => {
	const h = harness()
	const stream = {} as MediaStream
	h.controller.startDictation()
	assert.equal(h.state().dictation?.phase, 'starting')
	assert.equal(h.state().dictation?.stream, undefined)
	assert.equal(canSendDraft(h.state()), false)
	const old = h.callbacks()
	old.onRecordingStream?.(stream)
	old.onPhase('recording')
	assert.equal(h.state().dictation?.stream, stream)
	h.controller.stopDictation()
	assert.equal(h.state().dictation?.phase, 'finishing')
	assert.equal(h.state().dictation?.stream, undefined)
	assert.equal(canSendDraft(h.state()), false)
	old.onDone('Hello')
	assert.equal(h.state().dictation, null)
	assert.equal(canSendDraft(h.state()), true)

	h.controller.startDictation()
	old.onRecordingStream?.(stream)
	assert.equal(h.state().dictation?.stream, undefined)
	h.controller.dispose()
})
