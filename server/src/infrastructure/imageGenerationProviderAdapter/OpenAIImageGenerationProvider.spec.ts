import OpenAI from 'openai'
import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'
import { ImageGenerationInput } from './ImageGenerationProvider.interface'
import { OpenAIImageGenerationProvider } from './OpenAIImageGenerationProvider'

const input: ImageGenerationInput = {
	model: 'gpt-image-2.5-sunburst-2026-09-08',
	prompt: 'A landscape',
	size: { width: 1152, height: 576 },
	quality: 'low',
	format: 'png',
}
function harness() {
	const bytes = Buffer.from('original-image')
	const images = {
		generate: jest.fn().mockResolvedValue({ data: [{ b64_json: bytes.toString('base64') }] }),
		edit: jest.fn(),
	}
	const client = { images } as unknown as Pick<OpenAI, 'images'>
	const provider = new OpenAIImageGenerationProvider(() => client)

	return { bytes, images, provider, adapter: new ImageGenerationAdapterService([provider]) }
}
describe('OpenAIImageGenerationProvider', () => {
	it('disables retries in the actual SDK even when the server responds with a retryable 503', async () => {
		const fetch = jest.fn().mockResolvedValue(
			new Response(JSON.stringify({ error: { message: 'private details', type: 'server_error' } }), {
				status: 503,
				headers: { 'content-type': 'application/json' },
			}),
		)
		const client = new OpenAI({ apiKey: 'test-key', fetch })
		const provider = new OpenAIImageGenerationProvider(() => client)
		await expect(provider.generate(input)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
			statusCode: 503,
		})

		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('returns original bytes without a fake receipt, polling or retries', async () => {
		const { images, bytes, adapter } = harness()
		const signal = new AbortController().signal
		await expect(adapter.generate({ ...input, abortSignal: signal })).resolves.toEqual({
			status: 'ready',
			images: [{ bytes, contentType: 'image/png' }],
		})
		expect(images.generate).toHaveBeenCalledWith(
			{ model: input.model, prompt: input.prompt, size: '1152x576', quality: 'low', output_format: 'png', n: 1 },
			{ maxRetries: 0, timeout: 180_000, signal },
		)
		expect(images.edit).not.toHaveBeenCalled()
		await expect(
			adapter.resume({ provider: 'openai', model: input.model, version: 1, data: {} }),
		).rejects.toMatchObject({ code: 'recovery_unsupported' })
	})
	it('uses edits with ordered MIME-preserving references and their generic purposes', async () => {
		const { images, bytes, adapter } = harness()
		images.edit.mockResolvedValue({ data: [{ b64_json: bytes.toString('base64') }] })
		await adapter.generate({
			...input,
			references: [
				{ bytes: Buffer.from('first'), mimeType: 'image/jpeg', purpose: 'Subject identity' },
				{ bytes: Buffer.from('second'), mimeType: 'image/png', purpose: 'Visual style' },
			],
		})
		const [body, options] = images.edit.mock.calls[0]
		expect(body.prompt).toContain('Image 1: Subject identity\nImage 2: Visual style')
		expect(await body.image[0].text()).toBe('first')
		expect(body.image[0].type).toBe('image/jpeg')
		expect(await body.image[1].text()).toBe('second')
		expect(options.maxRetries).toBe(0)
		expect(images.generate).not.toHaveBeenCalled()
	})
	it.each([
		{ size: { width: 1000, height: 500 } },
		{ size: { width: 480, height: 360 } },
		{ size: { width: 4096, height: 1024 } },
		{ size: { width: 3072, height: 3072 } },
		{ size: { aspectRatio: '2:1', resolution: '768sq' } },
		{ quality: 'xhigh' },
		{ quality: 'invalid' },
		{ format: 'gif' },
		{ prompt: ' ' },
		{ references: [{ bytes: Buffer.alloc(0), mimeType: 'image/png', purpose: 'Style' }] },
		{ references: [{ bytes: Buffer.from('x'), mimeType: 'image/svg+xml', purpose: 'Style' }] },
		{ references: Array(17).fill({ bytes: Buffer.from('x'), mimeType: 'image/png', purpose: 'Style' }) },
	])('rejects unsupported parameters before external calls: %j', async (change) => {
		const { images, adapter } = harness()
		await expect(adapter.generate({ ...input, ...change } as ImageGenerationInput)).rejects.toMatchObject({
			code: 'invalid_input',
			outcome: 'not_sent',
		})
		expect(images.generate).not.toHaveBeenCalled()
		expect(images.edit).not.toHaveBeenCalled()
	})
	it('enforces prompt length after adding reference purpose instructions', () => {
		const { provider } = harness()
		expect(() =>
			provider.validateInput({
				...input,
				prompt: 'x'.repeat(31999),
				references: [{ bytes: Buffer.from('x'), mimeType: 'image/png', purpose: 'Style' }],
			}),
		).toThrow('32000')
	})
	it.each(['low', 'medium', 'high'])('preserves explicit quality %s', async (quality) => {
		const { images, adapter } = harness()
		await adapter.generate({ ...input, quality })
		expect(images.generate.mock.calls[0][0].quality).toBe(quality)
	})
	it('handles missing credentials and a pre-aborted signal without sending', async () => {
		await expect(new OpenAIImageGenerationProvider(() => null).generate(input)).rejects.toMatchObject({
			code: 'configuration',
			outcome: 'not_sent',
		})
		const { images, adapter } = harness()
		await expect(adapter.generate({ ...input, abortSignal: AbortSignal.abort() })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'not_sent',
		})
		expect(images.generate).not.toHaveBeenCalled()
	})
	it.each([
		{ data: [] },
		{ data: [{ b64_json: 'bad!' }] },
		{ data: [{ b64_json: 'eA' }] },
		{ data: [{ url: 'https://example.com' }] },
		{ data: [{ b64_json: 'eA==' }], size: '1024x1024' },
		{ data: [{ b64_json: 'eA==' }], quality: 'high' },
		{ data: [{ b64_json: 'eA==' }], output_format: 'jpeg' },
	])('rejects ambiguous malformed results: %j', async (response) => {
		const { images, adapter } = harness()
		images.generate.mockResolvedValue(response)
		await expect(adapter.generate(input)).rejects.toMatchObject({ code: 'invalid_response', outcome: 'unknown' })
		expect(images.generate).toHaveBeenCalledTimes(1)
	})
	it('redacts SDK errors and never repeats an uncertain request', async () => {
		const { images, adapter } = harness()
		images.generate.mockRejectedValue(new Error('secret API key and prompt'))
		await expect(adapter.generate(input)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
			message: 'OpenAI image request failed',
		})
		expect(images.generate).toHaveBeenCalledTimes(1)
	})
	it('normalizes moderation and status without leaking SDK response bodies', async () => {
		const { images, adapter } = harness()
		images.generate.mockRejectedValue(
			new OpenAI.APIError(
				400,
				{ code: 'content_policy_violation', message: 'secret prompt' },
				'secret body',
				new Headers(),
			),
		)
		await expect(adapter.generate(input)).rejects.toMatchObject({
			code: 'moderated',
			statusCode: 400,
			outcome: 'unknown',
		})
	})
	it('marks cancellation after dispatch as uncertain', async () => {
		const { images, adapter } = harness()
		const controller = new AbortController()
		images.generate.mockImplementation(async () => {
			controller.abort()
			throw new Error('cancelled')
		})
		await expect(adapter.generate({ ...input, abortSignal: controller.signal })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'unknown',
		})
	})
})
