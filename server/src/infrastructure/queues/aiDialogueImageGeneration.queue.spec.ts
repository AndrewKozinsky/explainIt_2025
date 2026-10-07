jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/bullmq', () => ({ InjectQueue: () => () => undefined }))

import { Queue } from 'bullmq'
import { AiDialogueImageGenerationQueue } from './aiDialogueImageGeneration.queue'
import {
	AiDialogueImageGenerationJobData,
	AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
} from './aiDialogueImageGeneration.types'

describe('AiDialogueImageGenerationQueue', () => {
	it('uses a stable ID and retains completed and failed jobs for delivery deduplication', async () => {
		const storedIds = new Set<string>()
		const add = jest.fn(async (_name, _data, options) => {
			storedIds.add(options.jobId)
		})
		const producer = new AiDialogueImageGenerationQueue({
			add,
			waitUntilReady: jest.fn().mockResolvedValue(undefined),
		} as unknown as Queue<AiDialogueImageGenerationJobData>)
		await producer.enqueue(42)
		await producer.enqueue(42)
		expect(storedIds.size).toBe(1)
		expect(add).toHaveBeenCalledWith(
			AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
			{ imageGenerationJobId: 42 },
			{
				jobId: 'ai-dialogue-image-42',
				removeOnComplete: false,
				removeOnFail: false,
			},
		)
	})

	it('propagates an enqueue failure so the outbox remains pending', async () => {
		const add = jest.fn().mockRejectedValue(new Error('Redis unavailable'))
		const producer = new AiDialogueImageGenerationQueue({
			add,
			waitUntilReady: jest.fn().mockResolvedValue(undefined),
		} as unknown as Queue<AiDialogueImageGenerationJobData>)
		await expect(producer.enqueue(42)).rejects.toThrow('Redis unavailable')
	})

	it('bounds initial connection waiting and does not enqueue after timeout', async () => {
		jest.useFakeTimers()
		try {
			const add = jest.fn()
			let finishReady!: () => void
			const waitUntilReady = jest.fn(
				() =>
					new Promise<void>((resolve) => {
						finishReady = resolve
					}),
			)
			const producer = new AiDialogueImageGenerationQueue({
				add,
				waitUntilReady,
			} as unknown as Queue<AiDialogueImageGenerationJobData>)
			const outcome = expect(producer.enqueue(42)).rejects.toThrow('readiness timed out')
			await jest.advanceTimersByTimeAsync(10_000)
			await outcome
			finishReady()
			await Promise.resolve()
			expect(add).not.toHaveBeenCalled()
			expect(jest.getTimerCount()).toBe(0)
		} finally {
			jest.useRealTimers()
		}
	})
})
