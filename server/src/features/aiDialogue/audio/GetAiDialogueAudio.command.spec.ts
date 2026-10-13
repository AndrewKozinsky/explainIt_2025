jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogueAudio.repository', () => ({ AiDialogueAudioRepository: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))
jest.mock('models/aiDialogue/aiDialogueAudio.out.model', () => ({}))
import { GetAiDialogueAudioCommand, GetAiDialogueAudioHandler, mapDialogueAudio } from './GetAiDialogueAudio.command'

describe('private dialogue audio', () => {
	it.each([null, { user_id: 8 }])('checks access before signing URLs', async (snapshot) => {
		const storage = { getFileUrl: jest.fn() }
		const handler = new GetAiDialogueAudioHandler(
			{ getSnapshot: jest.fn().mockResolvedValue(snapshot) } as never,
			storage as never,
		)
		await expect(handler.execute(new GetAiDialogueAudioCommand(7, 1))).rejects.toMatchObject({
			statusCode: snapshot ? 403 : 404,
		})
		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})

	it('exposes a ready preview URL before the final message has an ID', async () => {
		const job = {
			id: 1,
			attempt_id: 'attempt',
			attempt: { turn_id: 'turn', status: 'active' },
			message_id: null,
			event_index: 0,
			action_index: 1,
			npc_id: 'npc',
			status: 'ready',
			s3_key: 'private-key',
			text: 'Private text',
			input: 'Secret instructions',
		}
		const result = await mapDialogueAudio(
			job as never,
			{ getFileUrl: jest.fn().mockResolvedValue('signed-url') } as never,
		)
		expect(result).toMatchObject({ messageId: null, url: 'signed-url', attemptStatus: 'active' })
		expect(result).not.toHaveProperty('input')
		expect(result).not.toHaveProperty('s3_key')
		expect(result).not.toHaveProperty('text')
	})
	it('does not sign or return files of a cancelled attempt', async () => {
		const storage = { getFileUrl: jest.fn() }
		const result = await mapDialogueAudio(
			{ status: 'ready', attempt: { status: 'cancelled' } } as never,
			storage as never,
		)
		expect(result).toMatchObject({ status: 'cancelled', url: null })
		expect(storage.getFileUrl).not.toHaveBeenCalled()
	})
})
