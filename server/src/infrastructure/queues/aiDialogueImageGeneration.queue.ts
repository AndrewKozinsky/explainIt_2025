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

	async enqueue(imageGenerationJobId: number): Promise<void> {
		await this.waitForQueue()
		await this.queue.add(
			AI_DIALOGUE_IMAGE_GENERATION_JOB_NAME,
			{ imageGenerationJobId },
			{
				jobId: `ai-dialogue-image-${imageGenerationJobId}`,
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
