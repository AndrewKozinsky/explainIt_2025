import { Injectable } from '@nestjs/common'
import { LanguageCode } from 'prisma/generated/client'
import { MainConfigService } from '../mainConfig/mainConfig.service'
import { TtsError } from '../ttsProviderAdapter/TtsError'
import { SonioxTtsOptions, sonioxTtsRequestSchema } from './sonioxTts.types'

@Injectable()
export class SonioxTtsService {
	private readonly apiKey: string | null

	constructor(mainConfig: MainConfigService) {
		this.apiKey = mainConfig.get().soniox.apiKey
	}

	async generateAudio(text: string, languageCode: LanguageCode): Promise<Buffer> {
		return this.synthesizeAudio(text, {
			model: 'tts-rt-v2',
			language: languageCode,
			voice: 'Daniel',
			audioFormat: 'mp3',
		})
	}

	async synthesizeAudio(text: string, options: SonioxTtsOptions): Promise<Buffer> {
		const parsed = sonioxTtsRequestSchema.safeParse({ ...options, text })
		if (!parsed.success) throw new TtsError('invalid_input', 'Invalid Soniox TTS parameters', 'not_sent')

		const params = parsed.data
		if (params.abortSignal?.aborted) throw new TtsError('aborted', 'TTS request aborted', 'not_sent')
		if (!this.apiKey) throw new TtsError('configuration', 'Soniox API key is required', 'not_sent')

		// The deadline also covers consuming the streamed response body. No retries or fallback.
		const deadline = AbortSignal.timeout(params.timeoutMs ?? 60_000)
		const signal = params.abortSignal ? AbortSignal.any([params.abortSignal, deadline]) : deadline
		try {
			const response = await fetch('https://tts-rt.soniox.com/tts', {
				method: 'POST',
				headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: params.text,
					model: params.model,
					language: params.language,
					voice: params.voice,
					audio_format: params.audioFormat,
					sample_rate: params.sampleRate,
					bitrate: params.bitrate,
					speed: params.speed,
					reduce_silence: params.reduceSilence,
					client_reference_id: params.clientReferenceId,
				}),
				signal,
			})

			if (!response.ok) {
				await response.body?.cancel()
				throw new TtsError('request_failed', 'Soniox TTS request failed', 'unknown')
			}

			const bytes = Buffer.from(await response.arrayBuffer())

			if (!bytes.length) throw new TtsError('invalid_response', 'Empty Soniox TTS response', 'unknown')

			return bytes
		} catch (error) {
			if (error instanceof TtsError) throw error

			throw new TtsError(
				params.abortSignal?.aborted ? 'aborted' : 'request_failed',
				'Soniox TTS request failed',
				'unknown',
			)
		}
	}
}
