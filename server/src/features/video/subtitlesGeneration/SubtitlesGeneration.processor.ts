import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { VideoRepository } from 'repo/video/video.repository'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { DeepgramSttService } from 'infrastructure/deepgramStt/deepgramStt.service'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { QueueNames } from 'infrastructure/queues/queueNames'
import {
	SUBTITLES_GENERATION_JOB_NAME,
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { processUserUploadedVideo } from './strategies/s3-subtitles.strategy'
import { processYoutubeVideo } from './strategies/youtube-subtitles.strategy'

/**
 * End-to-end subtitles generation pipeline executed on the worker process.
 *
 * Dispatches to one of two strategies based on `job.data.source`:
 *   A. YouTube videos  → {@link processYoutubeVideo}
 *   B. User-uploaded   → {@link processUserUploadedVideo}
 */
@Processor(QueueNames.SUBTITLES_GENERATION, { concurrency: 1 })
export class SubtitlesGenerationProcessor extends WorkerHost {
	private readonly logger = new Logger(SubtitlesGenerationProcessor.name)

	constructor(
		private readonly videoRepository: VideoRepository,
		private readonly cloudRuS3Service: CloudRuS3Service,
		private readonly deepgramSttService: DeepgramSttService,
		private readonly llmAdapter: LlmAdapterService,
		private readonly youtubeService: YoutubeService,
		private readonly mainConfig: MainConfigService,
		private readonly commandBus: CommandBus,
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
			return processYoutubeVideo(job, {
				videoRepository: this.videoRepository,
				youtubeService: this.youtubeService,
				deepgramSttService: this.deepgramSttService,
				llmAdapter: this.llmAdapter,
				mainConfig: this.mainConfig,
				commandBus: this.commandBus,
				logger: this.logger,
			})
		}

		return processUserUploadedVideo(job, {
			videoRepository: this.videoRepository,
			cloudRuS3Service: this.cloudRuS3Service,
			deepgramSttService: this.deepgramSttService,
			mainConfig: this.mainConfig,
			commandBus: this.commandBus,
			logger: this.logger,
		})
	}
}
