jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		error = jest.fn()
	},
}))
jest.mock('@nestjs/schedule', () => ({ Interval: () => () => undefined }))
jest.mock('@nestjs/bullmq', () => ({ InjectQueue: () => () => undefined }))

import { PublishImageGenerationOutbox } from './PublishImageGenerationOutbox.service'
import { ImageGenerationOutboxRepository } from 'repo/aiDialogue/imageGenerationOutbox.repository'
import { AiDialogueImageGenerationQueue } from 'infrastructure/queues/aiDialogueImageGeneration.queue'

function createHarness() {
	const repository = {
		getPendingBatch: jest.fn().mockResolvedValue([
			{ id: 1, job_id: 10 },
			{ id: 2, job_id: 20 },
		]),
		beginAttempt: jest.fn().mockResolvedValue(true),
		markPublished: jest.fn().mockResolvedValue(undefined),
		recordError: jest.fn().mockResolvedValue(undefined),
	}
	const queue = { enqueue: jest.fn().mockResolvedValue(undefined) }
	const publisher = new PublishImageGenerationOutbox(
		repository as unknown as ImageGenerationOutboxRepository,
		queue as unknown as AiDialogueImageGenerationQueue,
	)
	return { repository, queue, publisher }
}

describe('PublishImageGenerationOutbox', () => {
	it('publishes a bounded batch and acknowledges only after queue.add succeeds', async () => {
		const { repository, queue, publisher } = createHarness()
		await publisher.publishPending()
		expect(repository.getPendingBatch).toHaveBeenCalledWith(expect.any(Date), 25)
		expect(queue.enqueue.mock.calls).toEqual([[10], [20]])
		expect(repository.markPublished.mock.calls).toEqual([[1], [2]])
		expect(repository.beginAttempt.mock.invocationCallOrder[0]).toBeLessThan(
			queue.enqueue.mock.invocationCallOrder[0],
		)
		expect(queue.enqueue.mock.invocationCallOrder[0]).toBeLessThan(
			repository.markPublished.mock.invocationCallOrder[0],
		)
	})

	it('keeps a failed delivery pending and continues the batch', async () => {
		const { repository, queue, publisher } = createHarness()
		queue.enqueue.mockRejectedValueOnce(new Error('Redis unavailable'))
		await publisher.publishPending()
		expect(repository.markPublished.mock.calls).toEqual([[2]])
		expect(repository.recordError).toHaveBeenCalledWith(1, 'Redis unavailable')
		expect(queue.enqueue).toHaveBeenCalledTimes(2)
	})

	it('redelivers the same DB job after acknowledgement fails', async () => {
		const { repository, queue, publisher } = createHarness()
		repository.getPendingBatch.mockResolvedValue([{ id: 1, job_id: 10 }])
		repository.markPublished.mockRejectedValueOnce(new Error('DB unavailable'))
		await publisher.publishPending()
		await publisher.publishPending()
		expect(queue.enqueue.mock.calls).toEqual([[10], [10]])
		expect(repository.recordError).toHaveBeenCalledWith(1, 'DB unavailable')
	})

	it('skips rows deleted or claimed by another publisher', async () => {
		const { repository, queue, publisher } = createHarness()
		repository.beginAttempt.mockResolvedValueOnce(false)
		await publisher.publishPending()
		expect(queue.enqueue.mock.calls).toEqual([[20]])
		expect(repository.markPublished.mock.calls).toEqual([[2]])
	})

	it('does not overlap scans and releases its guard after a database failure', async () => {
		const { repository, publisher } = createHarness()
		let rejectScan!: (reason: Error) => void
		repository.getPendingBatch.mockImplementationOnce(
			() =>
				new Promise((_resolve, reject) => {
					rejectScan = reject
				}),
		)
		const first = publisher.publishPending()
		await publisher.publishPending()
		expect(repository.getPendingBatch).toHaveBeenCalledTimes(1)
		rejectScan(new Error('DB unavailable'))
		await first
		await publisher.publishPending()
		expect(repository.getPendingBatch).toHaveBeenCalledTimes(2)
	})

	it('continues when recording an error also fails', async () => {
		const { repository, queue, publisher } = createHarness()
		queue.enqueue.mockRejectedValueOnce(new Error('Redis unavailable'))
		repository.recordError.mockRejectedValueOnce(new Error('DB unavailable'))
		await expect(publisher.publishPending()).resolves.toBeUndefined()
		expect(repository.markPublished.mock.calls).toEqual([[2]])
	})

	it('does nothing for an empty batch', async () => {
		const { repository, queue, publisher } = createHarness()
		repository.getPendingBatch.mockResolvedValue([])
		await publisher.publishPending()
		expect(queue.enqueue).not.toHaveBeenCalled()
	})
})
