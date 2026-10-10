import OpenAI, { toFile } from 'openai'
import { z } from 'zod'
import { ImageGenerationError } from './ImageGenerationError'
import {
	ImageGenerationInput,
	ImageGenerationProvider,
	ImageGenerationResult,
} from './ImageGenerationProvider.interface'

export const OPENAI_IMAGE_MODELS = [
	'gpt-image-2.5-sunburst',
	'gpt-image-2.5-sunburst-2026-09-08',
	'gpt-image-2.5-flare',
	'gpt-image-2.5-flare-2026-09-08',
] as const

const referenceSchema = z
	.object({
		bytes: z.custom<Buffer>(
			(value) => Buffer.isBuffer(value) && value.length > 0 && value.length <= 32 * 1024 * 1024,
		),
		mimeType: z.enum(['image/png', 'image/jpeg', 'image/webp']),
		purpose: z.string().trim().min(1),
	})
	.strict()

const inputSchema = z
	.object({
		model: z.enum(OPENAI_IMAGE_MODELS),
		prompt: z.string().trim().min(1),
		size: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
		quality: z.enum(['low', 'medium', 'high']).optional(),
		format: z.enum(['png', 'jpeg', 'webp']).optional(),
		references: z.array(referenceSchema).max(16).optional(),
		abortSignal: z.custom<AbortSignal>((value) => value instanceof AbortSignal).optional(),
	})
	.strict()

/** Images API: one completed original, no polling receipt, automatic retry or provider fallback.
 * A lost response cannot be retrieved through this API. Persistence belongs to the caller. */
export class OpenAIImageGenerationProvider implements ImageGenerationProvider {
	readonly name = 'openai'
	readonly models = OPENAI_IMAGE_MODELS

	constructor(private readonly getClient: () => Pick<OpenAI, 'images'> | null) {}

	isConfigured(): boolean {
		return this.getClient() !== null
	}

	/** Validate explicit pixel geometry and supported parameters before reserving a paid request. */
	validateInput(input: ImageGenerationInput): void {
		const parsed = inputSchema.safeParse(input)
		if (!parsed.success) {
			const fields = parsed.error.issues
				.flatMap((issue) =>
					issue.code === 'unrecognized_keys' ? issue.keys : [issue.path.join('.') || 'input'],
				)
				.join(', ')
			throw new ImageGenerationError(
				'invalid_input',
				`Unsupported or invalid OpenAI image parameters: ${fields}`,
				'not_sent',
			)
		}
		const { width, height } = parsed.data.size
		if (
			width % 16 ||
			height % 16 ||
			Math.max(width, height) > 3840 ||
			Math.max(width, height) / Math.min(width, height) > 3 ||
			width * height < 655360 ||
			width * height > 8294400
		) {
			throw new ImageGenerationError(
				'invalid_input',
				'OpenAI size requires multiples of 16, edges <=3840, aspect ratio <=3:1 and 655360..8294400 pixels',
				'not_sent',
			)
		}
		if (referencePrompt(input).length > 32000)
			throw new ImageGenerationError(
				'invalid_input',
				'OpenAI prompt including reference purposes exceeds 32000 characters',
				'not_sent',
			)
	}

	/** Use edits for ordered references and generations otherwise; disable the SDK's default retries.
	 * Abort/timeout after dispatch and malformed results are uncertain outcomes, never retry permission. */
	async generate(input: ImageGenerationInput): Promise<ImageGenerationResult> {
		this.validateInput(input)
		const parsed = inputSchema.parse(input)
		const client = this.getClient()
		if (!client) throw new ImageGenerationError('configuration', 'OpenAI API key is required', 'not_sent')
		if (input.abortSignal?.aborted)
			throw new ImageGenerationError('aborted', 'OpenAI image request aborted', 'not_sent')
		const format = input.format ?? 'png'
		const references = input.references ?? []
		// File preparation precedes dispatch. Do not include filenames or bytes in public errors.
		const files = await prepareFiles(references)
		const body = {
			model: input.model,
			prompt: referencePrompt(input),
			n: 1,
			size: `${parsed.size.width}x${parsed.size.height}` as `${number}x${number}`,
			output_format: format,
			...(parsed.quality ? { quality: parsed.quality } : {}),
		}
		const options = { maxRetries: 0, timeout: 180_000, signal: input.abortSignal }
		try {
			const response = files.length
				? await client.images.edit({ ...body, image: files }, options)
				: await client.images.generate(body, options)
			if (
				(response.size && String(response.size) !== body.size) ||
				(response.quality && input.quality && response.quality !== input.quality) ||
				(response.output_format && response.output_format !== format)
			)
				throw new ImageGenerationError(
					'invalid_response',
					'OpenAI response parameters do not match the request',
					'unknown',
				)
			const encoded = response.data?.length === 1 ? response.data[0].b64_json : undefined
			if (!encoded || encoded.length > 45 * 1024 * 1024 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded))
				throw new ImageGenerationError('invalid_response', 'Invalid OpenAI image response', 'unknown')
			const bytes = Buffer.from(encoded, 'base64')
			if (!bytes.length || bytes.length > 32 * 1024 * 1024 || bytes.toString('base64') !== encoded)
				throw new ImageGenerationError('invalid_response', 'Invalid OpenAI image bytes', 'unknown')
			return { status: 'ready', images: [{ bytes, contentType: `image/${format}` }] }
		} catch (error) {
			if (error instanceof ImageGenerationError) throw error
			const apiError = error instanceof OpenAI.APIError ? error : undefined
			const code = input.abortSignal?.aborted
				? 'aborted'
				: apiError?.code === 'content_policy_violation'
					? 'moderated'
					: 'request_failed'
			throw new ImageGenerationError(
				code,
				`OpenAI image ${code === 'moderated' ? 'rejected by moderation' : 'request failed'}`,
				'unknown',
				apiError?.status,
			)
		}
	}
}

/** File conversion errors precede the external request and must not expose reference contents. */
async function prepareFiles(references: NonNullable<ImageGenerationInput['references']>) {
	try {
		return await Promise.all(
			references.map((ref, index) =>
				toFile(ref.bytes, `reference-${index + 1}.${ref.mimeType.split('/')[1]}`, { type: ref.mimeType }),
			),
		)
	} catch {
		throw new ImageGenerationError('invalid_input', 'Cannot prepare OpenAI image references', 'not_sent')
	}
}

/** Preserve reference order and communicate roles without feature-specific concepts. */
function referencePrompt(input: ImageGenerationInput): string {
	return [input.prompt, ...(input.references ?? []).map((ref, index) => `Image ${index + 1}: ${ref.purpose}`)].join(
		'\n',
	)
}
