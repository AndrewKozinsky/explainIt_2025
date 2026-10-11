import { TtsError } from './TtsError'
import { GoogleTtsInput, OpenAITtsInput, TtsGenerateInput, TtsProvider } from './TtsProvider.interface'

/** Only synthesis: no persistence, billing, fallback or retries. */
export class TtsAdapterService {
	constructor(
		private readonly openAI: TtsProvider<OpenAITtsInput>,
		private readonly google: TtsProvider<GoogleTtsInput>,
	) {}

	async generate(input: TtsGenerateInput): Promise<Buffer> {
		if (input?.type === 'OpenAI') return this.openAI.generate(input)
		if (input?.type === 'Google') return this.google.generate(input)

		throw new TtsError('invalid_input', 'Unsupported TTS provider', 'not_sent')
	}
}
