import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
	getAudioRefreshInterval,
	hasPendingDialogueAudio,
} from '@/_pages/aiDialogue/AiDialoguePage/fn/audioRefreshPolicy'
import type { DialogueAudioSnapshot } from '@/entities/aiDialogue/audio/dialogueAudioTypes'

const now = Date.parse('2026-10-18T08:00:00Z')

function queued(): DialogueAudioSnapshot {
	return {
		dialogueId: 20,
		attempts: [{ id: 'attempt', turnId: 'turn', status: 'confirmed' }],
		items: [
			{
				id: 1,
				attemptId: 'attempt',
				turnId: 'turn',
				attemptStatus: 'confirmed',
				messageId: 1,
				eventIndex: 0,
				actionIndex: -1,
				npcId: null,
				status: 'queued',
				url: null,
				mimeType: 'audio/mpeg',
			},
		],
	}
}
test('a stalled worker does not cause two-second polling forever', function () {
	const snapshot = queued()
	assert.equal(hasPendingDialogueAudio(snapshot), true)
	assert.equal(getAudioRefreshInterval(snapshot, now, now), 2000)
	assert.equal(getAudioRefreshInterval(snapshot, now - 120_000, now), 15_000)
	assert.equal(getAudioRefreshInterval(snapshot, now - 300_000, now), 60_000)
	assert.equal(getAudioRefreshInterval(snapshot, now - 3_600_000, now), 60_000)
	assert.equal(snapshot.items[0].status, 'queued')
})

test('an active text attempt without jobs also backs off', function () {
	const snapshot = queued()
	snapshot.items = []
	snapshot.attempts[0].status = 'active'
	assert.equal(getAudioRefreshInterval(snapshot, now - 300_000, now), 60_000)
})

test('finished audio stops polling', function () {
	const snapshot = queued()

	for (const status of ['failed', 'ready'] as const) {
		snapshot.items[0].status = status
		assert.equal(getAudioRefreshInterval(snapshot, now, now), false)
	}
})
test('REST errors back off instead of retrying every five seconds forever', function () {
	assert.equal(getAudioRefreshInterval(undefined, now, now, true), 5000)
	assert.equal(getAudioRefreshInterval(queued(), now - 300_000, now, true), 60_000)
})
