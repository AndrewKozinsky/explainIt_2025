jest.mock('@nestjs/bullmq', () => ({ Processor: () => (target: unknown) => target, WorkerHost: class {} }))
jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target, Optional: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { DelayedError, Job, UnrecoverableError } from 'bullmq'
import {
	AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
	AiDialogueImageGenerationJobData,
} from 'infrastructure/queues/aiDialogueImageGeneration.types'
import { AiDialogueImageGenerationProcessor } from './AiDialogueImageGeneration.processor'
import { GenerateAiDialogueImage } from './GenerateAiDialogueImage.service'
import { AiDialogueVisualNotifications } from 'infrastructure/redis/aiDialogueVisualNotifications.service'

describe('AiDialogueImageGenerationProcessor', () => {
	function createHarness() {
		const generation = { processStep: jest.fn().mockResolvedValue({ done: false, delayMs: 2000 }) }
		const notifications = { publishJobChanged: jest.fn().mockResolvedValue(undefined) }
		const processor = new AiDialogueImageGenerationProcessor(
			generation as unknown as GenerateAiDialogueImage,
			notifications as unknown as AiDialogueVisualNotifications,
		)
		const queueJob = {
			name: AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
			data: { imageGenerationJobId: 10 },
			moveToDelayed: jest.fn(),
		}
		return {
			generation,
			notifications,
			processor,
			queueJob,
			job: queueJob as unknown as Job<AiDialogueImageGenerationJobData>,
		}
	}

	it('moves an unfinished job to delayed using its lock token', async () => {
		const { processor, notifications, queueJob, job } = createHarness()
		await expect(processor.process(job, 'lock-token')).rejects.toBeInstanceOf(DelayedError)
		expect(queueJob.moveToDelayed).toHaveBeenCalledWith(expect.any(Number), 'lock-token')
		expect(notifications.publishJobChanged).not.toHaveBeenCalled()
	})

	it('completes a finished job without delaying', async () => {
		const { processor, generation, notifications, queueJob, job } = createHarness()
		generation.processStep.mockResolvedValue({ done: true })
		await expect(processor.process(job)).resolves.toBeUndefined()
		expect(queueJob.moveToDelayed).not.toHaveBeenCalled()
		expect(notifications.publishJobChanged).toHaveBeenCalledWith(10)
	})

	it('defers database outages and propagates permanent failures', async () => {
		const { processor, generation, notifications, job } = createHarness()
		generation.processStep.mockRejectedValueOnce(new Error('DB unavailable'))
		await expect(processor.process(job, 'token')).rejects.toBeInstanceOf(DelayedError)
		generation.processStep.mockRejectedValueOnce(new UnrecoverableError('moderated'))
		await expect(processor.process(job, 'token')).rejects.toThrow('moderated')
		expect(notifications.publishJobChanged).toHaveBeenCalledTimes(1)
	})

	it('rejects malformed queue jobs before touching the database', async () => {
		const { processor, generation, queueJob, job } = createHarness()
		queueJob.data.imageGenerationJobId = -1
		await expect(processor.process(job)).rejects.toBeInstanceOf(UnrecoverableError)
		expect(generation.processStep).not.toHaveBeenCalled()
	})
})
