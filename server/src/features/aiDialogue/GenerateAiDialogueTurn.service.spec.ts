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
jest.mock('./audio/AiDialogueAudioStream.service', () => ({ AiDialogueAudioStream: class {} }))
jest.mock('./SummarizeAiDialogue.service', () => ({ SummarizeAiDialogue: class {} }))
import { GenerateAiDialogueTurn } from './GenerateAiDialogueTurn.service'

function harness(footer = '\n\nwordMaps:\n{"content":"Hello","selections":[]}') {
	const timeline: string[] = []
	const llm = {
		stream: jest.fn(async function* () {
			yield 'help\nHello\nПривет'
			yield footer
		}),
	}
	const dialogue = {
		getDialogueById: jest.fn().mockResolvedValue({
			scenario_id: 1,
			source_language_code: 'en',
			target_language_code: 'ru',
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
		register: jest.fn().mockReturnValue(new AbortController()),
		unregister: jest.fn(() => timeline.push('unregister')),
	}
	const hub = { publishDialogueEvent: jest.fn((_id, event) => timeline.push(event.data.type)) }
	const summary = { summarizeIfNeeded: jest.fn().mockResolvedValue(undefined) }

	const audioSession = {
		id: 'attempt',
		push: jest.fn(),
		finish: jest.fn().mockResolvedValue(undefined),
		cancel: jest.fn().mockResolvedValue(undefined),
		confirm: jest.fn().mockResolvedValue(undefined),
	}
	const audio = { start: jest.fn(() => audioSession) }

	const service = new GenerateAiDialogueTurn(
		llm as never,
		dialogue as never,
		scenario as never,
		turn as never,
		query as never,
		registry as never,
		hub as never,
		summary as never,
		audio as never,
	)

	return { service, timeline, turn, query, registry, hub, llm, audioSession }
}

describe('text turn with inline word maps', () => {
	it('streams the text first and saves ready maps before sending messages', async () => {
		const { service, timeline, turn, hub, llm, audioSession } = harness()
		await service.generate(3)
		expect(timeline).toEqual(['turnStarted', 'chunk', 'chunk', 'message', 'unregister', 'turnDone'])
		expect(turn.saveGeneratedTurn.mock.calls[0][0].turn.events[0].wordMap.status).toBe('ready')
		expect(llm.stream).toHaveBeenCalledTimes(1)
		expect(
			hub.publishDialogueEvent.mock.calls.find(([, event]) => event.data.type === 'message')?.[1].data.message
				.payload.wordMap.status,
		).toBe('ready')
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

describe('audio does not wait for the full text turn', () => {
	it('passes a completed speech to audio preparation before receiving the footer', async () => {
		const { service, llm, turn, audioSession, timeline } = harness()
		let release!: () => void
		const gate = new Promise<void>((resolve) => {
			release = resolve
		})
		llm.stream.mockImplementation(async function* () {
			yield 'npcActions|npc|||neutral\nspeech:\nHello.\n'
			await gate
			yield 'Здравствуйте.\n\nwordMaps:\n{"content":"Hello.","selections":[]}'
		})
		const pending = service.generate(3)
		for (let i = 0; i < 20; i += 1) await Promise.resolve()
		expect(audioSession.push).toHaveBeenCalledWith('npcActions|npc|||neutral\nspeech:\nHello.\n')
		expect(turn.saveGeneratedTurn).not.toHaveBeenCalled()
		expect(timeline).not.toContain('turnDone')
		release()
		await pending
		expect(audioSession.confirm).toHaveBeenCalledWith([7], expect.any(Array))
	})
})
