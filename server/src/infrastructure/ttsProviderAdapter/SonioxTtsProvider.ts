import { SonioxTtsService } from '../sonioxTts/sonioxTts.service'
import { TtsError } from './TtsError'
import { sonioxTtsInputSchema } from './ttsInput.schema'
import { SonioxTtsInput, TtsProvider } from './TtsProvider.interface'

export class SonioxTtsProvider implements TtsProvider<SonioxTtsInput> {
	constructor(private readonly getService: () => Pick<SonioxTtsService, 'synthesizeAudio'>) {}

	async generate(input: SonioxTtsInput): Promise<Buffer> {
		const parsed = sonioxTtsInputSchema.safeParse(input)
		if (!parsed.success) throw new TtsError('invalid_input', 'Invalid Soniox TTS parameters', 'not_sent')

		const { type, text, ...options } = parsed.data
		if (options.abortSignal?.aborted) throw new TtsError('aborted', 'TTS request aborted', 'not_sent')

		let service: Pick<SonioxTtsService, 'synthesizeAudio'>

		try {
			service = this.getService()
		} catch {
			throw new TtsError('configuration', 'Soniox TTS configuration is invalid', 'not_sent')
		}

		try {
			const bytes = await service.synthesizeAudio(text, options)
			if (!Buffer.isBuffer(bytes) || !bytes.length)
				throw new TtsError('invalid_response', 'Empty Soniox TTS response', 'unknown')

			return bytes
		} catch (error) {
			if (error instanceof TtsError) throw error

			throw new TtsError('request_failed', 'Soniox TTS request failed', 'unknown')
		}
	}
}
