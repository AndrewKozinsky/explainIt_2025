import { Injectable, Logger } from '@nestjs/common'
import { z } from 'zod'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { RedisNotificationChannel } from './redisNotificationChannel'

const notificationSchema = z.discriminatedUnion('type', [
	/** Баланс одного пользователя изменился: списание за запрос к ИИ. */
	z
		.object({
			type: z.literal('userBalanceChanged'),
			userId: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
			balance: z.number().int().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER),
		})
		.strict(),
	/** Баланс всех пользователей изменился одним запросом: ежедневное начисление. */
	z.object({ type: z.literal('allBalancesChanged') }).strict(),
])

/** Уведомление об изменении баланса; баланс в микродолларах. */
export type UserBalanceNotification = z.infer<typeof notificationSchema>

/** Проверяет уведомление Redis; неподдерживаемые и повреждённые сообщения игнорируются. */
export function parseUserBalanceNotification(message: string): null | UserBalanceNotification {
	if (message.length > 256) return null

	try {
		const parsed = notificationSchema.safeParse(JSON.parse(message))
		return parsed.success ? parsed.data : null
	} catch {
		return null
	}
}

/**
 * Уведомления об изменении баланса пользователей.
 * Публикуют HTTP-процесс и worker (списания, начисление), слушает HTTP-процесс с открытыми SSE пользователей.
 */
@Injectable()
export class UserBalanceNotifications extends RedisNotificationChannel<UserBalanceNotification> {
	protected readonly logger = new Logger(UserBalanceNotifications.name)
	protected readonly channelPrefix = 'user-balance'
	protected readonly logLabel = 'Balance notification'

	// Явный конструктор: Nest берёт типы зависимостей из метаданных самого класса.
	constructor(config: MainConfigService) {
		super(config)
	}

	/** Сообщает новый баланс пользователя после списания. */
	async publishUserBalanceChanged(userId: number, balance: number): Promise<void> {
		await this.publishNotification({ type: 'userBalanceChanged', userId, balance })
	}

	/** Сообщает, что баланс всех пользователей изменился: получатели перечитывают его из БД. */
	async publishAllBalancesChanged(): Promise<void> {
		await this.publishNotification({ type: 'allBalancesChanged' })
	}

	/** Подписывает HTTP-процесс; onReady вызывается после каждого (пере)подключения. */
	subscribe(onNotification: (notification: UserBalanceNotification) => void, onReady: () => void): void {
		this.subscribeToNotifications(onNotification, onReady)
	}

	protected parseNotification(message: string): null | UserBalanceNotification {
		return parseUserBalanceNotification(message)
	}
}
