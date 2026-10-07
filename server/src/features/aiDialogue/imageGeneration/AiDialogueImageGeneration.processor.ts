import { Processor, WorkerHost } from '@nestjs/bullmq'
import { DelayedError, Job, UnrecoverableError } from 'bullmq'
import {
	AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
	AiDialogueImageGenerationJobData,
} from 'infrastructure/queues/aiDialogueImageGeneration.types'
import { QueueNames } from 'infrastructure/queues/queueNames'
import { GenerateAiDialogueImage } from './GenerateAiDialogueImage.service'
import { AiDialogueVisualNotifications } from 'infrastructure/redis/aiDialogueVisualNotifications.service'

@Processor(QueueNames.AI_DIALOGUE_IMAGE_GENERATION, { concurrency: 1 })
export class AiDialogueImageGenerationProcessor extends WorkerHost {
	constructor(
		private readonly generation: GenerateAiDialogueImage,
		private readonly notifications: AiDialogueVisualNotifications,
	) {
		super()
	}

	/**
	 * Проверяет задание BullMQ и выполняет один шаг генерации по идентификатору записи БД.
	 * Ожидание и временные сбои откладывают то же задание, освобождая слот worker.
	 * После завершения или окончательной ошибки отправляет best-effort уведомление HTTP-процессам через Redis.
	 * @param job Задание очереди с imageGenerationJobId, без промптов и байтов изображений.
	 * @param token Токен блокировки BullMQ для безопасного moveToDelayed.
	 * @throws DelayedError после переноса в delayed; BullMQ не считает его ошибкой обработки.
	 * @throws UnrecoverableError при неверном задании или окончательном отказе генерации.
	 */
	async process(job: Job<AiDialogueImageGenerationJobData>, token?: string): Promise<void> {
		const id = job.data.imageGenerationJobId

		if (job.name !== AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME || !Number.isSafeInteger(id) || id <= 0) {
			throw new UnrecoverableError('Invalid image generation queue job')
		}

		let result
		try {
			result = await this.generation.processStep(id)
		} catch (error) {
			if (error instanceof UnrecoverableError) {
				await this.notifications.publishJobChanged(id)
				throw error
			}
			// DB outages must not permanently consume a queue job that has only an ID.
			result = { done: false, delayMs: 30_000 }
		}

		if (result.done) {
			await this.notifications.publishJobChanged(id)
			return
		}

		await job.moveToDelayed(Date.now() + result.delayMs, token)

		throw new DelayedError()
	}
}
