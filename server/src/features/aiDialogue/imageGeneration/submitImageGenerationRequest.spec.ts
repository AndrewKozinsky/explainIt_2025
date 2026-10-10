jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
import { PrismaService } from 'db/prisma.service'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationAdapterService } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationAdapter.service'
import { ImageGenerationInput } from 'infrastructure/imageGenerationProviderAdapter/ImageGenerationProvider.interface'
import { submitImageGenerationRequest } from './submitImageGenerationRequest'

const input: ImageGenerationInput = { model: 'sync-test', prompt: 'Scene', size: { width: 1152, height: 576 } }
const snapshot = JSON.stringify({ ...input, quality: 'low' })
const key = 'reserved-result.png'
function harness() {
	const ready = { status: 'ready' as const, images: [{ bytes: Buffer.from('original'), contentType: 'image/png' }] }
	const provider = {
		name: 'test',
		models: ['sync-test'],
		isConfigured: () => true,
		validateInput: jest.fn(),
		generate: jest.fn().mockResolvedValue(ready),
	}
	const adapter = new ImageGenerationAdapterService([provider])
	const repository = { claimSubmission: jest.fn().mockResolvedValue(true) }
	return {
		ready,
		provider,
		repository,
		call: () => submitImageGenerationRequest(7, snapshot, key, input, adapter, repository),
	}
}
describe('submitImageGenerationRequest', () => {
	it('reserves the output key before returning a completed image', async () => {
		const { call, provider, repository, ready } = harness()
		await expect(call()).resolves.toEqual(ready)
		expect(repository.claimSubmission).toHaveBeenCalledWith(7, snapshot, key)
		expect(provider.validateInput.mock.invocationCallOrder[0]).toBeLessThan(
			repository.claimSubmission.mock.invocationCallOrder[0],
		)
		expect(repository.claimSubmission.mock.invocationCallOrder[0]).toBeLessThan(
			provider.generate.mock.invocationCallOrder[0],
		)
	})
	it('does not claim invalid parameters', async () => {
		const { call, provider, repository } = harness()
		provider.validateInput.mockImplementation(() => {
			throw new Error('invalid')
		})
		await expect(call()).rejects.toThrow()
		expect(repository.claimSubmission).not.toHaveBeenCalled()
		expect(provider.generate).not.toHaveBeenCalled()
	})
	it('does not submit after a failed or uncertain DB claim', async () => {
		const { call, provider, repository } = harness()
		repository.claimSubmission.mockResolvedValue(false)
		await expect(call()).rejects.toThrow('outcome unknown')
		repository.claimSubmission.mockRejectedValue(new Error('lost acknowledgement'))
		await expect(call()).rejects.toThrow('lost acknowledgement')
		expect(provider.generate).not.toHaveBeenCalled()
	})
	it('permits only one paid dispatch for concurrent attempts', async () => {
		const { call, provider, repository } = harness()
		let claimed = false
		repository.claimSubmission.mockImplementation(async () => {
			if (claimed) return false
			claimed = true
			return true
		})
		const results = await Promise.allSettled([call(), call()])
		expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1)
		expect(provider.generate).toHaveBeenCalledTimes(1)
	})
})
describe('ImageGenerationRequestRepository checkpoint claim', () => {
	it('atomically changes state and adds only output metadata to the exact saved snapshot', async () => {
		const updateMany = jest.fn().mockResolvedValue({ count: 1 })
		const repository = new ImageGenerationRequestRepository({
			imageGenerationJob: { updateMany },
		} as unknown as PrismaService)
		await expect(repository.claimSubmission(7, snapshot, key)).resolves.toBe(true)
		expect(updateMany).toHaveBeenCalledWith({
			where: {
				id: 7,
				input: snapshot,
				status: { in: ['queued', 'waitingDependencies'] },
				provider_request_id: null,
				provider_polling_url: null,
			},
			data: {
				status: 'generating',
				input: JSON.stringify({ ...JSON.parse(snapshot), resultS3Key: key }),
				updated_at: expect.any(Date),
			},
		})
		updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.claimSubmission(7, snapshot, key)).resolves.toBe(false)
		await expect(repository.claimSubmission(7, JSON.stringify({ resultS3Key: key }), 'other')).rejects.toThrow(
			'already reserved',
		)
	})
})
