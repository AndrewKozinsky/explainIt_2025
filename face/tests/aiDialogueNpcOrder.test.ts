import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseAiDialoguePreview } from '@/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import { groupNpcDialogueSpeechAndActions } from '@/widgets/aiDialogueMessages/ui/messages/NpcMessage/fn/groupNpcDialogueSpeechAndActions'

test('NPC speech precedes every action for all source orders, retaining original block addresses', function () {
	// Covers action-first, alternating, repeated types, speech-only, action-only and empty messages.
	for (let length = 0; length <= 6; length++) {
		for (let mask = 0; mask < 2 ** length; mask++) {
			const speechAndActions: AiDialoguePreviewActionItem[] = Array.from({ length }, (_, index) => ({
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

test('action-first streamed prefixes place speech above actions as soon as it arrives', function () {
	const raw = [
		'npcActions|receptionist_1|Mira|receptionist|happy',
		'action:',
		'Laughs and looks down.',
		'Смеётся и опускает взгляд.',
		'speech:',
		'Well, that is a nice way to start a shift.',
		'Приятное начало смены.',
		'action:',
		'Smiles.',
		'Улыбается.',
		'speech:',
		'It has been sunny since seven.',
		'С семи утра солнечно.',
		'',
	].join('\n')

	for (let end = 0; end <= raw.length; end++) {
		const speechAndActions = parseAiDialoguePreview(raw.slice(0, end))?.[0]?.actions ?? []
		const groups = groupNpcDialogueSpeechAndActions(speechAndActions)
		let sawAction = false
		for (const group of groups) {
			if (group.actionIndex !== undefined) sawAction = true
			if (group.speechIndex !== undefined) {
				assert.equal(sawAction, false, `speech after action at prefix ${end}`)
				assert.equal(speechAndActions[group.speechIndex].type, 'speech')
			}
		}
	}

	const speechAndActions = parseAiDialoguePreview(raw)![0].actions!
	assert.deepEqual(
		groupNpcDialogueSpeechAndActions(speechAndActions).map((group) => group.key),
		[1, 3, 0, 2],
	)
	// A confirmed/replayed JSON payload uses the same display order and source addresses.
	assert.deepEqual(
		groupNpcDialogueSpeechAndActions(JSON.parse(JSON.stringify(speechAndActions))),
		groupNpcDialogueSpeechAndActions(speechAndActions),
	)
})
