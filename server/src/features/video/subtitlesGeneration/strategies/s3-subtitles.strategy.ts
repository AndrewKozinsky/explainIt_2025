import { mkdir, rm } from 'fs/promises'
import { join } from 'path'
import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { VideoRepository } from 'repo/video/video.repository'
import { UpdateVideoCommand } from 'features/video/UpdateVideo.command'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import { DeepgramSttService } from 'infrastructure/deepgramStt/deepgramStt.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import {
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { SubtitlesStatus } from 'prisma/generated/client'
import { downloadS3ObjectToFile } from '../downloadS3File'
import { buildSrtFromUtterances } from '../shared/buildSrtFromUtterances'
import { extractMonoWav16k, probeDurationSec } from '../shared/ffmpeg.utils'
import { classifyError } from '../utils/classifyError'

/**
 * User-uploaded S3 video subtitles generation flow:
 *   Download video from S3 → probe duration → extract mono 16 kHz WAV → Deepgram → SRT → persist.
 *
 * Tmp artifacts are always cleaned up in a finally block.
 */
export async function processUserUploadedVideo(
	job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	deps: {
		videoRepository: VideoRepository
		cloudRuS3Service: CloudRuS3Service
		deepgramSttService: DeepgramSttService
		mainConfig: MainConfigService
		commandBus: CommandBus
		logger: Logger
	},
): Promise<SubtitlesGenerationJobResult> {
	const { videoId, userId } = job.data
	const { videoRepository, cloudRuS3Service, deepgramSttService, mainConfig, commandBus, logger } = deps

	logger.log(`Starting user-uploaded subtitles generation job ${job.id} for video ${videoId} (user ${userId})`)

	const { tmpDir, maxVideoSeconds } = mainConfig.get().generateSubtitles
	const jobTmpDir = join(tmpDir, `video-${videoId}-${job.id}`)
	let videoExists = false

	try {
		const state = await videoRepository.getSubtitlesState(videoId)

		if (!state) throw new Error(`Video ${videoId} not found`)
		videoExists = true

		if (state.userId !== userId) throw new Error(`Ownership mismatch for video ${videoId}`)
		if (!state.isFileUploaded || !state.fileS3Key) throw new Error('Video file is not uploaded')
		if (!state.languageCode) throw new Error('Video has no language code')

		await videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.processing, {
			errorCode: null,
		})

		await mkdir(jobTmpDir, { recursive: true })
		const videoPath = join(jobTmpDir, 'source.bin')
		const audioPath = join(jobTmpDir, 'audio.wav')

		logger.log(`Job ${job.id}: downloading S3 key ${state.fileS3Key}`)
		await downloadS3ObjectToFile(cloudRuS3Service, mainConfig, state.fileS3Key, videoPath)

		logger.log(`Job ${job.id}: probing duration`)
		const durationSec = await probeDurationSec(videoPath)

		if (durationSec > maxVideoSeconds) {
			throw new Error(
				`Video duration ${Math.round(durationSec)}s exceeds the ${maxVideoSeconds}s limit for subtitles generation`,
			)
		}

		logger.log(`Job ${job.id}: extracting audio (duration=${durationSec.toFixed(1)}s)`)
		await extractMonoWav16k(videoPath, audioPath)

		logger.log(`Job ${job.id}: sending audio to Deepgram`)
		const result = await deepgramSttService.transcribe({
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

		const srt = buildSrtFromUtterances(utterances)
		logger.log(`Job ${job.id}: built SRT with ${utterances.length} cue(s), persisting…`)

		await commandBus.execute(
			new UpdateVideoCommand(userId, {
				id: videoId,
				originalContent: srt,
				subtitlesSource: 'llm',
				subtitlesStatus: 'done',
			}),
		)

		logger.log(`Job ${job.id}: Deepgram processed ${deepgramDuration || durationSec}s of audio`)

		logger.log(`Finished subtitles generation job ${job.id} for video ${videoId}`)
		return { videoId, status: 'done' }
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		const errorCode = classifyError(message)
		logger.error(`Subtitles generation job ${job.id} for video ${videoId} failed: ${message}`, err)

		if (videoExists) {
			await videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.failed, {
				errorCode,
			})
		}

		throw err
	} finally {
		await rm(jobTmpDir, { recursive: true, force: true }).catch((cleanupErr) => {
			logger.warn(`Failed to cleanup tmp dir ${jobTmpDir}: ${cleanupErr?.message ?? cleanupErr}`)
		})
	}
}
