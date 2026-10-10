import { z } from 'zod'
import { Flux3HttpError, Flux3ImageAdapter, Flux3ImageInput } from '../fluxImageGeneration/flux3Image.adapter'
import { ImageGenerationError } from './ImageGenerationError'
import {
	ImageGenerationInput,
	ImageGenerationOperation,
	ImageGenerationProvider,
	ImageGenerationResult,
} from './ImageGenerationProvider.interface'

const referenceSchema = z
	.object({
		bytes: z.instanceof(Buffer).refine((bytes) => bytes.length > 0),
		mimeType: z.enum(['image/png', 'image/jpeg', 'image/webp']),
		purpose: z.string().trim().min(1),
	})
	.strict()

const inputSchema = z
	.object({
		model: z.literal('flux-3-image'),
		prompt: z.string().trim().min(1),
		size: z.object({ aspectRatio: z.enum(['4:3', '2:1']), resolution: z.literal('768sq') }).strict(),
		references: z.array(referenceSchema).max(10).optional(),
		abortSignal: z.custom<AbortSignal>((value) => value instanceof AbortSignal).optional(),
	})
	.strict()

const operationSchema = z
	.object({
		provider: z.literal('bfl'),
		model: z.literal('flux-3-image'),
		version: z.literal(1),
		data: z.object({ requestId: z.string().min(1), pollingUrl: z.string().url() }).strict(),
	})
	.strict()

/** Wraps existing FLUX HTTP operations. Area preset support is intentionally unchanged. */
export class FluxImageGenerationProvider implements ImageGenerationProvider {
	readonly name = 'bfl'
	readonly models = ['flux-3-image'] as const

	constructor(private readonly getAdapter: () => Flux3ImageAdapter | null) {}

	/** Lazy adapter creation permits deployments without a BFL key. */
	isConfigured(): boolean {
		return this.getAdapter() !== null
	}

	/** Rejects unsupported geometry, quality and output format before any HTTP call. */
	validateInput(input: ImageGenerationInput): void {
		const parsed = inputSchema.safeParse(input)
		if (!parsed.success) {
			const paths = parsed.error.issues.flatMap((issue) =>
				issue.code === 'unrecognized_keys' ? issue.keys : [issue.path.join('.') || 'input'],
			)
			const fields = [...new Set(paths)].join(', ')
			throw new ImageGenerationError(
				'invalid_input',
				`Unsupported or invalid FLUX image parameters: ${fields}`,
				'not_sent',
			)
		}
	}

	/** Submit once, returning a JSON receipt with BFL's regional polling URL. */
	async generate(input: ImageGenerationInput): Promise<ImageGenerationResult> {
		this.validateInput(input)
		const parsed = inputSchema.parse(input)
		const adapter = this.adapter()
		const fluxInput = toFluxInput(parsed)

		return this.call(
			async () => ({
				status: 'pending',
				operation: {
					provider: this.name,
					model: input.model,
					version: 1,
					data: await adapter.submit(fluxInput, input.abortSignal),
				},
			}),
			'unknown',
			input.abortSignal,
		)
	}

	/** One poll, and a download when ready. No waits or automatic retries. */
	async resume(operation: ImageGenerationOperation, abortSignal?: AbortSignal): Promise<ImageGenerationResult> {
		const parsed = operationSchema.safeParse(operation)
		if (!parsed.success)
			throw new ImageGenerationError('invalid_operation', 'Invalid FLUX operation receipt', 'existing_operation')
		const adapter = this.adapter()
		return this.call(
			async () => {
				const result = await adapter.poll(parsed.data.data, abortSignal)
				if (result.status === 'Ready')
					return { status: 'ready', images: [await adapter.download(result.sampleUrl, abortSignal)] }
				if (['Pending', 'Reasoning', 'Generating'].includes(result.status))
					return { status: 'pending', operation }
				const code = result.status.includes('Moderated') ? 'moderated' : 'operation_failed'
				throw new ImageGenerationError(code, `BFL task ended: ${result.status}`, 'existing_operation')
			},
			'existing_operation',
			abortSignal,
		)
	}

	private adapter(): Flux3ImageAdapter {
		const adapter = this.getAdapter()
		if (!adapter) throw new ImageGenerationError('configuration', 'BFL API key is required', 'not_sent')
		return adapter
	}

	private async call(
		call: () => Promise<ImageGenerationResult>,
		outcome: ImageGenerationError['outcome'],
		signal?: AbortSignal,
	): Promise<ImageGenerationResult> {
		if (signal?.aborted)
			throw new ImageGenerationError(
				'aborted',
				'Image request aborted',
				outcome === 'unknown' ? 'not_sent' : outcome,
			)
		try {
			return await call()
		} catch (error) {
			if (error instanceof ImageGenerationError) throw error
			const code = signal?.aborted
				? 'aborted'
				: error instanceof Flux3HttpError
					? 'request_failed'
					: 'invalid_response'
			throw new ImageGenerationError(
				code,
				`FLUX image ${code === 'aborted' ? 'request aborted' : 'request failed'}`,
				outcome,
				error instanceof Flux3HttpError ? error.statusCode : undefined,
			)
		}
	}
}

/** FLUX has no native purpose field; convey ordered reference roles as neutral prompt instructions. */
function toFluxInput(input: z.infer<typeof inputSchema>): Flux3ImageInput {
	const references = input.references ?? []
	const roles = references.length
		? [
				'Reference image purposes (in supplied order):',
				...references.map((ref, index) => `Image ${index + 1}: ${ref.purpose}`),
			]
		: []
	const images = references.map((ref) => `data:${ref.mimeType};base64,${ref.bytes.toString('base64')}`)
	return {
		prompt: [input.prompt, ...roles].join('\n'),
		aspectRatio: input.size.aspectRatio,
		resolution: input.size.resolution,
		grounding: false,
		...(images.length ? { images } : {}),
	}
}
