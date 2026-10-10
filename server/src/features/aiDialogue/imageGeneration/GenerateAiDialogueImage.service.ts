import { Injectable, Optional } from '@nestjs/common'
import { UnrecoverableError } from 'bullmq'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { ImageGenerationError } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationError'
import { buildImageGenerationInput, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'
import { ImageGenerationAssets } from './ImageGenerationAssets'
import { submitImageGenerationRequest } from './submitImageGenerationRequest'

export type ImageGenerationStepResult = { done: true } | { done: false; delayMs: number }

@Injectable()
export class GenerateAiDialogueImage {
	constructor(
		private readonly repository: ImageGenerationWorkerRepository,
		private readonly requests: ImageGenerationRequestRepository,
		private readonly adapter: ImageGenerationAdapterService,
		@Optional() private readonly assets?: ImageGenerationAssets,
	) {}

	/** Prepare dependencies, reserve a durable output key, generate and publish the original.
	 * On restart only R2/DB publication can resume: Images API has no external polling/retrieval receipt.
	 * Missing results after claim require manual review, never another automatic paid request.
	 * Deleted/terminal jobs are skipped. Text dialogue generation runs independently. */
	async processStep(id: number): Promise<ImageGenerationStepResult> {
		const job = await this.repository.findJob(id)
		if (!job || job.status === 'ready' || job.status === 'failed') return { done: true }
		if (!this.assets) return { done: false, delayMs: 60_000 }

		try {
			if (job.status === 'generating') {
				if (!(await this.assets.publishStoredResult(job))) await this.unknownOutcome(id)
				return await this.publicationResult(id)
			}
			const snapshot = parseImageGenerationSnapshot(job.type, job.input)
			if (!this.adapter.isConfigured(snapshot.model)) return { done: false, delayMs: 60_000 }
			const references = await this.assets.prepareReferences(job, snapshot)
			if (references === null) {
				await this.repository.waitForDependencies(id)
				return { done: false, delayMs: 30_000 }
			}
			const input = buildImageGenerationInput(snapshot, references)
			const resultS3Key = this.assets.createResultKey(job, snapshot)
			const result = await submitImageGenerationRequest(
				id,
				job.input,
				resultS3Key,
				input,
				this.adapter,
				this.requests,
			)
			if (result.status !== 'ready' || result.images.length !== 1)
				throw new Error('Expected one completed image for the dialogue job')
			const current = await this.repository.findJob(id)
			if (!current || current.status === 'ready' || current.status === 'failed') return { done: true }
			await this.assets.publish(current, result.images[0])

			return await this.publicationResult(id)
		} catch (error) {
			if (error instanceof UnrecoverableError) throw error
			const current = await this.repository.findJob(id)
			if (!current || current.status === 'ready' || current.status === 'failed') return { done: true }
			if (error instanceof ImageGenerationError && ['moderated', 'operation_failed'].includes(error.code)) {
				await this.repository.recordFailure(id, error.message, true)
				throw new UnrecoverableError(error.message)
			}
			// Retry only storage/DB recovery on the next step. Even an unknown submit must check
			// the reserved R2 key before concluding its result is lost (PUT acknowledgement may be lost).
			const terminal = current.attempts >= 4 && current.status !== 'generating'
			await this.repository.recordFailure(
				id,
				'Image processing failed; retrying storage or the unsubmitted job',
				terminal,
			)
			if (terminal) throw new UnrecoverableError('Image processing failed after five errors')
			return { done: false, delayMs: 30_000 }
		}
	}

	private async unknownOutcome(id: number): Promise<never> {
		const message = 'Image submission outcome unknown or result unavailable; manual recovery required'
		await this.repository.recordFailure(id, message, false)
		throw new UnrecoverableError(message)
	}

	private async publicationResult(id: number): Promise<ImageGenerationStepResult> {
		const published = await this.repository.findJob(id)
		if (published && published.status !== 'ready' && published.status !== 'failed')
			throw new Error('Image publication did not mark the job ready')
		return { done: true }
	}
}
