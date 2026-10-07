jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { EventEmitter } from 'node:events'
import Redis from 'ioredis'
import { AiDialogueVisualNotifications, parseVisualJobNotification } from './aiDialogueVisualNotifications.service'
import { MainConfigService } from '../mainConfig/mainConfig.service'

function harness() {
	const client = Object.assign(new EventEmitter(), {
		status: 'wait',
		connect: jest.fn().mockResolvedValue(undefined),
		publish: jest.fn().mockResolvedValue(1),
		subscribe: jest.fn().mockResolvedValue(1),
		disconnect: jest.fn(),
	})
	const config = { get: () => ({ mode: 'localtest', region: 'ru', redis: { url: 'redis://unused' } }) }
	class TestNotifications extends AiDialogueVisualNotifications {
		protected createClient() {
			return client as unknown as Redis
		}
	}
	const notifications = new TestNotifications(config as unknown as MainConfigService)
	return { client, notifications }
}

describe('visual notification transport', () => {
	it.each([
		'bad json',
		'{"jobId":-1}',
		'{"jobId":1.5}',
		'{"jobId":1,"url":"secret"}',
		'{"dialogueId":1}',
		'x'.repeat(257),
	])('ignores invalid payload %s', (message) => {
		expect(parseVisualJobNotification(message)).toBeNull()
	})
	it('accepts only a safe positive job ID', () => {
		expect(parseVisualJobNotification('{"jobId":10}')).toBe(10)
		expect(parseVisualJobNotification('{"jobId":9007199254740992}')).toBeNull()
	})
	it('publishes only a DB identifier to an environment/region scoped channel', async () => {
		const { client, notifications } = harness()
		await notifications.publishJobChanged(10)
		expect(client.publish).toHaveBeenCalledWith('ai-dialogue-visuals:localtest:ru', '{"jobId":10}')
	})
	it('does not fail the worker when connection or publish fails', async () => {
		const { client, notifications } = harness()
		client.connect.mockRejectedValueOnce(new Error('offline'))
		await expect(notifications.publishJobChanged(10)).resolves.toBeUndefined()
		client.publish.mockRejectedValueOnce(new Error('timeout'))
		await expect(notifications.publishJobChanged(10)).resolves.toBeUndefined()
	})
	it('subscribes again on ready and ignores wrong-channel or malformed messages', async () => {
		const { client, notifications } = harness()
		const receive = jest.fn()
		const ready = jest.fn()
		notifications.subscribe(receive, ready)
		client.emit('ready')
		await Promise.resolve()
		client.emit('message', 'ai-dialogue-visuals:localtest:ru', '{"jobId":10}')
		client.emit('message', 'another', '{"jobId":20}')
		client.emit('message', 'ai-dialogue-visuals:localtest:ru', 'bad')
		expect(receive.mock.calls).toEqual([[10]])
		expect(ready).toHaveBeenCalledTimes(1)
		client.emit('ready')
		await Promise.resolve()
		expect(client.subscribe).toHaveBeenCalledTimes(2)
		expect(ready).toHaveBeenCalledTimes(2)
	})
	it('disconnects on shutdown and does not reconnect or deliver late events', async () => {
		const { client, notifications } = harness()
		const receive = jest.fn()
		notifications.subscribe(receive, jest.fn())
		notifications.onModuleDestroy()
		client.emit('message', 'ai-dialogue-visuals:localtest:ru', '{"jobId":10}')
		await notifications.publishJobChanged(10)
		expect(client.disconnect).toHaveBeenCalledTimes(1)
		expect(client.publish).not.toHaveBeenCalled()
		expect(receive).not.toHaveBeenCalled()
	})
})
