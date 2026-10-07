jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { PrismaService } from 'db/prisma.service'
import { Flux3ImageAdapter, Flux3ImageInput } from './flux3Image.adapter'
import { startOrResumeFlux3Request } from './startOrResumeFlux3Request'

const input: Flux3ImageInput = { prompt: 'Scene', aspectRatio: '2:1', resolution: '768sq', grounding: false }
const request = { requestId: 'task-1', pollingUrl: 'https://api.eu1.bfl.ai/v1/get_result?id=task-1' }

describe('startOrResumeFlux3Request', () => {
	const http = { request: jest.fn() }
	const adapter = new Flux3ImageAdapter('test-key', http)
	const repository = { getJob: jest.fn(), claimSubmission: jest.fn(), saveRequest: jest.fn() }
	beforeEach(() => {
		jest.resetAllMocks()
		repository.getJob.mockResolvedValue({ status: 'queued', provider_request_id: null, provider_polling_url: null })
		repository.claimSubmission.mockResolvedValue(true)
		repository.saveRequest.mockResolvedValue(undefined)
		http.request.mockResolvedValue({ data: { id: request.requestId, polling_url: request.pollingUrl } })
	})

	it('records both response fields before returning control to the caller', async () => {
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).resolves.toEqual(request)
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
		await expect(startOrResumeFlux3Request(7, input, adapter, repository)).resolves.toEqual(request)
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
		await expect(adapter.poll(started)).rejects.toThrow('poll failed')
		const resumed = await startOrResumeFlux3Request(7, input, adapter, repository)
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'task-1', status: 'Ready', result: { sample: 'https://delivery.example.com/image' } },
		})
		await expect(adapter.poll(resumed)).resolves.toEqual({
			status: 'Ready',
			sampleUrl: 'https://delivery.example.com/image',
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
			data: { status: 'generating' },
		})
		jobs.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.claimSubmission(7)).resolves.toBe(false)
	})

	it('saves the pair atomically and does not resurrect a deleted job', async () => {
		jobs.updateMany.mockResolvedValue({ count: 1 })
		await repository.saveRequest(7, request)
		expect(jobs.updateMany).toHaveBeenCalledWith({
			where: { id: 7, status: 'generating', provider_request_id: null, provider_polling_url: null },
			data: { provider_request_id: request.requestId, provider_polling_url: request.pollingUrl },
		})
		jobs.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.saveRequest(7, request)).rejects.toThrow('deleted')
	})
})
