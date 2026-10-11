import { GoogleTtsService } from '../googleTts/googleTts.service'
import { TtsError } from './TtsError'
import { googleTtsInputSchema } from './ttsInput.schema'
import { GoogleTtsInput, TtsProvider } from './TtsProvider.interface'

export class GoogleTtsProvider implements TtsProvider<GoogleTtsInput> {
	constructor(private readonly getService: () => Pick<GoogleTtsService, 'synthesizeAudio'>) {}

	async generate(input: GoogleTtsInput): Promise<Buffer> {
		const parsed = googleTtsInputSchema.safeParse(input)
		if (!parsed.success) throw new TtsError('invalid_input', 'Invalid Google TTS parameters', 'not_sent')

		let service: Pick<GoogleTtsService, 'synthesizeAudio'>

		try {
			service = this.getService()
		} catch {
			throw new TtsError('configuration', 'Google TTS credentials are invalid or missing', 'not_sent')
		}
		const params = parsed.data

		try {
			const bytes = await service.synthesizeAudio(
				params.text,
				params.voice,
				params.audioConfig,
				params.timeoutMs ?? 60_000,
			)

			if (!Buffer.isBuffer(bytes) || !bytes.length)
				throw new TtsError('invalid_response', 'Empty Google TTS response', 'unknown')

			return bytes
		} catch (error) {
			if (error instanceof TtsError) throw error
			throw new TtsError('request_failed', 'Google TTS request failed', 'unknown')
		}
	}
}
