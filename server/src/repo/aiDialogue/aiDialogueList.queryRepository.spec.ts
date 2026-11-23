jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('@nestjs/swagger', () => ({ ApiProperty: () => () => undefined }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))

import { AiDialogueListQueryRepository } from './aiDialogueList.queryRepository'

const character = {
	name: 'Anna',
	role: 'receptionist',
	AiDialogueImage: [{ s3_key: 'private/avatar.png' }],
}

function npcMessage(dialogueId = 5, npcName = 'Anna') {
	return {
		dialogue_id: dialogueId,
		type: 'npcActions',
		payload: JSON.stringify({
			npcId: 'anna',
			npcName,
			npcRole: 'receptionist',
			actions: [{ type: 'speech', content: 'Hello!' }],
		}),
		character,
	}
}

function harness() {
	const dialogue = {
		id: 5,
		source_language_code: 'en',
		cefr_level: null,
		mode: 'practice',
		scenario: {
			title: '{"ru":"Покупка абонемента в бассейн","en":"Pool membership"}',
			medal_s3_keys: null,
		},
	}

	const tx = {
		aiDialogue: { count: jest.fn().mockResolvedValue(7), findMany: jest.fn().mockResolvedValue([dialogue]) },
		aiDialogueMessage: {
			groupBy: jest.fn().mockResolvedValue([
				{ dialogue_id: 5, type: 'npcActions', _max: { id: 90 } },
				{ dialogue_id: 5, type: 'sceneUpdate', _max: { id: 85 } },
			]),
			findMany: jest
				.fn()
				.mockResolvedValueOnce([{ dialogue_id: 5, AiDialogueImage: [{ s3_key: 'private/scene.png' }] }])
				.mockResolvedValueOnce([npcMessage()]),
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
		const result = await repository.getUserDialogues(7, { page: 2, pageSize: 3 }, 'ru')

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

	it('fetches only the selected scene and mode-specific message per dialogue', async () => {
		const { repository, tx, dialogue } = harness()
		tx.aiDialogue.findMany.mockResolvedValue([dialogue, { ...dialogue, id: 6, mode: 'exam' }])
		await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

		expect(tx.aiDialogueMessage.groupBy).toHaveBeenCalledWith({
			by: ['dialogue_id', 'type'],
			where: {
				OR: [
					{ dialogue_id: { in: [5, 6] }, type: 'sceneUpdate' },
					{ dialogue_id: { in: [5] }, type: 'npcActions' },
					{ dialogue_id: { in: [6] }, type: 'examResult' },
				],
			},
			_max: { id: true },
		})
		expect(tx.aiDialogueMessage.findMany).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({ where: { id: { in: [85] }, dialogue_id: { in: [5, 6] } } }),
		)
		expect(tx.aiDialogueMessage.findMany.mock.calls[0][0].select.payload).toBeUndefined()
		expect(tx.aiDialogueMessage.findMany).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({ where: { id: { in: [90] }, dialogue_id: { in: [5, 6] } } }),
		)
		expect(tx.aiDialogue.findMany.mock.calls[0][0].select.AiDialogueCharacter).toBeUndefined()
	})

	it('returns the latest scene, localized title and only the author of the practice message', async () => {
		const { repository, storage } = harness()
		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

		expect(items[0]).toEqual({
			id: 5,
			scenarioTitle: 'Покупка абонемента в бассейн',
			sourceLanguageCode: 'en',
			cefrLevel: null,
			mode: 'practice',
			sceneImageUrl: 'https://signed.example/private/scene.png',
			lastMessage: {
				name: 'Anna',
				role: 'receptionist',
				text: 'Hello!',
				textType: 'speech',
				avatarUrl: 'https://signed.example/private/avatar.png',
			},
			exam: null,
		})
		expect(storage.getFileUrl).toHaveBeenCalledTimes(2)
	})

	it('keeps portraits isolated between dialogues that share a scenario and NPC identifier', async () => {
		const { repository, tx, dialogue } = harness()
		tx.aiDialogue.findMany.mockResolvedValue([dialogue, { ...dialogue, id: 6 }])
		tx.aiDialogueMessage.groupBy.mockResolvedValue([
			{ dialogue_id: 5, type: 'npcActions', _max: { id: 90 } },
			{ dialogue_id: 6, type: 'npcActions', _max: { id: 91 } },
		])
		tx.aiDialogueMessage.findMany.mockReset().mockResolvedValueOnce([
			npcMessage(),
			{
				...npcMessage(6, 'Another Anna'),
				character: {
					...character,
					AiDialogueImage: [{ s3_key: 'private/second.png' }],
				},
			},
		])

		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

		expect(items.map((item) => [item.lastMessage?.name, item.lastMessage?.avatarUrl])).toEqual([
			['Anna', 'https://signed.example/private/avatar.png'],
			['Another Anna', 'https://signed.example/private/second.png'],
		])
	})

	it('uses legacy NPC metadata when the message has no character record', async () => {
		const { repository, tx } = harness()
		tx.aiDialogueMessage.groupBy.mockResolvedValue([{ dialogue_id: 5, type: 'npcActions', _max: { id: 90 } }])
		tx.aiDialogueMessage.findMany.mockReset().mockResolvedValueOnce([{ ...npcMessage(), character: null }])

		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

		expect(items[0].lastMessage).toMatchObject({ name: 'Anna', role: 'receptionist', avatarUrl: null })
	})

	it('returns null when the latest scene has no ready image and no NPC has spoken', async () => {
		const { repository, tx, storage } = harness()
		tx.aiDialogueMessage.groupBy.mockResolvedValue([{ dialogue_id: 5, type: 'sceneUpdate', _max: { id: 95 } }])
		tx.aiDialogueMessage.findMany.mockReset().mockResolvedValue([{ dialogue_id: 5, AiDialogueImage: [] }])

		const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

		expect(items[0]).toMatchObject({ lastMessage: null, sceneImageUrl: null, exam: null })
		expect(storage.getFileUrl).not.toHaveBeenCalled()
		expect(tx.aiDialogueMessage.findMany.mock.calls[0][0].where.id).toEqual({ in: [95] })
	})

	it.each([
		[null, 'inProgress', null, null],
		['A0', 'failed', null, null],
		[
			'A1',
			'passed',
			'A1',
			'https://files.immersia.site/ai-dialogue-scenario-medals/localdev/hotel-check-in/A1.webp',
		],
		['C1', 'passed', 'C1', null],
	])(
		'maps result %s to %s independently of the initial difficulty or availability of the medal',
		async (result, status, level, medalUrl) => {
			const { repository, tx, dialogue, storage } = harness()
			tx.aiDialogue.findMany.mockResolvedValue([
				{
					...dialogue,
					mode: 'exam',
					cefr_level: 'B1',
					scenario: {
						...dialogue.scenario,
						medal_s3_keys: JSON.stringify({
							A1: 'ai-dialogue-scenario-medals/localdev/hotel-check-in/A1.webp',
						}),
					},
				},
			])
			tx.aiDialogueMessage.groupBy.mockResolvedValue(
				result ? [{ dialogue_id: 5, type: 'examResult', _max: { id: 92 } }] : [],
			)
			tx.aiDialogueMessage.findMany.mockReset().mockResolvedValue([
				{
					dialogue_id: 5,
					type: 'examResult',
					payload: JSON.stringify({ level: result, summary: 'Full report' }),
					character: null,
				},
			])

			const { items } = await repository.getUserDialogues(7, { page: 1, pageSize: 3 }, 'ru')

			expect(items[0]).toMatchObject({ cefrLevel: 'B1', lastMessage: null, mode: 'exam' })
			expect(items[0].exam).toEqual({ status, level, medalUrl })
			expect(storage.getFileUrl).not.toHaveBeenCalled()
		},
	)

	it.each([0, 7])('returns an empty page with total=%s without signing URLs or reading messages', async (total) => {
		const { repository, tx, storage } = harness()
		tx.aiDialogue.count.mockResolvedValue(total)
		tx.aiDialogue.findMany.mockResolvedValue([])
		await expect(repository.getUserDialogues(7, { page: 10, pageSize: 3 }, 'ru')).resolves.toMatchObject({
			items: [],
			total,
			page: 10,
			pageSize: 3,
			totalPages: Math.ceil(total / 3),
		})
		expect(tx.aiDialogueMessage.groupBy).not.toHaveBeenCalled()
		expect(tx.aiDialogueMessage.findMany).not.toHaveBeenCalled()
		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})
})
