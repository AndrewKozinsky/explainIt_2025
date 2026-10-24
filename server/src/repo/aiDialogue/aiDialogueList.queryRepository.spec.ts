jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/swagger', () => ({ ApiProperty: () => () => undefined }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))

import { AiDialogueListQueryRepository } from './aiDialogueList.queryRepository'

const createdAt = new Date('2026-10-20T10:00:00Z')
const messageAt = new Date('2026-10-23T15:30:00Z')

function image(id: number, type = 'scene') {
	return {
		id,
		s3_key: `private/${id}.png`,
		mime_type: 'image/png',
		width: type === 'scene' ? 1152 : 960,
		height: type === 'scene' ? 576 : 720,
		layout_version: type === 'scene' ? null : 'emotion-grid-4x3-v1',
	}
}

function npcMessage(actions: unknown[] = [{ type: 'speech', content: 'Hello!' }]) {
	return {
		id: 90,
		dialogue_id: 5,
		type: 'npcActions',
		payload: JSON.stringify({ npcId: 'anna', npcName: 'Anna', npcRole: 'receptionist', actions }),
		created_at: messageAt,
		AiDialogueImage: [],
	}
}

function harness() {
	const dialogue = {
		id: 5,
		source_language_code: 'en',
		max_cefr_level: null,
		created_at: createdAt,
		scenario: { id: 2, title: '{"ru":"Покупка абонемента в бассейн"}' },
		AiDialogueCharacter: [
			{
				id: 8,
				npc_id: 'anna',
				name: 'Anna',
				role: 'receptionist',
				AiDialogueImage: [image(100, 'emotionSheet')],
				ImageGenerationJob: [{ status: 'ready' }],
			},
		],
	}

	const tx = {
		$queryRaw: jest.fn().mockResolvedValue([]),
		aiDialogue: { count: jest.fn().mockResolvedValue(7), findMany: jest.fn().mockResolvedValue([dialogue]) },
		aiDialogueMessage: {
			groupBy: jest.fn().mockResolvedValue([
				{ dialogue_id: 5, type: 'npcActions', _max: { id: 90 } },
				{ dialogue_id: 5, type: 'sceneUpdate', _max: { id: 85 } },
			]),
			findMany: jest
				.fn()
				.mockResolvedValue([
					npcMessage(),
					{ id: 85, dialogue_id: 5, type: 'sceneUpdate', AiDialogueImage: [image(101)] },
				]),
		},
	}

	let reading = false
	const prisma = {
		$transaction: jest.fn(async (callback, _options) => {
			reading = true
			const result = await callback(tx)
			reading = false
			return result
		}),
	}

	const storage = {
		getFileUrl: jest.fn(async (key: string) => {
			expect(reading).toBe(false)
			return `https://signed.example/${key}`
		}),
	}
	const repository = new AiDialogueListQueryRepository(prisma as never, storage as never)
	return { repository, prisma, storage, tx, dialogue }
}

