import { Injectable, Logger } from '@nestjs/common'
import { z } from 'zod'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { RedisNotificationChannel } from './redisNotificationChannel'

const notificationSchema = z.object({ jobId: z.number().int().positive().max(Number.MAX_SAFE_INTEGER) }).strict()

type VisualJobNotification = z.infer<typeof notificationSchema>

/** Проверяет маленькое уведомление Redis; неподдерживаемые и повреждённые сообщения игнорируются. */
export function parseVisualJobNotification(message: string): number | null {
	if (message.length > 256) return null

	try {
		const parsed = notificationSchema.safeParse(JSON.parse(message))
		return parsed.success ? parsed.data.jobId : null
	} catch {
		return null
	}
}

/** Уведомления worker → HTTP о завершённых заданиях изображений диалога. */
@Injectable()
export class AiDialogueVisualNotifications extends RedisNotificationChannel<VisualJobNotification> {
	protected readonly logger = new Logger(AiDialogueVisualNotifications.name)
	protected readonly channelPrefix = 'ai-dialogue-visuals'
	protected readonly logLabel = 'Image notification'

	// Явный конструктор: Nest берёт типы зависимостей из метаданных самого класса.
	constructor(config: MainConfigService) {
		super(config)
	}

	/** Отправляет только ID завершённого задания; ошибка доставки не отменяет ready и не повторяет генерацию. */
	async publishJobChanged(jobId: number): Promise<void> {
		await this.publishNotification({ jobId })
	}

	/** Подписывает HTTP-процесс; onReady вызывается после каждого (пере)подключения. */
	subscribe(onJobChanged: (jobId: number) => void, onReady: () => void): void {
		this.subscribeToNotifications((notification) => onJobChanged(notification.jobId), onReady)
	}

	protected parseNotification(message: string): null | VisualJobNotification {
		const jobId = parseVisualJobNotification(message)
		return jobId === null ? null : { jobId }
	}
}
