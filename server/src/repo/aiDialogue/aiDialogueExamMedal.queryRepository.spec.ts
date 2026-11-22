jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
import { AiDialogueQueryRepository } from './aiDialogue.queryRepository'

function harness(level = 'B1') {
	const row = {
		id: 11,
		dialogue_id: 3,
		type: 'examResult',
		payload: JSON.stringify({
			level,
			summary: 'Report',
			strengths: [],
			errors: [],
			recommendations: [],
			assessedThroughMessageId: 10,
		}),
		created_at: new Date(0),
	}
	const prisma = {
		aiDialogue: {
			findUnique: jest
				.fn()
				.mockResolvedValue({
					scenario: {
						medal_s3_keys: JSON.stringify({
							B1: 'ai-dialogue-scenario-medals/localdev/passport-control/B1.webp',
						}),
					},
				}),
		},
		aiDialogueMessage: {
			findUnique: jest.fn().mockResolvedValue(row),
			findMany: jest.fn().mockResolvedValue([row]),
		},
	}
	return { repo: new AiDialogueQueryRepository(prisma as never, {} as never), prisma }
}

it('returns the same public medal URL with the saved result and its replay', async () => {
	const { repo } = harness()
	const message = await repo.getMessageById(11)
	const replay = await repo.getMessagesByDialogueId(3)
	expect(message?.payload).toMatchObject({
		type: 'examResult',
		medalUrl: 'https://files.immersia.site/ai-dialogue-scenario-medals/localdev/passport-control/B1.webp',
	})
	expect(replay).toEqual([message])
})

it('returns null for A0 and skips medal lookup for ordinary messages', async () => {
	const { repo, prisma } = harness('A0')
	expect((await repo.getMessageById(11))?.payload).toMatchObject({ medalUrl: null })
	prisma.aiDialogue.findUnique.mockClear()
	prisma.aiDialogueMessage.findMany.mockResolvedValue([])
	await expect(repo.getMessagesByDialogueId(3)).resolves.toEqual([])
	expect(prisma.aiDialogue.findUnique).not.toHaveBeenCalled()
})
