import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { UserRepository } from 'repo/user.repository'
import {
	UserBalanceNotification,
	UserBalanceNotifications,
} from 'infrastructure/redis/userBalanceNotifications.service'
import { UserEventsSseHub } from './UserEventsSseHub.service'

/**
 * Передаёт изменения баланса из Redis в открытые SSE-потоки пользователей этого HTTP-процесса.
 * Списание присылает новый баланс одного пользователя. Ежедневное начисление и переподключение к Redis
 * (уведомления за время разрыва потеряны) заставляют перечитать баланс всех подключённых пользователей.
 */
@Injectable()
export class UserBalanceEvents implements OnModuleInit {
	private readonly logger = new Logger(UserBalanceEvents.name)

	constructor(
		private readonly notifications: UserBalanceNotifications,
		private readonly userRepository: UserRepository,
		private readonly hub: UserEventsSseHub,
	) {}

	onModuleInit(): void {
		this.notifications.subscribe(
			(notification) => this.handleNotification(notification),
			() => void this.sendBalancesOfConnectedUsers(),
		)
	}

	handleNotification(notification: UserBalanceNotification): void {
		if (notification.type === 'userBalanceChanged') {
			this.hub.publish(notification.userId, { type: 'balance', balance: notification.balance })
			return
		}

		void this.sendBalancesOfConnectedUsers()
	}

	/** Читает балансы подключённых пользователей одним запросом и отправляет каждому его баланс. */
	async sendBalancesOfConnectedUsers(): Promise<void> {
		const userIds = this.hub.getConnectedUserIds()
		if (!userIds.length) return

		try {
			const balances = await this.userRepository.getBalancesOfUsers(userIds)

			for (const { userId, balance } of balances) {
				this.hub.publish(userId, { type: 'balance', balance })
			}
		} catch (error) {
			// Клиент получит актуальный баланс при следующем изменении или переподключении.
			this.logger.warn('Failed to read balances of connected users', error)
		}
	}
}
