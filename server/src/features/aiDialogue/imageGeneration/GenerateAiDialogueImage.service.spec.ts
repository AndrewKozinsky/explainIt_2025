jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target, Optional: () => () => undefined }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
import OpenAI from 'openai'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { OpenAIImageGenerationProvider } from 'infrastructure/imageGenerationProviderAdapter/OpenAIImageGenerationProvider'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { AI_DIALOGUE_EMOTION_LAYOUT_VERSION, AI_DIALOGUE_IMAGE_MODEL } from '../aiDialogueVisualConfig'
import { GenerateAiDialogueImage } from './GenerateAiDialogueImage.service'
import { ImageGenerationAssets } from './ImageGenerationAssets'

const snapshot = {
	model: AI_DIALOGUE_IMAGE_MODEL,
	stylePrompt: 'Saved style',
	appearance: 'Adult',
	size: { width: 960, height: 720 },
	quality: 'low',
	format: 'png',
	aspectRatio: '4:3',
	layoutVersion: AI_DIALOGUE_EMOTION_LAYOUT_VERSION,
	styleAvatarReferenceS3Key: null,
	styleSceneReferenceS3Key: null,
}
function harness() {
	const job = { id: 10, type: 'emotionSheet', status: 'queued', input: JSON.stringify(snapshot), attempts: 0 }
	const repository = {
		findJob: jest.fn().mockImplementation(async () => job),
		waitForDependencies: jest.fn(),
		recordFailure: jest.fn(),
	}
	const requests = {
		claimSubmission: jest.fn(async (_id, expectedInput, resultS3Key) => {
			job.status = 'generating'
			job.input = JSON.stringify({ ...JSON.parse(expectedInput), resultS3Key })
			return true
		}),
	}
	const images = {
		generate: jest.fn().mockResolvedValue({ data: [{ b64_json: Buffer.from('original').toString('base64') }] }),
		edit: jest.fn(),
	}
	let configured = true
	const adapter = new ImageGenerationAdapterService([
		new OpenAIImageGenerationProvider(() =>
			configured ? ({ images } as unknown as Pick<OpenAI, 'images'>) : null,
		),
	])
	const assets = {
		createResultKey: jest.fn(() => 'reserved.png'),
		prepareReferences: jest.fn().mockResolvedValue([]),
		publishStoredResult: jest.fn().mockResolvedValue(false),
		publish: jest.fn(async () => {
			job.status = 'ready'
		}),
	}
	const makeService = (publisher?: ImageGenerationAssets) =>
		new GenerateAiDialogueImage(
			repository as unknown as ImageGenerationWorkerRepository,
			requests as unknown as ImageGenerationRequestRepository,
			adapter,
			publisher,
		)
	return {
		job,
		repository,
		requests,
		images,
		assets,
		service: makeService(assets),
		makeService,
		unconfigure: () => {
			configured = false
		},
	}
}
describe('GenerateAiDialogueImage with OpenAI', () => {
	it('claims once, publishes the original and completes without polling', async () => {
		const { service, job, images, assets, requests } = harness()
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(job.status).toBe('ready')
		expect(JSON.parse(job.input).resultS3Key).toBe('reserved.png')
		expect(requests.claimSubmission.mock.invocationCallOrder[0]).toBeLessThan(
			images.generate.mock.invocationCallOrder[0],
		)
		expect(assets.publish).toHaveBeenCalledWith(job, { bytes: Buffer.from('original'), contentType: 'image/png' })
		await service.processStep(10)
		expect(images.generate).toHaveBeenCalledTimes(1)
	})
	it('uses saved model/quality/size rather than current configuration', async () => {
		const { service, job, images } = harness()
		job.input = JSON.stringify({
			...snapshot,
			model: 'gpt-image-2.5-flare-2026-09-08',
			quality: 'medium',
			size: { width: 1024, height: 768 },
		})
		await service.processStep(10)
		expect(images.generate.mock.calls[0][0]).toMatchObject({
			model: 'gpt-image-2.5-flare-2026-09-08',
			quality: 'medium',
			size: '1024x768',
		})
	})
	it('waits for dependencies without claiming or paid calls', async () => {
		const { service, assets, repository, requests, images } = harness()
		assets.prepareReferences.mockResolvedValue(null)
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		expect(repository.waitForDependencies).toHaveBeenCalledWith(10)
		expect(requests.claimSubmission).not.toHaveBeenCalled()
		expect(images.generate).not.toHaveBeenCalled()
	})
	it('does not submit without configured credentials or an assets implementation', async () => {
		const { service, makeService, requests, images, unconfigure } = harness()
		await expect(makeService().processStep(10)).resolves.toEqual({ done: false, delayMs: 60_000 })
		unconfigure()
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 60_000 })
		expect(requests.claimSubmission).not.toHaveBeenCalled()
		expect(images.generate).not.toHaveBeenCalled()
	})
	it.each(['ready', 'failed', 'deleted'])('skips %s jobs', async (status) => {
		const { service, job, repository, images } = harness()
		job.status = status
		if (status === 'deleted') repository.findJob.mockResolvedValue(null)
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(images.generate).not.toHaveBeenCalled()
	})
	it('recovers uploaded results after a crash without even requiring an API key', async () => {
		const { service, job, assets, images, unconfigure } = harness()
		job.status = 'generating'
		unconfigure()
		assets.publishStoredResult.mockImplementation(async () => {
			job.status = 'ready'
			return true
		})
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(images.generate).not.toHaveBeenCalled()
		expect(assets.prepareReferences).not.toHaveBeenCalled()
	})
	it('stops an uncertain submission when its original is absent, never resubmits', async () => {
		const { service, images, repository } = harness()
		images.generate.mockRejectedValue(new Error('timeout'))
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		await expect(service.processStep(10)).rejects.toThrow('manual recovery')
		expect(images.generate).toHaveBeenCalledTimes(1)
		expect(repository.recordFailure).toHaveBeenLastCalledWith(10, expect.stringContaining('outcome unknown'), false)
	})
	it('retries only storage after a failed PUT acknowledgement or DB commit', async () => {
		const { service, assets, job, images } = harness()
		assets.publish.mockRejectedValueOnce(new Error('lost commit acknowledgement'))
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		assets.publishStoredResult.mockRejectedValueOnce(new Error('R2 network error'))
		await expect(service.processStep(10)).resolves.toEqual({ done: false, delayMs: 30_000 })
		assets.publishStoredResult.mockImplementation(async () => {
			job.status = 'ready'
			return true
		})
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(images.generate).toHaveBeenCalledTimes(1)
	})
	it('does not dispatch after an uncertain claim acknowledgement', async () => {
		const { service, requests, images } = harness()
		requests.claimSubmission.mockRejectedValue(new Error('DB lost acknowledgement'))
		await service.processStep(10)
		expect(images.generate).not.toHaveBeenCalled()
	})
	it('does not publish after deletion during generation', async () => {
		const { service, images, repository, assets } = harness()
		images.generate.mockImplementation(async () => {
			repository.findJob.mockResolvedValue(null)
			return { data: [{ b64_json: 'eA==' }] }
		})
		await expect(service.processStep(10)).resolves.toEqual({ done: true })
		expect(assets.publish).not.toHaveBeenCalled()
	})
	it('does not redirect an old/unsupported model to OpenAI', async () => {
		const { service, job, requests, images } = harness()
		job.input = JSON.stringify({ ...snapshot, model: 'flux-3-image' })
		await service.processStep(10)
		expect(images.generate).not.toHaveBeenCalled()
		expect(requests.claimSubmission).not.toHaveBeenCalled()
	})
	it('ends a moderated response without automatic resubmission', async () => {
		const { service, images, repository } = harness()
		images.generate.mockRejectedValue(
			new OpenAI.APIError(400, { code: 'content_policy_violation' }, 'body', new Headers()),
		)
		await expect(service.processStep(10)).rejects.toThrow('moderation')
		expect(repository.recordFailure).toHaveBeenCalledWith(10, expect.stringContaining('moderation'), true)
	})
})
