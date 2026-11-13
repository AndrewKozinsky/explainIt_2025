import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { UserRepository } from 'repo/user.repository'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { getFreeDailyBalanceInMicrodollars } from './freeDailyBalance'

/**
 * Каждый день в 00:00 UTC восстанавливает бесплатный баланс пользователей.
 * Платных тарифов пока нет, поэтому начисление одно для всех.
 * К балансу прибавляется дневная сумма, но баланс не становится больше неё:
 * минус учитывается (−2 ¢ + 10 ¢ = 8 ¢), а неизрасходованный остаток не копится (5 ¢ + 10 ¢ = 10 ¢).
 * Работает только в HTTP-приложении (AppModule): в worker расписания нет, иначе начисление шло бы дважды.
 */
@Injectable()
export class RefillFreeDailyBalance {
	private readonly logger = new Logger(RefillFreeDailyBalance.name)

	constructor(
		private userRepository: UserRepository,
		private mainConfig: MainConfigService,
	) {}

	@Cron('0 0 * * *', { name: 'refillFreeDailyBalance', timeZone: 'UTC' })
	async refill(): Promise<void> {
		const freeDailyBalanceInMicrodollars = getFreeDailyBalanceInMicrodollars(this.mainConfig)

		try {
			const updatedUsersCount = await this.userRepository.increaseBalanceOfAllUsers({
				amountInMicrodollars: freeDailyBalanceInMicrodollars,
				maxBalanceInMicrodollars: freeDailyBalanceInMicrodollars,
			})

			this.logger.log(`Free daily balance refilled for ${updatedUsersCount} user(s)`)
		} catch (error) {
			// Ошибка не роняет сервер: следующее начисление пройдёт по расписанию.
			this.logger.error('Free daily balance refill failed', error)
		}
	}
}
