jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { AiDialogueScenarioQueryRepository } from './aiDialogueScenario.queryRepository'

describe('Scenario information inside a dialogue', () => {
	const repository = new AiDialogueScenarioQueryRepository()

	function scenario(conversationIdeas: string | null) {
		return {
			id: 12,
			slug: 'hotel-check-in',
			title: '{"ru":"Заселение в отель","en":"Hotel check-in"}',
			description: '{"ru":"Описание","en":"Description"}',
			conversation_ideas: conversationIdeas,
		} as Parameters<typeof repository.mapDbToOutModel>[0]
	}

	it('returns the scenario title and conversation ideas in the interface language', () => {
		const result = repository.mapDbToOutModel(
			scenario('{"ru":["Спросите про завтрак","Попросите номер с видом"],"en":["Ask about breakfast"]}'),
			'ru',
		)

		expect(result.title).toBe('Заселение в отель')
		expect(result.conversationIdeas).toEqual(['Спросите про завтрак', 'Попросите номер с видом'])
	})

	it('falls back to English ideas when the requested translation is missing', () => {
		expect(repository.mapDbToOutModel(scenario('{"en":["Ask about breakfast"]}'), 'ru').conversationIdeas).toEqual([
			'Ask about breakfast',
		])
	})

	it('returns an empty list for scenarios without conversation ideas', () => {
		expect(repository.mapDbToOutModel(scenario(null), 'ru').conversationIdeas).toEqual([])
	})
})
