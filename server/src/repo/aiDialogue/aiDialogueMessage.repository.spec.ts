jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))

import { AiDialogueMessageRepository } from './aiDialogueMessage.repository'

function dbEvent(type: string, payload: unknown) {
	return { type, payload: JSON.stringify(payload) }
}

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