describe('AiDialogueListQueryRepository', () => {
	it('reads only the owner page in a consistent snapshot, ordered by creation date and ID', async () => {
		const { repository, prisma, tx } = harness()
		const result = await repository.getUserDialogues(7, { page: 2, pageSize: 3 })

		expect(result).toMatchObject({ page: 2, pageSize: 3, total: 7, totalPages: 3 })
		expect(tx.aiDialogue.count).toHaveBeenCalledWith({ where: { user_id: 7 } })
		expect(tx.aiDialogue.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { user_id: 7 },
				skip: 3,
				take: 3,
				orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
			}),
		)
		expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), { isolationLevel: 'RepeatableRead' })
		expect(tx.aiDialogue.findMany).toHaveBeenCalledTimes(1)
	})

	it('fetches at most the selected NPC message and scene per dialogue without loading the history', async () => {
		const { repository, tx } = harness()
		await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(tx.aiDialogueMessage.groupBy).toHaveBeenCalledWith({
			by: ['dialogue_id', 'type'],
			where: { dialogue_id: { in: [5] }, type: { in: ['npcActions', 'sceneUpdate'] } },
			_max: { id: true },
		})
		expect(tx.aiDialogueMessage.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { id: { in: [90, 85] }, dialogue_id: { in: [5] } },
			}),
		)
		expect(tx.aiDialogueMessage.findMany).toHaveBeenCalledTimes(1)
		expect(tx.aiDialogue.findMany.mock.calls[0][0].select.AiDialogueMessage).toBeUndefined()
	})

	it('maps the NPC text, name, role and its own date, preserving localized titles and unrestricted CEFR', async () => {
		const { repository } = harness()
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(items[0]).toMatchObject({
			scenario: { id: 2, title: '{"ru":"Покупка абонемента в бассейн"}' },
			sourceLanguageCode: 'en',
			maxCefrLevel: null,
			createdAt: createdAt.toISOString(),
			lastMessage: {
				id: 90,
				npcId: 'anna',
				name: 'Anna',
				role: 'receptionist',
				text: 'Hello!',
				textType: 'speech',
				createdAt: messageAt.toISOString(),
			},
		})
	})

	it('returns every historical NPC, including an NPC whose sprite is not ready, without selecting user avatars', async () => {
		const { repository, dialogue, tx } = harness()
		dialogue.max_cefr_level = 'B2' as never
		dialogue.AiDialogueCharacter.push({
			id: 9,
			npc_id: 'mary',
			name: 'Mary',
			role: 'manager',
			AiDialogueImage: [],
			ImageGenerationJob: [{ status: 'generating' }],
		})
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(items[0].maxCefrLevel).toBe('B2')
		expect(items[0].characters).toHaveLength(2)
		expect(items[0].characters[1]).toEqual({
			npcId: 'mary',
			name: 'Mary',
			role: 'manager',
			generationStatus: 'generating',
			emotionSheet: null,
		})
		const select = tx.aiDialogue.findMany.mock.calls[0][0].select
		expect(select.AiDialogueCharacter.orderBy).toEqual({ id: 'asc' })
		expect(select.AiDialogueCharacter.take).toBeUndefined()
		expect(select.user).toBeUndefined()
		expect(items[0]).not.toHaveProperty('userAvatarUrl')
	})

	it('returns the image of the latest scene, not the most recently generated asset', async () => {
		const { repository } = harness()
		const before = Date.now()
		const result = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(result.items[0].sceneImage).toEqual({
			id: 101,
			url: 'https://signed.example/private/101.png',
			mimeType: 'image/png',
			width: 1152,
			height: 576,
			layoutVersion: null,
		})
		expect(result.items[0].characters[0].emotionSheet).toMatchObject({
			width: 960,
			height: 720,
			layoutVersion: 'emotion-grid-4x3-v1',
		})
		expect(Date.parse(result.urlsExpireAt)).toBeGreaterThanOrEqual(before + 5 * 60 * 60_000)
		expect(Date.parse(result.urlsExpireAt)).toBeLessThanOrEqual(Date.now() + 5 * 60 * 60_000)
		expect(JSON.stringify(result)).not.toMatch(/s3_key|payload|appearance|system_prompt|participantNpcIds/)
	})

	it('does not fall back to an earlier scene when the latest scene has no ready image', async () => {
		const { repository, tx, storage } = harness()
		tx.aiDialogueMessage.groupBy.mockResolvedValue([{ dialogue_id: 5, type: 'sceneUpdate', _max: { id: 95 } }])
		tx.aiDialogueMessage.findMany.mockResolvedValue([
			{ id: 95, dialogue_id: 5, type: 'sceneUpdate', AiDialogueImage: [] },
		])
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(items[0].sceneImage).toBeNull()
		expect(items[0].lastMessage).toBeNull()
		expect(storage.getFileUrl).toHaveBeenCalledTimes(1)
		expect(tx.aiDialogueMessage.findMany.mock.calls[0][0].where.id).toEqual({ in: [95] })
	})

	it('returns null lastMessage and sceneImage for an empty dialogue without fetching payloads', async () => {
		const { repository, tx, dialogue } = harness()
		dialogue.AiDialogueCharacter = []
		tx.aiDialogueMessage.groupBy.mockResolvedValue([])
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(items[0]).toMatchObject({ lastMessage: null, sceneImage: null, characters: [] })
		expect(tx.aiDialogueMessage.findMany).not.toHaveBeenCalled()
	})

	it('includes historical NPCs missing from the visual registry, without generating sprites or exposing message IDs', async () => {
		const { repository, tx } = harness()
		tx.$queryRaw.mockResolvedValue([
			{ dialogueId: 5, firstMessageId: 10, npcId: 'old_officer', name: 'Alex', role: 'officer' },
		])
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 })
		expect(items[0].characters).toHaveLength(2)
		expect(items[0].characters[0]).toEqual({
			npcId: 'old_officer',
			name: 'Alex',
			role: 'officer',
			generationStatus: null,
			emotionSheet: null,
		})
		const query = tx.$queryRaw.mock.calls[0][0]
		expect(query.values).toEqual([5])
		expect(query.sql).toContain('NOT EXISTS')
		expect(query.sql).toContain('m.character_id IS NULL')
	})

	it.each([0, 7])('returns an empty page with total=%s without signing URLs or reading messages', async (total) => {
		const { repository, tx, storage } = harness()
		tx.aiDialogue.count.mockResolvedValue(total)
		tx.aiDialogue.findMany.mockResolvedValue([])
		await expect(repository.getUserDialogues(7, { page: 10, pageSize: 3 })).resolves.toMatchObject({
			items: [],
			total,
			page: 10,
			pageSize: 3,
			totalPages: Math.ceil(total / 3),
		})
		expect(tx.aiDialogueMessage.groupBy).not.toHaveBeenCalled()
		expect(tx.aiDialogueMessage.findMany).not.toHaveBeenCalled()
		expect(storage.getFileUrl).not.toHaveBeenCalled()
		expect(tx.$queryRaw).not.toHaveBeenCalled()
	})
})
