import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { QueueNames } from './queueNames'

@Injectable()
export class AiDialogueAudioGenerationQueue {
	constructor(
		@InjectQueue(QueueNames.AI_DIALOGUE_AUDIO_GENERATION) private readonly queue: Queue<{ audioJobId: number }>,
	) {}

	async enqueue(audioJobId: number) {
		await this.queue.add(
			'generate-audio',
			{ audioJobId },
			{
				jobId: `ai-dialogue-audio-${audioJobId}`,
				removeOnComplete: false,
				removeOnFail: false,
			},
		)
	}
}
