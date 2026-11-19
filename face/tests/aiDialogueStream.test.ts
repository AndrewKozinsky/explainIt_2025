import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'

const originalEventSource = globalThis.EventSource
afterEach(() => {
	globalThis.EventSource = originalEventSource
	useAiDialogueStore.getState().clearStore()
})

function connect() {
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onerror?: () => void
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
	const stream = openAiDialogueStream(1) as unknown as FakeEventSource
	return {
		send: (event: unknown) => stream.onmessage?.({ data: JSON.stringify(event) }),
		disconnect: () => stream.onerror?.(),
	}
}

test('waiting lasts until turnDone while only complete saved messages appear', () => {
	const { send } = connect()
	send({ type: 'turnStarted' })
	assert.equal(useAiDialogueStore.getState().isGenerating, true)
	assert.equal(useAiDialogueStore.getState().messages.size, 0)

	send({
		type: 'message',
		message: {
			id: 7,
			dialogueId: 1,
			createdAt: '',
			payload: { type: 'help', content: 'Hello.', translation: 'Привет.' },
		},
	})
	assert.equal(useAiDialogueStore.getState().messages.get(7)?.payload.type, 'help')
	assert.equal(useAiDialogueStore.getState().isGenerating, true)
	send({ type: 'turnDone' })
	assert.equal(useAiDialogueStore.getState().isGenerating, false)
})

test('failed turns clear waiting; a reconnect restores waiting without losing saved history', () => {
	const { send, disconnect } = connect()
	send({ type: 'turnStarted' })
	send({ type: 'turnError', error: 'Generation failed' })
	send({ type: 'turnDone' })
	assert.equal(useAiDialogueStore.getState().isGenerating, false)
	assert.equal(useAiDialogueStore.getState().turnError, 'Generation failed')

	send({ type: 'turnStarted' })
	assert.equal(useAiDialogueStore.getState().turnError, null)
	disconnect()
	assert.equal(useAiDialogueStore.getState().isGenerating, false)
	send({
		type: 'message',
		message: {
			id: 3,
			dialogueId: 1,
			createdAt: '',
			payload: { type: 'help', content: 'Earlier reply', translation: '' },
		},
	})
	send({ type: 'turnStarted' })
	assert.equal(useAiDialogueStore.getState().isGenerating, true)
	assert.equal(useAiDialogueStore.getState().messages.size, 1)
})
