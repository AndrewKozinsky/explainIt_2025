import OpenAI from 'openai'
import { GoogleTtsProvider } from './GoogleTtsProvider'
import { OpenAITtsProvider } from './OpenAITtsProvider'
import { TtsAdapterService } from './TtsAdapter.service'
import { TtsError } from './TtsError'
import { GoogleTtsInput, OpenAITtsInput, TtsGenerateInput } from './TtsProvider.interface'

const openAIInput: OpenAITtsInput = {
	type: 'OpenAI',
	text: 'Hello!',
	model: 'gpt-4o-mini-tts',
	voice: 'cedar',
}
const googleInput: GoogleTtsInput = {
	type: 'Google',
	text: 'Hello!',
	voice: { languageCode: 'en-GB', name: 'en-GB-Standard-A' },
	audioConfig: { audioEncoding: 'MP3' },
}

function setup() {
	const bytes = Buffer.from([0, 255, 32, 128])
	const create = jest.fn().mockResolvedValue(new Response(bytes))
	const getClient = jest.fn(() => ({ audio: { speech: { create } } }) as unknown as Pick<OpenAI, 'audio'>)
	const synthesizeAudio = jest.fn().mockResolvedValue(bytes)
	const getService = jest.fn(() => ({ synthesizeAudio }))
	const adapter = new TtsAdapterService(new OpenAITtsProvider(getClient), new GoogleTtsProvider(getService))

	return { adapter, create, getClient, synthesizeAudio, getService, bytes }
}

describe('TtsAdapterService', () => {
	it('passes OpenAI voice, style, format, speed and cancellation, returning the original bytes', async () => {
		const { adapter, create, getService, bytes } = setup()
		const signal = new AbortController().signal
		expect(
			await adapter.generate({
				...openAIInput,
				instructions: 'Speak calmly.',
				speed: 0.8,
				responseFormat: 'wav',
				timeoutMs: 1234,
				abortSignal: signal,
			}),
		).toEqual(bytes)
		expect(create).toHaveBeenCalledWith(
			{
				input: 'Hello!',
				model: 'gpt-4o-mini-tts',
				voice: 'cedar',
				instructions: 'Speak calmly.',
				response_format: 'wav',
				speed: 0.8,
				stream_format: 'audio',
			},
			{ maxRetries: 0, timeout: 1234, signal: expect.any(AbortSignal) },
		)
		expect(create.mock.calls[0][1].signal.aborted).toBe(false)
		expect(getService).not.toHaveBeenCalled()
	})

	it('defaults to MP3 and a bounded timeout without inventing a language', async () => {
		const { adapter, create } = setup()
		await adapter.generate(openAIInput)
		expect(create.mock.calls[0][0]).toMatchObject({ response_format: 'mp3' })
		expect(create.mock.calls[0][0]).not.toHaveProperty('language')
		expect(create.mock.calls[0][1]).toMatchObject({ timeout: 60_000, maxRetries: 0 })
	})

	it('passes Google-specific settings to the existing service', async () => {
		const { adapter, synthesizeAudio, getClient, bytes } = setup()
		const input: GoogleTtsInput = {
			...googleInput,
			voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
			audioConfig: { audioEncoding: 'OGG_OPUS', speakingRate: 0.9, pitch: -2 },
			timeoutMs: 5678,
		}

		expect(await adapter.generate(input)).toBe(bytes)
		expect(synthesizeAudio).toHaveBeenCalledWith(input.text, input.voice, input.audioConfig, 5678)
		expect(getClient).not.toHaveBeenCalled()
	})

	it.each([
		{ ...openAIInput, text: '' },
		{ ...openAIInput, text: 'x'.repeat(4097) },
		{ ...openAIInput, instructions: 'x'.repeat(4097) },
		{ ...openAIInput, model: 'tts-1' },
		{ ...openAIInput, voice: 'missing' },
		{ ...openAIInput, speed: 0.1 },
		{ ...openAIInput, languageCode: 'en' },
		{ ...openAIInput, timeoutMs: 0 },
		{ ...googleInput, text: 'я'.repeat(2501) },
		{ ...googleInput, voice: { languageCode: '' } },
		{ ...googleInput, audioConfig: { audioEncoding: 'MP3', pitch: 21 } },
		{ ...googleInput, instructions: 'calm' },
		{ type: 'Other', text: 'Hello' },
	])('rejects invalid/cross-provider parameters before constructing a client: %#', async (input) => {
		const { adapter, getClient, getService } = setup()
		await expect(adapter.generate(input as TtsGenerateInput)).rejects.toMatchObject({
			code: 'invalid_input',
			outcome: 'not_sent',
		})
		expect(getClient).not.toHaveBeenCalled()
		expect(getService).not.toHaveBeenCalled()
	})

	it('rejects cancellation before dispatch', async () => {
		const { adapter, getClient } = setup()
		const controller = new AbortController()
		controller.abort()
		await expect(adapter.generate({ ...openAIInput, abortSignal: controller.signal })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'not_sent',
		})
		expect(getClient).not.toHaveBeenCalled()
	})

	it('propagates cancellation while consuming the audio body', async () => {
		const { adapter, create } = setup()
		const controller = new AbortController()
		create.mockImplementation(async (_body, options) => ({
			arrayBuffer: () =>
				new Promise((_resolve, reject) => {
					options.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true })
					controller.abort()
				}),
		}))
		await expect(adapter.generate({ ...openAIInput, abortSignal: controller.signal })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'unknown',
		})
		expect(create).toHaveBeenCalledTimes(1)
	})

	it('normalizes client construction errors before dispatch', async () => {
		const provider = new OpenAITtsProvider(() => {
			throw new Error('secret config')
		})
		await expect(provider.generate(openAIInput)).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
		})
	})

	it('reports missing OpenAI configuration before dispatch', async () => {
		const provider = new OpenAITtsProvider(() => null)
		await expect(provider.generate(openAIInput)).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
		})
	})

	it('normalizes Google client configuration errors without exposing credentials', async () => {
		const provider = new GoogleTtsProvider(() => {
			throw new Error('secret credential')
		})
		await expect(provider.generate(googleInput)).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
		})
	})

	it.each([openAIInput, googleInput])('rejects empty audio from $type', async (input) => {
		const { adapter, create, synthesizeAudio } = setup()
		create.mockResolvedValue(new Response(new Uint8Array()))
		synthesizeAudio.mockResolvedValue(Buffer.alloc(0))
		await expect(adapter.generate(input)).rejects.toMatchObject({ code: 'invalid_response', outcome: 'unknown' })
	})

	it.each([openAIInput, googleInput])('does not repeat or fall back after $type errors', async (input) => {
		const { adapter, create, synthesizeAudio } = setup()
		create.mockRejectedValue(new Error('secret prompt / credential'))
		synthesizeAudio.mockRejectedValue(new Error('secret prompt / credential'))
		try {
			await adapter.generate(input)
			throw new Error('Expected rejection')
		} catch (error) {
			expect(error).toBeInstanceOf(TtsError)
			expect(error).toMatchObject({ code: 'request_failed', outcome: 'unknown' })
			expect(String(error)).not.toContain('secret')
		}
		expect(create.mock.calls.length + synthesizeAudio.mock.calls.length).toBe(1)
	})

	it('the real OpenAI SDK sends only one POST on 503', async () => {
		const fetch = jest.fn().mockResolvedValue(
			new Response('{}', {
				status: 503,
				headers: { 'content-type': 'application/json' },
			}),
		)
		const client = new OpenAI({ apiKey: 'test-key', fetch })
		await expect(new OpenAITtsProvider(() => client).generate(openAIInput)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
		})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
})
