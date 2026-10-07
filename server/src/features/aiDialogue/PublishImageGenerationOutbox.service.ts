import { Injectable, Logger } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { ImageGenerationOutboxRepository } from 'repo/aiDialogue/imageGenerationOutbox.repository'
import { AiDialogueImageGenerationQueue } from 'infrastructure/queues/aiDialogueImageGeneration.queue'

const OUTBOX_SCAN_INTERVAL_MS = 5_000
const OUTBOX_RETRY_DELAY_MS = 30_000
const OUTBOX_BATCH_SIZE = 25

@Injectable()
export class PublishImageGenerationOutbox {
	private readonly logger = new Logger(PublishImageGenerationOutbox.name)
	private isPublishing = false

	constructor(
		private readonly repository: ImageGenerationOutboxRepository,
		private readonly queue: AiDialogueImageGenerationQueue,
	) {}

	@Interval(OUTBOX_SCAN_INTERVAL_MS)
	async publishPending(): Promise<void> {
		if (this.isPublishing) return
		this.isPublishing = true

		try {
			const retryBefore = new Date(Date.now() - OUTBOX_RETRY_DELAY_MS)
			const entries = await this.repository.getPendingBatch(retryBefore, OUTBOX_BATCH_SIZE)
			for (const entry of entries) await this.publishEntry(entry, retryBefore)
		} catch (error) {
			this.logger.error(`Image outbox scan failed: ${errorText(error)}`)
		} finally {
			this.isPublishing = false
		}
	}

	private async publishEntry(entry: { id: number; job_id: number }, retryBefore: Date): Promise<void> {
		try {
			if (!(await this.repository.beginAttempt(entry.id, retryBefore))) return

			await this.queue.enqueue(entry.job_id)
			await this.repository.markPublished(entry.id)
		} catch (error) {
			const message = errorText(error)
			this.logger.error(`Image outbox ${entry.id} publication failed: ${message}`)
			try {
				await this.repository.recordError(entry.id, message)
			} catch (recordError) {
				this.logger.error(`Image outbox ${entry.id} error recording failed: ${errorText(recordError)}`)
			}
		}
	}
}

function errorText(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error'
}
