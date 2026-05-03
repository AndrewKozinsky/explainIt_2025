import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { QueueNames } from 'infrastructure/queues/queueNames'
import {
	SUBTITLES_GENERATION_JOB_NAME,
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'

/**
 * SKELETON implementation for chunk B.
 *
 * Real audio extraction (ffmpeg), ASR (Deepgram), SRT building and charge
 * logic will be plugged in during chunk C. For now the processor only walks
 * the state machine (pending -> processing -> done) so the end-to-end flow
 * (mutation -> queue -> status query) can be exercised.
 */
@Processor(QueueNames.SUBTITLES_GENERATION, { concurrency: 1 })
export class SubtitlesGenerationProcessor extends WorkerHost {
	private readonly logger = new Logger(SubtitlesGenerationProcessor.name)

	constructor(private readonly videoRepository: VideoPrivateRepository) {
		super()
	}

	async process(
		job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	): Promise<SubtitlesGenerationJobResult> {
		if (job.name !== SUBTITLES_GENERATION_JOB_NAME) {
			throw new Error(`Unexpected job name ${job.name} in ${QueueNames.SUBTITLES_GENERATION} queue`)
		}

		const { videoId, userId } = job.data
		this.logger.log(`Starting subtitles generation job ${job.id} for video ${videoId} (user ${userId})`)

		try {
			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.processing, {
				error: null,
			})

			// TODO(chunk C): probe duration via ffprobe, extract mono 16k wav via ffmpeg,
			// send to Deepgram Nova-3, build SRT, persist via UpdatePrivateVideoCommand,
			// charge user balance via a dedicated transaction.
			await new Promise((resolve) => setTimeout(resolve, 2_000))

			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.done, {
				error: null,
			})

			this.logger.log(`Finished subtitles generation job ${job.id} for video ${videoId}`)
			return { videoId, status: 'done' }
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			this.logger.error(`Subtitles generation job ${job.id} for video ${videoId} failed: ${message}`, err)

			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.failed, {
				error: message,
			})
			throw err
		}
	}
}
