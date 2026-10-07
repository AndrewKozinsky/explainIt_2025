import { Injectable, Optional } from '@nestjs/common'
import { UnrecoverableError } from 'bullmq'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { Flux3ImageAdapter, Flux3Request } from 'infrastructure/fluxImageGeneration/flux3Image.adapter'
import { startOrResumeFlux3Request } from 'infrastructure/fluxImageGeneration/startOrResumeFlux3Request'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { buildImageGenerationInput, parseImageGenerationSnapshot } from './buildImageGenerationPrompt'
import { ImageGenerationAssets } from './ImageGenerationAssets'

export type ImageGenerationStepResult = { done: true } | { done: false; delayMs: number }

@Injectable()
export class GenerateAiDialogueImage {
	constructor(
		private readonly repository: ImageGenerationWorkerRepository,
		private readonly requests: ImageGenerationRequestRepository,
		private readonly config: MainConfigService,
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
		const apiKey = this.config.get().blackForestLabs.apiKey
		if (!apiKey) return { done: false, delayMs: 60_000 }

		let request: Flux3Request | undefined

		try {
			if (job.provider_request_id && job.provider_polling_url) {
				request = { requestId: job.provider_request_id, pollingUrl: job.provider_polling_url }
			} else if (job.status === 'generating' || job.provider_request_id || job.provider_polling_url) {
				await this.repository.recordFailure(
					id,
					'BFL submission outcome unknown; manual recovery required',
					false,
				)
				throw new UnrecoverableError('BFL submission outcome unknown; manual recovery required')
			}
			const adapter = this.createAdapter(apiKey)
			if (!request) {
				const snapshot = parseImageGenerationSnapshot(job.type, job.input)
				const references = await this.assets.prepareReferences(job, snapshot)
				if (references === null) {
					await this.repository.waitForDependencies(id)
					return { done: false, delayMs: 30_000 }
				}
				const input = buildImageGenerationInput(snapshot, references)
				if (!(await this.repository.findJob(id))) return { done: true }
				request = await startOrResumeFlux3Request(id, input, adapter, this.requests)
				return { done: false, delayMs: 2_000 }
			}
			if (Date.now() - job.updated_at.getTime() > 20 * 60_000) {
				await this.repository.recordFailure(id, 'BFL polling timed out; external request retained', true)
				throw new UnrecoverableError('BFL polling timed out')
			}
			const result = await adapter.poll(request)
			if (['Pending', 'Reasoning', 'Generating'].includes(result.status)) return { done: false, delayMs: 2_000 }
			if (result.status !== 'Ready') {
				await this.repository.recordFailure(id, `BFL task ended: ${result.status}`, true)
				throw new UnrecoverableError(`BFL task ended: ${result.status}`)
			}
			if (!(await this.repository.findJob(id))) return { done: true }
			const bytes = await adapter.download(result.sampleUrl)
			if (!(await this.repository.findJob(id))) return { done: true }
			await this.assets.publish(job, bytes)
			const published = await this.repository.findJob(id)
			if (published && published.status !== 'ready')
				throw new Error('Image publication did not mark the job ready')
			return { done: true }
		} catch (error) {
			if (error instanceof UnrecoverableError) throw error
			const current = await this.repository.findJob(id)
			if (!current || current.status === 'ready' || current.status === 'failed') return { done: true }
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

	/**
	 * Создаёт адаптер FLUX 3 для текущего ключа; метод можно переопределить для подмены HTTP в тестах.
	 * @param apiKey Ключ доступа Black Forest Labs, не передаваемый в Redis или референсы.
	 */
	protected createAdapter(apiKey: string): Flux3ImageAdapter {
		return new Flux3ImageAdapter(apiKey)
	}
}
