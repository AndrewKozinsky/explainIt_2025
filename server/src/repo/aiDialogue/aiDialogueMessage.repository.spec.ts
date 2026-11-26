jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))

import type { ExamResultEvent } from 'types/aiDialogueMessage'
import { getAiDialogueTextBlocks } from 'features/aiDialogue/wordMap/buildAiDialogueWordMap'
import { attachInlineWordMaps } from 'features/aiDialogue/wordMap/inlineWordMaps'
import { serializeAiDialogueEvent } from 'features/aiDialogue/serializeAiDialogueEvent'
import { AiDialogueQueryRepository } from './aiDialogue.queryRepository'
import { AiDialogueMessageRepository } from './aiDialogueMessage.repository'

function dbEvent(type: string, payload: unknown) {
	return { type, payload: JSON.stringify(payload) }
}

describe('scene illustration on history replay', () => {
	it.each([
		[{ sceneImageRequested: false }, { withImage: false }],
		[{ sceneImageRequested: false, withImage: true }, { withImage: true }],
		[{}, {}],
	])('normalizes the stored image fields %j to %j', async (imageFields, expected) => {
		const content = { content: 'A cafe.', translation: 'Кафе.', visualDescription: 'A table by a window.' }
		const message = {
			...dbEvent('sceneUpdate', { ...content, ...imageFields }),
			id: 17,
			dialogue_id: 3,
			created_at: new Date('2026-11-17T10:00:00Z'),
		}
		const prisma = { aiDialogueMessage: { findMany: jest.fn().mockResolvedValue([message]) } } as never
		const queryRepository = new AiDialogueQueryRepository(prisma, {} as never)

		const [result] = await queryRepository.getMessagesByDialogueId(3)
		expect(result.payload).toEqual({ type: 'sceneUpdate', ...content, ...expected })
	})
})

describe('AiDialogueMessageRepository user text reviews', () => {
	it('returns the same saved review after sending and on history replay', async () => {
		const createdAt = new Date('2026-11-17T10:00:00Z')
		const messages = {
			create: jest.fn(async ({ data }) => ({ ...data, id: 17, created_at: createdAt })),
			findUnique: jest.fn(),
			findMany: jest.fn(),
		}
		const prisma = { aiDialogueMessage: messages } as never
		const repository = new AiDialogueMessageRepository(prisma)
		const queryRepository = new AiDialogueQueryRepository(prisma, {} as never)
		const originalSpeech = 'She go home.'
		const speech = { type: 'speech' as const, content: 'She goes home.' }
		const action = { type: 'action' as const, content: 'I nod.' }
		const analysis = {
			critical: [
				{
					title: 'Согласование',
					sentenceMarkdown: 'She **go** home.',
					explanationMarkdown: 'После **she** нужна форма **goes**.',
				},
			],
			suggestions: [],
		}
		const actionAnalysis = { critical: [], suggestions: [] }
		const payload = {
			type: 'userActions' as const,
			actions: [speech, action],
			textReview: [
				{ originalText: originalSpeech, analysis },
				{ originalText: action.content, analysis: actionAnalysis },
			],
		}
		const saved = await repository.createMessage({
			dialogueId: 3,
			event: payload,
		})
		messages.findUnique.mockResolvedValue(saved)
		messages.findMany.mockResolvedValue([saved])

		const response = {
			id: 17,
			dialogueId: 3,
			payload,
			createdAt: createdAt.toISOString(),
		}
		const message = await queryRepository.getMessageById(17)
		expect(message).toEqual(response)
		await expect(queryRepository.getMessagesByDialogueId(3)).resolves.toEqual([response])
		expect(serializeAiDialogueEvent(message!.payload)).toBe('[пользователь] «She goes home.»; *I nod.*')
	})
})

