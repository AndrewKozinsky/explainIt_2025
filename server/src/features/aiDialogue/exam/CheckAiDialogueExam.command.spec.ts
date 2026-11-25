jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('features/billing/UserBalance.service', () => ({ UserBalanceService: class {} }))
jest.mock('infrastructure/llmProviderAdapter/LlmAdapter.service', () => ({ LlmAdapterService: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogueMessage.repository', () => ({ AiDialogueMessageRepository: class {} }))
import type { AiDialogueMessageOutModel } from 'models/aiDialogue/aiDialogueMessage.out.model'
import { parseExamReport } from './aiDialogueExam'
import { CheckAiDialogueExamCommand, CheckAiDialogueExamHandler } from './CheckAiDialogueExam.command'

const history: AiDialogueMessageOutModel[] = Array.from({ length: 10 }, (_, index) => ({
	id: index + 1,
	dialogueId: 3,
	createdAt: new Date(0).toISOString(),
	payload: { type: 'userActions', actions: [{ type: 'speech', content: 'She go home.' }] },
}))
const report = {
	level: 'A2',
	summary: 'Report',
	strengths: ['Understood questions'],
	errors: [{ messageId: 1, originalText: 'She go', suggestedText: 'She goes', explanation: 'Agreement' }],
	recommendations: ['Practise verb agreement'],
}

function harness() {
	const dialogue = {
		getDialogueById: jest.fn().mockResolvedValue({
			id: 3,
			user_id: 7,
			mode: 'exam',
			source_language_code: 'en',
			target_language_code: 'ru',
		}),
	}
	const query = {
		getMessagesByDialogueId: jest.fn().mockResolvedValue(history),
		mapDbMessageToOutModel: jest.fn((row) => ({
			id: 11,
			dialogueId: 3,
			createdAt: new Date(0).toISOString(),
			payload: row.event,
		})),
	}
	const messages = { createMessage: jest.fn(async (dto) => ({ ...dto, id: 11 })) }
	const getMessageById = jest.fn(async () =>
		query.mapDbMessageToOutModel(messages.createMessage.mock.calls.at(-1)![0]),
	)
	Object.assign(query, { getMessageById })
	const llm = { generate: jest.fn().mockResolvedValue({ content: JSON.stringify(report), model: 'deepseek-v4-pro' }) }
	const balance = { ensurePositiveBalanceOrThrow: jest.fn(), chargeLlm: jest.fn() }
	const registry = {
		hasActiveForDialogue: jest.fn().mockReturnValue(false),
		register: jest.fn(),
		unregister: jest.fn(),
	}
	const hub = { publishDialogueEvent: jest.fn() }
	const handler = new CheckAiDialogueExamHandler(
		dialogue as never,
		query as never,
		messages as never,
		llm as never,
		balance as never,
		registry as never,
		hub as never,
	)
	return { handler, dialogue, query, messages, llm, balance, registry, hub }
}
const command = () => new CheckAiDialogueExamCommand(7, 3)

it.each(['A0', 'C1'])('preserves %s and rejects invented error evidence or an invalid level', (level) => {
	expect(parseExamReport(JSON.stringify({ ...report, level }), history)).toMatchObject({
		level,
		assessedThroughMessageId: 10,
	})
	expect(
		parseExamReport(
			JSON.stringify({ ...report, errors: [{ ...report.errors[0], originalText: 'invented' }] }),
			history,
		),
	).toBeNull()
	expect(parseExamReport(JSON.stringify({ ...report, level: 'C2' }), history)).toBeNull()
})

it('checks original context once, saves and broadcasts the result, then returns it without charging again', async () => {
	const h = harness()
	const result = await h.handler.execute(command())
	expect(result.payload).toMatchObject({
		medalUrl: null,
		type: 'examResult',
		level: 'A2',
		assessedThroughMessageId: 10,
	})
	const [systemPrompt, transcript] = h.llm.generate.mock.calls[0][0].messages
	expect(systemPrompt.content).toMatch(/write the summary .* in the second person/i)
	expect(transcript.content).toContain('She go home.')
	expect(h.balance.chargeLlm).toHaveBeenCalledTimes(1)
	expect(h.hub.publishDialogueEvent).toHaveBeenCalledTimes(1)
	h.query.getMessagesByDialogueId.mockResolvedValue([...history, result])
	await expect(h.handler.execute(command())).resolves.toEqual(result)
	expect(h.llm.generate).toHaveBeenCalledTimes(1)
})

it('shares an in-flight paid check between simultaneous requests', async () => {
	const h = harness()
	let finish!: (value: unknown) => void
	h.llm.generate.mockImplementation(
		() =>
			new Promise((resolve) => {
				finish = resolve
			}),
	)
	const a = h.handler.execute(command())
	const b = h.handler.execute(command())
	await new Promise((resolve) => setImmediate(resolve))
	expect(h.llm.generate).toHaveBeenCalledTimes(1)
	finish({ content: JSON.stringify(report), model: 'deepseek-v4-pro' })
	const [first, second] = await Promise.all([a, b])
	expect(first).toEqual(second)
	expect(h.messages.createMessage).toHaveBeenCalledTimes(1)
})

it.each(['practice', 'owner', 'generating'])('rejects %s before a paid call', async (reason) => {
	const h = harness()
	if (reason === 'practice') h.dialogue.getDialogueById.mockResolvedValue({ id: 3, user_id: 7, mode: 'practice' })
	if (reason === 'owner') h.dialogue.getDialogueById.mockResolvedValue({ id: 3, user_id: 8, mode: 'exam' })
	if (reason === 'generating') h.registry.hasActiveForDialogue.mockReturnValue(true)
	await expect(h.handler.execute(command())).rejects.toBeDefined()
	expect(h.llm.generate).not.toHaveBeenCalled()
})

it('releases the slot and allows retry after an invalid report without storing a result', async () => {
	const h = harness()
	h.llm.generate.mockResolvedValueOnce({ content: 'broken', model: 'deepseek-v4-pro' })
	await expect(h.handler.execute(command())).rejects.toBeDefined()
	expect(h.messages.createMessage).not.toHaveBeenCalled()
	expect(h.registry.unregister).toHaveBeenCalledWith(3)
	await expect(h.handler.execute(command())).resolves.toBeDefined()
})

it('accepts two replies without enforcing a server-side submission threshold', async () => {
	const h = harness()
	h.query.getMessagesByDialogueId.mockResolvedValue(history.slice(0, 2))
	const result = await h.handler.execute(command())
	expect(result.payload).toMatchObject({ medalUrl: null, type: 'examResult', assessedThroughMessageId: 2 })
	expect(h.llm.generate).toHaveBeenCalledTimes(1)
})
