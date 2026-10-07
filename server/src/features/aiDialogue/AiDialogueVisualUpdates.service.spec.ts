jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { AiDialogueVisualUpdates } from './AiDialogueVisualUpdates.service'
import { AiDialogueSseHub } from './AiDialogueSseHub.service'
import { AiDialogueVisualNotifications } from 'infrastructure/redis/aiDialogueVisualNotifications.service'
import { AiDialogueVisualsRepository } from 'repo/aiDialogue/aiDialogueVisuals.repository'

describe('visual updates bridge', () => {
	function harness() {
		const notifications = { subscribe: jest.fn() }
		const repository = { getCompletedJobDialogueId: jest.fn().mockResolvedValue(1) }
		const hub = new AiDialogueSseHub()
		const service = new AiDialogueVisualUpdates(
			notifications as unknown as AiDialogueVisualNotifications,
			repository as unknown as AiDialogueVisualsRepository,
			hub,
		)
		return { notifications, repository, hub, service }
	}
	it('routes the hint using the current DB owner, without files or job internals', async () => {
		const { service, hub } = harness()
		const owner = jest.fn()
		const other = jest.fn()
		const a = hub.getDialogueEventSubject(1).subscribe(owner)
		const b = hub.getDialogueEventSubject(2).subscribe(other)
		await service.notifyCompletedJob(10)
		expect(owner).toHaveBeenCalledWith({ data: { type: 'visualsChanged', dialogueId: 1 } })
		expect(other).not.toHaveBeenCalled()
		a.unsubscribe()
		b.unsubscribe()
	})
	it('ignores deleted or unfinished jobs and tolerates DB outages', async () => {
		const { service, repository, hub } = harness()
		const receive = jest.fn()
		const subscription = hub.getDialogueEventSubject(1).subscribe(receive)
		repository.getCompletedJobDialogueId.mockResolvedValueOnce(null)
		await service.notifyCompletedJob(10)
		repository.getCompletedJobDialogueId.mockRejectedValueOnce(new Error('DB offline'))
		await expect(service.notifyCompletedJob(10)).resolves.toBeUndefined()
		expect(receive).not.toHaveBeenCalled()
		subscription.unsubscribe()
	})
	it('invalidates active SSE streams after a Redis subscription is restored', () => {
		const { service, notifications, hub } = harness()
		const receive = jest.fn()
		const subscription = hub.getDialogueEventSubject(1).subscribe(receive)
		service.onModuleInit()
		notifications.subscribe.mock.calls[0][1]()
		expect(receive).toHaveBeenCalledWith({ data: { type: 'visualsChanged', dialogueId: 1 } })
		subscription.unsubscribe()
	})
})
