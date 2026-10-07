import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { z } from 'zod'

const flux3ImageGenerationInputSchema = z.object({
	prompt: z.string().trim().min(1),
	aspectRatio: z.enum(['4:3', '2:1']),
	resolution: z.literal('768sq'),
	grounding: z.literal(false),
	images: z.array(z.string().min(1)).min(1).max(10).optional(),
})

export type Flux3ImageInput = z.infer<typeof flux3ImageGenerationInputSchema>
export type Flux3Request = { requestId: string; pollingUrl: string }
export type Flux3PollResult =
	| { status: 'Pending' | 'Reasoning' | 'Generating' }
	| { status: 'Ready'; sampleUrl: string }
	| { status: 'Request Moderated' | 'Content Moderated' | 'Error' | 'Task not found' }

const submitSchema = z.object({ id: z.string().min(1), polling_url: z.string().url() })
const pollSchema = z.object({
	id: z.string().min(1),
	status: z.enum([
		'Pending',
		'Reasoning',
		'Generating',
		'Ready',
		'Request Moderated',
		'Content Moderated',
		'Error',
		'Task not found',
	]),
	result: z.unknown().optional(),
})

export class Flux3HttpError extends Error {
	constructor(
		readonly operation: string,
		readonly statusCode?: number,
	) {
		super(`FLUX 3 ${operation} failed${statusCode ? ` (HTTP ${statusCode})` : ''}`)
	}
}

/** Single HTTP operations. Poll scheduling and retries belong to the future worker. */
export class Flux3ImageAdapter {
	constructor(
		private readonly apiKey: string,
		private readonly http: Pick<AxiosInstance, 'request'> = axios.create(),
	) {
		if (!apiKey.trim()) throw new Error('BFL API key is required')
	}

	validateInput(input: Flux3ImageInput): void {
		flux3ImageGenerationInputSchema.parse(input)
	}

	async submit(input: Flux3ImageInput): Promise<Flux3Request> {
		const parsed = flux3ImageGenerationInputSchema.parse(input)
		const response = await this.request('submit', {
			method: 'POST',
			url: 'https://api.bfl.ai/v1/flux-3-image',
			headers: { 'x-key': this.apiKey, 'Content-Type': 'application/json' },
			data: {
				prompt: parsed.prompt,
				aspect_ratio: parsed.aspectRatio,
				resolution: parsed.resolution,
				grounding: parsed.grounding,
				...(parsed.images ? { images: parsed.images } : {}),
			},
		})
		const data = submitSchema.parse(response.data)
		assertPollingUrl(data.polling_url)
		return { requestId: data.id, pollingUrl: data.polling_url }
	}

	async poll(request: Flux3Request): Promise<Flux3PollResult> {
		assertPollingUrl(request.pollingUrl)
		const response = await this.request(
			'poll',
			{
				method: 'GET',
				url: request.pollingUrl,
				headers: { 'x-key': this.apiKey },
			},
			true,
		)
		// BFL can return a terminal task status in a normal JSON body with HTTP 503.
		const parsed = pollSchema.safeParse(response.data)
		if (!parsed.success && response.status === 503) throw new Flux3HttpError('poll', 503)
		const data = parsed.success ? parsed.data : pollSchema.parse(response.data)
		if (data.id !== request.requestId) throw new Error('FLUX 3 polling task id mismatch')
		if (data.status !== 'Ready') return { status: data.status }
		const result = z.object({ sample: z.string().url() }).safeParse(data.result)
		if (!result.success) throw new Error('FLUX 3 Ready response has no valid sample URL')
		assertHttpsUrl(result.data.sample)
		return { status: 'Ready', sampleUrl: result.data.sample }
	}

	async download(sampleUrl: string): Promise<{ bytes: Buffer; contentType: string | null }> {
		assertHttpsUrl(sampleUrl)
		const response = await this.request('download', {
			method: 'GET',
			url: sampleUrl,
			responseType: 'arraybuffer',
			timeout: 120_000,
			maxContentLength: 32 * 1024 * 1024,
		})
		const bytes = Buffer.from(response.data)
		if (!bytes.length) throw new Error('FLUX 3 downloaded an empty result')
		const contentType = response.headers['content-type']
		return { bytes, contentType: typeof contentType === 'string' ? contentType.split(';')[0] : null }
	}

	private async request(operation: string, config: AxiosRequestConfig, allow503 = false) {
		try {
			return await this.http.request({
				timeout: 60_000,
				maxRedirects: 0,
				validateStatus: (status) => (status >= 200 && status < 300) || (allow503 && status === 503),
				...config,
			})
		} catch (error) {
			// Axios errors contain the API key and signed URLs in config; do not propagate them.
			throw new Flux3HttpError(operation, axios.isAxiosError(error) ? error.response?.status : undefined)
		}
	}
}

function assertHttpsUrl(value: string): URL {
	const url = new URL(value)
	if (url.protocol !== 'https:' || url.username || url.password || url.port) {
		throw new Error('FLUX 3 URL must use HTTPS without credentials or a custom port')
	}
	return url
}

function assertPollingUrl(value: string): void {
	const url = assertHttpsUrl(value)

	if (url.hostname !== 'api.bfl.ai' && !/^api\.[a-z0-9-]+\.bfl\.ai$/.test(url.hostname)) {
		throw new Error('FLUX 3 polling URL must belong to the BFL API')
	}
}
