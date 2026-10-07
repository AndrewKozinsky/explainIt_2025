jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target, Optional: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))

import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { Flux3ImageAdapter } from 'infrastructure/fluxImageGeneration/flux3Image.adapter'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION } from '../aiDialogueVisualConfig'
import { GenerateAiDialogueImage } from './GenerateAiDialogueImage.service'
import { ImageGenerationAssets } from './ImageGenerationAssets'

export const emotionSnapshot = {
	model: 'flux-3-image',
	stylePrompt: 'Snapshot style',
	appearance: 'Adult with short hair',
	resolution: '768sq',
	grounding: false,
	aspectRatio: '4:3',
	layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
	styleAvatarReferenceS3Key: null,
	styleSceneReferenceS3Key: null,
}

function createHarness() {
	const job = {
		id: 10,
		type: 'emotionSheet',
		status: 'queued',
		input: JSON.stringify(emotionSnapshot),
		provider_request_id: null as string | null,
		provider_polling_url: null as string | null,
		updated_at: new Date(),
		attempts: 0,
	}
	const repository = {
		findJob: jest.fn().mockImplementation(async () => job),
		waitForDependencies: jest.fn(),
		recordFailure: jest.fn(),
	}
	const requests = {
		getJob: jest.fn().mockImplementation(async () => job),
		claimSubmission: jest.fn(async () => {
			job.status = 'generating'
			return true
		}),
		saveRequest: jest.fn(async (_id, external) => {
			job.provider_request_id = external.requestId
			job.provider_polling_url = external.pollingUrl
		}),
	}
	const config = { get: jest.fn(() => ({ blackForestLabs: { apiKey: 'test-key' as string | null } })) }
	const assets = {
		prepareReferences: jest.fn().mockResolvedValue([]),
		publish: jest.fn(async () => {
			job.status = 'ready'
		}),
	}
	const http = {
		request: jest.fn().mockResolvedValue({
			data: { id: 'bfl-10', polling_url: 'https://api.eu1.bfl.ai/v1/get_result?id=bfl-10' },
		}),
	}
	class TestGeneration extends GenerateAiDialogueImage {
		protected createAdapter(key: string) {
			return new Flux3ImageAdapter(key, http)
		}
	}
	function makeService(publisher?: ImageGenerationAssets) {
		return new TestGeneration(
			repository as unknown as ImageGenerationWorkerRepository,
			requests as unknown as ImageGenerationRequestRepository,
			config as unknown as MainConfigService,
			publisher,
		)
	}
	const service = makeService(assets)
	return { job, repository, requests, config, assets, http, service, makeService }
}

