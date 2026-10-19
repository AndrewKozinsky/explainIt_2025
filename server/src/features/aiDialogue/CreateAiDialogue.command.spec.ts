jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('repo/aiDialogueScenario/aiDialogueScenario.repository', () => ({ AiDialogueScenarioRepository: class {} }))

import { CEFR_SIMPLIFICATION_LEVELS } from 'utils/proficiencyLevel'
import { CreateAiDialogueCommand, CreateAiDialogueHandler } from './CreateAiDialogue.command'

describe('CreateAiDialogue language settings', () => {
	it.each([...CEFR_SIMPLIFICATION_LEVELS, null, undefined])(
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
