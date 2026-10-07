jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))

import { PrismaService } from 'db/prisma.service'
import { AiDialogueRepository } from './aiDialogue.repository'

describe('transactional dialogue deletion', () => {
	function harness() {
		const tx = {
			aiDialogueImage: { findMany: jest.fn().mockResolvedValue([{ s3_key: 'key' }]) },
			aiDialogue: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
		}
		const prisma = { $transaction: jest.fn(async (callback) => callback(tx)) }
		return { tx, repository: new AiDialogueRepository(prisma as unknown as PrismaService) }
	}
	it('collects both NPC and scene keys within the owner-scoped deletion transaction', async () => {
		const { repository, tx } = harness()
		await expect(repository.deleteDialogueAndGetImageKeys(1, 7)).resolves.toEqual(['key'])
		expect(tx.aiDialogueImage.findMany).toHaveBeenCalledWith({
			where: {
				OR: [
					{ character: { dialogue: { id: 1, user_id: 7 } } },
					{ message: { dialogue: { id: 1, user_id: 7 } } },
				],
			},
			select: { s3_key: true },
		})
		expect(tx.aiDialogue.deleteMany).toHaveBeenCalledWith({ where: { id: 1, user_id: 7 } })
	})
	it('returns no cleanup keys if the conditional DELETE did not remove a dialogue', async () => {
		const { repository, tx } = harness()
		tx.aiDialogue.deleteMany.mockResolvedValue({ count: 0 })
		await expect(repository.deleteDialogueAndGetImageKeys(1, 7)).resolves.toBeNull()
	})
})
