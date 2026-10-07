import { AxiosError } from 'axios'
import { Flux3ImageAdapter, Flux3ImageInput } from './flux3Image.adapter'

const input: Flux3ImageInput = {
	prompt: 'An illustrated scene',
	aspectRatio: '2:1',
	resolution: '768sq',
	grounding: false,
}
const externalRequest = { requestId: 'task-1', pollingUrl: 'https://api.eu1.bfl.ai/v1/get_result?id=task-1' }

describe('Flux3ImageAdapter', () => {
	const http = { request: jest.fn() }
	const adapter = new Flux3ImageAdapter('test-key', http)
	beforeEach(() => http.request.mockReset())

	it('submits only supported fields, references in order, and keeps the regional polling URL', async () => {
		http.request.mockResolvedValue({ data: { id: 'task-1', polling_url: externalRequest.pollingUrl } })
		await expect(
			adapter.submit({ ...input, images: ['https://example.com/a.png', 'base64-reference'] }),
		).resolves.toEqual(externalRequest)
		expect(http.request).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'POST',
				url: 'https://api.bfl.ai/v1/flux-3-image',
				maxRedirects: 0,
				timeout: 60_000,
				headers: { 'x-key': 'test-key', 'Content-Type': 'application/json' },
				data: {
					prompt: input.prompt,
					aspect_ratio: '2:1',
					resolution: '768sq',
					grounding: false,
					images: ['https://example.com/a.png', 'base64-reference'],
				},
			}),
		)
	})

	it('submits a sprite with no references and no unsupported dimensions or seed', async () => {
		http.request.mockResolvedValue({ data: { id: 'task-1', polling_url: externalRequest.pollingUrl } })
		await adapter.submit({ ...input, aspectRatio: '4:3' })
		expect(http.request.mock.calls[0][0].data).toEqual({
			prompt: input.prompt,
			aspect_ratio: '4:3',
			resolution: '768sq',
			grounding: false,
		})
	})

	it.each([
		{ ...input, prompt: ' ' },
		{ ...input, images: Array(11).fill('ref') },
	])('rejects invalid input before HTTP', async (invalid) => {
		await expect(adapter.submit(invalid)).rejects.toThrow()
		expect(http.request).not.toHaveBeenCalled()
	})

	it.each([
		'Pending',
		'Reasoning',
		'Generating',
		'Request Moderated',
		'Content Moderated',
		'Error',
		'Task not found',
	])('handles status %s without starting another generation', async (status) => {
		http.request.mockResolvedValue({ status: 200, data: { id: 'task-1', status, result: null } })
		await expect(adapter.poll(externalRequest)).resolves.toEqual({ status })
		expect(http.request).toHaveBeenCalledTimes(1)
		expect(http.request).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'GET',
				url: externalRequest.pollingUrl,
				headers: { 'x-key': 'test-key' },
			}),
		)
	})

	it('reads terminal status from an HTTP 503 body', async () => {
		http.request.mockResolvedValue({
			status: 503,
			data: { id: 'task-1', status: 'Error', result: { error: 'generation failed' } },
		})
		await expect(adapter.poll(externalRequest)).resolves.toEqual({ status: 'Error' })
		const accepts = http.request.mock.calls[0][0].validateStatus
		expect(accepts(503)).toBe(true)
		expect(accepts(429)).toBe(false)
	})

	it('treats a non-task 503 as an HTTP failure', async () => {
		http.request.mockResolvedValue({ status: 503, data: 'unavailable' })
		await expect(adapter.poll(externalRequest)).rejects.toThrow('HTTP 503')
	})

	it('returns the signed sample URL when Ready', async () => {
		http.request.mockResolvedValue({
			status: 200,
			data: {
				id: 'task-1',
				status: 'Ready',
				result: { sample: 'https://delivery.example.com/image?signature=abc' },
			},
		})
		await expect(adapter.poll(externalRequest)).resolves.toEqual({
			status: 'Ready',
			sampleUrl: 'https://delivery.example.com/image?signature=abc',
		})
	})

	it.each([
		{ id: 'task-1', status: 'Ready' },
		{ id: 'other-task', status: 'Pending' },
		{ id: 'task-1', status: 'Unknown' },
	])('rejects malformed or mismatched polling responses', async (data) => {
		http.request.mockResolvedValue({ status: 200, data })
		await expect(adapter.poll(externalRequest)).rejects.toThrow()
	})

	it('downloads original bytes with a size limit and without the API key', async () => {
		const bytes = Buffer.from([137, 80, 78, 71])
		http.request.mockResolvedValue({ data: bytes, headers: { 'content-type': 'image/png; charset=binary' } })
		await expect(adapter.download('https://delivery.example.com/image')).resolves.toEqual({
			bytes,
			contentType: 'image/png',
		})
		const config = http.request.mock.calls[0][0]
		expect(config).toMatchObject({
			responseType: 'arraybuffer',
			timeout: 120_000,
			maxContentLength: 32 * 1024 * 1024,
		})
		expect(config.headers).toBeUndefined()
	})

	it('rejects an empty download', async () => {
		http.request.mockResolvedValue({ data: Buffer.alloc(0), headers: {} })
		await expect(adapter.download('https://delivery.example.com/image')).rejects.toThrow('empty')
	})

	it.each(['http://api.bfl.ai/result', 'https://evil.example/result', 'https://api.bfl.ai.evil.example/result'])(
		'refuses to send the key to %s',
		async (pollingUrl) => {
			await expect(adapter.poll({ ...externalRequest, pollingUrl })).rejects.toThrow()
			expect(http.request).not.toHaveBeenCalled()
		},
	)

	it('does not retry POST or leak Axios config in errors', async () => {
		http.request.mockRejectedValue(new AxiosError('secret URL and key', 'ETIMEDOUT'))
		await expect(adapter.submit(input)).rejects.toThrow('FLUX 3 submit failed')
		expect(http.request).toHaveBeenCalledTimes(1)
	})
})
