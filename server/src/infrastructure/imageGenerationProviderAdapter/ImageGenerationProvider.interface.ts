/** Ordered reference. Providers convey purpose through their native fields or a numbered prompt instruction. */
export type ImageGenerationReference = {
	bytes: Buffer
	mimeType: string
	purpose: string
}

/** Explicit geometry: pixels must never be silently converted to a provider's area preset. */
export type ImageGenerationSize = { width: number; height: number } | { aspectRatio: string; resolution: string }

/** Provider-neutral input; model and parameter values are validated before sending a paid request. */
export type ImageGenerationInput = {
	model: string
	prompt: string
	references?: ImageGenerationReference[]
	size: ImageGenerationSize
	quality?: string
	format?: 'png' | 'jpeg' | 'webp'
	abortSignal?: AbortSignal
}

/** JSON-only provider receipt. Persist unchanged; no URLs or recovery handles are required globally. */
export type ImageGenerationOperation = {
	provider: string
	model: string
	version: number
	data: Record<string, ImageGenerationJson>
}

export type ImageGenerationJson =
	string | number | boolean | null | ImageGenerationJson[] | { [key: string]: ImageGenerationJson }

/** Original output bytes. MIME may be absent; consumers must inspect the actual file before publication. */
export type GeneratedImage = { bytes: Buffer; contentType: string | null }

/** A synchronous provider may return ready immediately, without inventing a resumable operation. */
export type ImageGenerationResult =
	{ status: 'ready'; images: GeneratedImage[] } | { status: 'pending'; operation: ImageGenerationOperation }

/** External operations only. No persistence, scheduling, publication, retries or provider fallback. */
export interface ImageGenerationProvider {
	readonly name: string
	readonly models: readonly string[]
	isConfigured(): boolean
	validateInput(input: ImageGenerationInput): void
	generate(input: ImageGenerationInput): Promise<ImageGenerationResult>
	/** Optional: absence means this provider cannot recover an earlier request. */
	resume?(operation: ImageGenerationOperation, abortSignal?: AbortSignal): Promise<ImageGenerationResult>
}
