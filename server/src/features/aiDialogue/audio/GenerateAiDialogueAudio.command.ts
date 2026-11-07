import { randomUUID } from 'node:crypto'
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { AiDialogueAudioRepository } from 'repo/aiDialogue/aiDialogueAudio.repository'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { TtsAdapterService } from 'infrastructure/ttsProviderAdapter/TtsAdapter.service'
import { openAITtsInputSchema } from 'infrastructure/ttsProviderAdapter/ttsInput.schema'
import { AiDialogueAudioOutModel } from 'models/aiDialogue/aiDialogueAudio.out.model'
import {
	AI_DIALOGUE_NARRATOR,
	AI_DIALOGUE_TTS_MODEL,
	DialogueVoice,
	dialogueVoiceSchema,
} from './aiDialogueAudioConfig'
import { isValidDialogueMp3 } from './isValidDialogueMp3'

/** Индекс озвучки описания сцены: у сцены нет списка actions. */
export const SCENE_AUDIO_ACTION_INDEX = -1

const AUDIO_MIME_TYPE = 'audio/mpeg'
/** Сколько ждать результата параллельного запроса той же реплики, прежде чем вернуть ошибку. */
const CONCURRENT_GENERATION_WAIT_MS = 90_000
const CONCURRENT_GENERATION_POLL_MS = 500

type GenerateAiDialogueAudioInput = {
	userId: number
	dialogueId: number
	messageId: number
	actionIndex: number
}

type AudioSource = { text: string; voice: DialogueVoice }

export class GenerateAiDialogueAudioCommand implements ICommand {
	constructor(public input: GenerateAiDialogueAudioInput) {}
}

/**
 * Возвращает озвучку реплики NPC или описания сцены, создавая её при первом запросе.
 * Одна реплика синтезируется не больше одного раза: повторные и параллельные запросы получают тот же файл.
 * После ошибки синтеза следующий запрос пробует снова.
 */
@CommandHandler(GenerateAiDialogueAudioCommand)
export class GenerateAiDialogueAudioHandler implements ICommandHandler<
	GenerateAiDialogueAudioCommand,
	AiDialogueAudioOutModel
> {
	constructor(
		private readonly repository: AiDialogueAudioRepository,
		private readonly tts: TtsAdapterService,
		private readonly storage: CloudflareS3Service,
		private readonly config: MainConfigService,
	) {}

	async execute(command: GenerateAiDialogueAudioCommand): Promise<AiDialogueAudioOutModel> {
		const { dialogueId, messageId, actionIndex } = command.input
		const source = await this.getAudioSource(command.input)

		const { region, mode } = this.config.get()
		const s3Key = `ai-dialogue-audio/generated/${region}/${mode}/${dialogueId}/${randomUUID()}.mp3`
		const { audio, shouldGenerate } = await this.repository.startGenerationIfNeeded(
			{ messageId, actionIndex },
			s3Key,
		)
		if (!audio) throw audioGenerationFailed()

		if (shouldGenerate) {
			await this.synthesize(audio.id, audio.s3_key, source)
			return this.toOutModel(audio.s3_key)
		}

		if (audio.status === 'ready') return this.toOutModel(audio.s3_key)

		return this.waitForConcurrentGeneration(messageId, actionIndex)
	}

	/** Проверяет владельца и находит текст и голос. Озвучиваются только описание сцены и реплики NPC. */
	private async getAudioSource(input: GenerateAiDialogueAudioInput): Promise<AudioSource> {
		const message = await this.repository.getMessageWithOwner(input.messageId)

		if (!message || message.dialogue_id !== input.dialogueId) {
			throw new CustomError(errorMessage.aiDialogue.notFound, ErrorStatusCode.NotFound_404)
		}

		if (message.dialogue.user_id !== input.userId) {
			throw new CustomError(errorMessage.user.isNotOwner, ErrorStatusCode.Forbidden_403)
		}

		const event = { type: message.type, ...JSON.parse(message.payload) } as AiDialogueEvent

		if (event.type === 'sceneUpdate' && input.actionIndex === SCENE_AUDIO_ACTION_INDEX && event.content) {
			return { text: event.content, voice: AI_DIALOGUE_NARRATOR }
		}

		if (event.type !== 'npcActions') throw audioNotAvailable()

		const speech = event.actions[input.actionIndex]
		if (speech?.type !== 'speech' || !speech.content) throw audioNotAvailable()

		const savedVoice = await this.repository.getVoice(input.dialogueId, event.npcId)
		const voice = dialogueVoiceSchema.safeParse(
			savedVoice && { voice: savedVoice.voice, instructions: savedVoice.instructions },
		)
		// Модель не прислала корректный голос нового NPC: его реплики не озвучиваются, чужой голос не подставляется.
		if (!voice.success) throw audioNotAvailable()

		return { text: speech.content, voice: voice.data }
	}

	private async synthesize(audioId: number, s3Key: string, source: AudioSource) {
		const ttsInput = openAITtsInputSchema.parse({
			type: 'OpenAI',
			model: AI_DIALOGUE_TTS_MODEL,
			text: source.text,
			voice: source.voice.voice,
			instructions: source.voice.instructions,
			speed: 1,
			responseFormat: 'mp3',
			timeoutMs: 60_000,
		})

		try {
			const bytes = await this.tts.generate(ttsInput)
			if (!isValidDialogueMp3(bytes)) throw audioGenerationFailed()

			await this.storage.uploadFile(s3Key, bytes, AUDIO_MIME_TYPE, 60_000)
			await this.repository.setStatus(audioId, 'ready')
		} catch (error) {
			await this.repository.setStatus(audioId, 'failed').catch(() => undefined)
			console.log('AiDialogue: audio generation failed', { audioId, error })
			throw audioGenerationFailed()
		}
	}

	/** Ту же реплику уже озвучивает другой запрос (двойной клик, вторая вкладка): дождаться его результата. */
	private async waitForConcurrentGeneration(messageId: number, actionIndex: number) {
		const deadline = Date.now() + CONCURRENT_GENERATION_WAIT_MS

		while (Date.now() < deadline) {
			await new Promise((resolve) => setTimeout(resolve, CONCURRENT_GENERATION_POLL_MS))
			const audio = await this.repository.getAudio({ messageId, actionIndex })

			if (audio?.status === 'ready') return this.toOutModel(audio.s3_key)
			if (!audio || audio.status === 'failed') break
		}

		throw audioGenerationFailed()
	}

	private async toOutModel(s3Key: string): Promise<AiDialogueAudioOutModel> {
		return { url: await this.storage.getFileUrl(s3Key), mimeType: AUDIO_MIME_TYPE }
	}
}

function audioNotAvailable() {
	return new CustomError(errorMessage.aiDialogue.audioNotAvailable, ErrorStatusCode.BadRequest_400)
}

function audioGenerationFailed() {
	return new CustomError(errorMessage.aiDialogue.audioGenerationFailed, ErrorStatusCode.InternalServerError_500)
}
