import assert from 'node:assert/strict'
import { mock, test } from 'node:test'
import type { DictationCallbacks } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { UserMessageCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { AiDialogueDraftController } from '@/widgets/aiDialogueForm/AiDialogueForm/fn/AiDialogueDraftController'
import { canSendDraft, draftStatus, isPartReady } from '@/widgets/aiDialogueForm/AiDialogueForm/fn/aiDialogueDraftState'

function checked(critical = 0): ApiResult<UserMessageCheck> {
	const issues = Array.from({ length: critical }, () => ({
		title: 'Ошибка',
		sentenceMarkdown: '**is**',
		explanationMarkdown: 'Use **am**.',
	}))

	return {
		error: null,
		errors: null,
		data: {
			speech: { critical: issues, suggestions: [{ explanationMarkdown: 'Запятая.', example: 'Hey, girls!' }] },
			action: { critical: issues, suggestions: [] },
		},
	}
}

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
		check: mock.fn(async (_part: string, _text: string, _signal: AbortSignal) => checked()),
		openDictation: mock.fn((handlers: DictationCallbacks) => {
			callbacks = handlers
			return recording
		}),
		send: mock.fn(async (_actions: unknown[]) => true),
		leave: mock.fn(async () => true),
	}
	const controller = new AiDialogueDraftController(dependencies)
	return { controller, dependencies, recording, callbacks: () => callbacks, state: controller.getSnapshot }
}

test('tabs keep independent drafts and cursors; blank fields do not require review', async () => {
	const h = harness()
	assert.equal(draftStatus(h.state()).empty, true)
	h.controller.edit('speech', 'Hi', { start: 1, end: 1 })
	h.controller.selectPart('action')
	h.controller.edit('action', 'I smile.')
	h.controller.selectPart('speech')
	assert.equal(h.state().parts.action.text, 'I smile.')
	assert.deepEqual(h.state().parts.speech.selection, { start: 1, end: 1 })
	assert.equal(canSendDraft(h.state()), false)
	await h.controller.checkActivePart()
	assert.equal(isPartReady(h.state().parts.speech), true)
	assert.equal(canSendDraft(h.state()), false)
	assert.equal(draftStatus(h.state()).text, 'Проверьте текст действия.')
	h.controller.edit('action', '  ')
	assert.equal(canSendDraft(h.state()), true)
	await h.controller.send()
	assert.deepEqual(h.dependencies.send.mock.calls[0].arguments[0], [{ type: 'speech', content: 'Hi' }])
	assert.equal(h.state().parts.speech.text, '')
})

test('an action alone can be checked and sent', async () => {
	const h = harness()
	h.controller.selectPart('action')
	h.controller.edit('action', 'I open the door.')
	await h.controller.checkActivePart()
	await h.controller.send()
	assert.deepEqual(h.dependencies.send.mock.calls[0].arguments[0], [{ type: 'action', content: 'I open the door.' }])
})

test('the check sends only the active part; suggestions allow sending but critical errors block both fields', async () => {
	const h = harness()
	h.controller.edit('speech', 'Hi')
	h.controller.edit('action', 'I smile')
	await h.controller.checkActivePart()
	assert.deepEqual(h.dependencies.check.mock.calls[0].arguments.slice(0, 2), ['speech', 'Hi'])
	h.dependencies.check.mock.mockImplementation(async () => checked(2))
	h.controller.selectPart('action')
	await h.controller.checkActivePart()
	assert.equal(draftStatus(h.state()).text, 'Исправьте 2 ошибки, чтобы отправить ответ')
	h.controller.selectPart('speech')
	assert.equal(isPartReady(h.state().parts.speech), true)
	assert.equal(draftStatus(h.state()).text, 'Текст действия содержит ошибки.')
	await h.controller.send()
	assert.equal(h.dependencies.send.mock.callCount(), 0)
	h.dependencies.check.mock.mockImplementation(async () => checked())
	h.controller.selectPart('action')
	h.controller.edit('action', 'I smile.')
	await h.controller.checkActivePart()
	assert.equal(canSendDraft(h.state()), true)
	assert.equal(draftStatus(h.state()).text, 'Ответ можно отправить.')
	await h.controller.send()
	assert.deepEqual(h.dependencies.send.mock.calls[0].arguments[0], [
		{ type: 'speech', content: 'Hi' },
		{ type: 'action', content: 'I smile.' },
	])
})

test('editing invalidates a review even if undo restores the exact checked text; old feedback stays marked stale', async () => {
	const h = harness()
	h.controller.edit('speech', 'Hi')
	await h.controller.checkActivePart()
	h.controller.edit('speech', 'Hi!')
	h.controller.edit('speech', 'Hi')
	assert.equal(isPartReady(h.state().parts.speech), false)
	assert.ok(h.state().parts.speech.review)
	assert.equal(draftStatus(h.state()).text, 'Отправьте на проверку')
	await h.controller.send()
	assert.equal(h.dependencies.send.mock.callCount(), 0)
})

