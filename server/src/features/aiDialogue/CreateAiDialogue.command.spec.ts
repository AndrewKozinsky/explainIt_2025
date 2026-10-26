jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('repo/aiDialogueScenario/aiDialogueScenario.repository', () => ({ AiDialogueScenarioRepository: class {} }))

import { AI_DIALOGUE_CEFR_LEVELS } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { CreateAiDialogueCommand, CreateAiDialogueHandler } from './CreateAiDialogue.command'

describe('CreateAiDialogue language settings', () => {
	it.each(['realism', 'drawing', 'watercolor', undefined, null])(
		'persists the selected illustration style %s',
		async (illustrationStyleId) => {
			const scenario = { getScenarioById: jest.fn().mockResolvedValue({ user_id: null }) }
			const repository = { createDialogue: jest.fn().mockResolvedValue({ id: 1 }) }
			const query = { getDialogueById: jest.fn().mockResolvedValue({ id: 1 }) }

			const handler = new CreateAiDialogueHandler(scenario as never, repository as never, query as never)

			await handler.execute(
				new CreateAiDialogueCommand({
					userId: 7,
					scenarioId: 2,
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					illustrationStyleId,
				}),
			)

			expect(repository.createDialogue).toHaveBeenCalledWith(
				expect.objectContaining({
					illustrationStyleId: illustrationStyleId ?? 'realism',
				}),
			)
		},
	)

	it.each(['unknown', 'legacy', 'ai-dialogue-images/shared/styles/localdev/realism.webp'])(
		'rejects unavailable illustration style %s before creating a dialogue',
		async (illustrationStyleId) => {
			const scenario = { getScenarioById: jest.fn() }
			const repository = { createDialogue: jest.fn() }
			const handler = new CreateAiDialogueHandler(scenario as never, repository as never, {} as never)

			await expect(
				handler.execute(
					new CreateAiDialogueCommand({
						userId: 7,
						scenarioId: 2,
						sourceLanguageCode: 'en',
						targetLanguageCode: 'ru',
						illustrationStyleId,
					}),
				),
			).rejects.toMatchObject({ statusCode: 400 })

			expect(repository.createDialogue).not.toHaveBeenCalled()
		},
	)

	it.each([...AI_DIALOGUE_CEFR_LEVELS, null, undefined])(
		'passes %s through creation and returns it',
		async (maxCefrLevel) => {
			const scenario = { getScenarioById: jest.fn().mockResolvedValue({ user_id: null }) }
			const repository = { createDialogue: jest.fn().mockResolvedValue({ id: 1 }) }
			const query = {
				getDialogueById: jest.fn().mockResolvedValue({ id: 1, maxCefrLevel: maxCefrLevel ?? null }),
			}
			const handler = new CreateAiDialogueHandler(scenario as never, repository as never, query as never)

			await expect(
				handler.execute(
					new CreateAiDialogueCommand({
						userId: 7,
						scenarioId: 2,
						sourceLanguageCode: 'en',
						targetLanguageCode: 'ru',
						maxCefrLevel,
					}),
				),
			).resolves.toEqual({ id: 1, maxCefrLevel: maxCefrLevel ?? null })

			expect(repository.createDialogue).toHaveBeenCalledWith(expect.objectContaining({ maxCefrLevel }))
		},
	)
})
