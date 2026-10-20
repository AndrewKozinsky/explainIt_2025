jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { MainConfigService } from '../mainConfig/mainConfig.service'
import { SonioxTtsProvider } from '../ttsProviderAdapter/SonioxTtsProvider'
import { TtsAdapterService } from '../ttsProviderAdapter/TtsAdapter.service'
import { SonioxTtsInput } from '../ttsProviderAdapter/TtsProvider.interface'
import { SonioxTtsService } from './sonioxTts.service'

const input: SonioxTtsInput = {
	type: 'Soniox',
	text: 'Привет!',
	model: 'tts-rt-v2',
	language: 'ru',
	voice: 'Daniel',
	audioFormat: 'mp3',
}
const config = (apiKey: string | null = 'test-key') =>
	({ get: () => ({ soniox: { apiKey } }) }) as unknown as MainConfigService

describe('Soniox TTS', () => {
	let fetchMock: jest.SpyInstance

	beforeEach(() => {
		fetchMock = jest.spyOn(globalThis, 'fetch')
	})

	afterEach(() => jest.restoreAllMocks())

	it('routes Soniox through the adapter and maps REST settings, preserving binary audio', async () => {
		const bytes = Buffer.from([0, 255, 128])
		fetchMock.mockResolvedValue(new Response(bytes))
		const service = new SonioxTtsService(config())
		const other = { generate: jest.fn() }
		const adapter = new TtsAdapterService(other, other, new SonioxTtsProvider(() => service))

		expect(
			await adapter.generate({
				...input,
				audioFormat: 'opus',
				sampleRate: 24000,
				bitrate: 64000,
				speed: 0.8,
				reduceSilence: true,
				clientReferenceId: 'test',
				timeoutMs: 1234,
			}),
		).toEqual(bytes)
		const [url, options] = fetchMock.mock.calls[0]
		expect(url).toBe('https://tts-rt.soniox.com/tts')
		expect(options).toMatchObject({
			method: 'POST',
			headers: { Authorization: 'Bearer test-key', 'Content-Type': 'application/json' },
			signal: expect.any(AbortSignal),
		})
		expect(JSON.parse(options.body)).toEqual({
			text: input.text,
			model: input.model,
			language: 'ru',
			voice: 'Daniel',
			audio_format: 'opus',
			sample_rate: 24000,
			bitrate: 64000,
			speed: 0.8,
			reduce_silence: true,
			client_reference_id: 'test',
		})
		expect(other.generate).not.toHaveBeenCalled()
	})

	it('provides simple generation defaults', async () => {
		fetchMock.mockResolvedValue(new Response(Buffer.from('audio')))
		await new SonioxTtsService(config()).generateAudio('Hello', 'en')
		expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
			text: 'Hello',
			model: 'tts-rt-v2',
			language: 'en',
			voice: 'Daniel',
			audio_format: 'mp3',
		})
	})

	it('rejects a missing key without a request', async () => {
		const { type, text, ...options } = input
		await expect(new SonioxTtsService(config(null)).synthesizeAudio(text, options)).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
		})
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it.each([
		{ text: '' },
		{ text: 'x'.repeat(5001) },
		{ speed: 0.6 },
		{ audioFormat: 'ogg' },
		{ timeoutMs: 0 },
		{ voice: '' },
		{ instructions: 'calm' },
	])('rejects invalid parameters before obtaining the service: %j', async (override) => {
		const getService = jest.fn()
		await expect(
			new SonioxTtsProvider(getService).generate({ ...input, ...override } as SonioxTtsInput),
		).rejects.toMatchObject({ code: 'invalid_input', outcome: 'not_sent' })
		expect(getService).not.toHaveBeenCalled()
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('rejects cancellation before constructing a service', async () => {
		const controller = new AbortController()
		controller.abort()
		const getService = jest.fn()
		await expect(
			new SonioxTtsProvider(getService).generate({ ...input, abortSignal: controller.signal }),
		).rejects.toMatchObject({ code: 'aborted', outcome: 'not_sent' })
		expect(getService).not.toHaveBeenCalled()
	})

	it.each(['cancel', 'timeout'])('keeps %s active while reading the audio body', async (mode) => {
		const controller = new AbortController()
		fetchMock.mockImplementation(async (_url, options) => ({
			ok: true,
			arrayBuffer: () =>
				new Promise((_resolve, reject) => {
					options.signal.addEventListener('abort', () => reject(new Error('secret')), { once: true })
					if (mode === 'cancel') controller.abort()
				}),
		}))
		// Keep the event loop alive while AbortSignal.timeout's unreferenced timer fires.
		const keepAlive = setTimeout(() => {}, 1000)
		try {
			await expect(
				new SonioxTtsProvider(() => new SonioxTtsService(config())).generate({
					...input,
					timeoutMs: 20,
					abortSignal: controller.signal,
				}),
			).rejects.toMatchObject({ code: mode === 'cancel' ? 'aborted' : 'request_failed', outcome: 'unknown' })
		} finally {
			clearTimeout(keepAlive)
		}
		expect(fetchMock).toHaveBeenCalledTimes(1)
	})

	it.each([401, 429, 503])('does not retry HTTP %s or expose response secrets', async (status) => {
		fetchMock.mockResolvedValue(new Response('secret', { status }))
		const result = new SonioxTtsProvider(() => new SonioxTtsService(config())).generate(input)
		await expect(result).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
			message: 'Soniox TTS request failed',
		})
		expect(fetchMock).toHaveBeenCalledTimes(1)
	})

	it('rejects an empty response', async () => {
		fetchMock.mockResolvedValue(new Response(new Uint8Array()))
		await expect(new SonioxTtsProvider(() => new SonioxTtsService(config())).generate(input)).rejects.toMatchObject(
			{ code: 'invalid_response', outcome: 'unknown' },
		)
	})

	it('hides configuration errors', async () => {
		await expect(
			new SonioxTtsProvider(() => {
				throw new Error('secret')
			}).generate(input),
		).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
			message: 'Soniox TTS configuration is invalid',
		})
	})
})
