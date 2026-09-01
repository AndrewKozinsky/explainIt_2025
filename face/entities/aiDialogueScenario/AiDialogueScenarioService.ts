import { AiDialogueScenarioApi } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	AiDialogueScenarioModel,
	AiDialogueScenarioRepository,
} from './repository/AiDialogueScenarioRepository'

export type { AiDialogueScenarioModel, AiDialogueScenarioRepository }

/**
 * Сервис сценариев ролевого диалога — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link AiDialogueScenarioRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new AiDialogueScenarioApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class AiDialogueScenarioService {
	private aiDialogueScenarioRepository: AiDialogueScenarioRepository

	constructor(aiDialogueScenarioRepository: AiDialogueScenarioRepository) {
		this.aiDialogueScenarioRepository = aiDialogueScenarioRepository
	}

	/** Получить публичные сценарии ролевого диалога */
	async getAiDialogueScenarios(): Promise<ApiResult<AiDialogueScenarioModel[]>> {
		return this.aiDialogueScenarioRepository.getAiDialogueScenarios()
	}
}

export const aiDialogueScenarioService = new AiDialogueScenarioService(new AiDialogueScenarioApi())
