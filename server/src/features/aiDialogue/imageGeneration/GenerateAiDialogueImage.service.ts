import { Injectable, Optional } from '@nestjs/common'
import { UnrecoverableError } from 'bullmq'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { ImageGenerationError } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationError'
import { ImageGenerationOperation } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { buildImageGenerationInput, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'
import { ImageGenerationAssets } from './ImageGenerationAssets'
import { savedFluxOperation, startOrResumeImageGenerationRequest } from './startOrResumeImageGenerationRequest'

export type ImageGenerationStepResult = { done: true } | { done: false; delayMs: number }

@Injectable()
export class GenerateAiDialogueImage {
	constructor(
		private readonly repository: ImageGenerationWorkerRepository,
		private readonly requests: ImageGenerationRequestRepository,
		private readonly adapter: ImageGenerationAdapterService,
		@Optional() private readonly assets?: ImageGenerationAssets,
	) {}

	/**
	 * Выполняет один шаг генерации: подготовку, отправку, polling или публикацию результата.
	 * Продолжает сохранённый внешний запрос без повторного POST. Удалённые и завершённые задания пропускает.
	 *
	 * @param id Идентификатор ImageGenerationJob в БД.
	 * @returns Признак завершения либо задержку до следующего шага; ожидание не занимает слот worker.
	 * @throws UnrecoverableError при окончательном отказе, исчерпании попыток или неопределённом submit.
	 * Ошибки БД могут выйти наружу для повторной обработки через processor.
	 */
	async processStep(id: number): Promise<ImageGenerationStepResult> {
		const job = await this.repository.findJob(id)
		if (!job || job.status === 'ready' || job.status === 'failed') return { done: true }
		// No paid request until both reference preparation and durable publication are wired.
		if (!this.assets) return { done: false, delayMs: 60_000 }
		let request: ImageGenerationOperation | undefined

		try {
			// Saved jobs are BFL-only at this stage, including continuation of legacy receipts.
			if (!this.adapter.isConfigured('flux-3-image')) return { done: false, delayMs: 60_000 }
			if (job.provider_request_id && job.provider_polling_url) {
				request = savedFluxOperation(job.provider_request_id, job.provider_polling_url)
			} else if (job.status === 'generating' || job.provider_request_id || job.provider_polling_url) {
				await this.repository.recordFailure(
					id,
					'BFL submission outcome unknown; manual recovery required',
					false,
				)

				throw new UnrecoverableError('BFL submission outcome unknown; manual recovery required')
			}
			if (!request) {
				const snapshot = parseImageGenerationSnapshot(job.type, job.input)
				const references = await this.assets.prepareReferences(job, snapshot)
				if (references === null) {
					await this.repository.waitForDependencies(id)
					return { done: false, delayMs: 30_000 }
				}
				const input = buildImageGenerationInput(snapshot, references)
				if (!(await this.repository.findJob(id))) return { done: true }
				request = await startOrResumeImageGenerationRequest(id, input, this.adapter, this.requests)
				return { done: false, delayMs: 2_000 }
			}
			if (Date.now() - job.updated_at.getTime() > 20 * 60_000) {
				await this.repository.recordFailure(id, 'BFL polling timed out; external request retained', true)
				throw new UnrecoverableError('BFL polling timed out')
			}
			const result = await this.adapter.resume(request)
			if (result.status === 'pending') return { done: false, delayMs: 2_000 }
			if (result.images.length !== 1) throw new Error('Expected one image for the dialogue job')
			if (!(await this.repository.findJob(id))) return { done: true }
			await this.assets.publish(job, result.images[0])
			const published = await this.repository.findJob(id)
			if (published && published.status !== 'ready')
				throw new Error('Image publication did not mark the job ready')
			return { done: true }
		} catch (error) {
			if (error instanceof UnrecoverableError) throw error
			const current = await this.repository.findJob(id)
			if (!current || current.status === 'ready' || current.status === 'failed') return { done: true }
			if (error instanceof ImageGenerationError && ['moderated', 'operation_failed'].includes(error.code)) {
				await this.repository.recordFailure(id, error.message, true)
				throw new UnrecoverableError(error.message)
			}
			if (current.status === 'generating' && (!current.provider_request_id || !current.provider_polling_url)) {
				await this.repository.recordFailure(
					id,
					'BFL submission outcome unknown; manual recovery required',
					false,
				)
				throw new UnrecoverableError('BFL submission outcome unknown; manual recovery required')
			}
			const terminal = current.attempts >= 4
			await this.repository.recordFailure(id, 'Image processing failed; retrying the existing job', terminal)
			if (terminal) throw new UnrecoverableError('Image processing failed after five errors')
			return { done: false, delayMs: 30_000 }
		}
	}
}
