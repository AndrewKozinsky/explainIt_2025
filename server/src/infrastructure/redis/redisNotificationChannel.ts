import { Logger, OnModuleDestroy } from '@nestjs/common'
import Redis from 'ioredis'
import { MainConfigService } from '../mainConfig/mainConfig.service'

/**
 * Канал Redis Pub/Sub для маленьких уведомлений между процессами (worker → HTTP, HTTP → HTTP).
 *
 * Доставка не гарантирована: уведомление только сигнализирует, а актуальное состояние получатель
 * читает из БД. Поэтому подписчик получает onReady после каждого (пере)подключения, чтобы
 * восстановить пропущенное, а ошибка публикации не ломает вызывающий код.
 *
 * Наследник задаёт имя канала, проверку входящего сообщения и подписи для логов.
 */
export abstract class RedisNotificationChannel<TNotification> implements OnModuleDestroy {
	protected abstract readonly logger: Logger
	/** Префикс канала; к нему добавляются MODE и регион. */
	protected abstract readonly channelPrefix: string
	/** Подпись уведомления в логах: «Image notification», «Balance notification». */
	protected abstract readonly logLabel: string

	private publisher?: Redis
	private subscriber?: Redis
	private stopped = false

	constructor(protected readonly config: MainConfigService) {}

	/** Закрывает оба соединения без ожидания недоступного Redis и запрещает новые подключения. */
	onModuleDestroy(): void {
		this.stopped = true
		this.publisher?.disconnect()
		this.subscriber?.disconnect()
	}

	/**
	 * Проверяет входящее сообщение.
	 * @returns null для неподдерживаемых и повреждённых сообщений — они игнорируются.
	 */
	protected abstract parseNotification(message: string): null | TNotification

	/** Публикует уведомление; ошибка доставки пишется в лог и не пробрасывается. */
	protected async publishNotification(notification: TNotification): Promise<void> {
		if (this.stopped) return

		try {
			if (!this.publisher || this.publisher.status === 'end') this.publisher = this.createClient(false)
			if (this.publisher.status === 'wait') await this.publisher.connect()
			await this.publisher.publish(this.channel(), JSON.stringify(notification))
		} catch {
			this.logger.warn(`${this.logLabel} not delivered; receivers recover from the database`)
		}
	}

	/** Запускает отдельное соединение SUBSCRIBE; reconnect автоматически восстанавливает подписку. */
	protected subscribeToNotifications(
		onNotification: (notification: TNotification) => void,
		onReady: () => void,
	): void {
		if (this.stopped || this.subscriber) return

		const client = (this.subscriber = this.createClient(true))

		client.on('message', (channel, message) => {
			if (this.stopped || channel !== this.channel()) return

			const notification = this.parseNotification(message)
			if (notification !== null) onNotification(notification)
		})

		client.on('ready', () => {
			void client
				.subscribe(this.channel())
				.then(() => {
					if (!this.stopped) onReady()
				})
				.catch(() => {
					this.logger.warn(`${this.logLabel} subscription unavailable`)
				})
		})

		void client.connect().catch(() => this.logger.warn(`${this.logLabel} connection unavailable`))
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
		client.on('error', () => this.logger.warn(`${this.logLabel} Redis connection error`))

		return client
	}

	/** Разделяет окружения и регионы: Redis Pub/Sub не изолируется номером Redis DB. */
	private channel(): string {
		const { mode, region } = this.config.get()

		return `${this.channelPrefix}:${mode}:${region}`
	}
}
