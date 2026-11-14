import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import {
	AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
	AiDialogueImageGenerationJobData,
} from './aiDialogueImageGeneration.types'
import { QueueNames } from './queueNames'

@Injectable()
export class AiDialogueImageGenerationQueue {
	constructor(
		@InjectQueue(QueueNames.AI_DIALOGUE_IMAGE_GENERATION)
		private readonly queue: Queue<AiDialogueImageGenerationJobData>,
	) {}

	/**
	 * Ставит задание генерации в очередь. Повторная постановка того же задания ничего не делает.
	 * Время создания в идентификаторе нужно потому, что BullMQ молча пропускает задание с уже занятым ID:
	 * после сброса базы id записей начинаются заново, а старые задания остаются в Redis.
	 */
	async enqueue(imageGenerationJob: { id: number; createdAt: Date }): Promise<void> {
		await this.waitForQueue()
		await this.queue.add(
			AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
			{ imageGenerationJobId: imageGenerationJob.id },
			{
				jobId: `ai-dialogue-image-${imageGenerationJob.id}-${imageGenerationJob.createdAt.getTime()}`,
				// Retain the ID even if processing finishes before the outbox acknowledgement.
				removeOnComplete: false,
				removeOnFail: false,
			},
		)
	}

	private async waitForQueue(): Promise<void> {
		let timer: ReturnType<typeof setTimeout> | undefined
		try {
			await Promise.race([
				this.queue.waitUntilReady(),
				new Promise<never>((_resolve, reject) => {
					timer = setTimeout(() => reject(new Error('Image generation queue readiness timed out')), 10_000)
				}),
			])
		} finally {
			clearTimeout(timer)
		}
	}
}
