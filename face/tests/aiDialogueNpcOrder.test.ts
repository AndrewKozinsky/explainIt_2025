import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { AiDialogueNpcActionItem } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { groupNpcDialogueSpeechAndActions } from '@/widgets/aiDialogueMessages/ui/messages/NpcMessage/fn/groupNpcDialogueSpeechAndActions'

test('NPC speech precedes every action for all source orders, retaining original block addresses', function () {
	// Covers action-first, alternating, repeated types, speech-only, action-only and empty messages.
	for (let length = 0; length <= 6; length++) {
		for (let mask = 0; mask < 2 ** length; mask++) {
			const speechAndActions: AiDialogueNpcActionItem[] = Array.from({ length }, (_, index) => ({
				type: mask & (1 << index) ? 'speech' : 'action',
				content: `source block ${index}`,
				translation: `translation ${index}`,
			}))
			const snapshot = structuredClone(speechAndActions)
			const groups = groupNpcDialogueSpeechAndActions(speechAndActions)
			const indices = groups.map((group) => (group.speechIndex ?? group.actionIndex)!)
			const expected = speechAndActions.flatMap((item, index) => (item.type === 'speech' ? [index] : []))
			expected.push(...speechAndActions.flatMap((item, index) => (item.type === 'action' ? [index] : [])))
			assert.deepEqual(indices, expected)
			assert.deepEqual(
				groups.map((group) => group.key),
				indices,
			)
			assert.deepEqual(speechAndActions, snapshot)
		}
	}
})
