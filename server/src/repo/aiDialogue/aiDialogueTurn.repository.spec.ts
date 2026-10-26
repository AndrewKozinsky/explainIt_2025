jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))

import { PrismaService } from 'db/prisma.service'
import { aiDialogueIllustrationStyleCatalog } from 'features/aiDialogue/illustrationStyles/catalog'
import {
	buildImageGenerationInput,
	parseImageGenerationSnapshot,
} from 'features/aiDialogue/imageGeneration/buildImageGenerationPrompt'
import { parseAiDialogueEvents } from 'features/aiDialogue/parseAiDialogueEvents'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueTurnRepository } from './aiDialogueTurn.repository'

function createHarness(illustrationStyleId = 'realism', mode = 'localdev') {
	const tx = {
		aiDialogue: {
			findUniqueOrThrow: jest.fn().mockResolvedValue({
				illustration_style_id: illustrationStyleId,
				user: { avatar_preset_id: 'female-2', avatar_s3_key: 'retained.webp' },
			}),
		},
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

	const config = { get: jest.fn(() => ({ mode })) }
	return { repository: new AiDialogueTurnRepository(prisma, config as unknown as MainConfigService), tx, config }
}

describe('AiDialogueTurnRepository', () => {
	it.each(['localdev', 'servermaster'])('uses each saved style for both new NPCs and scenes in %s', async (mode) => {
		for (const style of aiDialogueIllustrationStyleCatalog.styles) {
			const { repository, tx } = createHarness(style.id, mode)
			tx.aiDialogueCharacter.findUnique.mockResolvedValue(null)
			tx.aiDialogueCharacter.create.mockResolvedValue({ id: 10, appearance: 'dark hair' })
			tx.aiDialogueMessage.create.mockResolvedValueOnce({ id: 100 }).mockResolvedValueOnce({ id: 101 })
			tx.imageGenerationJob.create.mockResolvedValue({ id: 30 })

			await repository.saveGeneratedTurn({
				dialogueId: 5,
				turn: parseAiDialogueEvents(
					[
						'sceneUpdate',
						'An office.',
						'Кабинет.',
						'participants:npc_1',
						'visual:A conversation in an office.',
						'',
						'npcActions|npc_1|Alex|receptionist|neutral',
						'appearance:',
						'dark hair',
						'speech:',
						'Hello.',
						'Здравствуйте.',
					].join('\n'),
				),
			})
			expect(tx.aiDialogue.findUniqueOrThrow).toHaveBeenCalledTimes(1)
			for (const [job] of tx.imageGenerationJob.create.mock.calls) {
				const snapshot = parseImageGenerationSnapshot(job.data.type, job.data.input)
				expect(snapshot).toMatchObject({
					illustrationStyleId: style.id,
					stylePrompt: style.stylePrompt,
					styleAvatarReferenceS3Key: `ai-dialogue-images/shared/styles/${mode}/${style.file}`,
					styleSceneReferenceS3Key: `ai-dialogue-images/shared/styles/${mode}/${style.file}`,
				})
			}
			expect(tx.imageGenerationJob.create).toHaveBeenCalledTimes(2)
			expect(tx.imageGenerationOutbox.create).toHaveBeenCalledTimes(2)
		}
	})

	it('captures the saved style for a new NPC without sceneUpdate', async () => {
		const { repository, tx } = createHarness('watercolor')
		tx.aiDialogueCharacter.findUnique.mockResolvedValue(null)
		tx.aiDialogueCharacter.create.mockResolvedValue({ id: 10, appearance: 'dark hair' })
		tx.aiDialogueMessage.create.mockResolvedValue({ id: 100 })
		tx.imageGenerationJob.create.mockResolvedValue({ id: 30 })
		await repository.saveGeneratedTurn({
			dialogueId: 5,
			turn: parseAiDialogueEvents(
				[
					'npcActions|npc_1|Alex|receptionist|neutral',
					'appearance:',
					'dark hair',
					'speech:',
					'Hello.',
					'Здравствуйте.',
				].join('\n'),
			),
		})
		expect(tx.imageGenerationJob.create).toHaveBeenCalledTimes(1)
		expect(tx.imageGenerationJob.create.mock.calls[0][0].data.type).toBe('emotionSheet')
		expect(JSON.parse(tx.imageGenerationJob.create.mock.calls[0][0].data.input)).toMatchObject({
			illustrationStyleId: 'watercolor',
			styleAvatarReferenceS3Key: 'ai-dialogue-images/shared/styles/localdev/watercolor.webp',
		})
	})

	it('does not persist messages or jobs for an invalid saved style', async () => {
		const { repository, tx } = createHarness('unknown')
		await expect(
			repository.saveGeneratedTurn({
				dialogueId: 5,
				turn: parseAiDialogueEvents('sceneUpdate\nAn office.\nКабинет.'),
			}),
		).rejects.toMatchObject({ statusCode: 500 })
		expect(tx.aiDialogueMessage.create).not.toHaveBeenCalled()
		expect(tx.imageGenerationJob.create).not.toHaveBeenCalled()
	})

	it.each([
		{
			avatar_preset_id: 'female-2',
			avatar_s3_key: 'retained.webp',
			expectedKey: 'user-avatars/shared/female-2.jpg',
		},
		{ avatar_preset_id: null, avatar_s3_key: 'uploaded.webp', expectedKey: 'uploaded.webp' },
	])('persists scene metadata and the selected avatar $expectedKey in the same transaction', async (profile) => {
		const { repository, tx } = createHarness()
		tx.aiDialogue.findUniqueOrThrow.mockResolvedValue({ illustration_style_id: 'realism', user: profile })
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
			userAvatarS3Key: profile.expectedKey,
			model: 'gpt-image-2',
			quality: 'low',
			format: 'png',
			size: { width: 1152, height: 576 },
			illustrationStyleId: 'realism',
			styleSceneReferenceS3Key: 'ai-dialogue-images/shared/styles/localdev/realism.webp',
		})
		expect(JSON.parse(tx.imageGenerationJob.create.mock.calls[0][0].data.input)).toMatchObject({
			model: 'gpt-image-2',
			quality: 'low',
			format: 'png',
			size: { width: 960, height: 720 },
			illustrationStyleId: 'realism',
			styleAvatarReferenceS3Key: 'ai-dialogue-images/shared/styles/localdev/realism.webp',
		})
		expect(JSON.parse(tx.imageGenerationJob.create.mock.calls[0][0].data.input)).not.toHaveProperty(
			'userAvatarS3Key',
		)
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

	it('keeps a heard visitor out of the scene snapshot and image references', async () => {
		const { repository, tx } = createHarness()
		tx.aiDialogueCharacter.findUnique.mockResolvedValue(null)
		tx.aiDialogueCharacter.create.mockResolvedValue({ id: 10, appearance: 'dark hair' })
		tx.aiDialogueMessage.create.mockResolvedValueOnce({ id: 101 }).mockResolvedValueOnce({ id: 102 })
		tx.imageGenerationJob.create.mockResolvedValue({ id: 30 })
		const visualDescription =
			'The participant is inside their apartment facing the closed opaque front door. The visitor is outside, entirely out of view. Interior camera; no hallway is visible.'
		const turn = parseAiDialogueEvents(
			[
				'sceneUpdate',
				'You hear a knock at your apartment door.',
				'Вы слышите стук во входную дверь своей квартиры.',
				'participants:',
				`visual:${visualDescription}`,
				'',
				'npcActions|npc_1|||neutral',
				'appearance:',
				'dark hair',
				'speech:',
				'Is anyone home?',
				'Кто-нибудь дома?',
			].join('\n'),
		)

		await repository.saveGeneratedTurn({ dialogueId: 5, turn })

		const sceneJob = tx.imageGenerationJob.create.mock.calls.find(([args]) => args.data.type === 'scene')
		const snapshot = parseImageGenerationSnapshot('scene', sceneJob![0].data.input)
		expect(snapshot).toMatchObject({
			visualDescription,
			participantNpcIds: [],
			participantCharacterIds: [],
		})
		expect(JSON.parse(tx.aiDialogueMessage.create.mock.calls[0][0].data.payload).participantNpcIds).toEqual([])
		expect(tx.aiDialogueMessage.create.mock.calls[1][0].data.character_id).toBe(10)
		const references = ['user', 'style'].map(
			(value) => `data:image/png;base64,${Buffer.from(value).toString('base64')}`,
		)
		const imageInput = buildImageGenerationInput(snapshot, references)
		expect(imageInput.references?.map((reference) => reference.bytes.toString())).toEqual(['user', 'style'])
		expect(imageInput.prompt).toContain(visualDescription)
		expect(imageInput.prompt).toContain('Image 2 supplies visual style only')
		expect(imageInput.prompt).not.toContain('Image 2 is NPC')
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
