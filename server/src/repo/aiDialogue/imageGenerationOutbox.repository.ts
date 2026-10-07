import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'

@Injectable()
export class ImageGenerationOutboxRepository {
	constructor(private readonly prisma: PrismaService) {}

	getPendingBatch(retryBefore: Date, limit: number) {
		return this.prisma.imageGenerationOutbox.findMany({
			where: pendingForAttempt(retryBefore),
			orderBy: [{ updated_at: 'asc' }, { id: 'asc' }],
			take: limit,
			select: { id: true, job_id: true },
		})
	}

	async beginAttempt(id: number, retryBefore: Date): Promise<boolean> {
		const result = await this.prisma.imageGenerationOutbox.updateMany({
			where: { id, ...pendingForAttempt(retryBefore) },
			data: { attempts: { increment: 1 }, updated_at: new Date() },
		})
		return result.count === 1
	}

	async markPublished(id: number): Promise<void> {
		await this.prisma.imageGenerationOutbox.updateMany({
			where: { id, status: 'pending' },
			data: { status: 'published', published_at: new Date(), updated_at: new Date(), error: null },
		})
	}

	async recordError(id: number, error: string): Promise<void> {
		await this.prisma.imageGenerationOutbox.updateMany({
			where: { id, status: 'pending' },
			data: { error: error.slice(0, 1000), updated_at: new Date() },
		})
	}
}

function pendingForAttempt(retryBefore: Date) {
	return {
		status: 'pending' as const,
		OR: [{ attempts: 0 }, { updated_at: { lte: retryBefore } }],
	}
}
