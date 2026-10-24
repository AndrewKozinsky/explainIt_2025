jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
jest.mock('db/prisma.service', () => ({ PrismaService: class {} }))
jest.mock('repo/aiDialogueScenario/aiDialogueScenario.queryRepository', () => ({
	AiDialogueScenarioQueryRepository: class {},
}))

import { AiDialogueQueryRepository } from './aiDialogue.queryRepository'
import { AiDialogueRepository } from './aiDialogue.repository'

function harness() {
	const prisma = {
		aiDialogue: {
			create: jest.fn().mockResolvedValue({ id: 1 }),
			updateMany: jest.fn().mockResolvedValue({ count: 1 }),
			findUnique: jest.fn(),
			findMany: jest.fn(),
		},
	}
	const repository = new AiDialogueRepository(prisma as never)
	const query = new AiDialogueQueryRepository(prisma as never, { mapDbToOutModel: () => ({ id: 2 }) } as never)
	return { prisma, repository, query }
}

describe('dialogue language setting persistence', () => {
	it.each([undefined, null, 'A2'] as const)(
		'persists %s and defaults omitted creation settings to null',
		async (maxCefrLevel) => {
			const { repository, prisma } = harness()
			await repository.createDialogue({
				userId: 7,
				scenarioId: 2,
				sourceLanguageCode: 'en',
				targetLanguageCode: 'ru',
				maxCefrLevel,
			})
			expect(prisma.aiDialogue.create).toHaveBeenCalledWith({
				data: expect.objectContaining({ max_cefr_level: maxCefrLevel ?? null }),
			})
		},
	)

	it('scopes updates to the owner and reports concurrent deletion', async () => {
		const { repository, prisma } = harness()
		await expect(repository.updateDialogue(1, 7, { max_cefr_level: null })).resolves.toBe(true)

		expect(prisma.aiDialogue.updateMany).toHaveBeenCalledWith({
			where: { id: 1, user_id: 7 },
			data: { max_cefr_level: null },
		})
		prisma.aiDialogue.updateMany.mockResolvedValue({ count: 0 })

		await expect(repository.updateDialogue(1, 7, { max_cefr_level: 'B1' })).resolves.toBe(false)
	})

	it('updates several scalar dialogue fields in one owner-scoped write', async () => {
		const { repository, prisma } = harness()
		const data = { source_language_code: 'de' as const, summary: 'Updated summary', summary_up_to: 12 }
		await expect(repository.updateDialogue(1, 7, data)).resolves.toBe(true)

		expect(prisma.aiDialogue.updateMany).toHaveBeenCalledWith({
			where: { id: 1, user_id: 7 },
			data,
		})
	})

	it.each([null, 'B2'])('returns the saved value %s in detail responses', async (maxCefrLevel) => {
		const { prisma, query } = harness()
		const row = {
			id: 1,
			max_cefr_level: maxCefrLevel,
			created_at: new Date(),
			updated_at: new Date(),
		}

		prisma.aiDialogue.findUnique.mockResolvedValue(row)

		await expect(query.getDialogueById(1)).resolves.toMatchObject({ maxCefrLevel })
	})
})
