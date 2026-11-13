jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (target: unknown) => target }))
jest.mock('repo/aiDialogue/aiDialogueAudio.repository', () => ({ AiDialogueAudioRepository: class {} }))
jest.mock('infrastructure/cloudflareS3/cloudflareS3.service', () => ({ CloudflareS3Service: class {} }))
jest.mock('infrastructure/mainConfig/mainConfig.service', () => ({ MainConfigService: class {} }))
jest.mock('infrastructure/ttsProviderAdapter/TtsAdapter.service', () => ({ TtsAdapterService: class {} }))
jest.mock('models/aiDialogue/aiDialogueAudio.out.model', () => ({}))
jest.mock('features/billing/UserBalance.service', () => ({ UserBalanceService: class {} }))
import { TtsError } from 'infrastructure/ttsProviderAdapter/TtsError'
import { AI_DIALOGUE_NARRATOR } from './aiDialogueAudioConfig'
import {
	GenerateAiDialogueAudioCommand,
	GenerateAiDialogueAudioHandler,
	SCENE_AUDIO_ACTION_INDEX,
} from './GenerateAiDialogueAudio.command'
import { isValidDialogueMp3 } from './isValidDialogueMp3'
import { getMp3DurationSeconds } from './mp3Frames'

function createMp3() {
	const mp3Bytes = Buffer.alloc(417)
	mp3Bytes.set([255, 251, 144, 0])
	return mp3Bytes
}

const npcMessage = {
	id: 10,
	dialogue_id: 1,
	type: 'npcActions',
	payload: JSON.stringify({
		npcId: 'officer',
		actions: [
			{ type: 'action', content: 'Looks up.' },
			{ type: 'speech', content: 'Passport, please.' },
		],
	}),
	dialogue: { user_id: 7 },
}

const sceneMessage = {
	id: 11,
	dialogue_id: 1,
	type: 'sceneUpdate',
	payload: JSON.stringify({ content: 'An airport hall.' }),
	dialogue: { user_id: 7 },
}

const officerVoice = { voice: 'ash', instructions: 'Calm official voice' }

function createHarness(message: object | null = npcMessage) {
	const audioRow = { id: 3, s3_key: 'ai-dialogue-audio/key.mp3', status: 'generating' }
	const repository = {
		getMessageWithOwner: jest.fn().mockResolvedValue(message),
		getVoice: jest.fn().mockResolvedValue(officerVoice),
		getAudio: jest.fn(),
		startGenerationIfNeeded: jest.fn().mockResolvedValue({ audio: audioRow, shouldGenerate: true }),
		setStatus: jest.fn().mockResolvedValue(undefined),
	}
	const tts = { generate: jest.fn().mockResolvedValue(createMp3()) }
	const storage = {
		uploadFile: jest.fn().mockResolvedValue(undefined),
		getFileUrl: jest.fn().mockResolvedValue('https://r2/audio.mp3'),
	}
	const config = { get: () => ({ region: 'ru', mode: 'localdev' }) }
	const balance = {
		ensurePositiveBalanceOrThrow: jest.fn().mockResolvedValue(undefined),
		chargeOpenAiTts: jest.fn().mockResolvedValue(undefined),
	}
	const handler = new GenerateAiDialogueAudioHandler(
		repository as never,
		tts as never,
		storage as never,
		config as never,
		balance as never,
	)

	return { handler, repository, tts, storage, audioRow, balance }
}

function command(messageId = 10, actionIndex = 1, userId = 7) {
	return new GenerateAiDialogueAudioCommand({ userId, dialogueId: 1, messageId, actionIndex })
}

