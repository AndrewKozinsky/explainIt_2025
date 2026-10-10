import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import {
	ImageGenerationInput,
	ImageGenerationOperation,
} from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import type { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'

/** Consumer-side durable image request orchestration via the shared adapter.
 * Existing DB columns currently retain the BFL receipt; this is not a direct provider client.
 * Called after references are prepared; validation precedes the claim. Never retries an uncertain POST.
 * Persistence errors propagate: a lost save acknowledgement is not permission to resubmit. */
export async function startOrResumeImageGenerationRequest(
	jobId: number,
	input: ImageGenerationInput,
	adapter: ImageGenerationAdapterService,
	repository: Pick<ImageGenerationRequestRepository, 'getJob' | 'claimSubmission' | 'saveRequest'>,
): Promise<ImageGenerationOperation> {
	const job = await repository.getJob(jobId)
	if (job.status === 'ready' || job.status === 'failed') throw new Error('Image generation job is terminal')

	if (job.provider_request_id && job.provider_polling_url) {
		return savedFluxOperation(job.provider_request_id, job.provider_polling_url)
	}

	if (job.provider_request_id || job.provider_polling_url) throw new Error('Incomplete BFL request record')
	adapter.validateInput(input)

	// A claim without a response can mean BFL accepted the POST before a crash. Never resubmit it blindly.
	if (!(await repository.claimSubmission(jobId))) throw new Error('BFL submission in progress or outcome unknown')

	const result = await adapter.generate(input)
	// The dialogue consumer remains BFL-only in stage 1; generic consumers may also receive ready.
	if (
		result.status !== 'pending' ||
		result.operation.provider !== 'bfl' ||
		result.operation.model !== 'flux-3-image'
	) {
		throw new Error('Unexpected result for the BFL dialogue job')
	}
	const { requestId, pollingUrl } = result.operation.data
	if (typeof requestId !== 'string' || typeof pollingUrl !== 'string')
		throw new Error('Incomplete BFL request record')
	await repository.saveRequest(jobId, { requestId, pollingUrl })

	return result.operation
}

/** Reconstruct the versioned receipt for old jobs without changing the database or job snapshot. */
export function savedFluxOperation(requestId: string, pollingUrl: string): ImageGenerationOperation {
	return { provider: 'bfl', model: 'flux-3-image', version: 1, data: { requestId, pollingUrl } }
}
