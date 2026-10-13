jest.mock('@nestjs/bullmq', () => ({ Processor: () => (target: unknown) => target, WorkerHost: class {} }))
jest.mock('repo/aiDialogue/aiDialogueAudio.repository', () => ({ AiDialogueAudioRepository: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))
jest.mock('infrastructure/redis/aiDialogueAudioNotifications.service', () => ({
	AiDialogueAudioNotifications: class {},
}))
jest.mock('infrastructure/ttsProviderAdapter/TtsAdapter.service', () => ({ TtsAdapterService: class {} }))
import { TtsError } from 'infrastructure/ttsProviderAdapter/TtsError'
import { AiDialogueAudioGenerationProcessor, validateDialogueMp3 } from './AiDialogueAudioGeneration.processor'

function mp3() {
	const bytes = Buffer.alloc(417)
	bytes.set([255, 251, 144, 0])
	return bytes
}

function harness(status = 'queued') {
	const row = {
		id: 1,
		status,
		s3_key: 'audio-key',
		attempt: { status: 'active' },
		input: JSON.stringify({
			type: 'OpenAI',
			model: 'gpt-4o-mini-tts',
			voice: 'cedar',
			text: 'Hello.',
			responseFormat: 'mp3',
		}),
	}

	const repository = {
		getJob: jest.fn().mockResolvedValue(row),
		claim: jest.fn().mockResolvedValue({ count: 1 }),
		setStatus: jest.fn().mockResolvedValue({ count: 1 }),
	}
	const tts = { generate: jest.fn().mockResolvedValue(mp3()) }
	const storage = { uploadFile: jest.fn().mockResolvedValue(undefined), readFile: jest.fn().mockResolvedValue(mp3()) }
	const processor = new AiDialogueAudioGenerationProcessor(
		repository as never,
		tts as never,
		storage as never,
		{ publishJobChanged: jest.fn() } as never,
	)
	return { processor, repository, tts, storage, row }
}
describe('audio submission and crash recovery', () => {
	it('claims before synthesis and uploads MP3 before marking ready', async () => {
		const { processor, repository, tts, storage } = harness()
		await processor.processStep(1)
		expect(repository.claim.mock.invocationCallOrder[0]).toBeLessThan(tts.generate.mock.invocationCallOrder[0])
		expect(storage.uploadFile.mock.invocationCallOrder[0]).toBeLessThan(
			repository.setStatus.mock.invocationCallOrder[0],
		)
		expect(storage.uploadFile).toHaveBeenCalledWith('audio-key', mp3(), 'audio/mpeg', 60_000)
		expect(repository.setStatus).toHaveBeenCalledWith(1, 'ready')
	})
	it('losing a concurrent claim never sends a paid request', async () => {
		const { processor, repository, tts } = harness()
		repository.claim.mockResolvedValue({ count: 0 })
		await processor.processStep(1)
		expect(tts.generate).not.toHaveBeenCalled()
	})
	it.each(['generating', 'outcomeUnknown'])(
		'recovers an uploaded result in %s without repeating TTS',
		async (status) => {
			const { processor, tts, repository } = harness(status)
			await processor.processStep(1)
			expect(tts.generate).not.toHaveBeenCalled()
			expect(repository.setStatus).toHaveBeenCalledWith(1, 'ready')
		},
	)
	it('a lost provider result becomes outcomeUnknown without automatic resubmission', async () => {
		const { processor, repository, tts } = harness()
		tts.generate.mockRejectedValue(new TtsError('request_failed', 'Unavailable', 'unknown'))
		await processor.processStep(1)
		expect(repository.setStatus).toHaveBeenCalledWith(1, 'outcomeUnknown', expect.any(String))
	})
	it('distinguishes a missing checkpoint from a storage outage', async () => {
		const { processor, repository, storage, tts } = harness('generating')
		storage.readFile.mockRejectedValue({ name: 'NoSuchKey' })
		await processor.processStep(1)
		expect(repository.setStatus).toHaveBeenCalledWith(1, 'outcomeUnknown', expect.any(String))
		repository.setStatus.mockClear()
		storage.readFile.mockRejectedValue({ $metadata: { httpStatusCode: 403 } })
		await expect(processor.processStep(1)).rejects.toBeDefined()
		expect(repository.setStatus).not.toHaveBeenCalled()
		expect(tts.generate).not.toHaveBeenCalled()
	})
	it('a failed DB commit after upload recovers storage without synthesizing twice', async () => {
		const { processor, repository, tts } = harness()
		repository.setStatus.mockRejectedValueOnce(new Error('DB unavailable'))
		await expect(processor.processStep(1)).rejects.toThrow()
		repository.getJob.mockResolvedValue({ ...harness('generating').row })
		await processor.processStep(1)
		expect(tts.generate).toHaveBeenCalledTimes(1)
	})
	it('does not publish when the attempt is cancelled during synthesis', async () => {
		const { processor, repository, storage, row } = harness()
		repository.getJob.mockResolvedValueOnce(row).mockResolvedValueOnce({ ...row, attempt: { status: 'cancelled' } })
		await processor.processStep(1)
		expect(storage.uploadFile).not.toHaveBeenCalled()
	})
	it('rejects truncated frames and ID3-only responses', () => {
		expect(() => validateDialogueMp3(mp3())).not.toThrow()
		expect(() => validateDialogueMp3(mp3().subarray(0, 20))).toThrow()
		expect(() => validateDialogueMp3(Buffer.from('ID3\0\0\0\0\0\0\0'))).toThrow()
	})
})

it('marks an invalid stored checkpoint failed without another TTS request', async () => {
	const { processor, repository, storage, tts } = harness('generating')
	storage.readFile.mockResolvedValue(Buffer.from('broken audio'))
	await processor.processStep(1)
	expect(repository.setStatus).toHaveBeenCalledWith(1, 'failed', 'Invalid stored MP3')
	expect(tts.generate).not.toHaveBeenCalled()
})
