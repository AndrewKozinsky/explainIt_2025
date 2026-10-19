jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogue.repository', () => ({ AiDialogueRepository: class {} }))
jest.mock('repo/aiDialogue/aiDialogue.queryRepository', () => ({ AiDialogueQueryRepository: class {} }))

import { UpdateAiDialogueCommand, UpdateAiDialogueHandler } from './UpdateAiDialogue.command'

function harness() {
	const repository = {
		getDialogueById: jest.fn().mockResolvedValue({ id: 1, user_id: 7, max_cefr_level: 'A2' }),
		updateMaxCefrLevel: jest.fn().mockResolvedValue(true),
	}
	const query = { getDialogueById: jest.fn().mockResolvedValue({ id: 1, maxCefrLevel: 'B1' }) }
	const handler = new UpdateAiDialogueHandler(repository as never, query as never)

	return { handler, repository, query }
}

describe('UpdateAiDialogue settings', () => {
	it.each(['B1', null] as const)('saves an explicit level or clears it: %s', async (maxCefrLevel) => {
		const { handler, repository, query } = harness()
		query.getDialogueById.mockResolvedValue({ id: 1, maxCefrLevel })
		await expect(
			handler.execute(new UpdateAiDialogueCommand({ userId: 7, dialogueId: 1, maxCefrLevel })),
		).resolves.toEqual({ id: 1, maxCefrLevel })
		expect(repository.updateMaxCefrLevel).toHaveBeenCalledWith(1, 7, maxCefrLevel)
	})

	it('preserves settings and updatedAt for an empty PATCH', async () => {
		const { handler, repository } = harness()
		await handler.execute(new UpdateAiDialogueCommand({ userId: 7, dialogueId: 1 }))
		expect(repository.updateMaxCefrLevel).not.toHaveBeenCalled()
	})

	it.each([null, { user_id: 8 }])('rejects missing or foreign dialogues: %j', async (dialogue) => {
		const { handler, repository, query } = harness()
		repository.getDialogueById.mockResolvedValue(dialogue)
		await expect(
			handler.execute(new UpdateAiDialogueCommand({ userId: 7, dialogueId: 1, maxCefrLevel: 'A1' })),
		).rejects.toMatchObject({ statusCode: dialogue ? 403 : 404 })
		expect(repository.updateMaxCefrLevel).not.toHaveBeenCalled()
		expect(query.getDialogueById).not.toHaveBeenCalled()
	})

	it('returns not found if the dialogue was deleted concurrently', async () => {
		const { handler, repository } = harness()
		repository.updateMaxCefrLevel.mockResolvedValue(false)
		await expect(
			handler.execute(new UpdateAiDialogueCommand({ userId: 7, dialogueId: 1, maxCefrLevel: 'A1' })),
		).rejects.toMatchObject({ statusCode: 404 })
	})
})
