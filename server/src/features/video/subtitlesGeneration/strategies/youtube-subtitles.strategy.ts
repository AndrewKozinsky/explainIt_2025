import { mkdir, rm, stat } from 'fs/promises'
import { join } from 'path'
import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Job } from 'bullmq'
import { VideoRepository } from 'repo/video/video.repository'
import { Language } from 'utils/languages'
import { UpdateVideoCommand } from 'features/video/UpdateVideo.command'
import { DeepgramSttService, DeepgramUtterance } from 'infrastructure/deepgramStt/deepgramStt.service'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import {
	SubtitlesGenerationJobData,
	SubtitlesGenerationJobResult,
} from 'infrastructure/queues/subtitlesGeneration.types'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { SubtitlesStatus } from 'prisma/generated/client'
import { buildSrtFromUtterances } from '../shared/buildSrtFromUtterances'
import { extractMonoWav16k, probeDurationSec } from '../shared/ffmpeg.utils'
import {
	buildSrtFromSentences,
	normalizeSentenceEndTimes,
	parseVttToWordTimings,
} from '../shared/parseVttToWordTimings'
import { classifyError } from '../utils/classifyError'
import { saveStreamToFile } from '../utils/saveStreamToFile'

// ─── Types ────────────────────────────────────────────────────────────────────

type YoutubeVideoState = {
	userId: number | null
	youtubeVideoId: string
	languageCode: Language
}

type StrategyDeps = {
	videoRepository: VideoRepository
	youtubeService: YoutubeService
	deepgramSttService: DeepgramSttService
	llmAdapter: LlmAdapterService
	mainConfig: MainConfigService
	commandBus: CommandBus
	logger: Logger
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

/**
 * YouTube subtitles generation flow:
 *   1. Try fetching existing captions from YouTube (auto or manual).
 *   2. If unavailable, download the audio track and transcribe via Deepgram.
 *
 * Tmp artifacts are always cleaned up in a finally block.
 */
export async function processYoutubeVideo(
	job: Job<SubtitlesGenerationJobData, SubtitlesGenerationJobResult>,
	deps: StrategyDeps,
): Promise<SubtitlesGenerationJobResult> {
	const { videoId } = job.data
	const { videoRepository, logger } = deps

	try {
		const state = await validateYoutubeVideoState(videoId, videoRepository)

		await videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.processing, {
			errorCode: null,
		})

		// Step 1: Try YouTube captions
		const captionsSaved = await trySaveYoutubeCaptions(videoId, state, deps, job.id)
		if (captionsSaved) {
			return { videoId, status: 'done' }
		}

		// Step 2: Fallback to Deepgram
		const utterances = await downloadAndTranscribeAudio(videoId, state, deps, job.id)
		const srt = buildSrtFromUtterances(utterances)
		logger.log(`Job ${job.id}: built SRT with ${utterances.length} cue(s), persisting…`)

		await saveVideoSubtitles(videoId, state.userId, srt, deps)

		logger.log(`Finished YouTube→Deepgram subtitles job ${job.id} for video ${videoId}`)
		return { videoId, status: 'done' }
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err)
		const errorCode = classifyError(message)
		logger.error(`YouTube subtitles job ${job.id} for video ${videoId} failed: ${message}`, err)

		await videoRepository.setSubtitlesStatus(videoId, SubtitlesStatus.failed, {
			errorCode,
		})
		throw err
	}
}

// ─── Step 0: State validation ─────────────────────────────────────────────────

async function validateYoutubeVideoState(
	videoId: number,
	videoRepository: VideoRepository,
): Promise<YoutubeVideoState> {
	const state = await videoRepository.getSubtitlesState(videoId)

	if (!state) throw new Error('Video not found')
	if (!state.youtubeVideoId) throw new Error('Video has no youtube_video_id')
	if (!state.languageCode) throw new Error('Video has no language code')

	return {
		userId: state.userId ?? null,
		youtubeVideoId: state.youtubeVideoId,
		languageCode: state.languageCode as Language,
	}
}

// ─── Step 1: YouTube captions ─────────────────────────────────────────────────

