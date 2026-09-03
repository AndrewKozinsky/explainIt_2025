import { AiDialogueApi } from '@/entities/aiDialogue/repository/AiDialogueApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { AiDialogueModel, AiDialogueRepository, CreateAiDialogueInput } from './repository/AiDialogueRepository'

export type { AiDialogueModel, AiDialogueRepository, CreateAiDialogueInput }

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

	/** Создать диалог по сценарию для текущего пользователя */
	async createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return this.aiDialogueRepository.createDialogue(input)
	}

	/** Получить диалоги текущего пользователя */
	async getUserDialogues(): Promise<ApiResult<AiDialogueModel[]>> {
		return this.aiDialogueRepository.getUserDialogues()
	}

	/** Удалить диалог текущего пользователя */
	async deleteDialogue(id: number): Promise<ApiResult<void>> {
		return this.aiDialogueRepository.deleteDialogue(id)
	}
}

export const aiDialogueService = new AiDialogueService(new AiDialogueApi())
