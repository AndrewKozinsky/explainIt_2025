import type { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/AiDialogueScenarioModel'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

export type PublicAiDialogueScenarioModel = AiDialogueScenarioModel & {
	slug: string
	coverUrl: string
}

export type AiDialogueScenarioGroupModel = {
	id: number
	slug: string
	title: string
	scenarios: PublicAiDialogueScenarioModel[]
}

/** Все публичные группы со всеми сценариями; порядок задаёт сервер. */
export type AiDialogueScenarioGroupRepository = {
	getAiDialogueScenarioGroups(signal?: AbortSignal): Promise<ApiResult<AiDialogueScenarioGroupModel[]>>
}
