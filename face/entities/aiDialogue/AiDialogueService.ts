import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { AiDialogueClientEvent, DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { DialogueAudioSnapshot } from './audio/dialogueAudioTypes'
import type { CheckUserMessageInput, UserMessageCheck } from './messageCheck/userMessageCheckTypes'
import type {
	AiDialogueModel,
	AiDialogueRepository,
	AiDialogueVisualsModel,
	CreateAiDialogueInput,
	UpdateAiDialogueInput,
} from './repository/AiDialogueRepository'
import type { AiDialoguesPageModel, GetUserDialoguesParams } from './types/aiDialogueList'

export type { AiDialogueModel, AiDialogueRepository, CreateAiDialogueInput, UpdateAiDialogueInput }

/**
 * Сервис диалогов с ИИ — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link AiDialogueRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new AiDialogueApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class AiDialogueService {
	private aiDialogueRepository: AiDialogueRepository

	constructor(aiDialogueRepository: AiDialogueRepository) {
		this.aiDialogueRepository = aiDialogueRepository
	}

	checkUserMessageText(
		id: number,
		input: CheckUserMessageInput,
		signal?: AbortSignal,
	): Promise<ApiResult<UserMessageCheck>> {
		return this.aiDialogueRepository.checkUserMessageText(id, input, signal)
	}

	/** Создать диалог по сценарию для текущего пользователя */
	async createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return this.aiDialogueRepository.createDialogue(input)
	}

	/** Обновить настройки диалога текущего пользователя */
	async updateDialogue(id: number, input: UpdateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return this.aiDialogueRepository.updateDialogue(id, input)
	}

	/** Получить диалоги текущего пользователя */
	async getUserDialogues(
		params: GetUserDialoguesParams,
		signal?: AbortSignal,
	): Promise<ApiResult<AiDialoguesPageModel>> {
		return this.aiDialogueRepository.getUserDialogues(params, signal)
	}

	/** Получить один диалог текущего пользователя по ID. */
	async getDialogue(id: number): Promise<ApiResult<AiDialogueModel>> {
		return this.aiDialogueRepository.getDialogue(id)
	}

	async getAudio(id: number, signal?: AbortSignal): Promise<ApiResult<DialogueAudioSnapshot>> {
		return this.aiDialogueRepository.getAudio(id, signal)
	}

	async getVisuals(id: number, signal?: AbortSignal): Promise<ApiResult<AiDialogueVisualsModel>> {
		return this.aiDialogueRepository.getVisuals(id, signal)
	}

	/** Удалить диалог текущего пользователя */
	async deleteDialogue(id: number): Promise<ApiResult<void>> {
		return this.aiDialogueRepository.deleteDialogue(id)
	}

	/** Отправить событие пользователя (реплику или уход от NPC) в диалог */
	async createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>> {
		return this.aiDialogueRepository.createMessage(id, event)
	}
}

export const aiDialogueService = new AiDialogueService(new AiDialogueApi())
