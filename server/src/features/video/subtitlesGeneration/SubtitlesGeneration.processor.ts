import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { QueueNames } from 'infrastructure/queues/queueNames'
import {
	SUBTITLES_GENERATION_JOB_NAME,
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { S3SubtitlesStrategy } from './strategies/S3SubtitlesStrategy'
import { YoutubeSubtitlesStrategy } from './strategies/YoutubeSubtitlesStrategy'

/**
 * End-to-end subtitles generation pipeline executed on the worker process.
 *
 * Routes to the appropriate strategy based on `job.data.source`:
 *   A. YouTube videos  → {@link YoutubeSubtitlesStrategy}
 *   B. User-uploaded   → {@link S3SubtitlesStrategy}
 */
@Processor(QueueNames.SUBTITLES_GENERATION, { concurrency: 1 })
export class SubtitlesGenerationProcessor extends WorkerHost {
	private readonly logger = new Logger(SubtitlesGenerationProcessor.name)

	constructor(
		private readonly s3Strategy: S3SubtitlesStrategy,
		private readonly youtubeStrategy: YoutubeSubtitlesStrategy,
	) {
		super()
	}

	async process(
		job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	): Promise<SubtitlesGenerationJobResult> {
		if (job.name !== SUBTITLES_GENERATION_JOB_NAME) {
			throw new Error(`Unexpected job name ${job.name} in ${QueueNames.SUBTITLES_GENERATION} queue`)
		}

		const { videoId, source } = job.data
		this.logger.log(`Starting subtitles job ${job.id} for video ${videoId} (source=${source})`)

		if (source === 'youTube') {
			return this.youtubeStrategy.process(job)
		}

		return this.s3Strategy.process(job)
	}
}
