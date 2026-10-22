/**
 * Унифицированный тип диалога с ИИ.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository'
import type { AiDialogueVisualsOutModel } from '@/shared/api/generated/models'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import type {
	AiDialogueClientEvent,
	DialogueServerMessage,
} from '../../../widgets/aiDialogueMessages/types/aiDialogueMessage'
import type { DialogueAudioSnapshot } from '../audio/dialogueAudioTypes'
import type { CheckUserMessageInput, UserMessageCheck } from '../messageCheck/userMessageCheckTypes'

export type AiDialogueModel = {
	id: number
	scenario: AiDialogueScenarioModel
	sourceLanguageCode: LanguageCode
	targetLanguageCode: LanguageCode
	maxCefrLevel: AiDialogueCefrLevel | null
	createdAt: string
	updatedAt: string
}

export type AiDialogueCefrLevel = 'A1' | 'A2' | 'B1' | 'B2'

export type UpdateAiDialogueInput = {
	maxCefrLevel?: AiDialogueCefrLevel | null
}

export type AiDialogueVisualsModel = AiDialogueVisualsOutModel

/**
 * Унифицированный тип для создания диалога.
 */
export type CreateAiDialogueInput = {
	scenarioId: number
	sourceLanguageCode: LanguageCode
	targetLanguageCode: LanguageCode
	maxCefrLevel?: AiDialogueCefrLevel | null
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
	/** Проверить текст черновика пользователя без отправки в диалог. */
	checkUserMessageText(
		id: number,
		input: CheckUserMessageInput,
		signal?: AbortSignal,
	): Promise<ApiResult<UserMessageCheck>>
	/** Создать диалог по сценарию для текущего пользователя */
	createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>>
	/** Обновить настройки диалога текущего пользователя */
	updateDialogue(id: number, input: UpdateAiDialogueInput): Promise<ApiResult<AiDialogueModel>>
	/** Получить диалоги текущего пользователя */
	getUserDialogues(): Promise<ApiResult<AiDialogueModel[]>>
	/** Получить один диалог текущего пользователя по ID */
	getDialogue(id: number): Promise<ApiResult<AiDialogueModel>>
	getAudio(id: number, signal?: AbortSignal): Promise<ApiResult<DialogueAudioSnapshot>>
	getVisuals(id: number, signal?: AbortSignal): Promise<ApiResult<AiDialogueVisualsModel>>
	/** Удалить диалог текущего пользователя */
	deleteDialogue(id: number): Promise<ApiResult<void>>
	/** Отправить событие пользователя (реплику или уход от NPC) в диалог */
	createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>>
}
