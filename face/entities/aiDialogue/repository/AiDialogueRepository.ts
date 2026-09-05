/**
 * Унифицированный тип диалога с ИИ.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import type { AiDialogueClientEvent, DialogueServerMessage } from '../types/aiDialogueMessage'

export type AiDialogueModel = {
	id: number
	scenario: AiDialogueScenarioModel
	sourceLanguageCode: LanguageCode
	targetLanguageCode: LanguageCode
	createdAt: string
	updatedAt: string
}

/**
 * Унифицированный тип для создания диалога.
 */
export type CreateAiDialogueInput = {
	scenarioId: number
	sourceLanguageCode: LanguageCode
	targetLanguageCode: LanguageCode
}

/**
 * Репозиторий диалогов с ИИ — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type AiDialogueRepository = {
	/** Создать диалог по сценарию для текущего пользователя */
	createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>>
	/** Получить диалоги текущего пользователя */
	getUserDialogues(): Promise<ApiResult<AiDialogueModel[]>>
	/** Получить один диалог текущего пользователя по ID */
	getDialogue(id: number): Promise<ApiResult<AiDialogueModel>>
	/** Удалить диалог текущего пользователя */
	deleteDialogue(id: number): Promise<ApiResult<void>>
	/** Отправить событие пользователя (реплику или уход от NPC) в диалог */
	createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>>
}