describe('AiDialogueMessageRepository text check context', () => {
	it('loads a bounded recent history chronologically and keeps an older current scene', async () => {
		const messages = {
			findMany: jest.fn().mockResolvedValue([
				dbEvent('userActions', {
					actions: [{ type: 'speech', content: 'Two, please.', translation: 'secret' }],
					wordMap: { secret: true },
				}),
				dbEvent('npcActions', {
					npcName: 'Alex',
					npcRole: 'Waiter',
					actions: [{ type: 'speech', content: 'How many cups?' }],
				}),
			]),
			findFirst: jest.fn().mockResolvedValue({
				type: 'sceneUpdate',
				payload: JSON.stringify({ content: 'A cafe', translation: 'secret', visualDescription: 'secret' }),
			}),
		}

		const repository = new AiDialogueMessageRepository({ aiDialogueMessage: messages } as never)

		await expect(repository.getTextCheckContext(3)).resolves.toEqual({
			scene: { type: 'sceneUpdate', content: 'A cafe' },
			recentMessages: [
				{ type: 'npcActions', npcName: 'Alex', actions: [{ type: 'speech', content: 'How many cups?' }] },
				{ type: 'userActions', actions: [{ type: 'speech', content: 'Two, please.' }] },
			],
		})

		expect(messages.findMany).toHaveBeenCalledWith({
			where: { dialogue_id: 3 },
			orderBy: { id: 'desc' },
			take: 8,
			select: { type: true, payload: true },
		})

		expect(messages.findFirst).toHaveBeenCalledWith({
			where: { dialogue_id: 3, type: 'sceneUpdate' },
			orderBy: { id: 'desc' },
			select: { type: true, payload: true },
		})
	})

	it('limits each event to a shared text budget and handles an empty dialogue', async () => {
		const messages = {
			findMany: jest
				.fn()
				.mockResolvedValue([
					dbEvent('npcActions', { actions: Array(10).fill({ type: 'speech', content: 'a'.repeat(2000) }) }),
				]),
			findFirst: jest.fn().mockResolvedValue(null),
		}

		const repository = new AiDialogueMessageRepository({ aiDialogueMessage: messages } as never)
		const result = await repository.getTextCheckContext(1)

		expect(result.scene).toBeNull()
		const actions = result.recentMessages[0].actions!
		expect(actions).toHaveLength(8)
		expect(actions.map((action: { content: string }) => action.content).join('')).toHaveLength(2000)
		messages.findMany.mockResolvedValue([])

		await expect(repository.getTextCheckContext(1)).resolves.toEqual({ scene: null, recentMessages: [] })
	})
})

describe('exam result message', () => {
	it.each(['A0', 'C1'] as const)(
		'preserves %s on replay and excludes the report from story text and dictionary maps',
		async (level) => {
			const event: ExamResultEvent = {
				medalUrl: null,
				type: 'examResult',
				assessedThroughMessageId: 15,
				level,
				summary: 'Attempt result',
				strengths: [],
				errors: [
					{
						messageId: 15,
						originalText: 'She go.',
						suggestedText: 'She goes.',
						explanation: 'Verb agreement.',
					},
				],
				recommendations: ['Practise verb agreement.'],
			}
			const messages = {
				create: jest.fn(async ({ data }) => ({ ...data, id: 16, created_at: new Date() })),
				findUnique: jest.fn(),
			}
			const prisma = {
				aiDialogueMessage: messages,
				aiDialogue: { findUnique: jest.fn().mockResolvedValue({ scenario: { medal_s3_keys: null } }) },
			} as never
			const repository = new AiDialogueMessageRepository(prisma)
			const query = new AiDialogueQueryRepository(prisma, {} as never)
			const saved = await repository.createMessage({ dialogueId: 3, event })
			messages.findUnique.mockResolvedValue(saved)

			expect((await query.getMessageById(16))?.payload).toEqual(event)
			expect(serializeAiDialogueEvent(event)).toBe('')
			expect(getAiDialogueTextBlocks(event)).toEqual({})
			expect(attachInlineWordMaps([event], '', 'en')).toEqual([event])
		},
	)
})
