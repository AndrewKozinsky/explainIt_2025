import OpenAI from 'openai'
import { TtsError } from './TtsError'
import { openAITtsInputSchema } from './ttsInput.schema'
import { OpenAITtsInput, TtsProvider } from './TtsProvider.interface'

export class OpenAITtsProvider implements TtsProvider<OpenAITtsInput> {
	constructor(private readonly getClient: () => Pick<OpenAI, 'audio'> | null) {}

	async generate(input: OpenAITtsInput): Promise<Buffer> {
		const parsed = openAITtsInputSchema.safeParse(input)
		if (!parsed.success) throw new TtsError('invalid_input', 'Invalid OpenAI TTS parameters', 'not_sent')

		const params = parsed.data
		if (params.abortSignal?.aborted) throw new TtsError('aborted', 'TTS request aborted', 'not_sent')
		let client: Pick<OpenAI, 'audio'> | null

		try {
			client = this.getClient()
		} catch {
			throw new TtsError('configuration', 'OpenAI TTS configuration is invalid', 'not_sent')
		}

		if (!client) throw new TtsError('configuration', 'OpenAI API key is required', 'not_sent')

		const timeoutMs = params.timeoutMs ?? 60_000
		// Keep the deadline active while reading the audio body, after fetch has returned its headers.
		const deadline = AbortSignal.timeout(timeoutMs)
		const signal = params.abortSignal ? AbortSignal.any([params.abortSignal, deadline]) : deadline

		try {
			const response = await client.audio.speech.create(
				{
					input: params.text,
					model: params.model,
					voice: params.voice,
					instructions: params.instructions,
					response_format: params.responseFormat ?? 'mp3',
					speed: params.speed,
					stream_format: 'audio',
				},
				{ maxRetries: 0, timeout: timeoutMs, signal },
			)

			const bytes = Buffer.from(await response.arrayBuffer())
			if (!bytes.length) throw new TtsError('invalid_response', 'Empty OpenAI TTS response', 'unknown')

			return bytes
		} catch (error) {
			if (error instanceof TtsError) throw error
			const code = params.abortSignal?.aborted ? 'aborted' : 'request_failed'

			throw new TtsError(code, 'OpenAI TTS request failed', 'unknown')
		}
	}
}
