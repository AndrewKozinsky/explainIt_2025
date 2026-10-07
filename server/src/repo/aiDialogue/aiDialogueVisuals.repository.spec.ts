jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { AiDialogueVisualsRepository } from './aiDialogueVisuals.repository'
import { PrismaService } from 'db/prisma.service'

describe('AiDialogueVisualsRepository', () => {
	function harness() {
		const tx = { aiDialogue: { findUnique: jest.fn().mockResolvedValue(null) } }
		const prisma = {
			$transaction: jest.fn(async (callback, _options) => callback(tx)),
			imageGenerationJob: { findUnique: jest.fn() },
		}
		return { repository: new AiDialogueVisualsRepository(prisma as unknown as PrismaService), prisma, tx }
	}
	it('reads a consistent visual snapshot without prompts, provider details or error text', async () => {
		const { repository, prisma, tx } = harness()
		await repository.getDialogueVisuals(1)
		expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: 'RepeatableRead' })
		const query = tx.aiDialogue.findUnique.mock.calls[0][0]
		expect(query.where).toEqual({ id: 1 })
		expect(query.select.user_id).toBe(true)
		expect(query.select.AiDialogueCharacter.select.AiDialogueImage).toMatchObject({
			where: { type: 'emotionSheet' },
			take: 1,
		})
		expect(query.select.AiDialogueMessage.where).toEqual({ type: 'sceneUpdate' })
		expect(query.select.AiDialogueMessage.select.ImageGenerationJob.select).toEqual({ status: true })
		expect(JSON.stringify(query)).not.toMatch(/provider_|appearance|input|error/)
	})
	it.each(['queued', 'generating', 'waitingDependencies'])('ignores nonterminal job %s', async (status) => {
		const { repository, prisma } = harness()
		prisma.imageGenerationJob.findUnique.mockResolvedValue({ status, character: { dialogue_id: 1 } })
		await expect(repository.getCompletedJobDialogueId(10)).resolves.toBeNull()
	})
	it.each(['ready', 'failed'])('finds a completed character or scene owner for status %s', async (status) => {
		const { repository, prisma } = harness()
		prisma.imageGenerationJob.findUnique.mockResolvedValue({ status, character: { dialogue_id: 1 }, message: null })
		await expect(repository.getCompletedJobDialogueId(10)).resolves.toBe(1)
		prisma.imageGenerationJob.findUnique.mockResolvedValue({ status, character: null, message: { dialogue_id: 2 } })
		await expect(repository.getCompletedJobDialogueId(10)).resolves.toBe(2)
	})
	it('ignores a removed job or owner', async () => {
		const { repository, prisma } = harness()
		prisma.imageGenerationJob.findUnique.mockResolvedValue(null)
		await expect(repository.getCompletedJobDialogueId(10)).resolves.toBeNull()
		prisma.imageGenerationJob.findUnique.mockResolvedValue({ status: 'ready', character: null, message: null })
		await expect(repository.getCompletedJobDialogueId(10)).resolves.toBeNull()
	})
})
