import assert from 'node:assert/strict'
import { afterEach, beforeEach, mock, test } from 'node:test'
import { AiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
beforeEach(() => Object.defineProperty(globalThis, 'window', { configurable: true, value: {} }))
afterEach(() => {
	mock.restoreAll()
	if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
	else Reflect.deleteProperty(globalThis, 'window')
})
const valid = { speech: { critical: [], suggestions: [] }, action: { critical: [], suggestions: [] } }
const service = () => new AiDialogueService(new AiDialogueApi())

test('message check uses Service/API/generated route, credentials and abort signal without sending language/context', async () => {
	const controller = new AbortController()

	mock.method(globalThis, 'fetch', async (url: RequestInfo | URL, options?: RequestInit) => {
		assert.equal(url, '/api/ai-dialogue/12/check-message')
		assert.equal(options?.method, 'POST')
		assert.equal(options?.credentials, 'include')
		assert.equal(options?.signal, controller.signal)
		assert.deepEqual(JSON.parse(String(options?.body)), { action: 'I smile.' })
		return Response.json(valid)
	})

	assert.deepEqual(await service().checkUserMessageText(12, { action: 'I smile.' }, controller.signal), {
		data: valid,
		error: null,
		errors: null,
	})
})

test('network/HTTP failures and malformed results never become all-correct checks', async () => {
	for (const body of [
		null,
		{},
		{ speech: {}, action: {} },
		{ ...valid, speech: { critical: [null], suggestions: [] } },
	]) {
		const fetchMock = mock.method(globalThis, 'fetch', async () => Response.json(body))
		const result = await service().checkUserMessageText(12, { speech: 'Hi' })
		assert.ok(result.error)
		fetchMock.mock.restore()
	}
	mock.method(globalThis, 'fetch', async () => Response.json({ message: 'Failure' }, { status: 500 }))
	assert.ok((await service().checkUserMessageText(12, { speech: 'Hi' })).error)
})

test('aborted checks propagate AbortError so a disposed form can ignore them', async () => {
	mock.method(globalThis, 'fetch', async () => {
		throw new DOMException('Aborted', 'AbortError')
	})
	await assert.rejects(service().checkUserMessageText(12, { speech: 'Hi' }), { name: 'AbortError' })
})
