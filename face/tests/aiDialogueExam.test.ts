import assert from 'node:assert/strict'
import { test } from 'node:test'
import { EXAM_MIN_REPLIES, getExamProgress } from '@/widgets/aiDialogue/aiDialogueExam/fn/examProgress'
import type { DialogueServerMessage } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'

test('exam threshold counts one speech turn per submission and ignores actions and leaving the NPC', () => {
	const row = (payload: DialogueServerMessage['payload']): DialogueServerMessage => ({
		id: 1,
		dialogueId: 1,
		createdAt: '',
		payload,
	})
	const speech = row({
		type: 'userActions',
		actions: [
			{ type: 'speech', content: 'Yes' },
			{ type: 'speech', content: 'Please' },
		],
	})
	const action = row({ type: 'userActions', actions: [{ type: 'action', content: 'I talk a lot.' }] })
	assert.equal(
		getExamProgress([speech, speech, action, row({ type: 'userAvoidsNPC' })]).remaining,
		Math.max(0, EXAM_MIN_REPLIES - 2),
	)
	assert.equal(getExamProgress(Array(EXAM_MIN_REPLIES).fill(speech)).remaining, 0)
	const result = {
		medalUrl: null,
		type: 'examResult' as const,
		level: 'A0' as const,
		assessedThroughMessageId: 10,
		summary: 'Report',
		strengths: [],
		errors: [],
		recommendations: ['Try again'],
	}
	assert.deepEqual(getExamProgress([row(result)]).result, result)
})