describe('GenerateAiDialogueAudioHandler', () => {
	it('synthesizes NPC speech with the saved voice and returns a signed URL', async () => {
		const { handler, repository, tts, storage, audioRow } = createHarness()

		await expect(handler.execute(command())).resolves.toEqual({
			url: 'https://r2/audio.mp3',
			mimeType: 'audio/mpeg',
		})
		expect(repository.getVoice).toHaveBeenCalledWith(1, 'officer')
		expect(tts.generate).toHaveBeenCalledWith(
			expect.objectContaining({ text: 'Passport, please.', voice: 'ash', instructions: 'Calm official voice' }),
		)
		expect(storage.uploadFile).toHaveBeenCalledWith(audioRow.s3_key, expect.any(Buffer), 'audio/mpeg', 60_000)
		expect(repository.setStatus).toHaveBeenCalledWith(audioRow.id, 'ready')
	})

	it('voices the scene description with the narrator', async () => {
		const { handler, tts } = createHarness(sceneMessage)

		await handler.execute(command(11, SCENE_AUDIO_ACTION_INDEX))

		expect(tts.generate).toHaveBeenCalledWith(
			expect.objectContaining({ text: 'An airport hall.', voice: AI_DIALOGUE_NARRATOR.voice }),
		)
	})

	it('returns a ready file without another synthesis', async () => {
		const { handler, repository, tts, audioRow } = createHarness()
		repository.startGenerationIfNeeded.mockResolvedValue({
			audio: { ...audioRow, status: 'ready' },
			shouldGenerate: false,
		})

		await expect(handler.execute(command())).resolves.toMatchObject({ url: 'https://r2/audio.mp3' })
		expect(tts.generate).not.toHaveBeenCalled()
	})

	it('waits for a concurrent request of the same speech instead of synthesizing again', async () => {
		jest.useFakeTimers()
		try {
			const { handler, repository, tts, audioRow } = createHarness()
			repository.startGenerationIfNeeded.mockResolvedValue({ audio: audioRow, shouldGenerate: false })
			repository.getAudio.mockResolvedValueOnce(audioRow).mockResolvedValueOnce({ ...audioRow, status: 'ready' })

			const result = handler.execute(command())
			await jest.advanceTimersByTimeAsync(1000)

			await expect(result).resolves.toMatchObject({ url: 'https://r2/audio.mp3' })
			expect(tts.generate).not.toHaveBeenCalled()
		} finally {
			jest.useRealTimers()
		}
	})

	it('marks the audio failed when TTS fails so the next request can retry', async () => {
		const { handler, repository, tts, storage, audioRow } = createHarness()
		tts.generate.mockRejectedValue(new TtsError('request_failed', 'Unavailable', 'unknown'))
		const log = jest.spyOn(console, 'log').mockImplementation(() => undefined)

		try {
			await expect(handler.execute(command())).rejects.toMatchObject({ statusCode: 500 })
			expect(repository.setStatus).toHaveBeenCalledWith(audioRow.id, 'failed')
			expect(storage.uploadFile).not.toHaveBeenCalled()
		} finally {
			log.mockRestore()
		}
	})

	it.each([
		{ title: 'missing message', message: null, userId: 7, statusCode: 404 },
		{
			title: 'message of another dialogue',
			message: { ...npcMessage, dialogue_id: 2 },
			userId: 7,
			statusCode: 404,
		},
		{ title: 'another owner', message: npcMessage, userId: 8, statusCode: 403 },
	])('rejects $title before synthesis', async ({ message, userId, statusCode }) => {
		const { handler, repository, tts } = createHarness(message)

		await expect(handler.execute(command(10, 1, userId))).rejects.toMatchObject({ statusCode })
		expect(repository.startGenerationIfNeeded).not.toHaveBeenCalled()
		expect(tts.generate).not.toHaveBeenCalled()
	})

	it.each([
		{ title: 'non-verbal action', actionIndex: 0 },
		{ title: 'missing position', actionIndex: 5 },
		{ title: 'scene index on an NPC message', actionIndex: SCENE_AUDIO_ACTION_INDEX },
	])('rejects a $title', async ({ actionIndex }) => {
		const { handler, repository } = createHarness()

		await expect(handler.execute(command(10, actionIndex))).rejects.toMatchObject({ statusCode: 400 })
		expect(repository.startGenerationIfNeeded).not.toHaveBeenCalled()
	})

	it('does not voice an NPC without a saved voice profile', async () => {
		const { handler, repository, tts } = createHarness()
		repository.getVoice.mockResolvedValue(null)

		await expect(handler.execute(command())).rejects.toMatchObject({ statusCode: 400 })
		expect(tts.generate).not.toHaveBeenCalled()
	})
})

describe('isValidDialogueMp3', () => {
	it('rejects truncated frames and ID3-only responses', () => {
		expect(isValidDialogueMp3(createMp3())).toBe(true)
		expect(isValidDialogueMp3(createMp3().subarray(0, 20))).toBe(false)
		expect(isValidDialogueMp3(Buffer.from('ID3\0\0\0\0\0\0\0'))).toBe(false)
	})
})

describe('getMp3DurationSeconds', () => {
	it('sums the duration of whole frames', () => {
		// Кадр MPEG1 Layer III 128 kbit/s 44.1 kHz: 417 байт и 1152 сэмпла.
		const threeFrames = Buffer.concat([createMp3(), createMp3(), createMp3()])

		expect(getMp3DurationSeconds(threeFrames)).toBeCloseTo((3 * 1152) / 44100, 10)
		expect(getMp3DurationSeconds(Buffer.from('not an mp3'))).toBe(0)
	})
})

describe('GenerateAiDialogueAudioHandler balance', () => {
	it('charges the dialogue owner by the duration of the synthesized audio', async () => {
		const { handler, balance } = createHarness()

		await handler.execute(command())

		expect(balance.chargeOpenAiTts).toHaveBeenCalledWith({
			userId: 7,
			feature: 'aiDialogueAudio',
			inputText: 'Calm official voice\nPassport, please.',
			audioSeconds: 1152 / 44100,
		})
	})

	it('does not synthesize when the balance is exhausted', async () => {
		const { handler, balance, tts, repository } = createHarness()
		balance.ensurePositiveBalanceOrThrow.mockRejectedValue(new Error('BALANCE_EXHAUSTED'))

		await expect(handler.execute(command())).rejects.toThrow('BALANCE_EXHAUSTED')
		expect(repository.startGenerationIfNeeded).not.toHaveBeenCalled()
		expect(tts.generate).not.toHaveBeenCalled()
	})

	it('returns ready audio without checking the balance', async () => {
		const { handler, balance, repository, tts } = createHarness()
		repository.getAudio.mockResolvedValue({ status: 'ready', s3_key: 'ai-dialogue-audio/ready.mp3' })
		balance.ensurePositiveBalanceOrThrow.mockRejectedValue(new Error('BALANCE_EXHAUSTED'))

		await expect(handler.execute(command())).resolves.toEqual({
			url: 'https://r2/audio.mp3',
			mimeType: 'audio/mpeg',
		})
		expect(tts.generate).not.toHaveBeenCalled()
	})
})