/**
 * System prompt for grouping word-level timings into sentences.
 *
 * The LLM receives a clean JSON array of {w, t} pairs (word + absolute
 * milliseconds from video start). It returns sentence boundaries —
 * the only semantic task; all timestamps are already supplied.
 */
const WORDS_TO_SENTENCES_SYSTEM_PROMPT = `You are a precise subtitle formatter. Group words with timestamps into sentences.

INPUT: JSON array of {"w": "word_or_punctuation", "t": start_milliseconds}

RULES:
1. Group consecutive words into grammatically complete sentences using punctuation (. ! ?) and meaning as boundaries.
2. For each sentence set:
   - "startMs" = the "t" value of the sentence's FIRST word
   - "endMs" = the "t" value of the sentence's LAST word + 300 ms
3. "text" = all words joined with spaces. Preserve original wording and punctuation exactly.
4. If punctuation is missing at sentence boundaries, infer them from meaning.

OUTPUT: valid JSON only, no explanations:
{"sentences": [{"startMs": 400, "endMs": 4480, "text": "When did recognizing rights become something radical?"}, ...]}`

/** Expected JSON shape from the LLM. */
type LlmSentenceOutput = { sentences: { startMs: number; endMs: number; text: string }[] }

/**
 * Try to fetch YouTube captions, convert to SRT via LLM, and save.
 * Returns `true` if captions were found and saved, `false` otherwise.
 */
async function trySaveYoutubeCaptions(
	videoId: number,
	state: YoutubeVideoState,
	deps: StrategyDeps,
	jobId: string | undefined,
): Promise<boolean> {
	const { youtubeService, llmAdapter, logger } = deps

	logger.log(`Job ${jobId}: fetching YouTube captions for video ${state.youtubeVideoId}`)
	const youtubeSubtitles = await youtubeService.getSubtitles(state.youtubeVideoId, state.languageCode)

	if (!youtubeSubtitles) {
		return false
	}

	logger.log(
		`Job ${jobId}: got YouTube VTT subtitles (auto=${youtubeSubtitles.isAutoGenerated}), ` +
			'parsing word timings…',
	)

	// ── DEBUG: inspect raw VTT ──
	const vttPreview = youtubeSubtitles.content.slice(0, 500)
	logger.log(`Job ${jobId}: [DEBUG] VTT length=${youtubeSubtitles.content.length}, preview:\n${vttPreview}`)

	const wordTimings = parseVttToWordTimings(youtubeSubtitles.content)
	logger.log(`Job ${jobId}: extracted ${wordTimings.length} word timings, sending to LLM for sentence grouping`)

	// ── DEBUG: inspect parsed words ──
	if (wordTimings.length > 0) {
		const sample = wordTimings
			.slice(0, 10)
			.map((w) => `${w.word}@${w.startMs}`)
			.join(', ')
		logger.log(`Job ${jobId}: [DEBUG] first 10 words: ${sample}`)
	} else {
		logger.warn(`Job ${jobId}: [DEBUG] wordTimings is EMPTY — parser returned nothing!`)
	}

	try {
		const llmResult = await llmAdapter.generate({
			provider: 'deepseek',
			responseFormat: 'json_object',
			messages: [
				{ role: 'system', content: WORDS_TO_SENTENCES_SYSTEM_PROMPT },
				{ role: 'user', content: JSON.stringify(wordTimings) },
			],
		})

		logger.log(
			`Job ${jobId}: LLM sentence grouping done ` +
				`(input=${llmResult.inputTokens} tokens, output=${llmResult.outputTokens} tokens)`,
		)

		// ── DEBUG: inspect LLM response ──
		logger.log(`Job ${jobId}: [DEBUG] LLM raw response (first 1000 chars):\n${llmResult.content.slice(0, 1000)}`)

		const parsed = JSON.parse(llmResult.content) as LlmSentenceOutput
		logger.log(`Job ${jobId}: [DEBUG] parsed ${parsed.sentences?.length ?? 0} sentences from LLM JSON`)

		const sentences = normalizeSentenceEndTimes(parsed.sentences)
		const srt = buildSrtFromSentences(sentences)

		// ── DEBUG: inspect final SRT ──
		logger.log(
			`Job ${jobId}: [DEBUG] final SRT length=${srt.length}, preview (first 500 chars):\n${srt.slice(0, 500)}`,
		)

		logger.log(`Job ${jobId}: built SRT with ${sentences.length} sentence(s), persisting…`)

		await saveVideoSubtitles(videoId, state.userId, srt, deps, 'youTube')

		logger.log(`Finished YouTube subtitles job ${jobId} for video ${videoId}`)
		return true
	} catch (llmError) {
		logger.warn(
			`Job ${jobId}: LLM sentence grouping failed, falling back to Deepgram: ` +
				`${llmError instanceof Error ? llmError.message : String(llmError)}`,
		)
		return false
	}
}

