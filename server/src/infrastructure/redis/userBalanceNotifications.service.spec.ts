jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { EventEmitter } from 'node:events'
import Redis from 'ioredis'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { parseUserBalanceNotification, UserBalanceNotifications } from './userBalanceNotifications.service'

function createNotificationsWithFakeRedis() {
	const redisClient = Object.assign(new EventEmitter(), {
		status: 'wait',
		connect: jest.fn().mockResolvedValue(undefined),
		publish: jest.fn().mockResolvedValue(1),
		subscribe: jest.fn().mockResolvedValue(1),
		disconnect: jest.fn(),
	})
	const config = { get: () => ({ mode: 'localtest', region: 'ru', redis: { url: 'redis://unused' } }) }

	class TestNotifications extends UserBalanceNotifications {
		protected createClient() {
			return redisClient as unknown as Redis
		}
	}

	return { redisClient, notifications: new TestNotifications(config as unknown as MainConfigService) }
}

describe('UserBalanceNotifications', () => {
	it.each([
		'bad json',
		'{"type":"userBalanceChanged","userId":0,"balance":10}',
		'{"type":"userBalanceChanged","userId":1,"balance":1.5}',
		'{"type":"userBalanceChanged","userId":1}',
		'{"type":"userBalanceChanged","userId":1,"balance":10,"email":"secret"}',
		'{"type":"allBalancesChanged","userId":1}',
		'{"type":"unknown"}',
		'x'.repeat(257),
	])('игнорирует некорректное уведомление %s', (message) => {
		expect(parseUserBalanceNotification(message)).toBeNull()
	})

	it('принимает отрицательный баланс и сигнал начисления', () => {
		expect(parseUserBalanceNotification('{"type":"userBalanceChanged","userId":7,"balance":-250}')).toEqual({
			type: 'userBalanceChanged',
			userId: 7,
			balance: -250,
		})
		expect(parseUserBalanceNotification('{"type":"allBalancesChanged"}')).toEqual({ type: 'allBalancesChanged' })
	})

	it('публикует в канал, разделённый по MODE и региону', async () => {
		const { redisClient, notifications } = createNotificationsWithFakeRedis()

		await notifications.publishUserBalanceChanged(7, 500)
		await notifications.publishAllBalancesChanged()

		expect(redisClient.publish.mock.calls).toEqual([
			['user-balance:localtest:ru', '{"type":"userBalanceChanged","userId":7,"balance":500}'],
			['user-balance:localtest:ru', '{"type":"allBalancesChanged"}'],
		])
	})

	it('не бросает ошибку, если Redis недоступен', async () => {
		const { redisClient, notifications } = createNotificationsWithFakeRedis()
		redisClient.publish.mockRejectedValueOnce(new Error('timeout'))

		await expect(notifications.publishUserBalanceChanged(7, 500)).resolves.toBeUndefined()
	})

	it('передаёт подписчику только корректные уведомления своего канала', async () => {
		const { redisClient, notifications } = createNotificationsWithFakeRedis()
		const receiveNotification = jest.fn()
		const onReady = jest.fn()

		notifications.subscribe(receiveNotification, onReady)
		redisClient.emit('ready')
		await Promise.resolve()
		redisClient.emit('message', 'user-balance:localtest:ru', '{"type":"allBalancesChanged"}')
		redisClient.emit('message', 'ai-dialogue-visuals:localtest:ru', '{"type":"allBalancesChanged"}')
		redisClient.emit('message', 'user-balance:localtest:ru', 'bad')

		expect(receiveNotification.mock.calls).toEqual([[{ type: 'allBalancesChanged' }]])
		expect(onReady).toHaveBeenCalledTimes(1)
	})
})
