import { Processor, WorkerHost } from '@nestjs/bullmq'
import { DelayedError, Job, UnrecoverableError } from 'bullmq'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { QueueNames } from 'infrastructure/queues/queueNames'
import { AiDialogueAudioNotifications } from 'infrastructure/redis/aiDialogueAudioNotifications.service'
import { TtsAdapterService } from 'infrastructure/ttsProviderAdapter/TtsAdapter.service'
import { TtsError } from 'infrastructure/ttsProviderAdapter/TtsError'
import { openAITtsInputSchema } from 'infrastructure/ttsProviderAdapter/ttsInput.schema'

/** Dedicated worker queue: audio never waits for image dependencies or occupies the text registry. */
@Processor(QueueNames.AI_DIALOGUE_AUDIO_GENERATION, { concurrency: 4 })
export class AiDialogueAudioGenerationProcessor extends WorkerHost {
	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly tts: TtsAdapterService,
		private readonly storage: CloudflareS3Service,
		private readonly notifications: AiDialogueAudioNotifications,
	) {
		super()
	}

	async process(job: Job<{ audioJobId: number }>, token?: string): Promise<void> {
		const id = job.data.audioJobId

		if (job.name !== 'generate-audio' || !Number.isSafeInteger(id) || id <= 0)
			throw new UnrecoverableError('Invalid audio job')
		try {
			await this.processStep(id)
		} catch {
			// Retry persistence/storage recovery only. A generating job can never submit TTS again.
			await job.moveToDelayed(Date.now() + 30_000, token)
			throw new DelayedError()
		}

		await this.notifications.publishJobChanged(id)
	}

	async processStep(id: number): Promise<void> {
		const job = await this.repository.getJob(id)

		if (!job || job.attempt.status === 'cancelled' || ['ready', 'failed', 'cancelled'].includes(job.status)) return
		if (job.status === 'generating' || job.status === 'outcomeUnknown') {
			await this.recover(id, job.s3_key)
			return
		}

		let input

		try {
			input = openAITtsInputSchema.parse(JSON.parse(job.input))
			if (input.responseFormat !== 'mp3') throw new Error('Unsupported dialogue audio format')
		} catch {
			if ((await this.repository.claim(id)).count)
				await this.repository.setStatus(id, 'failed', 'Invalid TTS input')
			return
		}

		if (!(await this.repository.claim(id)).count) return

		let bytes: Buffer
		try {
			bytes = await this.tts.generate(input)
		} catch (error) {
			await this.repository.setStatus(
				id,
				error instanceof TtsError && error.outcome === 'not_sent' ? 'failed' : 'outcomeUnknown',
				'Audio generation unavailable',
			)
			return
		}

		try {
			validateDialogueMp3(bytes)
		} catch {
			await this.repository.setStatus(id, 'failed', 'Invalid MP3 response')
			return
		}
		const current = await this.repository.getJob(id)
		if (!current || current.status === 'cancelled' || current.attempt.status === 'cancelled') return

		await this.storage.uploadFile(job.s3_key, bytes, 'audio/mpeg', 60_000)
		await this.repository.setStatus(id, 'ready')
	}

	private async recover(id: number, key: string) {
		let bytes: Buffer
		try {
			bytes = await this.storage.readFile(key)
		} catch (error) {
			if (isMissingObject(error)) {
				await this.repository.setStatus(
					id,
					'outcomeUnknown',
					'TTS result unavailable; automatic resubmission disabled',
				)
				return
			}
			throw error
		}
		try {
			validateDialogueMp3(bytes)
		} catch {
			await this.repository.setStatus(id, 'failed', 'Invalid stored MP3')
			return
		}
		await this.repository.setStatus(id, 'ready')
	}
}

/** Bound storage size and require a plausible MPEG audio frame (an ID3 header alone is insufficient). */
export function validateDialogueMp3(bytes: Buffer) {
	if (bytes.length < 4 || bytes.length > 32 * 1024 * 1024) throw new Error('Invalid audio size')
	let offset = 0
	if (bytes.subarray(0, 3).toString('ascii') === 'ID3') {
		if (bytes.length < 10 || [6, 7, 8, 9].some((i) => bytes[i] > 127)) throw new Error('Invalid ID3 header')
		offset = 10 + ((bytes[6] << 21) | (bytes[7] << 14) | (bytes[8] << 7) | bytes[9])
	}
	const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
	const lowBitrates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
	for (let i = offset; i < Math.min(bytes.length - 3, offset + 4096); i += 1) {
		const version = (bytes[i + 1] >> 3) & 3
		const layer = (bytes[i + 1] >> 1) & 3
		const rateIndex = (bytes[i + 2] >> 2) & 3
		const bitrateIndex = bytes[i + 2] >> 4
		if (
			bytes[i] !== 255 ||
			(bytes[i + 1] & 224) !== 224 ||
			version === 1 ||
			layer !== 1 ||
			rateIndex === 3 ||
			bitrateIndex === 0 ||
			bitrateIndex === 15
		)
			continue
		const sampleRate = [44100, 48000, 32000][rateIndex] / (version === 3 ? 1 : version === 2 ? 2 : 4)
		const bitrate = (version === 3 ? bitrates : lowBitrates)[bitrateIndex]
		const frameSize =
			Math.floor(((version === 3 ? 144000 : 72000) * bitrate) / sampleRate) + ((bytes[i + 2] >> 1) & 1)
		if (frameSize >= 24 && i + frameSize <= bytes.length) return
	}
	throw new Error('Invalid MP3 frames')
}

function isMissingObject(error: unknown) {
	const value = error as { name?: string; $metadata?: { httpStatusCode?: number } }
	return value?.name === 'NoSuchKey' || value?.$metadata?.httpStatusCode === 404
}