// ─── Step 2: Deepgram fallback ────────────────────────────────────────────────

/**
 * Download YouTube audio, convert to mono 16kHz WAV, and transcribe via Deepgram.
 * Tmp artifacts are cleaned up on both success and failure.
 */
async function downloadAndTranscribeAudio(
	videoId: number,
	state: YoutubeVideoState,
	deps: StrategyDeps,
	jobId: string | undefined,
): Promise<DeepgramUtterance[]> {
	const { mainConfig, deepgramSttService, logger } = deps

	const { tmpDir } = mainConfig.get().generateSubtitles
	const jobTmpDir = join(tmpDir, `video-youtube-${videoId}-${jobId}`)

	try {
		await mkdir(jobTmpDir, { recursive: true })
		const audioPath = join(jobTmpDir, 'audio.wav')

		await downloadAndConvertAudio(state.youtubeVideoId, jobTmpDir, deps, jobId)

		logger.log(`Job ${jobId}: sending audio to Deepgram`)
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

		return result.utterances
	} finally {
		await rm(jobTmpDir, { recursive: true, force: true }).catch((cleanupErr) => {
			logger.warn(`Failed to cleanup tmp dir ${jobTmpDir}: ${cleanupErr?.message ?? cleanupErr}`)
		})
	}
}

/**
 * Download YouTube audio stream, save to disk, validate, and convert to
 * mono 16kHz WAV. Validates both the raw audio and the converted WAV.
 */
async function downloadAndConvertAudio(
	youtubeVideoId: string,
	tmpDir: string,
	deps: StrategyDeps,
	jobId: string | undefined,
): Promise<void> {
	const { youtubeService, logger } = deps

	const rawAudioPath = join(tmpDir, 'raw_audio.bin')
	const audioPath = join(tmpDir, 'audio.wav')

	// Download
	logger.log(`Job ${jobId}: downloading YouTube audio`)
	const audioStream = await youtubeService.downloadAudio(youtubeVideoId)
	await saveStreamToFile(audioStream, rawAudioPath)

	// Validate raw audio
	const rawStat = await stat(rawAudioPath)
	logger.log(`Job ${jobId}: raw audio saved (${(rawStat.size / 1024).toFixed(0)} KB)`)

	const rawDuration = await probeDurationSec(rawAudioPath).catch(() => null)
	if (rawDuration === null || rawDuration <= 0) {
		throw new Error(
			`Downloaded audio file has no detectable audio stream (size=${(rawStat.size / 1024).toFixed(0)} KB). ` +
				'The YouTube video may be silent, music-only, or region-restricted.',
		)
	}
	logger.log(`Job ${jobId}: raw audio duration=${rawDuration.toFixed(1)}s`)

	// Convert to mono 16kHz WAV
	logger.log(`Job ${jobId}: converting audio to 16kHz mono WAV`)
	await extractMonoWav16k(rawAudioPath, audioPath)

	// Validate WAV
	const wavStat = await stat(audioPath)
	const wavDuration = await probeDurationSec(audioPath).catch(() => null)
	logger.log(
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

// ─── Shared: persist subtitles ────────────────────────────────────────────────

/**
 * Save subtitles content to the video via {@link UpdateVideoCommand}.
 */
async function saveVideoSubtitles(
	videoId: number,
	userId: number | null,
	content: string,
	deps: StrategyDeps,
	source: 'youTube' | 'llm' = 'llm',
): Promise<void> {
	await deps.commandBus.execute(
		new UpdateVideoCommand(userId ?? undefined, {
			id: videoId,
			originalContent: content,
			subtitlesSource: source,
			subtitlesStatus: 'done',
		}),
	)
}
