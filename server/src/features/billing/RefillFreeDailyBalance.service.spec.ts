jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		log() {}
		error() {}
	},
}))
jest.mock('@nestjs/schedule', () => ({ Cron: () => () => undefined }))
jest.mock('repo/user.repository', () => ({ UserRepository: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))
import { UserRepository } from 'repo/user.repository'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { RefillFreeDailyBalance } from './RefillFreeDailyBalance.service'

function createRefill(increaseBalanceOfAllUsers: jest.Mock) {
	const userRepository = { increaseBalanceOfAllUsers } as unknown as UserRepository
	const mainConfig = {
		get: () => ({ billing: { freeDailyBalanceInDollars: 0.1 } }),
	} as unknown as MainConfigService

	return new RefillFreeDailyBalance(userRepository, mainConfig)
}

describe('RefillFreeDailyBalance', () => {
	it('прибавляет дневной баланс и ограничивает итог той же суммой', async () => {
		const increaseBalanceOfAllUsers = jest.fn().mockResolvedValue(3)

		await createRefill(increaseBalanceOfAllUsers).refill()

		expect(increaseBalanceOfAllUsers).toHaveBeenCalledWith({
			amountInMicrodollars: 100_000,
			maxBalanceInMicrodollars: 100_000,
		})
	})

	it('не падает при ошибке базы: следующее начисление пройдёт по расписанию', async () => {
		const increaseBalanceOfAllUsers = jest.fn().mockRejectedValue(new Error('db is down'))

		await expect(createRefill(increaseBalanceOfAllUsers).refill()).resolves.toBeUndefined()
	})
})
