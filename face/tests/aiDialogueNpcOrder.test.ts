import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseAiDialoguePreview } from '@/_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import { groupNpcDialogueActions } from '@/widgets/aiDialogueMessages/ui/messages/NpcMessage/fn/groupNpcDialogueActions'

test('NPC speech precedes every action for all source orders, retaining original block addresses', function () {
	// Covers action-first, alternating, repeated types, speech-only, action-only and empty messages.
	for (let length = 0; length <= 6; length++) {
		for (let mask = 0; mask < 2 ** length; mask++) {
			const actions: AiDialoguePreviewActionItem[] = Array.from({ length }, (_, index) => ({
				type: mask & (1 << index) ? 'speech' : 'action',
				content: `source block ${index}`,
				translation: `translation ${index}`,
			}))
			const snapshot = structuredClone(actions)
			const groups = groupNpcDialogueActions(actions)
			const indices = groups.map((group) => (group.speechIndex ?? group.actionIndex)!)
			const expected = actions.flatMap((item, index) => (item.type === 'speech' ? [index] : []))
			expected.push(...actions.flatMap((item, index) => (item.type === 'action' ? [index] : [])))
			assert.deepEqual(indices, expected)
			assert.deepEqual(
				groups.map((group) => group.key),
				indices,
			)
			assert.deepEqual(actions, snapshot)
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
		const actions = parseAiDialoguePreview(raw.slice(0, end))?.[0]?.actions ?? []
		const groups = groupNpcDialogueActions(actions)
		let sawAction = false
		for (const group of groups) {
			if (group.actionIndex !== undefined) sawAction = true
			if (group.speechIndex !== undefined) {
				assert.equal(sawAction, false, `speech after action at prefix ${end}`)
				assert.equal(actions[group.speechIndex].type, 'speech')
			}
		}
	}

	const actions = parseAiDialoguePreview(raw)![0].actions!
	assert.deepEqual(
		groupNpcDialogueActions(actions).map((group) => group.key),
		[1, 3, 0, 2],
	)
	// A confirmed/replayed JSON payload uses the same display order and source addresses.
	assert.deepEqual(groupNpcDialogueActions(JSON.parse(JSON.stringify(actions))), groupNpcDialogueActions(actions))
})