describe('GenerateAiDialogueImage', () => {
	it('submits once, resumes pending polling and publishes bytes before completing', async () => {
		const { service, job, http, assets, requests } = createHarness()
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 2000 })
		expect(requests.saveRequest).toHaveBeenCalled()
		http.request.mockResolvedValueOnce({ status: 200, data: { id: 'bfl-10', status: 'Pending' } })
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 2000 })
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'bfl-10', status: 'Ready', result: { sample: 'https://delivery.example.com/file' } },
		})
		http.request.mockResolvedValueOnce({
			data: Buffer.from('image bytes'),
			headers: { 'content-type': 'image/png' },
		})
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(job.status).toBe('ready')
		expect(assets.publish).toHaveBeenCalledWith(job, {
			bytes: Buffer.from('image bytes'),
			contentType: 'image/png',
		})
		expect(http.request.mock.calls.filter(([config]) => config.method === 'POST')).toHaveLength(1)
	})

	it('defers without HTTP or claiming a request when the R2 implementation is absent', async () => {
		const { makeService, http, requests } = createHarness()
		await expect(makeService().processStep(10)).resolves.toEqual({ done: false, delayMs: 60_000 })
		expect(http.request).not.toHaveBeenCalled()
		expect(requests.claimSubmission).not.toHaveBeenCalled()
	})

	it('defers without an API key', async () => {
		const { service, config, http } = createHarness()
		config.get.mockReturnValue({ blackForestLabs: { apiKey: null } })
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 60_000 })
		expect(http.request).not.toHaveBeenCalled()
	})

	it('waits for references without submitting or consuming error attempts', async () => {
		const { service, assets, repository, http } = createHarness()
		assets.prepareReferences.mockResolvedValue(null)
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		expect(repository.waitForDependencies).toHaveBeenCalledWith(10)
		expect(repository.recordFailure).not.toHaveBeenCalled()
		expect(http.request).not.toHaveBeenCalled()
	})

	it.each(['ready', 'failed', 'deleted'])('skips a %s job', async (status) => {
		const { service, job, repository, http } = createHarness()
		job.status = status
		if (status === 'deleted') repository.findJob.mockResolvedValue(null)
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(http.request).not.toHaveBeenCalled()
	})

	it('never resubmits an ambiguous request', async () => {
		const { service, job, http } = createHarness()
		job.status = 'generating'
		await expect(service.processStep(10)).rejects.toThrow('manual recovery')
		expect(http.request).not.toHaveBeenCalled()
	})

	it('keeps a lost submit response unresolved instead of automatically retrying POST', async () => {
		const { service, job, http, repository } = createHarness()
		http.request.mockRejectedValueOnce(new Error('timeout'))
		await expect(service.processStep(10)).rejects.toThrow('manual recovery')
		expect(job.status).toBe('generating')
		expect(repository.recordFailure).toHaveBeenCalledWith(10, expect.stringContaining('outcome unknown'), false)
	})

	it('resumes polling after a transient error without preparing references again', async () => {
		const { service, http, assets, repository } = createHarness()
		await service.processStep(10)
		http.request.mockRejectedValueOnce(new Error('timeout'))
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		expect(repository.recordFailure).toHaveBeenCalledWith(10, expect.any(String), false)
		expect(assets.prepareReferences).toHaveBeenCalledTimes(1)
		expect(http.request.mock.calls.filter(([config]) => config.method === 'POST')).toHaveLength(1)
	})

	it('ends a moderated request without resubmission', async () => {
		const { service, http, repository, assets } = createHarness()
		await service.processStep(10)
		http.request.mockResolvedValueOnce({ status: 503, data: { id: 'bfl-10', status: 'Content Moderated' } })
		await expect(service.processStep(10)).rejects.toThrow('Content Moderated')
		expect(repository.recordFailure).toHaveBeenCalledWith(10, 'BFL task ended: Content Moderated', true)
		expect(assets.publish).not.toHaveBeenCalled()
	})

	it('does not publish a late result after deletion during download', async () => {
		const { service, http, repository, assets } = createHarness()
		await service.processStep(10)
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'bfl-10', status: 'Ready', result: { sample: 'https://delivery.example.com/file' } },
		})
		http.request.mockImplementationOnce(async () => {
			repository.findJob.mockResolvedValue(null)
			return { data: Buffer.from('late bytes'), headers: {} }
		})
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(assets.publish).not.toHaveBeenCalled()
	})

	it('retries publication without another generation and completes only after ready', async () => {
		const { service, http, assets, job } = createHarness()
		await service.processStep(10)
		http.request.mockResolvedValueOnce({
			status: 200,
			data: { id: 'bfl-10', status: 'Ready', result: { sample: 'https://delivery.example.com/file' } },
		})
		http.request.mockResolvedValueOnce({ data: Buffer.from('image'), headers: {} })
		assets.publish.mockRejectedValueOnce(new Error('R2 unavailable'))
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		expect(job.status).toBe('generating')
	})

	it('stops after five processing errors while retaining the provider fields', async () => {
		const { service, http, job, repository } = createHarness()
		await service.processStep(10)
		job.attempts = 4
		http.request.mockRejectedValueOnce(new Error('timeout'))
		await expect(service.processStep(10)).rejects.toThrow('five errors')
		expect(repository.recordFailure).toHaveBeenCalledWith(10, expect.any(String), true)
		expect(job.provider_request_id).toBe('bfl-10')
	})

	it('limits normal polling to twenty minutes since the last state update', async () => {
		const { service, job, http, repository } = createHarness()
		await service.processStep(10)
		job.updated_at = new Date(Date.now() - 21 * 60_000)
		await expect(service.processStep(10)).rejects.toThrow('polling timed out')
		expect(http.request).toHaveBeenCalledTimes(1)
		expect(repository.recordFailure).toHaveBeenCalledWith(
			10,
			expect.stringContaining('external request retained'),
			true,
		)
	})
})
