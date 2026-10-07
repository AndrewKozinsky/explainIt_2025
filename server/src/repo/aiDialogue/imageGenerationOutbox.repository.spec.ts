jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { PrismaService } from 'db/prisma.service'
import { ImageGenerationOutboxRepository } from './imageGenerationOutbox.repository'

describe('ImageGenerationOutboxRepository', () => {
	const table = { findMany: jest.fn(), updateMany: jest.fn() }
	const repository = new ImageGenerationOutboxRepository({ imageGenerationOutbox: table } as unknown as PrismaService)
	const now = new Date('2026-10-07T12:00:00Z')
	const retryBefore = new Date(now.getTime() - 30_000)
	beforeEach(() => {
		jest.resetAllMocks()
		jest.useFakeTimers().setSystemTime(now)
	})
	afterEach(() => jest.useRealTimers())

	it('reads eligible pending rows in a stable order without including published rows', async () => {
		await repository.getPendingBatch(retryBefore, 25)
		expect(table.findMany).toHaveBeenCalledWith({
			where: { status: 'pending', OR: [{ attempts: 0 }, { updated_at: { lte: retryBefore } }] },
			orderBy: [{ updated_at: 'asc' }, { id: 'asc' }],
			take: 25,
			select: { id: true, job_id: true },
		})
	})

	it('atomically records an attempt with an explicit timestamp for the retry delay', async () => {
		table.updateMany.mockResolvedValue({ count: 1 })
		await expect(repository.beginAttempt(1, retryBefore)).resolves.toBe(true)
		expect(table.updateMany).toHaveBeenCalledWith({
			where: { id: 1, status: 'pending', OR: [{ attempts: 0 }, { updated_at: { lte: retryBefore } }] },
			data: { attempts: { increment: 1 }, updated_at: now },
		})
		table.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.beginAttempt(1, retryBefore)).resolves.toBe(false)
	})

	it('acknowledges conditionally without resurrecting deleted rows', async () => {
		table.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.markPublished(1)).resolves.toBeUndefined()
		expect(table.updateMany).toHaveBeenCalledWith({
			where: { id: 1, status: 'pending' },
			data: { status: 'published', published_at: now, updated_at: now, error: null },
		})
	})

	it('bounds the stored error and cannot overwrite successful publication', async () => {
		await repository.recordError(1, 'x'.repeat(1500))
		expect(table.updateMany).toHaveBeenCalledWith({
			where: { id: 1, status: 'pending' },
			data: { error: 'x'.repeat(1000), updated_at: now },
		})
	})
})
