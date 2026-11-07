import assert from 'node:assert/strict'
import { test } from 'node:test'
import { openAiDialogueStream } from '@/_pages/aiDialogue/AiDialoguePage/fn/openAiDialogueStream'
import { useAiDialogueStore } from '@/_pages/aiDialogue/aiDialogueStore'
import {
	getReplyTextKey,
	useReplyTextVisibilityStore,
} from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'

function visibilityOf(replyKey: string) {
	return useReplyTextVisibilityStore.getState().isVisibleByKey.get(replyKey)
}

test('a reply keeps the visibility it got on arrival; only a manual reveal changes it', function () {
	const store = useReplyTextVisibilityStore.getState()
	store.clear()
	const savedReplyKey = getReplyTextKey(10, 0, 1)

	store.registerReply(savedReplyKey, false)
	store.registerReply(savedReplyKey, true)
	assert.equal(visibilityOf(savedReplyKey), false)

	store.revealReply(savedReplyKey)
	assert.equal(visibilityOf(savedReplyKey), true)
	store.clear()
})

test('preview replies move to the saved message; discarded preview replies are forgotten', function () {
	const store = useReplyTextVisibilityStore.getState()
	store.clear()

	store.registerReply(getReplyTextKey(undefined, 0, -1), false)
	store.registerReply(getReplyTextKey(undefined, 1, 0), false)
	store.revealReply(getReplyTextKey(undefined, 1, 0))

	store.movePreviewReplies(1, 42)
	assert.equal(visibilityOf(getReplyTextKey(42, 1, 0)), true)
	assert.equal(visibilityOf(getReplyTextKey(undefined, 1, 0)), undefined)

	store.clearPreviewReplies()
	assert.equal(visibilityOf(getReplyTextKey(undefined, 0, -1)), undefined)
	assert.equal(visibilityOf(getReplyTextKey(42, 1, 0)), true)
	store.clear()
})

test('SSE maps saved messages of the turn to preview events in order and ignores replay', function () {
	const originalEventSource = globalThis.EventSource
	class FakeEventSource {
		onmessage?: (event: { data: string }) => void
		onopen?: () => void
		onerror?: () => void

		constructor(public url: string) {}

		close() {}
	}
	globalThis.EventSource = FakeEventSource as unknown as typeof EventSource

	function sceneMessage(id: number) {
		return { id, dialogueId: 1, createdAt: '', payload: { type: 'sceneUpdate', content: 'Hall.', translation: '' } }
	}

	try {
		useAiDialogueStore.getState().clearStore()
		const store = useReplyTextVisibilityStore.getState()
		store.clear()
		const stream = openAiDialogueStream(1) as unknown as FakeEventSource

		function send(event: unknown) {
			stream.onmessage?.({ data: JSON.stringify(event) })
		}

		send({ type: 'message', message: sceneMessage(1) })
		send({ type: 'turnStarted' })
		store.registerReply(getReplyTextKey(undefined, 0, -1), false)
		store.registerReply(getReplyTextKey(undefined, 1, -1), false)
		store.revealReply(getReplyTextKey(undefined, 1, -1))

		send({ type: 'message', message: sceneMessage(5) })
		send({ type: 'message', message: sceneMessage(6) })

		assert.equal(visibilityOf(getReplyTextKey(5, 0, -1)), false)
		assert.equal(visibilityOf(getReplyTextKey(6, 0, -1)), true)
		assert.equal(visibilityOf(getReplyTextKey(1, 0, -1)), undefined)
	} finally {
		globalThis.EventSource = originalEventSource
		useAiDialogueStore.getState().clearStore()
		useReplyTextVisibilityStore.getState().clear()
	}
})
