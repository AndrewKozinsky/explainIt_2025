jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('features/billing/UserBalance.service', () => ({ UserBalanceService: class {} }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('infrastructure/llmProviderAdapter/LlmAdapter.service', () => ({ LlmAdapterService: class {} }))
jest.mock('./GenerateAiDialogueTurn.service', () => ({ GenerateAiDialogueTurn: class {} }))

import { AiDialogueQueryRepository } from 'repo/aiDialogue/aiDialogue.queryRepository'
import { AiDialogueMessageRepository } from 'repo/aiDialogue/aiDialogueMessage.repository'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ActiveAiDialogueGenerationRegistry } from './ActiveAiDialogueGenerationRegistry.service'
import { CreateAiDialogueMessageCommand, CreateAiDialogueMessageHandler } from './CreateAiDialogueMessage.command'
import { AiDialogueUserMessageAnalysis } from './messageCheck/AiDialogueUserMessageAnalysis.service'
import type { AiDialogueClientEvent } from 'types/aiDialogueMessage'

const requestId = '1dc62a7b-b4f6-41d6-a56d-47e7656bd370'
const speech = { type: 'speech' as const, content: 'She go home.' }
const action = { type: 'action' as const, content: 'I nod.' }
const draft: AiDialogueClientEvent = { type: 'userActions', actions: [speech, action] }
const correction = {
	index: 0,
	critical: [
		{
			title: 'Согласование',
			sentenceMarkdown: 'She **go** home.',
			explanationMarkdown: 'После **she** нужна форма **goes**.',
		},
	],
	suggestions: [],
	correctedText: 'She goes home.',
}
const suggestion = {
	index: 1,
	critical: [],
	suggestions: [{ explanationMarkdown: 'Можно описать жест подробнее.', example: 'I give a slight nod.' }],
	correctedText: null,
}

function harness() {
	const rows = {
		findUnique: jest.fn().mockResolvedValue(null),
		findMany: jest.fn().mockResolvedValue([]),
		findFirst: jest.fn().mockResolvedValue(null),
		createManyAndReturn: jest.fn(async ({ data }) => [{ ...data, id: 17, created_at: new Date(0) }]),
		create: jest.fn(async ({ data }) => ({ ...data, id: 17, created_at: new Date(0) })),
	}
	const prisma = { aiDialogueMessage: rows } as never
	const messages = new AiDialogueMessageRepository(prisma)
	const query = new AiDialogueQueryRepository(prisma, {} as never)
	const llm = {
		generate: jest.fn().mockResolvedValue({
			content: JSON.stringify({ parts: [correction, suggestion] }),
			model: 'gpt-6-luna',
		}),
	}
	const dialogue = {
		getDialogueById: jest.fn().mockResolvedValue({
			id: 3,
			user_id: 7,
			source_language_code: 'en',
			target_language_code: 'ru',
			summary: null,
		}),
	}
	const owner = { getUserById: jest.fn().mockResolvedValue({ id: 7, gender: 'MALE' }) }
	const balance = { ensurePositiveBalanceOrThrow: jest.fn(), chargeLlm: jest.fn() }
	const registry = new ActiveAiDialogueGenerationRegistry()
	const turn = { generate: jest.fn().mockResolvedValue(undefined) }
	const analysis = new AiDialogueUserMessageAnalysis(messages, llm as never, owner as never, balance as never)
	const handler = new CreateAiDialogueMessageHandler(
		dialogue as never,
		messages,
		query,
		registry,
		turn as never,
		balance as never,
		analysis,
	)

	return { handler, rows, llm, dialogue, balance, registry, turn }
}

function submission(event: AiDialogueClientEvent = draft) {
	return new CreateAiDialogueMessageCommand({ userId: 7, dialogueId: 3, event, requestId })
}

describe('CreateAiDialogueMessage', () => {
	it('checks both parts in one call, saves the original and final text together, then starts the NPC', async () => {
		const { handler, llm, rows, turn, registry } = harness()
		turn.generate.mockImplementation(async () => {
			expect(rows.createManyAndReturn).toHaveBeenCalledTimes(1)
			expect(registry.hasActiveForDialogue(3)).toBe(false)
		})

		const result = await handler.execute(submission())

		expect(llm.generate).toHaveBeenCalledTimes(1)
		const input = llm.generate.mock.calls[0][0]
		expect(input.responseFormat).toBe('json_object')
		expect(JSON.parse(input.messages[1].content).actions).toEqual([
			{ index: 0, ...speech },
			{ index: 1, ...action },
		])
		expect(result.payload).toEqual({
			type: 'userActions',
			actions: [{ type: 'speech', content: 'She goes home.' }, action],
			textReview: [
				{ originalText: speech.content, analysis: { critical: correction.critical, suggestions: [] } },
				{ originalText: action.content, analysis: { critical: [], suggestions: suggestion.suggestions } },
			],
		})
		expect(rows.createManyAndReturn).toHaveBeenCalledWith({
			data: expect.objectContaining({ dialogue_id: 3, request_id: requestId }),
			skipDuplicates: true,
		})
		expect(turn.generate).toHaveBeenCalledWith(3)
	})

	it('keeps correct text verbatim, including line breaks', async () => {
		const { handler, llm } = harness()
		const text = 'Hello.\n\nHow are you?'
		llm.generate.mockResolvedValue({
			content: JSON.stringify({ parts: [{ index: 0, critical: [], suggestions: [], correctedText: null }] }),
		})

		await expect(
			handler.execute(submission({ type: 'userActions', actions: [{ type: 'speech', content: text }] })),
		).resolves.toMatchObject({
			payload: {
				type: 'userActions',
				actions: [{ type: 'speech', content: text }],
				textReview: [{ originalText: text, analysis: { critical: [], suggestions: [] } }],
			},
		})
	})

	it('retries when analysis leaves a Russian phrase in an English turn, then saves the translation', async () => {
		const { handler, llm, rows, turn } = harness()
		const originalText = 'Hello! Вы меня ни с кем не спутали?'
		const correctedText = 'Hello! Have you mistaken me for someone else?'
		const critical = [
			{
				title: 'Фраза на русском языке',
				sentenceMarkdown: '**Вы меня ни с кем не спутали?**',
				explanationMarkdown: 'По-английски: **Have you mistaken me for someone else?**',
			},
		]
		llm.generate
			.mockResolvedValueOnce({
				content: JSON.stringify({ parts: [{ index: 0, critical: [], suggestions: [], correctedText: null }] }),
			})
			.mockResolvedValueOnce({
				content: JSON.stringify({ parts: [{ index: 0, critical, suggestions: [], correctedText }] }),
			})

		const result = await handler.execute(
			submission({ type: 'userActions', actions: [{ type: 'speech', content: originalText }] }),
		)

		expect(result.payload).toEqual({
			type: 'userActions',
			actions: [{ type: 'speech', content: correctedText }],
			textReview: [{ originalText, analysis: { critical, suggestions: [] } }],
		})
		expect(llm.generate).toHaveBeenCalledTimes(2)
		expect(llm.generate.mock.calls[0][0].messages[0].content).toContain('entire parts in any other language')
		expect(llm.generate.mock.calls[1][0].messages[0].content).toContain('indexes especially carefully: 0.')
		expect(rows.createManyAndReturn).toHaveBeenCalledTimes(1)
		expect(turn.generate).toHaveBeenCalledTimes(1)
	})

	it('does not save a turn when the repeated analysis leaves untranslated text in the action', async () => {
		const { handler, llm, rows, turn } = harness()
		const content = 'Я киваю.'
		llm.generate.mockResolvedValue({
			content: JSON.stringify({ parts: [{ index: 0, critical: [], suggestions: [], correctedText: null }] }),
		})

		await expect(
			handler.execute(submission({ type: 'userActions', actions: [{ type: 'action', content }] })),
		).rejects.toMatchObject({ errorMessage: errorMessage.aiDialogue.cannotParseMessageCheck })
		expect(llm.generate).toHaveBeenCalledTimes(2)
		expect(rows.createManyAndReturn).not.toHaveBeenCalled()
		expect(turn.generate).not.toHaveBeenCalled()
	})

	it('can keep a verbatim quotation from the original in an English turn', async () => {
		const { handler, llm } = harness()
		const content = 'I point at the sign that says «Выход».'
		llm.generate.mockResolvedValue({
			content: JSON.stringify({ parts: [{ index: 0, critical: [], suggestions: [], correctedText: null }] }),
		})

		await expect(
			handler.execute(submission({ type: 'userActions', actions: [{ type: 'action', content }] })),
		).resolves.toMatchObject({ payload: { actions: [{ type: 'action', content }] } })
		expect(llm.generate).toHaveBeenCalledTimes(1)
	})

	it.each([
		'{"parts":[',
		JSON.stringify({ parts: [correction] }),
		JSON.stringify({ parts: [suggestion, correction] }),
		JSON.stringify({ parts: [{ ...correction, correctedText: null }, suggestion] }),
		JSON.stringify({ parts: [correction, { ...suggestion, correctedText: 'I give a slight nod.' }] }),
	])('rejects invalid analysis and allows retry without saving a partial turn (%s)', async (content) => {
		const { handler, llm, rows, turn, registry } = harness()
		llm.generate.mockResolvedValueOnce({ content })

		await expect(handler.execute(submission())).rejects.toMatchObject({
			errorMessage: errorMessage.aiDialogue.cannotParseMessageCheck,
		})
		expect(rows.createManyAndReturn).not.toHaveBeenCalled()
		expect(turn.generate).not.toHaveBeenCalled()
		expect(registry.hasActiveForDialogue(3)).toBe(false)
		await expect(handler.execute(submission())).resolves.toMatchObject({ id: 17 })
	})

	it('returns a previously saved turn without review, charge or generation even while the NPC is active', async () => {
		const { handler, rows, llm, turn, registry, balance } = harness()
		const saved = await handler.execute(submission())
		rows.findUnique.mockResolvedValue((await rows.createManyAndReturn.mock.results[0].value)[0])
		jest.clearAllMocks()
		registry.register(3)

		await expect(handler.execute(submission())).resolves.toEqual(saved)
		expect(rows.createManyAndReturn).not.toHaveBeenCalled()
		expect(llm.generate).not.toHaveBeenCalled()
		expect(balance.chargeLlm).not.toHaveBeenCalled()
		expect(turn.generate).not.toHaveBeenCalled()
		await expect(handler.execute(submission({ type: 'userAvoidsNPC' }))).rejects.toMatchObject({
			errorMessage: errorMessage.aiDialogue.messageRequestIdReused,
		})
		await expect(
			handler.execute(
				submission({ type: 'userActions', actions: [{ ...speech, content: 'She goes home.' }, action] }),
			),
		).rejects.toMatchObject({ errorMessage: errorMessage.aiDialogue.messageRequestIdReused })
	})

	it('returns the winning row if a concurrent request already saved the key', async () => {
		const { handler, rows, turn } = harness()
		const saved = await handler.execute(submission())
		const row = (await rows.createManyAndReturn.mock.results[0].value)[0]
		turn.generate.mockClear()
		rows.createManyAndReturn.mockResolvedValueOnce([])
		rows.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(row)

		await expect(handler.execute(submission())).resolves.toEqual(saved)
		expect(turn.generate).not.toHaveBeenCalled()
	})

	it('rejects a second turn while analysis is in progress', async () => {
		const { handler, llm, rows, registry } = harness()
		let completeAnalysis!: (result: { content: string }) => void
		const pendingAnalysis = new Promise<{ content: string }>((resolve) => {
			completeAnalysis = resolve
		})
		llm.generate.mockReturnValueOnce(pendingAnalysis)

		const first = handler.execute(submission())
		await expect(handler.execute(submission({ type: 'userAvoidsNPC' }))).rejects.toMatchObject({
			errorMessage: errorMessage.aiDialogue.generationAlreadyActive,
		})
		expect(registry.hasActiveForDialogue(3)).toBe(true)
		expect(rows.createManyAndReturn).not.toHaveBeenCalled()

		completeAnalysis({ content: JSON.stringify({ parts: [correction, suggestion] }) })
		await expect(first).resolves.toMatchObject({ id: 17 })
		expect(rows.createManyAndReturn).toHaveBeenCalledTimes(1)
	})

	it('saves leaving the NPC without text analysis and still accepts requests without a key', async () => {
		const { handler, rows, llm, turn } = harness()
		await expect(
			handler.execute(
				new CreateAiDialogueMessageCommand({ userId: 7, dialogueId: 3, event: { type: 'userAvoidsNPC' } }),
			),
		).resolves.toMatchObject({ payload: { type: 'userAvoidsNPC' } })
		expect(llm.generate).not.toHaveBeenCalled()
		expect(rows.create).toHaveBeenCalledTimes(1)
		expect(turn.generate).toHaveBeenCalledWith(3)
	})
})
