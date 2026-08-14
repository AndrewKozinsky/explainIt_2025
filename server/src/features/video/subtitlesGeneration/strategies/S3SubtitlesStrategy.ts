import { mkdir, rm } from 'fs/promises'
import { join } from 'path'
import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { VideoRepository } from 'repo/video/video.repository'
import { UpdateVideoCommand } from 'features/video/UpdateVideo.command'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { DeepgramSttService } from 'infrastructure/deepgramStt/deepgramStt.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import {
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'
import { SubtitlesStatus } from 'prisma/generated/client'
import { downloadS3ObjectToFile } from '../downloadS3File'
import { extractMonoWav16k, probeDurationSec } from '../shared/ffmpeg.utils'
import { classifyError } from '../utils/classifyError'

/**
 * User-uploaded S3 video subtitles generation flow:
 *   Download video from S3 → probe duration → extract mono 16 kHz WAV → Deepgram → SRT → persist.
 *
 * Tmp artifacts are always cleaned up in a finally block.
 */
@Injectable()
export class S3SubtitlesStrategy {
	private readonly logger = new Logger(S3SubtitlesStrategy.name)

	constructor(
		private readonly videoRepository: VideoRepository,
		private readonly cloudflareS3Service: CloudflareS3Service,
		private readonly deepgramSttService: DeepgramSttService,
		private readonly subtitlesService: SubtitlesService,
		private readonly mainConfig: MainConfigService,
		private readonly commandBus: CommandBus,
	) {}

	async process(
		job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	): Promise<SubtitlesGenerationJobResult> {
		const { videoId, userId } = job.data

		this.logger.log(
			`Starting user-uploaded subtitles generation job ${job.id} for video ${videoId} (user ${userId})`,
		)

		const { tmpDir, maxVideoSeconds } = this.mainConfig.get().generateSubtitles
		const jobTmpDir = join(tmpDir, `video-${videoId}-${job.id}`)
		let videoExists = false

		try {
			const state = await this.videoRepository.getSubtitlesState(videoId)

			if (!state) throw new Error(`Video ${videoId} not found`)
			videoExists = true

			if (state.userId !== userId) throw new Error(`Ownership mismatch for video ${videoId}`)
			if (!state.isFileUploaded || !state.fileS3Key) throw new Error('Video file is not uploaded')
			if (!state.languageCode) throw new Error('Video has no language code')

			await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.processing, {
				errorCode: null,
			})

			await mkdir(jobTmpDir, { recursive: true })
			const videoPath = join(jobTmpDir, 'source.bin')
			const audioPath = join(jobTmpDir, 'audio.wav')

			this.logger.log(`Job ${job.id}: downloading S3 key ${state.fileS3Key}`)

			await downloadS3ObjectToFile(this.cloudflareS3Service, this.mainConfig, state.fileS3Key, videoPath)

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
			const result = await this.deepgramSttService.transcribe({
				audioUrlOrStream: audioPath,
				languageCode: state.languageCode,
				contentType: 'audio/wav',
			})

			if (result.utterances.length === 0) {
				throw new Error(
					'Deepgram returned no transcribed content ' +
						`(duration=${result.durationSec}s, language=${state.languageCode}). ` +
						'Audio may be silent, in a different language, or corrupted.',
				)
			}

			const { utterances, durationSec: deepgramDuration } = result

			const srt = this.subtitlesService.utterancesToSrt(utterances)
			this.logger.log(`Job ${job.id}: built SRT with ${utterances.length} cue(s), persisting…`)

			await this.commandBus.execute(
				new UpdateVideoCommand(userId, {
					id: videoId,
					originalContent: srt,
					subtitlesSource: 'llm',
					subtitlesStatus: 'done',
				}),
			)

			this.logger.log(`Job ${job.id}: Deepgram processed ${deepgramDuration || durationSec}s of audio`)
			this.logger.log(`Finished subtitles generation job ${job.id} for video ${videoId}`)

			return { videoId, status: 'done' }
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			const errorCode = classifyError(message)
			this.logger.error(`Subtitles generation job ${job.id} for video ${videoId} failed: ${message}`, err)

			if (videoExists) {
				await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.failed, {
					errorCode,
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
