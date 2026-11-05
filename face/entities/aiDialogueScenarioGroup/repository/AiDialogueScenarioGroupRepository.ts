import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

export type PublicAiDialogueScenarioModel = AiDialogueScenarioModel & {
	slug: string
	/** Пример пожеланий к сцене для плейсхолдера окна запуска; null, если у сценария его нет. */
	userScenarioAmendmentHint: string | null
	/** «Идеи для диалога»: 2–4 идеи, как пользователь может повести разговор. */
	conversationIdeas: string[]
	/** «Что тренирует»: одна строка о том, чему научится пользователь. */
	trainedSkills: string
	coverUrl: string
}

export type AiDialogueScenarioGroupModel = {
	id: number
	slug: string
	title: string
	/** Почему стоит выбрать сценарий этой группы; пустая строка, если описания нет. */
	description: string
	scenarios: PublicAiDialogueScenarioModel[]
}

/** Все публичные группы со всеми сценариями; порядок задаёт сервер. */
export type AiDialogueScenarioGroupRepository = {
	getAiDialogueScenarioGroups(signal?: AbortSignal): Promise<ApiResult<AiDialogueScenarioGroupModel[]>>
}
