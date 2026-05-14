import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { Injectable, Logger } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
const { HttpsProxyAgent } = require('https-proxy-agent')
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
	private readonly httpsAgent

	constructor(private readonly mainConfig: MainConfigService) {
		this.httpsAgent = new HttpsProxyAgent(this.mainConfig.get().proxyUrl)
	}

	/**
	 * Send a local audio file to Deepgram Nova-3 and return utterance-level segments
	 * plus the total audio duration reported by Deepgram. The audio is streamed from
	 * disk to keep memory flat for long recordings.
	 */
	async transcribeFile(params: {
		audioPath: string
		languageCode: Language
		contentType?: string
	}): Promise<DeepgramTranscribeResult> {
		const apiKey = this.mainConfig.get().deepgram.apiKey
		if (!apiKey) {
			throw new Error('DEEPGRAM_API_KEY is not configured')
		}

		const url = new URL('https://api.deepgram.com/v1/listen')
		url.searchParams.set('model', 'nova-3')
		url.searchParams.set('language', params.languageCode)
		url.searchParams.set('punctuate', 'true')
		url.searchParams.set('smart_format', 'true')
		url.searchParams.set('utterances', 'true')
		url.searchParams.set('utt_split', '1.2')
		url.searchParams.set('diarize', 'false')

		const fileStats = await stat(params.audioPath)
		const stream = createReadStream(params.audioPath)

		let response
		try {
			response = await axios.post<DeepgramListenResponse>(url.toString(), stream, {
				headers: {
					Authorization: `Token ${apiKey}`,
					'Content-Type': params.contentType ?? 'audio/wav',
					'Content-Length': fileStats.size,
				},
				maxBodyLength: Infinity,
				maxContentLength: Infinity,
				// Deepgram Nova-3 prerecorded can take up to ~20s per minute of audio.
				timeout: 10 * 60 * 1000,
				httpsAgent: this.httpsAgent,
				proxy: false,
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

		const data = response.data

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
			if (alt?.transcript?.trim()) {
				const words = alt.words ?? []
				const start = words[0]?.start ?? 0
				const end = words[words.length - 1]?.end ?? data.metadata?.duration ?? 0
				utterances.push({
					start,
					end,
					transcript: alt.transcript.trim(),
					words: words.map((word) => ({
						start: word.start,
						end: word.end,
						word: word.punctuated_word ?? word.word,
					})),
				})
			}
		}

		return {
			durationSec: data.metadata?.duration ?? 0,
			utterances: utterances.filter((u) => u.transcript.length > 0),
		}
	}
}
