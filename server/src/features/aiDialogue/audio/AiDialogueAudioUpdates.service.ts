import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { AiDialogueAudioNotifications } from 'infrastructure/redis/aiDialogueAudioNotifications.service'
import { AiDialogueSseHub } from '../AiDialogueSseHub.service'
import { mapDialogueAudio } from './GetAiDialogueAudio.command'

@Injectable()
export class AiDialogueAudioUpdates implements OnModuleInit {
	private readonly logger = new Logger(AiDialogueAudioUpdates.name)
	constructor(
		private readonly notifications: AiDialogueAudioNotifications,
		private readonly repository: AiDialogueAudioRepository,
		private readonly storage: CloudflareS3Service,
		private readonly hub: AiDialogueSseHub,
	) {}

	onModuleInit() {
		this.notifications.subscribe(
			(id) => {
				void this.notifyJob(id)
			},
			() => this.hub.notifyActiveDialoguesOfAudioChanges(),
		)
	}

	async notifyJob(id: number) {
		try {
			const job = await this.repository.getJob(id)
			if (!job) return
			const dialogueId = job.attempt.dialogue_id
			if (job.status === 'ready' && job.attempt.status !== 'cancelled') {
				const audio = await mapDialogueAudio(job, this.storage)
				// Recheck cancellation after signing: an abandoned preview must not become playable.
				const current = await this.repository.getJob(id)
				if (current?.status === 'ready' && current.attempt.status !== 'cancelled')
					this.hub.publishDialogueEvent(dialogueId, { data: { type: 'audioReady', dialogueId, audio } })
			}
			this.hub.publishDialogueEvent(dialogueId, { data: { type: 'audioChanged', dialogueId } })
		} catch {
			this.logger.warn('Audio notification unavailable; recover via REST')
		}
	}
}
