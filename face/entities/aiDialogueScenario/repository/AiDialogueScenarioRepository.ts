/**
 * Унифицированный тип сценария ролевого диалога с ИИ.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'

export type AiDialogueScenarioModel = {
	id: number
	slug: null | string
	title: string
	description: string
	languageCode: LanguageCode
}

/**
 * Репозиторий сценариев ролевого диалога — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type AiDialogueScenarioRepository = {
	/** Получить публичные сценарии ролевого диалога */
	getAiDialogueScenarios(): Promise<ApiResult<AiDialogueScenarioModel[]>>
}
