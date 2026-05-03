import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { QueueNames } from './queueNames'
import {
	SUBTITLES_GENERATION_JOB_NAME,
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from './subtitlesGeneration.types'

@Injectable()
export class SubtitlesGenerationQueue {
	constructor(
		@InjectQueue(QueueNames.SUBTITLES_GENERATION)
		private readonly queue: Queue<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	) {}

	/**
	 * Enqueue a subtitles generation job for the given private video.
	 * A per-video jobId (with a timestamp suffix to allow manual retries after FAILED status)
	 * prevents duplicate queuing for the same concurrent request.
	 */
	async enqueue(data: SubtitlesGenerationJobData): Promise<string> {
		const jobId = `video-private-${data.videoId}-${Date.now()}`
		await this.queue.add(SUBTITLES_GENERATION_JOB_NAME, data, { jobId })

		return jobId
	}
}
