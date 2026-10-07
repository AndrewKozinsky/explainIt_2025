jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }))
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))

import { GetAiDialogueVisualsCommand, GetAiDialogueVisualsHandler } from './GetAiDialogueVisuals.command'
import { AiDialogueVisualsRepository } from 'repo/aiDialogue/aiDialogueVisuals.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'

function harness() {
	const image = {
		id: 20,
		s3_key: 'private.png',
		mime_type: 'image/png',
		width: 1024,
		height: 768,
		layout_version: 'emotion-grid-4x3-v1',
	}
	const dialogue = {
		id: 1,
		user_id: 7,
		AiDialogueCharacter: [
			{
				id: 2,
				npc_id: 'doctor',
				name: 'Doctor',
				role: null,
				AiDialogueImage: [image],
				ImageGenerationJob: [{ status: 'ready' }],
			},
		],
		AiDialogueMessage: [
			{ id: 3, AiDialogueImage: [], ImageGenerationJob: [{ status: 'waitingDependencies' }] },
			{ id: 4, AiDialogueImage: [], ImageGenerationJob: [] },
		],
	}
	const repository = { getDialogueVisuals: jest.fn().mockResolvedValue(dialogue) }
	const storage = { getFileUrl: jest.fn(async (key) => `signed:${key}`) }
	const service = new GetAiDialogueVisualsHandler(
		repository as unknown as AiDialogueVisualsRepository,
		storage as unknown as CloudflareS3Service,
	)
	return { service, repository, storage, dialogue }
}

describe('GetAiDialogueVisuals', () => {
	it('returns ready images, pending scenes and old scenes without jobs', async () => {
		const { service, storage } = harness()
		const result = await service.execute(new GetAiDialogueVisualsCommand(7, 1))
		expect(result.dialogueId).toBe(1)
		expect(result.characters[0]).toMatchObject({
			id: 2,
			npcId: 'doctor',
			generationStatus: 'ready',
			emotionSheet: { id: 20, url: 'signed:private.png', width: 1024, height: 768 },
		})
		expect(result.scenes).toEqual([
			{ messageId: 3, generationStatus: 'waitingDependencies', image: null },
			{ messageId: 4, generationStatus: null, image: null },
		])
		expect(storage.getFileUrl).toHaveBeenCalledTimes(2)
		expect(result).not.toHaveProperty('user_id')
		expect(result.characters[0].emotionSheet).not.toHaveProperty('s3_key')
	})
	it.each([null, { user_id: 8 }])('rejects missing or foreign dialogues before signing URLs', async (dialogue) => {
		const { service, storage, repository } = harness()
		repository.getDialogueVisuals.mockResolvedValue(dialogue)
		await expect(service.execute(new GetAiDialogueVisualsCommand(7, 1))).rejects.toMatchObject({
			statusCode: dialogue ? 403 : 404,
		})
		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})
	it('returns a shared avatar even for a dialogue without NPCs or scenes', async () => {
		const { service, dialogue } = harness()
		dialogue.AiDialogueCharacter = []
		dialogue.AiDialogueMessage = []
		const result = await service.execute(new GetAiDialogueVisualsCommand(7, 1))
		expect(result).toMatchObject({
			userAvatarUrl: 'signed:ai-dialogue-images/shared/user-avatar.jpg',
			characters: [],
			scenes: [],
		})
		expect(Date.parse(result.urlsExpireAt)).toBeGreaterThan(Date.now())
	})
	it('propagates signing failures instead of marking missing URLs ready', async () => {
		const { service, storage } = harness()
		storage.getFileUrl.mockRejectedValueOnce(new Error('signing failed'))
		await expect(service.execute(new GetAiDialogueVisualsCommand(7, 1))).rejects.toThrow('signing failed')
	})
})
