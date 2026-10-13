jest.mock('@nestjs/common', () => ({
	Injectable: () => (target: unknown) => target,
	Logger: class {
		warn() {}
	},
}))
jest.mock('repo/aiDialogue/aiDialogueAudio.repository', () => ({ AiDialogueAudioRepository: class {} }))
jest.mock('infrastructure/queues/aiDialogueAudioGeneration.queue', () => ({ AiDialogueAudioGenerationQueue: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))
import { AiDialogueAudioStream } from './AiDialogueAudioStream.service'

function harness() {
	const repository = {
		startAttempt: jest.fn().mockResolvedValue({}),
		getVoice: jest.fn().mockResolvedValue({ voice: 'ash', instructions: 'Original voice' }),
		ensureVoice: jest.fn(),
		createJob: jest.fn(async (_attempt, candidate, _input) => ({
			id: 7,
			event_index: candidate.eventIndex,
			action_index: candidate.actionIndex,
			npc_id: candidate.npcId,
		})),
		markPublished: jest.fn(),
		cancelAttempt: jest.fn().mockResolvedValue(undefined),
		confirmAttempt: jest.fn().mockResolvedValue(undefined),
	}

	const queue = { enqueue: jest.fn().mockResolvedValue(undefined) }
	const hub = { publishDialogueEvent: jest.fn() }
	const service = new AiDialogueAudioStream(
		repository as never,
		queue as never,
		{ get: () => ({ region: 'eu', mode: 'test' }) } as never,
		hub as never,
	)
	return { service, repository, queue, hub }
}
describe('early background audio preparation', () => {
	it('enqueues a completed speech while the LLM has not produced its translation', async () => {
		const { service, repository, queue } = harness()
		const session = service.start(1, 'turn')
		session.push('npcActions|npc|||neutral\nspeech:\nHello.\n')
		// Flush background persistence without closing the LLM stream.
		for (let i = 0; i < 20; i += 1) await Promise.resolve()
		expect(queue.enqueue).toHaveBeenCalledWith(7)
		expect(repository.createJob.mock.calls[0][2]).toMatchObject({
			text: 'Hello.',
			voice: 'ash',
			instructions: 'Original voice',
		})
	})
	it('does not block text chunks on a pending queue connection', async () => {
		const { service, queue } = harness()
		queue.enqueue.mockReturnValue(new Promise(() => undefined))
		const session = service.start(1, 'turn')
		session.push('sceneUpdate\nYou enter.\n')
		await session.finish()
		expect(queue.enqueue).toHaveBeenCalled()
	})
	it('immediately invalidates the attempt before waiting for persistence', async () => {
		const { service, repository, hub } = harness()
		let resolve!: () => void
		repository.startAttempt.mockReturnValue(
			new Promise<void>((done) => {
				resolve = done
			}),
		)
		const session = service.start(1, 'turn')
		const cancellation = session.cancel()
		expect(hub.publishDialogueEvent.mock.calls.at(-1)?.[1].data.type).toBe('audioAttemptCancelled')
		resolve()
		await cancellation
		expect(repository.cancelAttempt).toHaveBeenCalledWith(session.id)
	})
})

it('persists the first voice even when that NPC has only nonverbal actions', async () => {
	const { service, repository } = harness()
	const session = service.start(1, 'turn')
	session.push(
		'npcActions|npc|||neutral\nvoice:\n{"voice":"ash","instructions":"Low steady voice"}\naction:\nsmiles\nулыбается\n',
	)
	await session.finish()
	expect(repository.ensureVoice).toHaveBeenCalledWith(1, 'npc', { voice: 'ash', instructions: 'Low steady voice' })
	expect(repository.createJob).not.toHaveBeenCalled()
})
