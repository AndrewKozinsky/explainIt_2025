jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { PrismaService } from 'db/prisma.service'
import { AiDialogueTurnRepository } from './aiDialogueTurn.repository'

function createHarness() {
	const tx = {
		aiDialogueCharacter: {
			findUnique: jest.fn(),
			create: jest.fn(),
			findMany: jest.fn().mockResolvedValue([{ id: 10, npc_id: 'npc_1' }]),
		},
		aiDialogueMessage: { create: jest.fn() },
		imageGenerationJob: { create: jest.fn() },
		imageGenerationOutbox: { create: jest.fn() },
	}
	const prisma = {
		$transaction: jest.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
	} as unknown as PrismaService
	return { repository: new AiDialogueTurnRepository(prisma), tx }
}

describe('AiDialogueTurnRepository', () => {
	it('persists scene metadata and binds messages to characters in the same transaction', async () => {
		const { repository, tx } = createHarness()
		tx.aiDialogueCharacter.findUnique.mockResolvedValue(null)
		tx.aiDialogueCharacter.create.mockResolvedValue({ id: 10, appearance: 'short dark hair' })
		tx.aiDialogueMessage.create.mockResolvedValueOnce({ id: 100 }).mockResolvedValueOnce({ id: 101 })
		tx.imageGenerationJob.create.mockResolvedValueOnce({ id: 30 }).mockResolvedValueOnce({ id: 31 })

		const messageIds = await repository.saveGeneratedTurn({
			dialogueId: 5,
			turn: {
				events: [
					{
						type: 'npcActions',
						npcId: 'npc_1',
						npcName: 'Alex',
						npcRole: 'passer-by',
						emotion: 'worried',
						actions: [{ type: 'speech', content: 'Hello', translation: 'Привет' }],
					},
					{ type: 'sceneUpdate', content: 'Office', translation: 'Кабинет' },
				],
				visualMetadata: {
					npcAppearances: [{ npcId: 'npc_1', appearance: 'short dark hair' }],
					scenes: [
						{
							eventIndex: 1,
							participantNpcIds: ['npc_1', 'unknown'],
							visualDescription: 'A conversation in the office.',
						},
					],
				},
			},
		})

		expect(messageIds).toEqual([100, 101])
		expect(tx.imageGenerationJob.create).toHaveBeenCalledTimes(2)
		expect(tx.imageGenerationOutbox.create).toHaveBeenCalledTimes(2)
		expect(JSON.parse(tx.imageGenerationJob.create.mock.calls[1][0].data.input)).toMatchObject({
			userAvatarS3Key: 'ai-dialogue-images/shared/user-avatar.jpg',
		})
		expect(tx.imageGenerationJob.create.mock.calls[1][0].data).toMatchObject({
			message_id: 101,
			character_id: null,
		})
		const npcMessage = tx.aiDialogueMessage.create.mock.calls[0][0].data
		expect(npcMessage.character_id).toBe(10)
		expect(JSON.parse(npcMessage.payload).emotion).toBe('worried')
		const sceneMessage = tx.aiDialogueMessage.create.mock.calls[1][0].data
		expect(sceneMessage.character_id).toBeNull()
		expect(JSON.parse(sceneMessage.payload)).toMatchObject({
			participantNpcIds: ['npc_1'],
			visualDescription: 'A conversation in the office.',
		})
	})

	it('reuses a known NPC without creating another character or image job', async () => {
		const { repository, tx } = createHarness()
		tx.aiDialogueCharacter.findUnique.mockResolvedValue({ id: 10 })
		tx.aiDialogueMessage.create.mockResolvedValue({ id: 100 })

		await repository.saveGeneratedTurn({
			dialogueId: 5,
			turn: {
				events: [
					{
						type: 'npcActions',
						npcId: 'npc_1',
						npcName: 'Alex',
						npcRole: 'passer-by',
						emotion: 'happy',
						actions: [{ type: 'speech', content: 'Welcome back', translation: 'С возвращением' }],
					},
				],
				visualMetadata: { npcAppearances: [], scenes: [] },
			},
		})

		expect(tx.aiDialogueMessage.create.mock.calls[0][0].data.character_id).toBe(10)
		expect(tx.aiDialogueCharacter.create).not.toHaveBeenCalled()
		expect(tx.imageGenerationJob.create).not.toHaveBeenCalled()
		expect(tx.imageGenerationOutbox.create).not.toHaveBeenCalled()
	})

	it('resolves scene participants even when a new NPC appears later in the turn', async () => {
		const { repository, tx } = createHarness()
		tx.aiDialogueCharacter.findUnique.mockResolvedValue(null)
		tx.aiDialogueCharacter.create.mockResolvedValue({ id: 10, appearance: 'dark hair' })
		tx.aiDialogueMessage.create.mockResolvedValueOnce({ id: 101 }).mockResolvedValueOnce({ id: 102 })
		tx.imageGenerationJob.create.mockResolvedValue({ id: 30 })

		await repository.saveGeneratedTurn({
			dialogueId: 5,
			turn: {
				events: [
					{ type: 'sceneUpdate', content: 'Office', translation: 'Кабинет' },
					{
						type: 'npcActions',
						npcId: 'npc_1',
						npcName: 'Alex',
						npcRole: '',
						emotion: 'neutral',
						actions: [{ type: 'speech', content: 'Hello', translation: 'Привет' }],
					},
				],
				visualMetadata: {
					npcAppearances: [{ npcId: 'npc_1', appearance: 'dark hair' }],
					scenes: [{ eventIndex: 0, participantNpcIds: ['npc_1'], visualDescription: 'Alex in an office' }],
				},
			},
		})

		expect(JSON.parse(tx.aiDialogueMessage.create.mock.calls[0][0].data.payload).participantNpcIds).toEqual([
			'npc_1',
		])
		expect(JSON.parse(tx.imageGenerationJob.create.mock.calls[1][0].data.input).participantCharacterIds).toEqual([
			10,
		])
		expect(tx.aiDialogueMessage.create.mock.calls[1][0].data.character_id).toBe(10)
	})

	it('keeps user messages without an NPC author and creates no image job for them', async () => {
		const { repository, tx } = createHarness()
		tx.aiDialogueMessage.create.mockResolvedValue({ id: 100 })

		await repository.saveGeneratedTurn({
			dialogueId: 5,
			turn: {
				events: [{ type: 'userActions', actions: [{ type: 'speech', content: 'Hello' }] }],
				visualMetadata: { npcAppearances: [], scenes: [] },
			},
		})

		expect(tx.aiDialogueMessage.create.mock.calls[0][0].data.character_id).toBeNull()
		expect(tx.aiDialogueCharacter.create).not.toHaveBeenCalled()
		expect(tx.imageGenerationJob.create).not.toHaveBeenCalled()
	})
})
