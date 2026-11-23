import { getAiDialogueLastMessage } from './getAiDialogueLastMessage'

function message(actions: unknown[], identity: object = { npcId: 'anna', npcName: 'Anna', npcRole: 'receptionist' }) {
	return JSON.stringify({ ...identity, actions })
}

describe('getAiDialogueLastMessage', () => {
	it('returns only the last nonempty speech, even when followed by actions or invalid speech', () => {
		const result = getAiDialogueLastMessage(
			message([
				{ type: 'action', content: 'She waves.' },
				{ type: 'speech', content: ' Hello! ', translation: 'Привет!' },
				{ type: 'speech', content: ' ' },
				{ type: 'speech', content: ' How are you? ' },
				{ type: 'action', content: 'She opens the door.' },
				{ type: 'speech', content: ' ' },
				{ type: 'speech', content: 1 },
			]),
		)

		expect(result).toMatchObject({ text: 'How are you?', textType: 'speech' })
	})

	it('returns only the last nonempty action when there is no nonempty speech', () => {
		expect(
			getAiDialogueLastMessage(
				message([
					{ type: 'speech', content: '' },
					{ type: 'action', content: 'She smiles.' },
					{ type: 'action', content: ' She opens the door. ' },
					{ type: 'action', content: ' ' },
				]),
			),
		).toMatchObject({ text: 'She opens the door.', textType: 'action' })
	})

	it('reads legacy NPC identity from payload without requiring character_id', () => {
		expect(getAiDialogueLastMessage(message([], { npcName: 'Anna', npcRole: 'receptionist' }))).toEqual({
			name: 'Anna',
			role: 'receptionist',
			text: '',
			textType: null,
		})
	})

	it('allows missing identity or invalid individual action items without inventing text', () => {
		expect(getAiDialogueLastMessage(message([null, 'broken', { type: 'speech', content: 1 }], {}))).toMatchObject({
			name: null,
			role: null,
			text: '',
			textType: null,
		})
	})
})
