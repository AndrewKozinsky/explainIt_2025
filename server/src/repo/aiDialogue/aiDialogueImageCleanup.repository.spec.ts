jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { PrismaService } from 'db/prisma.service'
import { AiDialogueImageCleanupRepository } from './aiDialogueImageCleanup.repository'

function harness() {
	const tx = {
		aiDialogueImage: { findUnique: jest.fn().mockResolvedValue(null) },
		imageGenerationJob: {
			findUnique: jest.fn().mockResolvedValue(null),
			findFirst: jest.fn().mockResolvedValue(null),
		},
	}
	const prisma = { $transaction: jest.fn(async (callback, _options) => callback(tx)) }
	return { tx, prisma, repository: new AiDialogueImageCleanupRepository(prisma as unknown as PrismaService) }
}

describe('AiDialogueImageCleanupRepository', () => {
	it('retains published files without considering job state', async () => {
		const { repository, tx } = harness()
		tx.aiDialogueImage.findUnique.mockResolvedValue({ id: 1 })
		await expect(repository.isGeneratedImageInUse('key', 10)).resolves.toBe(true)
		expect(tx.imageGenerationJob.findUnique).not.toHaveBeenCalled()
	})
	it.each(['queued', 'waitingDependencies', 'generating'])('retains an unbound file during %s', async (status) => {
		const { repository, tx } = harness()
		tx.imageGenerationJob.findUnique.mockResolvedValue({ status })
		await expect(repository.isGeneratedImageInUse('key', 10)).resolves.toBe(true)
	})

	it('retains keys used by other active reference snapshots', async () => {
		const { repository, tx } = harness()
		tx.imageGenerationJob.findFirst.mockResolvedValue({ id: 11 })
		await expect(repository.isGeneratedImageInUse('key', 10)).resolves.toBe(true)
		expect(tx.imageGenerationJob.findFirst).toHaveBeenCalledWith({
			where: { status: { in: ['queued', 'waitingDependencies', 'generating'] }, input: { contains: 'key' } },
			select: { id: true },
		})
	})
	it.each([null, { status: 'ready' }, { status: 'failed' }])(
		'allows only an unreferenced object for job %s',
		async (job) => {
			const { repository, tx, prisma } = harness()
			tx.imageGenerationJob.findUnique.mockResolvedValue(job)
			await expect(repository.isGeneratedImageInUse('key', 10)).resolves.toBe(false)
			expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: 'RepeatableRead' })
		},
	)
})
