import assert from 'node:assert/strict'
import { test } from 'node:test'
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
	const savedReplyKey = getReplyTextKey(10, 1)

	store.registerReply(savedReplyKey, false)
	store.registerReply(savedReplyKey, true)
	assert.equal(visibilityOf(savedReplyKey), false)

	store.revealReply(savedReplyKey)
	assert.equal(visibilityOf(savedReplyKey), true)
	store.clear()
})
