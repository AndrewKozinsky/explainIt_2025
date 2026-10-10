import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'

@Injectable()
export class ImageGenerationRequestRepository {
	constructor(private readonly prisma: PrismaService) {}

	/** Atomically reserve the paid submission and its durable R2 destination.
	 * Changes only checkpoint metadata, retaining all saved generation parameters.
	 * The exact input comparison prevents dispatch using a changed/stale snapshot.
	 * @param id Existing job; deleted/terminal/already claimed jobs cannot be resurrected.
	 * @param expectedInput Immutable parameters read by the worker before reference preparation.
	 * @param resultS3Key Unique output key owned by this job, prepared by the assets consumer.
	 * @returns true for the one winning claim. false or a lost DB acknowledgement forbids dispatch.
	 */
	async claimSubmission(id: number, expectedInput: string, resultS3Key: string): Promise<boolean> {
		const snapshot = JSON.parse(expectedInput)
		if (snapshot.resultS3Key) throw new Error('Image result key already reserved')
		const result = await this.prisma.imageGenerationJob.updateMany({
			where: {
				id,
				input: expectedInput,
				status: { in: ['queued', 'waitingDependencies'] },
				provider_request_id: null,
				provider_polling_url: null,
			},
			data: { status: 'generating', input: JSON.stringify({ ...snapshot, resultS3Key }), updated_at: new Date() },
		})

		return result.count === 1
	}
}
