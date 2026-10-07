import { Flux3ImageAdapter, Flux3ImageInput, Flux3Request } from './flux3Image.adapter'
import type { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'

/** Called only after dependencies and the immutable job input have been prepared. */
export async function startOrResumeFlux3Request(
	jobId: number,
	input: Flux3ImageInput,
	adapter: Flux3ImageAdapter,
	repository: Pick<ImageGenerationRequestRepository, 'getJob' | 'claimSubmission' | 'saveRequest'>,
): Promise<Flux3Request> {
	const job = await repository.getJob(jobId)
	if (job.status === 'ready' || job.status === 'failed') throw new Error('Image generation job is terminal')

	if (job.provider_request_id && job.provider_polling_url) {
		return { requestId: job.provider_request_id, pollingUrl: job.provider_polling_url }
	}

	if (job.provider_request_id || job.provider_polling_url) throw new Error('Incomplete BFL request record')
	adapter.validateInput(input)

	// A claim without a response can mean BFL accepted the POST before a crash. Never resubmit it blindly.
	if (!(await repository.claimSubmission(jobId))) throw new Error('BFL submission in progress or outcome unknown')

	const request = await adapter.submit(input)
	await repository.saveRequest(jobId, request)

	return request
}
