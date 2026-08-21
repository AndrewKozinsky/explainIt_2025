import { mkdir, rm, stat } from 'fs/promises'
import { join } from 'path'
import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { VideoRepository } from 'repo/video/video.repository'
import { Language } from 'utils/languages'
import { UpdateVideoCommand } from 'features/video/UpdateVideo.command'
import { DeepgramSttService } from 'infrastructure/deepgramStt/deepgramStt.service'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import {
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { SubtitlesService } from 'infrastructure/subtitles/SubtitlesService'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { SubtitlesStatus } from 'prisma/generated/client'
import { analyzeVideoMetadata } from '../shared/analyzeVideoMetadata'
import { extractMonoWav16k, probeDurationSec } from '../shared/ffmpeg.utils'
import { classifyError } from '../utils/classifyError'
import { saveStreamToFile } from '../utils/saveStreamToFile'

// ─── Types ────────────────────────────────────────────────────────────────────

type YoutubeVideoState = {
	userId: number | null
	youtubeVideoId: string
	languageCode: Language
}

/**
 * YouTube subtitles generation flow:
 *   1. Download the audio track, transcribe via Deepgram, and convert utterances → SRT.
 *   2. Persist the resulting SRT to the database.
 *   3. Analyze the subtitles via LLM and save video metadata.
 *
 * Tmp artifacts from the Deepgram path are always cleaned up in a finally block.
 */
@Injectable()
export class YoutubeSubtitlesStrategy {
	private readonly logger = new Logger(YoutubeSubtitlesStrategy.name)

	constructor(
		private readonly videoRepository: VideoRepository,
		private readonly youtubeService: YoutubeService,
		private readonly deepgramSttService: DeepgramSttService,
		private readonly subtitlesService: SubtitlesService,
		private readonly mainConfig: MainConfigService,
		private readonly commandBus: CommandBus,
		private readonly llmAdapter: LlmAdapterService,
	) {}

	async process(
		job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	): Promise<SubtitlesGenerationJobResult> {
		const { videoId } = job.data
		// Скорее всего эту проверку нужно удалить
		let videoExists = false

		try {
			const state = await this.validateYoutubeVideoState(videoId)
			videoExists = true

			await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.processing, {
				errorCode: null,
			})

			const srt = await this.transcribeViaDeepgram(videoId, state, job.id)
			await this.saveVideoSubtitles(videoId, srt)
			await this.analyzeAndSaveMetadata(videoId, srt)

			this.logger.log(`Finished YouTube subtitles job ${job.id} for video ${videoId}`)
			return { videoId, status: 'done' }
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			const errorCode = classifyError(message)
			this.logger.error(`YouTube subtitles job ${job.id} for video ${videoId} failed: ${message}`, err)

			if (videoExists) {
				await this.videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.failed, {
					errorCode,
				})
			}
			throw err
		}
	}

	// ─── Step 0: State validation ────────────────────────────────────────────

	private async validateYoutubeVideoState(videoId: number): Promise<YoutubeVideoState> {
		const state = await this.videoRepository.getSubtitlesState(videoId)

		if (!state) throw new Error('Video not found')
		if (!state.youtubeVideoId) throw new Error('Video has no youtube_video_id')
		if (!state.languageCode) throw new Error('Video has no language code')

		return {
			userId: state.userId ?? null,
			youtubeVideoId: state.youtubeVideoId,
			languageCode: state.languageCode as Language,
		}
	}

	// ─── Step 1: Deepgram transcription ─── ──────────────────────────────────

	/**
	 * Download YouTube audio, transcribe via Deepgram, and convert utterances to SRT.
	 * Tmp artifacts are cleaned up on both success and failure.
	 */
	private async transcribeViaDeepgram(
		videoId: number,
		state: YoutubeVideoState,
		jobId: string | undefined,
	): Promise<string> {
		const { tmpDir } = this.mainConfig.get().generateSubtitles
		const jobTmpDir = join(tmpDir, `video-youtube-${videoId}-${jobId}`)

		try {
			await mkdir(jobTmpDir, { recursive: true })
			const audioPath = join(jobTmpDir, 'audio.wav')

			await this.downloadAndConvertAudio(state.youtubeVideoId, jobTmpDir, jobId)

			this.logger.log(`Job ${jobId}: sending audio to Deepgram`)
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

			const srt = this.subtitlesService.utterancesToSrt(result.utterances)
			this.logger.log(`Job ${jobId}: built SRT with ${result.utterances.length} utterance(s)`)
			return srt
		} finally {
			await rm(jobTmpDir, { recursive: true, force: true }).catch((cleanupErr) => {
				this.logger.warn(`Failed to cleanup tmp dir ${jobTmpDir}: ${cleanupErr?.message ?? cleanupErr}`)
			})
		}
	}

	/**
	 * Download YouTube audio stream, save to disk, validate, and convert to
	 * mono 16kHz WAV. Validates both the raw audio and the converted WAV.
	 */
	private async downloadAndConvertAudio(
		youtubeVideoId: string,
		tmpDir: string,
		jobId: string | undefined,
	): Promise<void> {
		const rawAudioPath = join(tmpDir, 'raw_audio.bin')
		const audioPath = join(tmpDir, 'audio.wav')

		// Download
		this.logger.log(`Job ${jobId}: downloading YouTube audio`)
		const audioStream = await this.youtubeService.downloadAudio(youtubeVideoId)
		await saveStreamToFile(audioStream, rawAudioPath)

		// Validate raw audio
		const rawStat = await stat(rawAudioPath)
		this.logger.log(`Job ${jobId}: raw audio saved (${(rawStat.size / 1024).toFixed(0)} KB)`)

		const rawDuration = await probeDurationSec(rawAudioPath).catch(() => null)
		if (rawDuration === null || rawDuration <= 0) {
			throw new Error(
				`Downloaded audio file has no detectable audio stream (size=${(rawStat.size / 1024).toFixed(0)} KB). ` +
					'The YouTube video may be silent, music-only, or region-restricted.',
			)
		}
		this.logger.log(`Job ${jobId}: raw audio duration=${rawDuration.toFixed(1)}s`)

		// Convert to mono 16kHz WAV
		this.logger.log(`Job ${jobId}: converting audio to 16kHz mono WAV`)
		await extractMonoWav16k(rawAudioPath, audioPath)

		// Validate WAV
		const wavStat = await stat(audioPath)
		const wavDuration = await probeDurationSec(audioPath).catch(() => null)
		this.logger.log(
			`Job ${jobId}: WAV ready (${(wavStat.size / 1024).toFixed(0)} KB, ` +
				`duration=${wavDuration?.toFixed(1) ?? '?'}s)`,
		)

		if (wavDuration === null || wavDuration <= 0) {
			throw new Error(
				'Converted WAV file has no detectable audio stream. ' +
					`Raw audio duration was ${rawDuration?.toFixed(1) ?? '?'}s. ffmpeg may have failed silently.`,
			)
		}
	}

	// ─── Shared: persist subtitles ───────────────────────────────────────────

	/**
	 * Save subtitles content to the video via {@link UpdateVideoCommand}.
	 */
	private async saveVideoSubtitles(videoId: number, content: string): Promise<void> {
		await this.commandBus.execute(
			new UpdateVideoCommand(undefined, {
				id: videoId,
				originalContent: content,
				subtitlesSource: 'llm',
				subtitlesStatus: 'done',
			}),
		)
	}

	// ─── Metadata analysis ─────────────────────────────────────────────────

	/**
	 * Analyze subtitle text via LLM and persist the resulting metadata
	 * (proficiency level, topic, learnability score, summary).
	 *
	 * Failures are caught and logged — they never fail the parent job.
	 */
	private async analyzeAndSaveMetadata(videoId: number, srtContent: string): Promise<void> {
		try {
			const metadata = await analyzeVideoMetadata(this.llmAdapter, srtContent, this.subtitlesService)
			if (!metadata) return

			await this.commandBus.execute(
				new UpdateVideoCommand(undefined, {
					id: videoId,
					proficiencyLevel: metadata.proficiencyLevel,
					topic: metadata.topic,
					learnabilityScore: metadata.learnabilityScore,
					languageCode: metadata.language,
				}),
			)

			this.logger.log(
				`Metadata saved for video ${videoId}: ` +
					`level=${metadata.proficiencyLevel}, topic=${metadata.topic}, ` +
					`learnability=${metadata.learnabilityScore}`,
			)
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			this.logger.warn(`Metadata analysis failed for video ${videoId}: ${message}`)
		}
	}
}
