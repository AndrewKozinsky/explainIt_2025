jest.mock('features/billing/UserBalance.service', () => ({ UserBalanceService: class {} }))
jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
	HttpException: class extends Error {},
}))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogueTurn.repository', () => ({ AiDialogueTurnRepository: class {} }))
jest.mock('repo/aiDialogueScenario/aiDialogueScenario.repository', () => ({ AiDialogueScenarioRepository: class {} }))
jest.mock('infrastructure/llmProviderAdapter/LlmAdapter.service', () => ({ LlmAdapterService: class {} }))
jest.mock('./SummarizeAiDialogue.service', () => ({ SummarizeAiDialogue: class {} }))
jest.mock('repo/user.repository', () => ({ UserRepository: class {} }))
import { LlmGenerateInput } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'
import { AI_DIALOGUE_MODEL } from './aiDialogueModelConfig'
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'

function harness(footer = '\n\nwordMaps:\n{"content":"Hello","groups":[]}') {
	const timeline: string[] = []
	const output = {
		content: 'help\nHello\nПривет' + footer,
		model: AI_DIALOGUE_MODEL,
		inputTokens: 1000,
		cachedInputTokens: 800,
		outputTokens: 50,
	}
	const llm = { generate: jest.fn(async (_input: LlmGenerateInput) => output) }

	const dialogue = {
		getDialogueById: jest.fn().mockResolvedValue({
			user_id: 5,
			scenario_id: 1,
			source_language_code: 'en',
			target_language_code: 'ru',
			cefr_level: null,
			summary: null,
			summary_up_to: 0,
		}),
	}
	const scenario = { getScenarioById: jest.fn().mockResolvedValue({ system_prompt: 'At customs' }) }
	const turn = { saveGeneratedTurn: jest.fn().mockResolvedValue([7]) }

	const query = {
		getMessagesByDialogueId: jest.fn().mockResolvedValue([]),
		getMessageById: jest.fn(async () => ({
			id: 7,
			dialogueId: 3,
			payload: (turn.saveGeneratedTurn.mock.calls[0] as unknown as [{ turn: { events: unknown[] } }])[0].turn
				.events[0],
		})),
	}

	const registry = {
		hasActiveForDialogue: jest.fn().mockReturnValue(false),
		register: jest.fn(),
		unregister: jest.fn(() => timeline.push('unregister')),
	}
	const hub = { publishDialogueEvent: jest.fn((_id, event) => timeline.push(event.data.type)) }
	const summary = { summarizeIfNeeded: jest.fn().mockResolvedValue(undefined) }

	const user = { getUserById: jest.fn().mockResolvedValue({ id: 5, gender: 'FEMALE' }) }
	const balance = {
		ensurePositiveBalanceOrThrow: jest.fn().mockResolvedValue(undefined),
		chargeLlm: jest.fn().mockResolvedValue(undefined),
	}

	const service = new GenerateAiDialogueTurn(
		llm as never,
		dialogue as never,
		scenario as never,
		turn as never,
		query as never,
		registry as never,
		hub as never,
		summary as never,
		user as never,
		balance as never,
	)

	return { service, timeline, turn, query, registry, hub, llm, dialogue, user, balance, output }
}

describe('participant gender', () => {
	it('reads the gender from the dialogue owner profile into the system prompt', async () => {
		const { service, llm, user } = harness()
		await service.generate(3)
		expect(user.getUserById).toHaveBeenCalledWith(5)
		expect(llm.generate.mock.calls[0][0].messages[0].content).toContain('The human participant is a woman.')
	})
})

