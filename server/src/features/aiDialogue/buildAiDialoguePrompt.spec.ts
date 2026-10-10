import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueSummary } from 'types/aiDialogueSummary'
import { buildAiDialoguePrompt } from './buildAiDialoguePrompt'

function npc(npcId: string, content: string): AiDialogueEvent {
	return {
		type: 'npcActions',
		npcId,
		npcName: npcId,
		npcRole: 'officer',
		emotion: 'neutral',
		actions: [{ type: 'speech', content, translation: 'Перевод' }],
	}
}

function prompt(recentEvents: AiDialogueEvent[], summary: AiDialogueSummary | null = null) {
	return buildAiDialoguePrompt({
		scenario: { systemPrompt: 'You are a passport control officer.' },
		sourceLanguageCode: 'en',
		targetLanguageCode: 'ru',
		summary,
		recentEvents,
	})
}

describe('dialogue encounter context', () => {
	it('distinguishes the first encounter from continuing an existing conversation', () => {
		const initial = prompt([])
		expect(initial[1].content).toContain('No encounter has started yet')

		const continuing = prompt([
			{ type: 'sceneUpdate', content: 'At the passport desk', translation: 'У стойки' },
			npc('officer_1', 'What is the purpose of your visit?'),
			{ type: 'userActions', actions: [{ type: 'speech', content: 'Tourism.' }] },
		])
		expect(continuing[1].content).not.toContain('No encounter has started yet')
		expect(continuing[1].content).toContain('Current scene:\nAt the passport desk')
		expect(continuing[1].content).toContain('Most recent conversation partner npcId:\nofficer_1')
	})

	it('retains scene and partner context after compaction when recent events only contain the learner reply', () => {
		const summary: AiDialogueSummary = [
			{
				state: {
					scene: 'At the passport desk',
					activeNpcId: 'officer_1',
					roster: [{ npcId: 'officer_1', npcName: 'Blake', npcRole: 'passport officer' }],
				},
				history: 'The officer has checked the passport and asked about the stay.',
			},
		]
		const messages = prompt(
			[{ type: 'userActions', actions: [{ type: 'speech', content: 'Three days.' }] }],
			summary,
		)

		expect(messages[1].content).toContain('Most recent conversation partner npcId:\nofficer_1')
		expect(messages[1].content).toContain('Current scene:\nAt the passport desk')
		expect(messages[1].content).not.toContain('No encounter has started yet')
		expect(messages[0].content).toContain('npcId: "officer_1" — passport officer, Blake')
	})

	it('keeps both NPC identities when the learner intends to return to the first NPC', () => {
		const messages = prompt([
			{ type: 'sceneUpdate', content: 'At passport control', translation: 'На контроле' },
			npc('officer_1', 'Here is your passport. Goodbye.'),
			{ type: 'sceneUpdate', content: 'At the customs desk', translation: 'На таможне' },
			npc('officer_2', 'You may go. Goodbye.'),
			{ type: 'userActions', actions: [{ type: 'action', content: 'Return to the passport officer.' }] },
		])
		expect(messages[0].content).toContain('npcId: "officer_1"')
		expect(messages[0].content).toContain('npcId: "officer_2"')
		expect(messages[1].content).toContain('Most recent conversation partner npcId:\nofficer_2')
		expect(messages[1].content).toContain('Return to the passport officer.')
	})

	it('does not erase the previous partner or scene when the learner walks away', () => {
		const messages = prompt([
			{ type: 'sceneUpdate', content: 'At passport control', translation: 'На контроле' },
			npc('officer_1', 'Your passport, please.'),
			{ type: 'userAvoidsNPC' },
		])
		expect(messages[1].content).toContain('Most recent conversation partner npcId:\nofficer_1')
		expect(messages[1].content).toContain('the learner walked away from the conversation')
		expect(messages[1].content).not.toContain('No encounter has started yet')
	})
})
