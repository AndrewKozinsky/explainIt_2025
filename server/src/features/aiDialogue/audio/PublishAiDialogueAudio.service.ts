import { Injectable, Logger } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { AiDialogueAudioGenerationQueue } from 'infrastructure/queues/aiDialogueAudioGeneration.queue'
import { AiDialogueSseHub } from '../AiDialogueSseHub.service'

@Injectable()
export class PublishAiDialogueAudio {
	private busy = false
	private readonly logger = new Logger(PublishAiDialogueAudio.name)
	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly queue: AiDialogueAudioGenerationQueue,
		private readonly hub: AiDialogueSseHub,
	) {}

	@Interval(1000)
	async publishPending() {
		if (this.busy) return
		this.busy = true

		try {
			for (const job of await this.repository.pendingJobs()) {
				await this.queue.enqueue(job.id)
				await this.repository.markPublished(job.id)
			}
		} catch {
			this.logger.warn('Audio outbox unavailable; will retry')
		} finally {
			this.busy = false
		}
	}

	@Interval(60_000)
	async expireAttempts() {
		try {
			for (const attempt of [
				...(await this.repository.recoverBindings()),
				...(await this.repository.expireAttempts()),
			])
				this.hub.publishDialogueEvent(attempt.dialogue_id, {
					data: { type: 'audioChanged', dialogueId: attempt.dialogue_id },
				})
		} catch {
			this.logger.warn('Stale audio attempt cleanup deferred')
		}
	}
}
