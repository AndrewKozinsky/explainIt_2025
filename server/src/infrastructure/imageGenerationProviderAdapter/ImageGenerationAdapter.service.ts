import { ImageGenerationError } from './ImageGenerationError'
import {
	ImageGenerationInput,
	ImageGenerationOperation,
	ImageGenerationProvider,
	ImageGenerationResult,
} from './ImageGenerationProvider.interface'

/** Routes by exact model; never substitutes models or repeats an external call. */
export class ImageGenerationAdapterService {
	constructor(private readonly providers: readonly ImageGenerationProvider[]) {}

	/** Checks credentials without starting generation. */
	isConfigured(model: string): boolean {
		return this.providerFor(model).isConfigured()
	}

	/** Validate before the consumer reserves submission durably. */
	validateInput(input: ImageGenerationInput): void {
		const provider = this.providerFor(input.model)

		try {
			provider.validateInput(input)
		} catch (error) {
			if (error instanceof ImageGenerationError) throw error
			throw new ImageGenerationError('invalid_input', 'Invalid image generation parameters', 'not_sent')
		}
	}

	/** One submission. Persist a pending receipt before scheduling continuation. */
	async generate(input: ImageGenerationInput): Promise<ImageGenerationResult> {
		this.validateInput(input)
		const provider = this.providerFor(input.model)
		this.assertConfigured(provider)
		this.assertNotAborted(input.abortSignal, 'not_sent')

		return this.normalize(() => provider.generate(input), 'unknown')
	}

	/** Continue only the provider/model recorded in the receipt; original references are not needed. */
	async resume(operation: ImageGenerationOperation, abortSignal?: AbortSignal): Promise<ImageGenerationResult> {
		const provider = this.providerFor(operation.model)
		if (provider.name !== operation.provider) {
			throw new ImageGenerationError(
				'invalid_operation',
				'Image operation provider/model mismatch',
				'existing_operation',
			)
		}

		if (!provider.resume) {
			throw new ImageGenerationError(
				'recovery_unsupported',
				'Image provider does not support request recovery',
				'existing_operation',
			)
		}

		this.assertConfigured(provider)
		this.assertNotAborted(abortSignal, 'existing_operation')

		return this.normalize(() => provider.resume!(operation, abortSignal), 'existing_operation')
	}

	private providerFor(model: string): ImageGenerationProvider {
		const provider = this.providers.find((item) => item.models.includes(model))
		if (!provider)
			throw new ImageGenerationError('unsupported_model', 'Unsupported image generation model', 'not_sent')

		return provider
	}

	private assertConfigured(provider: ImageGenerationProvider): void {
		if (!provider.isConfigured())
			throw new ImageGenerationError('configuration', 'Image provider credentials are missing', 'not_sent')
	}

	private assertNotAborted(signal: AbortSignal | undefined, outcome: ImageGenerationError['outcome']): void {
		if (signal?.aborted) throw new ImageGenerationError('aborted', 'Image request aborted', outcome)
	}

	private async normalize(
		call: () => Promise<ImageGenerationResult>,
		outcome: ImageGenerationError['outcome'],
	): Promise<ImageGenerationResult> {
		try {
			return await call()
		} catch (error) {
			if (error instanceof ImageGenerationError) throw error
			throw new ImageGenerationError('request_failed', 'Image provider request failed', outcome)
		}
	}
}
