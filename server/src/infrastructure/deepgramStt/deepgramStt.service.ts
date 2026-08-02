import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { Readable } from 'stream'
import { Injectable, Logger } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
import { Language } from 'utils/languages'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export type DeepgramUtterance = {
	start: number // seconds
	end: number // seconds
	transcript: string
	words: DeepgramWord[]
}

export type DeepgramWord = {
	start: number // seconds
	end: number // seconds
	word: string
}

export type DeepgramTranscribeResult = {
	durationSec: number
	utterances: DeepgramUtterance[]
}

type DeepgramListenResponse = {
	metadata?: { duration?: number }
	results?: {
		utterances?: Array<{
			start: number
			end: number
			transcript: string
			words?: Array<{ start: number; end: number; punctuated_word?: string; word: string }>
		}>
		channels?: Array<{
			alternatives?: Array<{
				transcript: string
				confidence?: number
				words?: Array<{ start: number; end: number; punctuated_word?: string; word: string }>
			}>
		}>
	}
}

/**
 * Thin client for Deepgram's Speech-to-Text (STT) Prerecorded API (Nova-3 model).
 *
 * Intentionally scoped to STT only — if/when we start using other Deepgram products
 * (text-to-speech, speech intelligence), add them as separate services / modules.
 */
@Injectable()
export class DeepgramSttService {
	private readonly logger = new Logger(DeepgramSttService.name)
	// private readonly httpsAgent

	constructor(private readonly mainConfig: MainConfigService) {}

	/**
	 * Transcribe audio to text via Deepgram Nova-3.
	 *
	 * Accepts audio in three forms:
	 * - **file path** (`string`) — probes size via `stat` and streams from disk,
	 *   setting the `Content-Length` header.
	 * - **`Readable` stream** — sent as-is via chunked transfer encoding
	 *   (`Content-Length` is omitted).
	 * - **`Promise<Readable>`** — awaited, then sent the same way.
	 *   Useful when the stream isn't available synchronously (e.g. S3 GetObject
	 *   body or ffmpeg stdout resolved behind a Promise).
	 *
	 * Returns utterance-level segments plus the total audio duration reported
	 * by Deepgram.
	 */
	async transcribe(params: {
		audioUrlOrStream: string | Readable | Promise<Readable>
		languageCode: Language
		contentType?: string
	}): Promise<DeepgramTranscribeResult> {
		const { audioUrlOrStream, languageCode, contentType } = params

		let stream: Readable
		let contentLength: number | undefined

		if (typeof audioUrlOrStream === 'string') {
			const fileStats = await stat(audioUrlOrStream)
			stream = createReadStream(audioUrlOrStream)
			contentLength = fileStats.size
		} else {
			// Readable or Promise<Readable> — await works on both
			// (await on a plain Readable just returns it immediately)
			stream = await audioUrlOrStream
		}

		return this.transcribeStream(stream, languageCode, contentType, contentLength)
	}

	/**
	 * Core — the single call site for the Deepgram Prerecorded API.
	 */
	private async transcribeStream(
		stream: Readable,
		languageCode: Language,
		contentType: string | undefined,
		contentLength: number | undefined,
	): Promise<DeepgramTranscribeResult> {
		const apiKey = this.mainConfig.get().deepgram.apiKey

		const url = new URL('https://api.deepgram.com/v1/listen')
		url.searchParams.set('model', 'nova-3')
		url.searchParams.set('detect_language', 'true')
		url.searchParams.set('punctuate', 'true')
		url.searchParams.set('smart_format', 'true')
		url.searchParams.set('utterances', 'true')
		url.searchParams.set('utt_split', '1.2')
		url.searchParams.set('diarize', 'false')

		const headers: Record<string, string | number> = {
			Authorization: `Token ${apiKey}`,
			'Content-Type': contentType ?? 'audio/wav',
		}

		if (contentLength !== undefined) {
			headers['Content-Length'] = contentLength
		}

		let response
		try {
			response = await axios.post<DeepgramListenResponse>(url.toString(), stream, {
				headers,
				maxBodyLength: Infinity,
				maxContentLength: Infinity,
				// Deepgram Nova-3 prerecorded can take up to ~20s per minute of audio.
				timeout: 10 * 60 * 1000,
				// httpsAgent: this.httpsAgent,
				// proxy: false,
			})
		} catch (err) {
			const axiosErr = err as AxiosError

			const detail =
				(axiosErr.response?.data as { err_msg?: string; reason?: string } | undefined)?.err_msg ??
				(axiosErr.response?.data as { reason?: string } | undefined)?.reason ??
				axiosErr.message

			this.logger.error(`Deepgram request failed: status=${axiosErr.response?.status} detail=${detail}`)
			throw new Error(`Deepgram ASR failed: ${detail}`)
		}

		return this.buildResult(response.data)
	}

	/**
	 * Parse the Deepgram JSON response into our domain types.
	 *
	 * Extracted so that every public method shares the same response handling
	 * (utterance mapping, empty-response fallback, filtering of blank transcript).
	 */
	private buildResult(data: DeepgramListenResponse): DeepgramTranscribeResult {
		const utterances = (data.results?.utterances ?? []).map((u) => ({
			start: u.start,
			end: u.end,
			transcript: u.transcript.trim(),
			words: (u.words ?? []).map((word) => ({
				start: word.start,
				end: word.end,
				word: word.punctuated_word ?? word.word,
			})),
		}))

		if (utterances.length === 0) {
			// Fallback: build a single utterance from the alternative transcript if Deepgram
			// decided not to emit utterances (e.g. very short clip).
			const alt = data.results?.channels?.[0]?.alternatives?.[0]
			const altTranscript = alt?.transcript?.trim()
			const altConfidence = alt?.confidence
			const channelCount = data.results?.channels?.length ?? 0
			const altCount = data.results?.channels?.[0]?.alternatives?.length ?? 0

			if (alt && altTranscript) {
				this.logger.log(
					'Deepgram returned no utterances but channel[0].alternative[0] has transcript ' +
						`(${altTranscript.length} chars, confidence=${altConfidence}), using as fallback`,
				)
				const words = alt.words ?? []
				const start = words[0]?.start ?? 0
				const end = words[words.length - 1]?.end ?? data.metadata?.duration ?? 0
				utterances.push({
					start,
					end,
					transcript: altTranscript,
					words: words.map((word) => ({
						start: word.start,
						end: word.end,
						word: word.punctuated_word ?? word.word,
					})),
				})
			} else {
				this.logger.warn(
					`Deepgram returned no transcription: utterances=0, channels=${channelCount}, ` +
						`alternatives[0]=${altCount}, altTranscript="${altTranscript ?? ''}", ` +
						`altConfidence=${altConfidence}, duration=${data.metadata?.duration ?? '?'}s. ` +
						'Audio may be silent, in the wrong language, or corrupted.',
				)
			}
		}

		const filtered = utterances.filter((u) => u.transcript.length > 0)
		const durationSec = data.metadata?.duration ?? 0

		this.logger.log(
			`Deepgram response: duration=${durationSec}s, utterances=${utterances.length}, ` +
				`after-filter=${filtered.length}`,
		)

		return { durationSec, utterances: filtered }
	}
}
