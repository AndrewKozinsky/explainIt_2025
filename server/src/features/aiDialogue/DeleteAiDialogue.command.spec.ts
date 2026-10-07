jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))

import { AiDialogueRepository } from 'repo/aiDialogue/aiDialogue.repository'
import { CleanupAiDialogueImages } from './CleanupAiDialogueImages.service'
import { DeleteAiDialogueCommand, DeleteAiDialogueHandler } from './DeleteAiDialogue.command'

function harness() {
	const calls: string[] = []
	const repository = {
		getDialogueById: jest.fn().mockResolvedValue({ user_id: 7 }),
		deleteDialogueAndGetImageKeys: jest.fn(async () => {
			calls.push('commit')
			return ['key'] as string[] | null
		}),
	}
	const cleanup = {
		cleanupDeletedDialogueImages: jest.fn(async () => {
			calls.push('cleanup')
		}),
	}

	const handler = new DeleteAiDialogueHandler(
		repository as unknown as AiDialogueRepository,
		cleanup as unknown as CleanupAiDialogueImages,
	)

	return { handler, repository, cleanup, calls }
}

describe('DeleteAiDialogue images', () => {
	it('starts R2 cleanup only after the authorized DB deletion has committed', async () => {
		const { handler, repository, cleanup, calls } = harness()
		await expect(handler.execute(new DeleteAiDialogueCommand(7, { id: 1 }))).resolves.toBe(true)
		expect(repository.deleteDialogueAndGetImageKeys).toHaveBeenCalledWith(1, 7)
		expect(cleanup.cleanupDeletedDialogueImages).toHaveBeenCalledWith(['key'])
		expect(calls).toEqual(['commit', 'cleanup'])
	})
	it.each([null, { user_id: 8 }])('does not clean up a missing or foreign dialogue %s', async (dialogue) => {
		const { handler, repository, cleanup } = harness()
		repository.getDialogueById.mockResolvedValue(dialogue)
		await expect(handler.execute(new DeleteAiDialogueCommand(7, { id: 1 }))).rejects.toMatchObject({
			statusCode: dialogue ? 403 : 404,
		})
		expect(repository.deleteDialogueAndGetImageKeys).not.toHaveBeenCalled()
		expect(cleanup.cleanupDeletedDialogueImages).not.toHaveBeenCalled()
	})
	it('retains files when DB deletion fails or another DELETE wins', async () => {
		const { handler, repository, cleanup } = harness()
		repository.deleteDialogueAndGetImageKeys.mockRejectedValueOnce(new Error('rollback'))
		await expect(handler.execute(new DeleteAiDialogueCommand(7, { id: 1 }))).rejects.toThrow('rollback')
		repository.deleteDialogueAndGetImageKeys.mockResolvedValueOnce(null)
		await expect(handler.execute(new DeleteAiDialogueCommand(7, { id: 1 }))).rejects.toMatchObject({
			statusCode: 404,
		})
		expect(cleanup.cleanupDeletedDialogueImages).not.toHaveBeenCalled()
	})
})