describe('text turn with inline word maps', () => {
	it('sends only saved messages with ready maps after the complete reply', async () => {
		const { service, timeline, turn, hub, llm } = harness()
		await service.generate(3)
		expect(timeline).toEqual(['turnStarted', 'message', 'unregister', 'turnDone'])
		expect(turn.saveGeneratedTurn.mock.calls[0][0].turn.events[0].wordMap.status).toBe('ready')
		expect(llm.generate).toHaveBeenCalledTimes(1)
		expect(
			hub.publishDialogueEvent.mock.calls.find(([, event]) => event.data.type === 'message')?.[1].data.message
				.payload.wordMap.status,
		).toBe('ready')
	})
	it('waits for the full provider response before saving or publishing messages', async () => {
		const { service, llm, timeline, turn, output } = harness()
		let finish!: (value: typeof output) => void
		let requested!: () => void
		const started = new Promise<void>((resolve) => {
			requested = resolve
		})
		const response = new Promise<typeof output>((resolve) => {
			finish = resolve
		})
		llm.generate.mockImplementationOnce(() => {
			requested()
			return response
		})
		const generating = service.generate(3)
		await started
		expect(timeline).toEqual(['turnStarted'])
		expect(turn.saveGeneratedTurn).not.toHaveBeenCalled()
		finish(output)
		await generating
		expect(timeline).toEqual(['turnStarted', 'message', 'unregister', 'turnDone'])
	})
	it('does not retry the reply when word map metadata is broken', async () => {
		const { service, timeline, turn } = harness('\n\nwordMaps:\n{broken')
		await service.generate(3)
		expect(turn.saveGeneratedTurn).toHaveBeenCalledTimes(1)
		expect(turn.saveGeneratedTurn.mock.calls[0][0].turn.events[0].content).toBe('Hello')
		expect(timeline).not.toContain('turnReset')
		expect(timeline).not.toContain('turnError')
	})
	it('does not start analysis when reconnecting to existing messages', async () => {
		const { service, query, registry } = harness()
		query.getMessagesByDialogueId.mockResolvedValue([{ id: 7, payload: { type: 'help' } }])
		await service.triggerIfNeeded(3)
		expect(registry.register).not.toHaveBeenCalled()
	})
})

describe('language settings snapshot per turn', () => {
	it('reads the saved level for each new turn and retains it through a parse retry', async () => {
		const { service, dialogue, llm, timeline, output, balance } = harness()
		const stored = {
			scenario_id: 1,
			source_language_code: 'en',
			target_language_code: 'ru',
			cefr_level: 'A2',
			summary: null,
			summary_up_to: 0,
		}
		dialogue.getDialogueById.mockImplementation(async () => ({ ...stored }))
		llm.generate.mockImplementationOnce(async () => {
			// A PATCH completes while the first request is in progress.
			stored.cefr_level = 'B1'
			return { ...output, content: 'invalid response' }
		})
		const log = jest.spyOn(console, 'log').mockImplementation(() => undefined)
		try {
			await service.generate(3)
			expect(timeline).toEqual(['turnStarted', 'message', 'unregister', 'turnDone'])
			expect(balance.chargeLlm).toHaveBeenCalledTimes(2)
			expect(dialogue.getDialogueById).toHaveBeenCalledTimes(1)
			expect(llm.generate.mock.calls[0][0].messages[0].content).toContain('level of this dialogue is CEFR A2')
			expect(llm.generate.mock.calls[1][0].messages[0].content).toContain('level of this dialogue is CEFR A2')

			await service.generate(3)
			expect(llm.generate.mock.calls[2][0].messages[0].content).toContain('level of this dialogue is CEFR B1')

			dialogue.getDialogueById.mockResolvedValue({ ...stored, cefr_level: null })
			await service.generate(3)
			expect(llm.generate.mock.calls[3][0].messages[0].content).toContain('There is no CEFR complexity limit')
		} finally {
			log.mockRestore()
		}
	})
})

describe('balance', () => {
	it('charges the dialogue owner for the complete reply', async () => {
		const { service, balance, output } = harness()
		await service.generate(3)
		expect(balance.chargeLlm).toHaveBeenCalledWith(
			expect.objectContaining({
				userId: 5,
				feature: 'aiDialogue',
				model: output.model,
				usage: output,
			}),
		)
	})

	it('releases the active turn and reports provider failure without charging or saving', async () => {
		const { service, balance, llm, timeline, turn } = harness()
		llm.generate.mockRejectedValueOnce(new Error('Provider unavailable'))
		const log = jest.spyOn(console, 'log').mockImplementation(() => undefined)
		try {
			await service.generate(3)
			expect(timeline).toEqual(['turnStarted', 'turnError', 'unregister', 'turnDone'])
			expect(balance.chargeLlm).not.toHaveBeenCalled()
			expect(turn.saveGeneratedTurn).not.toHaveBeenCalled()
		} finally {
			log.mockRestore()
		}
	})

	it('sends turnError and does not call the model when the balance is exhausted', async () => {
		const { service, balance, llm, timeline } = harness()
		balance.ensurePositiveBalanceOrThrow.mockRejectedValue(new Error('BALANCE_EXHAUSTED'))
		jest.spyOn(console, 'log').mockImplementation(() => undefined)

		await service.generate(3)

		expect(llm.generate).not.toHaveBeenCalled()
		expect(timeline).toContain('turnError')
		expect(timeline.at(-1)).toBe('turnDone')
	})
})
