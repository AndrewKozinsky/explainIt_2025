jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { PrismaService } from 'db/prisma.service'
import { Flux3ImageAdapter } from 'infrastructure/fluxImageGeneration/flux3Image.adapter'
import { FluxImageGenerationProvider } from 'infrastructure/imageGenerationProviderAdapter/FluxImageGenerationProvider'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { ImageGenerationInput } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { savedFluxOperation, startOrResumeFlux3Request } from './startOrResumeFlux3Request'

const input: ImageGenerationInput = {
	model: 'flux-3-image',
	prompt: 'Scene',
	size: { aspectRatio: '2:1', resolution: '768sq' },
}
const request = { requestId: 'task-1', pollingUrl: 'https://api.eu1.bfl.ai/v1/get_result?id=task-1' }
const operation = savedFluxOperation(request.requestId, request.pollingUrl)

describe('startOrResumeFlux3Request', () => {
	const http = { request: jest.fn() }
	const adapter = new ImageGenerationAdapterService([
		new FluxImageGenerationProvider(() => new Flux3ImageAdapter('test-key', http)),
	])
	const repository = { getJob: jest.fn(), claimSubmission: jest.fn(), saveRequest: jest.fn() }
	beforeEach(() => {
		jest.resetAllMocks()
		repository.getJob.mockResolvedValue({ status: 'queued', provider_request_id: null, provider_polling_url: null })
		repository.claimSubmission.mockResolvedValue(true)
		repository.saveRequest.mockResolvedValue(undefined)
		http.request.mockResolvedValue({ data: { id: request.requestId, polling_url: request.pollingUrl } })
	})

	it('records both response fields before returning control to the caller', async () => {
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).resolves.toEqual(operation)
		expect(repository.saveRequest).toHaveBeenCalledWith(7, request)
		expect(repository.claimSubmission.mock.invocationCallOrder[0]).toBeLessThan(
			http.request.mock.invocationCallOrder[0],
		)
		expect(http.request.mock.invocationCallOrder[0]).toBeLessThan(
			repository.saveRequest.mock.invocationCallOrder[0],
		)
	})

	it('resumes the stored request without another POST', async () => {
		repository.getJob.mockResolvedValue({
			status: 'generating',
			provider_request_id: request.requestId,
			provider_polling_url: request.pollingUrl,
		})
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).resolves.toEqual(operation)
		expect(http.request).not.toHaveBeenCalled()
		expect(repository.claimSubmission).not.toHaveBeenCalled()
	})

	it('blocks a concurrent or uncertain submission', async () => {
		repository.claimSubmission.mockResolvedValue(false)
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).rejects.toThrow('outcome unknown')
		expect(http.request).not.toHaveBeenCalled()
	})

	it('does not claim a job with invalid input', async () => {
		await expect(startOrResumeFlux3Request(7, { ...input, prompt: ' ' }, adapter, repository)).rejects.toThrow()
		expect(repository.claimSubmission).not.toHaveBeenCalled()
		expect(http.request).not.toHaveBeenCalled()
	})

	it('continues polling the saved request after an HTTP failure without another POST', async () => {
		repository.saveRequest.mockImplementation(async (_id, saved) => {
			repository.getJob.mockResolvedValue({
				status: 'generating',
				provider_request_id: saved.requestId,
				provider_polling_url: saved.pollingUrl,
			})
		})
		const started = await startOrResumeFlux3Request(7, input, adapter, repository)
		http.request.mockRejectedValueOnce(new Error('network timeout'))
		await expect(adapter.resume(started)).rejects.toThrow('request failed')
		const resumed = await startOrResumeFlux3Request(7, input, adapter, repository)
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'task-1', status: 'Ready', result: { sample: 'https://delivery.example.com/image' } },
		})
		http.request.mockResolvedValueOnce({ data: Buffer.from('original'), headers: {} })
		await expect(adapter.resume(resumed)).resolves.toEqual({
			status: 'ready',
			images: [{ bytes: Buffer.from('original'), contentType: null }],
		})
		expect(http.request.mock.calls.filter(([config]) => config.method === 'POST')).toHaveLength(1)
	})

	it.each(['ready', 'failed'])('does not restart a %s job', async (status) => {
		repository.getJob.mockResolvedValue({ status })
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).rejects.toThrow('terminal')
		expect(http.request).not.toHaveBeenCalled()
	})

	it('does not submit over a partial stored response', async () => {
		repository.getJob.mockResolvedValue({
			status: 'generating',
			provider_request_id: 'task-1',
			provider_polling_url: null,
		})
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).rejects.toThrow('Incomplete')
		expect(http.request).not.toHaveBeenCalled()
	})

	it('propagates a persistence failure without polling or retrying POST', async () => {
		repository.saveRequest.mockRejectedValue(new Error('DB unavailable'))
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).rejects.toThrow('DB unavailable')
		expect(http.request).toHaveBeenCalledTimes(1)
	})

	it('rejects unsupported provider parameters before reserving a paid submission', async () => {
		await expect(startOrResumeFlux3Request(7, { ...input, quality: 'high' }, adapter, repository)).rejects.toThrow(
			'quality',
		)
		expect(repository.claimSubmission).not.toHaveBeenCalled()
		expect(http.request).not.toHaveBeenCalled()
	})

	it('allows only one POST for concurrent attempts and persists the receipt before continuation', async () => {
		let claimed = false
		repository.claimSubmission.mockImplementation(async () => {
			if (claimed) return false
			claimed = true
			return true
		})
		const results = await Promise.allSettled([
			startOrResumeFlux3Request(7, input, adapter, repository),
			startOrResumeFlux3Request(7, input, adapter, repository),
		])
		expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1)
		expect(http.request).toHaveBeenCalledTimes(1)
		expect(repository.saveRequest).toHaveBeenCalledTimes(1)
	})
})

describe('ImageGenerationRequestRepository', () => {
	const jobs = { updateMany: jest.fn() }
	const repository = new ImageGenerationRequestRepository({ imageGenerationJob: jobs } as unknown as PrismaService)
	beforeEach(() => jest.resetAllMocks())

	it('claims only unsubmitted jobs atomically', async () => {
		jobs.updateMany.mockResolvedValue({ count: 1 })
		await expect(repository.claimSubmission(7)).resolves.toBe(true)
		expect(jobs.updateMany).toHaveBeenCalledWith({
			where: {
				id: 7,
				status: { in: ['queued', 'waitingDependencies'] },
				provider_request_id: null,
				provider_polling_url: null,
			},
			data: { status: 'generating', updated_at: expect.any(Date) },
		})
		jobs.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.claimSubmission(7)).resolves.toBe(false)
	})

	it('saves the pair atomically and does not resurrect a deleted job', async () => {
		jobs.updateMany.mockResolvedValue({ count: 1 })
		await repository.saveRequest(7, request)
		expect(jobs.updateMany).toHaveBeenCalledWith({
			where: { id: 7, status: 'generating', provider_request_id: null, provider_polling_url: null },
			data: {
				provider_request_id: request.requestId,
				provider_polling_url: request.pollingUrl,
				updated_at: expect.any(Date),
			},
		})
		jobs.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.saveRequest(7, request)).rejects.toThrow('deleted')
	})
})