test('checks are independent across tabs; the busy field cannot be edited', async () => {
	const h = harness()
	const request = deferred<ApiResult<UserMessageCheck>>()
	h.dependencies.check.mock.mockImplementationOnce(() => request.promise)
	h.controller.edit('speech', 'Hello')
	const pending = h.controller.checkActivePart()
	assert.equal(draftStatus(h.state()).text, 'Идёт проверка текста…')
	h.controller.edit('speech', 'changed')
	assert.equal(h.state().parts.speech.text, 'Hello')
	h.controller.selectPart('action')
	h.controller.edit('action', 'I smile.')
	await h.controller.checkActivePart()
	assert.equal(isPartReady(h.state().parts.action), true)
	request.resolve(checked(1))
	await pending
	assert.equal(h.state().activePart, 'action')
	assert.equal(draftStatus(h.state()).text, 'Текст реплики содержит ошибки.')
})

test('failed recheck never reuses a previous success and can be retried', async () => {
	const h = harness()
	h.controller.edit('speech', 'Hi')
	await h.controller.checkActivePart()
	h.dependencies.check.mock.mockImplementationOnce(async () => ({
		error: 'Failure',
		errors: null,
		data: null as never,
	}))
	await h.controller.checkActivePart()
	assert.equal(h.state().parts.speech.error, 'Не удалось проверить текст.')
	assert.equal(canSendDraft(h.state()), false)
	await h.controller.checkActivePart()
	assert.equal(canSendDraft(h.state()), true)
})

test('unmount aborts a check and ignores its late response, including after Strict Mode reactivation', async () => {
	const h = harness()
	const request = deferred<ApiResult<UserMessageCheck>>()
	h.dependencies.check.mock.mockImplementationOnce(() => request.promise)
	h.controller.edit('speech', 'Hi')
	const pending = h.controller.checkActivePart()
	const signal = h.dependencies.check.mock.calls[0].arguments[2]
	h.controller.dispose()
	h.controller.activate()
	assert.equal(signal.aborted, true)
	request.resolve(checked())
	await pending
	assert.equal(h.state().parts.speech.checking, false)
	assert.equal(isPartReady(h.state().parts.speech), false)
})

test('dictation replaces the selected range, updates a provisional tail and never appends done twice', () => {
	const h = harness()
	h.controller.edit('speech', 'Before OLD after.', { start: 7, end: 10 })
	h.controller.startDictation()
	h.callbacks().onPhase('recording')
	assert.equal(draftStatus(h.state()).text, 'Слушаю…')
	h.callbacks().onText('Hello ', 'очер')
	assert.equal(h.state().parts.speech.text, 'Before Hello очер after.')
	h.callbacks().onText('Hello ', 'очередь')
	assert.equal(h.state().parts.speech.text, 'Before Hello очередь after.')
	h.controller.stopDictation()
	assert.equal(draftStatus(h.state()).text, 'Завершаю распознавание…')
	h.callbacks().onDone('Hello очередь.')
	assert.equal(h.state().parts.speech.text, 'Before Hello очередь. after.')
	assert.equal(h.state().dictation, null)
	assert.deepEqual(h.state().parts.speech.selection, { start: 21, end: 21 })
	assert.equal(draftStatus(h.state()).text, 'Отправьте на проверку')
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
	h.callbacks().onError('Разрешите доступ к микрофону.')
	assert.equal(h.state().parts.speech.text, 'keep selected text')
	h.controller.startDictation()
	h.callbacks().onDone('')
	assert.equal(h.state().parts.speech.text, 'keep selected text')
})

test('provider errors keep committed speech and discard the uncertain provisional tail', () => {
	const h = harness()
	h.controller.startDictation()
	h.callbacks().onText('Hello ', 'maybe')
	h.callbacks().onError('Соединение прервано.')
	assert.equal(h.state().parts.speech.text, 'Hello ')
	assert.equal(h.state().parts.speech.error, 'Соединение прервано.')
	assert.equal(canSendDraft(h.state()), false)
})

test('cancelling connection setup cancels resources and ignores stale callbacks of an earlier dictation', () => {
	const h = harness()
	h.controller.startDictation()
	const old = h.callbacks()
	h.controller.stopDictation()
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	h.controller.startDictation()
	old.onDone('stale')
	old.onError('stale')
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
	assert.match(h.state().parts.speech.error!, /4000/)
})

test('NPC generation cancels microphone activity and blocks check/send/leave', async () => {
	const h = harness()
	h.controller.startDictation()
	h.controller.setBlocked(true)
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	await h.controller.send()
	await h.controller.leave()
	await h.controller.checkActivePart()
	assert.equal(h.dependencies.send.mock.callCount(), 0)
	assert.equal(h.dependencies.leave.mock.callCount(), 0)
	assert.equal(h.dependencies.check.mock.callCount(), 0)
})

test('double send is coalesced and failed sends retain both drafts and valid reviews', async () => {
	const h = harness()
	h.controller.edit('speech', 'Hi')
	await h.controller.checkActivePart()
	const request = deferred<boolean>()
	h.dependencies.send.mock.mockImplementationOnce(() => request.promise)
	const pending = h.controller.send()
	await h.controller.send()
	assert.equal(h.dependencies.send.mock.callCount(), 1)
	request.resolve(false)
	await pending
	assert.equal(h.state().parts.speech.text, 'Hi')
	assert.equal(canSendDraft(h.state()), true)
})

test('leaving bypasses grammar validation and cancels checks/dictation', async () => {
	const h = harness()
	h.controller.edit('speech', 'unreviewed')
	h.controller.startDictation()
	await h.controller.leave()
	assert.equal(h.recording.cancel.mock.callCount(), 1)
	assert.equal(h.dependencies.leave.mock.callCount(), 1)
	assert.equal(h.state().parts.speech.text, '')
})
