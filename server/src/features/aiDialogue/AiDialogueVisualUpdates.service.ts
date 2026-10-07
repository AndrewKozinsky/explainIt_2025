import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { AiDialogueVisualNotifications } from 'infrastructure/redis/aiDialogueVisualNotifications.service'
import { AiDialogueVisualsRepository } from 'repo/aiDialogue/aiDialogueVisuals.repository'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'

@Injectable()
export class AiDialogueVisualUpdates implements OnModuleInit {
	private readonly logger = new Logger(AiDialogueVisualUpdates.name)
	constructor(
		private readonly notifications: AiDialogueVisualNotifications,
		private readonly repository: AiDialogueVisualsRepository,
		private readonly hub: AiDialogueSseHub,
	) {}

	/** Подписывает HTTP-процесс; после reconnect заставляет активные SSE-клиенты перечитать снимок. */
	onModuleInit(): void {
		this.notifications.subscribe(
			(id) => {
				void this.notifyCompletedJob(id)
			},
			() => this.hub.notifyActiveDialoguesOfVisualChanges(),
		)
	}

	/** Перечитывает цель из БД после коммита и уведомляет только её диалог; удалённые цели игнорирует. */
	async notifyCompletedJob(id: number): Promise<void> {
		try {
			const dialogueId = await this.repository.getCompletedJobDialogueId(id)
			if (dialogueId !== null)
				this.hub.publishDialogueEvent(dialogueId, { data: { type: 'visualsChanged', dialogueId } })
		} catch {
			this.logger.warn('Image notification lookup failed; recover via visual REST snapshot')
		}
	}
}
