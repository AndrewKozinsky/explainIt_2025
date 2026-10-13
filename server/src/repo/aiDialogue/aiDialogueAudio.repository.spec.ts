jest.mock('@nestjs/common', () => ({ Injectable: () => (target: unknown) => target }))
import { AiDialogueAudioRepository } from './aiDialogueAudio.repository'

function harness() {
	const tx = {
		aiDialogueAudioJob: {
			findMany: jest.fn(),
			update: jest.fn().mockResolvedValue({}),
			updateMany: jest.fn().mockResolvedValue({ count: 1 }),
		},
		aiDialogueAudioAttempt: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
	}
	const prisma = { $transaction: jest.fn(async (callback) => callback(tx)) }
	return { repository: new AiDialogueAudioRepository(prisma as never), tx }
}

describe('authoritative audio binding', () => {
	it('binds separate speeches with intervening actions to their original message', async () => {
		const { repository, tx } = harness()
		tx.aiDialogueAudioJob.findMany.mockResolvedValue([
			{ id: 1, event_index: 2, action_index: 0, npc_id: 'npc', text: 'Hello.' },
			{ id: 2, event_index: 2, action_index: 2, npc_id: 'npc', text: 'Goodbye.' },
		])
		await repository.confirmAttempt(
			'attempt',
			[10],
			[
				{
					type: 'npcActions',
					npcId: 'npc',
					npcName: '',
					npcRole: '',
					emotion: 'neutral',
					actions: [
						{ type: 'speech', content: 'Hello.', translation: '' },
						{ type: 'action', content: 'waves', translation: '' },
						{ type: 'speech', content: 'Goodbye.', translation: '' },
					],
				},
			],
		)
		expect(tx.aiDialogueAudioJob.update.mock.calls).toEqual([
			[{ where: { id: 1 }, data: { message_id: 10 } }],
			[{ where: { id: 2 }, data: { message_id: 10 } }],
		])
	})
	it('cancels early text rejected by the authoritative parser', async () => {
		const { repository, tx } = harness()
		tx.aiDialogueAudioJob.findMany.mockResolvedValue([
			{ id: 1, event_index: 0, action_index: -1, npc_id: null, text: 'Rejected scene' },
		])
		await repository.confirmAttempt(
			'attempt',
			[10],
			[{ type: 'sceneUpdate', content: 'Different scene', translation: '' }],
		)
		expect(tx.aiDialogueAudioJob.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { status: 'cancelled' } })
	})
	it('cancels the attempt and its jobs in the same transaction', async () => {
		const { repository, tx } = harness()
		await repository.cancelAttempt('attempt')
		expect(tx.aiDialogueAudioAttempt.updateMany).toHaveBeenCalledWith({
			where: { id: 'attempt' },
			data: { status: 'cancelled' },
		})
		expect(tx.aiDialogueAudioJob.updateMany).toHaveBeenCalledWith({
			where: { attempt_id: 'attempt' },
			data: { status: 'cancelled' },
		})
	})
})
