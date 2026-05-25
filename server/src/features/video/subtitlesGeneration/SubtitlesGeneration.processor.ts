import { mkdir, rm } from 'fs/promises'
import { join } from 'path'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { UpdatePrivateVideoCommand } from 'features/video/UpdatePrivateVideo.command'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { DeepgramSttService } from 'infrastructure/deepgramStt/deepgramStt.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { QueueNames } from 'infrastructure/queues/queueNames'
import {
	SUBTITLES_GENERATION_JOB_NAME,
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { SubtitlesGenerationStatus } from 'prisma/generated/client'
import { buildSrtFromUtterances } from './buildSrtFromUtterances'
import { downloadS3ObjectToFile } from './downloadS3File'
import { extractMonoWav16k, probeDurationSec } from './ffmpeg.utils'

/**
 * End-to-end subtitles generation pipeline executed on the worker process:
 *   1. Load DB state, move status to PROCESSING, sanity-check file presence
 *   2. Download source video from S3 into a per-job tmp dir
 *   3. Probe duration with ffprobe and reject videos longer than the configured cap
 *   4. Extract mono 16kHz WAV audio with ffmpeg
 *   5. Send audio to Deepgram Nova-3 and collect utterances
 *   6. Render an SRT and persist via UpdatePrivateVideoCommand (reuses the existing
 *      SRT parsing + subtitle/sentence/init DB wiring)
 *   7. Flip status to DONE (or FAILED + error message on any exception)
 *
 * Tmp artifacts are always cleaned up in a finally block.
 */
@Processor(QueueNames.SUBTITLES_GENERATION, { concurrency: 1 })
export class SubtitlesGenerationProcessor extends WorkerHost {
	private readonly logger = new Logger(SubtitlesGenerationProcessor.name)

	constructor(
		private readonly videoRepository: VideoPrivateRepository,
		private readonly cloudRuS3Service: CloudRuS3Service,
		private readonly deepgramSttService: DeepgramSttService,
		private readonly mainConfig: MainConfigService,
		private readonly commandBus: CommandBus,
		private readonly userBalanceTransactionRepository: UserBalanceTransactionRepository,
	) {
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

		const { tmpDir, maxVideoSeconds } = this.mainConfig.get().generateSubtitles
		const jobTmpDir = join(tmpDir, `video-${videoId}-${job.id}`)
		let videoExists = false

		try {
			const state = await this.videoRepository.getSubtitlesGenerationState(videoId)

			if (!state) throw new Error(`Video ${videoId} not found`)
			videoExists = true
			if (state.userId !== userId) throw new Error(`Ownership mismatch for video ${videoId}`)
			if (!state.isFileUploaded || !state.fileS3Key) throw new Error('Video file is not uploaded')
			if (!state.languageCode) throw new Error('Video has no language code')

			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.processing, {
				error: null,
			})

			await mkdir(jobTmpDir, { recursive: true })
			const videoPath = join(jobTmpDir, 'source.bin')
			const audioPath = join(jobTmpDir, 'audio.wav')

			this.logger.log(`Job ${job.id}: downloading S3 key ${state.fileS3Key}`)
			await downloadS3ObjectToFile(this.cloudRuS3Service, this.mainConfig, state.fileS3Key, videoPath)

			this.logger.log(`Job ${job.id}: probing duration`)
			const durationSec = await probeDurationSec(videoPath)

			if (durationSec > maxVideoSeconds) {
				throw new Error(
					`Video duration ${Math.round(durationSec)}s exceeds the ${maxVideoSeconds}s limit for subtitles generation`,
				)
			}

			this.logger.log(`Job ${job.id}: extracting audio (duration=${durationSec.toFixed(1)}s)`)
			await extractMonoWav16k(videoPath, audioPath)

			this.logger.log(`Job ${job.id}: sending audio to Deepgram`)
			const { utterances, durationSec: deepgramDuration } = await this.deepgramSttService.transcribeFile({
				audioPath,
				languageCode: state.languageCode,
				contentType: 'audio/wav',
			})

			if (utterances.length === 0) {
				throw new Error('Deepgram returned no transcribed content')
			}

			const srt = buildSrtFromUtterances(utterances)
			this.logger.log(`Job ${job.id}: built SRT with ${utterances.length} cue(s), persisting…`)

			await this.commandBus.execute(
				new UpdatePrivateVideoCommand(userId, {
					id: videoId,
					originalContent: srt,
				}),
			)

			this.logger.log(`Job ${job.id}: Deepgram processed ${deepgramDuration || durationSec}s of audio`)

			await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.done, {
				error: null,
			})

			this.logger.log(`Finished subtitles generation job ${job.id} for video ${videoId}`)
			return { videoId, status: 'done' }
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			this.logger.error(`Subtitles generation job ${job.id} for video ${videoId} failed: ${message}`, err)

			if (videoExists) {
				const state = await this.videoRepository.getSubtitlesGenerationState(videoId)
				const attempts = job.opts.attempts ?? 1
				const isLastAttempt = job.attemptsMade + 1 >= attempts

				if (
					isLastAttempt &&
					state?.chargeKopecks &&
					(await this.videoRepository.tryMarkSubtitlesGenerationRefunded(videoId))
				) {
					await this.userBalanceTransactionRepository.createRefund({
						userId,
						amountInKopecks: state.chargeKopecks,
					})
				}

				await this.videoRepository.setSubtitlesGenerationStatus(videoId, SubtitlesGenerationStatus.failed, {
					error: message,
				})
			}
			throw err
		} finally {
			await rm(jobTmpDir, { recursive: true, force: true }).catch((cleanupErr) => {
				this.logger.warn(`Failed to cleanup tmp dir ${jobTmpDir}: ${cleanupErr?.message ?? cleanupErr}`)
			})
		}
	}
}
