import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import {
	ImageGenerationInput,
	ImageGenerationResult,
} from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import type { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'

/** Validate before claim, durably reserve the output key, then send one paid request.
 * A failed claim/save acknowledgement must never cause an automatic resubmission.
 * This consumer expects completed Images API results; it does not pretend to resume external operations. */
export async function submitImageGenerationRequest(
	jobId: number,
	expectedInput: string,
	resultS3Key: string,
	input: ImageGenerationInput,
	adapter: ImageGenerationAdapterService,
	repository: Pick<ImageGenerationRequestRepository, 'claimSubmission'>,
): Promise<ImageGenerationResult> {
	adapter.validateInput(input)
	if (!(await repository.claimSubmission(jobId, expectedInput, resultS3Key)))
		throw new Error('Image submission in progress or outcome unknown')

	return adapter.generate(input)
}
