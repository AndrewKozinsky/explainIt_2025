jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { PrismaService } from 'db/prisma.service'
import { ImageGenerationJob } from 'prisma/generated/client'
import { ImageGenerationAssetsRepository } from './imageGenerationAssets.repository'

describe('ImageGenerationAssetsRepository', () => {
	const tx = { imageGenerationJob: { updateMany: jest.fn() }, aiDialogueImage: { create: jest.fn() } }
	const prisma = {
		$transaction: jest.fn(async (callback) => callback(tx)),
		aiDialogueCharacter: { findMany: jest.fn() },
	}
	const repository = new ImageGenerationAssetsRepository(prisma as unknown as PrismaService)
	const job = { id: 10, character_id: 2, message_id: null, type: 'emotionSheet' } as ImageGenerationJob
	const image = {
		s3Key: 'attempt.png',
		mime: 'image/png',
		width: 1024,
		height: 768,
		layoutVersion: 'emotion-grid-4x3-v1',
	}
	beforeEach(() => {
		jest.clearAllMocks()
		tx.imageGenerationJob.updateMany.mockResolvedValue({ count: 1 })
		tx.aiDialogueImage.create.mockResolvedValue({ id: 20 })
	})

	it('creates the asset and marks ready within the same transaction', async () => {
		await expect(repository.saveImageAndMarkJobReady(job, image)).resolves.toBe(true)
		expect(prisma.$transaction).toHaveBeenCalledTimes(1)
		expect(tx.imageGenerationJob.updateMany).toHaveBeenCalledWith({
			where: { id: 10, status: 'generating', character_id: 2, message_id: null },
			data: { status: 'ready', error: null, updated_at: expect.any(Date) },
		})
		expect(tx.aiDialogueImage.create).toHaveBeenCalledWith({
			data: {
				character_id: 2,
				message_id: null,
				type: 'emotionSheet',
				s3_key: 'attempt.png',
				mime_type: 'image/png',
				width: 1024,
				height: 768,
				layout_version: image.layoutVersion,
			},
		})
	})
	it('cannot recreate a removed job or publish twice', async () => {
		tx.imageGenerationJob.updateMany.mockResolvedValue({ count: 0 })
		await expect(repository.saveImageAndMarkJobReady(job, image)).resolves.toBe(false)
		expect(tx.aiDialogueImage.create).not.toHaveBeenCalled()
	})
	it('propagates asset creation failure out of the transaction', async () => {
		tx.aiDialogueImage.create.mockRejectedValue(new Error('FK violation'))
		await expect(repository.saveImageAndMarkJobReady(job, image)).rejects.toThrow('FK violation')
	})
	it('limits character lookup to the saved dialogue and emotion sheets', async () => {
		await repository.findCharacters(1, [2, 3])
		expect(prisma.aiDialogueCharacter.findMany).toHaveBeenCalledWith({
			where: { dialogue_id: 1, id: { in: [2, 3] } },
			include: {
				AiDialogueImage: { where: { type: 'emotionSheet' }, orderBy: { id: 'desc' } },
				ImageGenerationJob: { where: { type: 'emotionSheet' }, select: { status: true } },
			},
		})
	})
})
