import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import Redis from 'ioredis'
import { z } from 'zod'
import { MainConfigService } from '../mainConfig/mainConfig.service'

const notificationSchema = z.object({ jobId: z.number().int().positive().max(Number.MAX_SAFE_INTEGER) }).strict()

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

@Injectable()
export class AiDialogueVisualNotifications implements OnModuleDestroy {
	private readonly logger = new Logger(AiDialogueVisualNotifications.name)
	private publisher?: Redis
	private subscriber?: Redis
	private stopped = false
	constructor(private readonly config: MainConfigService) {}

	/** Отправляет только ID завершённого задания; ошибка доставки не отменяет ready и не повторяет генерацию. */
	async publishJobChanged(jobId: number): Promise<void> {
		if (this.stopped) return

		try {
			if (!this.publisher || this.publisher.status === 'end') this.publisher = this.createClient(false)
			if (this.publisher.status === 'wait') await this.publisher.connect()
			await this.publisher.publish(this.channel(), JSON.stringify({ jobId }))
		} catch {
			this.logger.warn('Image notification not delivered; recover via visual REST snapshot')
		}
	}

	/** Запускает отдельное соединение SUBSCRIBE; reconnect автоматически восстанавливает подписку. */
	subscribe(onJobChanged: (jobId: number) => void, onReady: () => void): void {
		if (this.stopped || this.subscriber) return

		const client = (this.subscriber = this.createClient(true))

		client.on('message', (channel, message) => {
			if (this.stopped || channel !== this.channel()) return
			const id = parseVisualJobNotification(message)
			if (id !== null) onJobChanged(id)
		})

		client.on('ready', () => {
			void client
				.subscribe(this.channel())
				.then(() => {
					if (!this.stopped) onReady()
				})
				.catch(() => {
					this.logger.warn('Image notification subscription unavailable')
				})
		})

		void client.connect().catch(() => this.logger.warn('Image notification connection unavailable'))
	}

	/** Закрывает оба соединения без ожидания недоступного Redis и запрещает новые подключения. */
	onModuleDestroy(): void {
		this.stopped = true
		this.publisher?.disconnect()
		this.subscriber?.disconnect()
	}

	/** Создаёт независимое соединение с ограниченным ожиданием команд и отключённой offline-очередью. */
	protected createClient(reconnect: boolean): Redis {
		const client = new Redis(this.config.get().redis.url, {
			lazyConnect: true,
			enableOfflineQueue: false,
			maxRetriesPerRequest: 1,
			connectTimeout: 5000,
			commandTimeout: 5000,
			retryStrategy: reconnect ? (attempt) => Math.min(attempt * 500, 5000) : () => null,
		})
		client.on('error', () => this.logger.warn('Image notification Redis connection error'))
		return client
	}

	/** Разделяет окружения и регионы: Redis Pub/Sub не изолируется номером Redis DB. */
	private channel(): string {
		const { mode, region } = this.config.get()
		return `ai-dialogue-visuals:${mode}:${region}`
	}
}
