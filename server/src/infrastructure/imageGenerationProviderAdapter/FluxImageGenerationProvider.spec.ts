import { AxiosError } from 'axios'
import { Flux3ImageAdapter } from '../fluxImageGeneration/flux3Image.adapter'
import { FluxImageGenerationProvider } from './FluxImageGenerationProvider'
import { ImageGenerationAdapterService } from './ImageGenerationAdapter.service'
import { ImageGenerationInput, ImageGenerationOperation } from './ImageGenerationProvider.interface'

const input: ImageGenerationInput = {
	model: 'flux-3-image',
	prompt: 'Landscape',
	size: { aspectRatio: '2:1', resolution: '768sq' },
}
const receipt: ImageGenerationOperation = {
	provider: 'bfl',
	model: input.model,
	version: 1,
	data: { requestId: 'task', pollingUrl: 'https://api.eu1.bfl.ai/result?id=task' },
}

function harness() {
	const http = { request: jest.fn() }
	const provider = new FluxImageGenerationProvider(() => new Flux3ImageAdapter('test-key', http))
	return { http, provider, adapter: new ImageGenerationAdapterService([provider]) }
}

describe('FluxImageGenerationProvider', () => {
	it('converts bytes to ordered data URIs and returns a serializable receipt', async () => {
		const { http, adapter } = harness()
		http.request.mockResolvedValue({ data: { id: 'task', polling_url: receipt.data.pollingUrl } })
		const signal = new AbortController().signal
		await expect(
			adapter.generate({
				...input,
				abortSignal: signal,
				references: [
					{ bytes: Buffer.from('first'), mimeType: 'image/png', purpose: 'Identity' },
					{ bytes: Buffer.from('second'), mimeType: 'image/jpeg', purpose: 'Style' },
				],
			}),
		).resolves.toEqual({ status: 'pending', operation: receipt })
		expect(http.request).toHaveBeenCalledWith(
			expect.objectContaining({
				signal,
				data: {
					prompt: 'Landscape\nReference image purposes (in supplied order):\nImage 1: Identity\nImage 2: Style',
					aspect_ratio: '2:1',
					resolution: '768sq',
					grounding: false,
					images: ['data:image/png;base64,Zmlyc3Q=', 'data:image/jpeg;base64,c2Vjb25k'],
				},
			}),
		)
	})

	it.each([
		{ size: { width: 1024, height: 1024 } },
		{ size: { aspectRatio: '1:1', resolution: '768sq' } },
		{ size: { aspectRatio: '2:1', resolution: '1536sq' } },
		{ quality: 'high' },
		{ format: 'png' as const },
		{ prompt: ' ' },
		{ references: [{ bytes: Buffer.alloc(0), mimeType: 'image/png', purpose: 'Style' }] },
		{ references: [{ bytes: Buffer.from('ref'), mimeType: 'image/gif', purpose: 'Style' }] },
		{ references: [{ bytes: Buffer.from('ref'), mimeType: 'image/png', purpose: '' }] },
		{ references: Array(11).fill({ bytes: Buffer.from('ref'), mimeType: 'image/png', purpose: 'Style' }) },
	])('rejects unsupported or invalid parameters before any HTTP call: %j', async (override) => {
		const { http, adapter } = harness()
		await expect(adapter.generate({ ...input, ...override })).rejects.toMatchObject({
			code: 'invalid_input',
			outcome: 'not_sent',
		})
		expect(http.request).not.toHaveBeenCalled()
	})

	it('names unsupported quality and format explicitly', () => {
		const { adapter } = harness()
		expect(() => adapter.validateInput({ ...input, quality: 'high', format: 'png' })).toThrow('quality, format')
	})

	it.each(['Pending', 'Reasoning', 'Generating'])(
		'normalizes %s with the same receipt and no POST',
		async (status) => {
			const { http, adapter } = harness()
			http.request.mockResolvedValue({ status: 200, data: { id: 'task', status } })
			await expect(adapter.resume(JSON.parse(JSON.stringify(receipt)))).resolves.toEqual({
				status: 'pending',
				operation: receipt,
			})
			expect(http.request).toHaveBeenCalledTimes(1)
			expect(http.request.mock.calls[0][0].method).toBe('GET')
		},
	)

	it('downloads original output bytes without API credentials and forwards cancellation to poll/download', async () => {
		const { http, adapter } = harness()
		const bytes = Buffer.from('original output')
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'task', status: 'Ready', result: { sample: 'https://delivery.example/image' } },
		})
		http.request.mockResolvedValueOnce({ data: bytes, headers: { 'content-type': 'image/png' } })
		const signal = new AbortController().signal
		await expect(adapter.resume(receipt, signal)).resolves.toEqual({
			status: 'ready',
			images: [{ bytes, contentType: 'image/png' }],
		})
		expect(http.request.mock.calls.map(([config]) => config.signal)).toEqual([signal, signal])
		expect(http.request.mock.calls[1][0].headers).toBeUndefined()
	})

	it.each(['Content Moderated', 'Request Moderated', 'Error', 'Task not found'])(
		'normalizes terminal %s, including HTTP 503',
		async (status) => {
			const { http, adapter } = harness()
			http.request.mockResolvedValue({ status: 503, data: { id: 'task', status } })
			await expect(adapter.resume(receipt)).rejects.toMatchObject({
				code: status.includes('Moderated') ? 'moderated' : 'operation_failed',
				outcome: 'existing_operation',
			})
			expect(http.request).toHaveBeenCalledTimes(1)
		},
	)

	it.each([
		{ ...receipt, version: 2 },
		{ ...receipt, data: { requestId: 'task' } },
		{ ...receipt, data: { ...receipt.data, pollingUrl: 'https://evil.example/result' } },
	])('rejects invalid receipts without sending credentials', async (operation) => {
		const { http, adapter } = harness()
		await expect(adapter.resume(operation)).rejects.toThrow()
		expect(http.request).not.toHaveBeenCalled()
	})

	it('retains an uncertain outcome after timeout and never repeats POST', async () => {
		const { http, adapter } = harness()
		http.request.mockRejectedValue(new AxiosError('secret API key and signed URL', 'ETIMEDOUT'))
		await expect(adapter.generate(input)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'unknown',
			message: 'FLUX image request failed',
		})
		expect(http.request).toHaveBeenCalledTimes(1)
	})

	it('treats a malformed submit response as unknown, because generation may have been accepted', async () => {
		const { http, adapter } = harness()
		http.request.mockResolvedValue({ data: { id: 'task' } })
		await expect(adapter.generate(input)).rejects.toMatchObject({ code: 'invalid_response', outcome: 'unknown' })
		expect(http.request).toHaveBeenCalledTimes(1)
	})

	it('cancellation during POST remains uncertain', async () => {
		const { http, adapter } = harness()
		const controller = new AbortController()
		http.request.mockImplementation(async () => {
			controller.abort()
			throw new AxiosError('canceled')
		})
		await expect(adapter.generate({ ...input, abortSignal: controller.signal })).rejects.toMatchObject({
			code: 'aborted',
			outcome: 'unknown',
		})
		expect(http.request).toHaveBeenCalledTimes(1)
	})

	it('preserves HTTP status without leaking SDK details', async () => {
		const { http, adapter } = harness()
		http.request.mockRejectedValue(
			new AxiosError('secret', undefined, undefined, undefined, { status: 429 } as never),
		)
		await expect(adapter.resume(receipt)).rejects.toMatchObject({
			code: 'request_failed',
			outcome: 'existing_operation',
			statusCode: 429,
		})
	})

	it('supports missing configuration without instantiating an HTTP client', async () => {
		const adapter = new ImageGenerationAdapterService([new FluxImageGenerationProvider(() => null)])
		expect(adapter.isConfigured(input.model)).toBe(false)
		await expect(adapter.generate(input)).rejects.toMatchObject({ code: 'configuration' })
	})
})
