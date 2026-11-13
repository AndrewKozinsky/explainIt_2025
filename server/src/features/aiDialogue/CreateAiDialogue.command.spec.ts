jest.mock('features/billing/UserBalance.service', () => ({ UserBalanceService: class {} }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('repo/aiDialogueScenario/aiDialogueScenario.repository', () => ({ AiDialogueScenarioRepository: class {} }))

import { AI_DIALOGUE_CEFR_LEVELS } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { CreateAiDialogueCommand, CreateAiDialogueHandler } from './CreateAiDialogue.command'

const balance = { ensurePositiveBalanceOrThrow: jest.fn().mockResolvedValue(undefined) }

describe('CreateAiDialogue language settings', () => {
	it.each(['realism', 'drawing', 'watercolor', undefined, null])(
		'persists the selected illustration style %s',
		async (illustrationStyleId) => {
			const scenario = { getScenarioById: jest.fn().mockResolvedValue({ user_id: null }) }
			const repository = { createDialogue: jest.fn().mockResolvedValue({ id: 1 }) }
			const query = { getDialogueById: jest.fn().mockResolvedValue({ id: 1 }) }

			const handler = new CreateAiDialogueHandler(
				scenario as never,
				repository as never,
				query as never,
				balance as never,
			)

			await handler.execute(
				new CreateAiDialogueCommand({
					userId: 7,
					scenarioId: 2,
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					locale: 'ru',
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
			const handler = new CreateAiDialogueHandler(
				scenario as never,
				repository as never,
				{} as never,
				balance as never,
			)

			await expect(
				handler.execute(
					new CreateAiDialogueCommand({
						userId: 7,
						scenarioId: 2,
						sourceLanguageCode: 'en',
						targetLanguageCode: 'ru',
						locale: 'ru',
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
			const handler = new CreateAiDialogueHandler(
				scenario as never,
				repository as never,
				query as never,
				balance as never,
			)

			await expect(
				handler.execute(
					new CreateAiDialogueCommand({
						userId: 7,
						scenarioId: 2,
						sourceLanguageCode: 'en',
						targetLanguageCode: 'ru',
						locale: 'ru',
						maxCefrLevel,
					}),
				),
			).resolves.toEqual({ id: 1, maxCefrLevel: maxCefrLevel ?? null })

			expect(repository.createDialogue).toHaveBeenCalledWith(expect.objectContaining({ maxCefrLevel }))
		},
	)

	it.each([
		['  Embassy of Canada  ', 'Embassy of Canada'],
		['   ', null],
		['', null],
		[null, null],
		[undefined, null],
	])('stores the setting note %j as %j', async (userScenarioAmendment, expected) => {
		const scenario = { getScenarioById: jest.fn().mockResolvedValue({ user_id: null }) }
		const repository = { createDialogue: jest.fn().mockResolvedValue({ id: 1 }) }
		const query = { getDialogueById: jest.fn().mockResolvedValue({ id: 1 }) }
		const handler = new CreateAiDialogueHandler(
			scenario as never,
			repository as never,
			query as never,
			balance as never,
		)

		await handler.execute(
			new CreateAiDialogueCommand({
				userId: 7,
				scenarioId: 2,
				sourceLanguageCode: 'en',
				targetLanguageCode: 'ru',
				locale: 'ru',
				userScenarioAmendment,
			}),
		)

		expect(repository.createDialogue).toHaveBeenCalledWith(
			expect.objectContaining({ userScenarioAmendment: expected }),
		)
	})
})

describe('CreateAiDialogue balance', () => {
	it('does not create a dialogue when the balance is exhausted', async () => {
		const scenario = { getScenarioById: jest.fn().mockResolvedValue({ user_id: null }) }
		const repository = { createDialogue: jest.fn() }
		const query = { getDialogueById: jest.fn() }
		const exhaustedBalance = { ensurePositiveBalanceOrThrow: jest.fn().mockRejectedValue(new Error('402')) }
		const handler = new CreateAiDialogueHandler(
			scenario as never,
			repository as never,
			query as never,
			exhaustedBalance as never,
		)

		await expect(
			handler.execute(
				new CreateAiDialogueCommand({
					userId: 7,
					scenarioId: 2,
					sourceLanguageCode: 'en',
					targetLanguageCode: 'ru',
					locale: 'ru',
				}),
			),
		).rejects.toThrow('402')
		expect(exhaustedBalance.ensurePositiveBalanceOrThrow).toHaveBeenCalledWith(7, 'aiDialogue')
		expect(repository.createDialogue).not.toHaveBeenCalled()
	})
})
