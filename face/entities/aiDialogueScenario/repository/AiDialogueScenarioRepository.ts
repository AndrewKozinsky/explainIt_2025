import type { PublicAiDialogueScenarioModel } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

export type AiDialogueScenarioRepository = {
	getPublicScenarios(signal?: AbortSignal): Promise<ApiResult<PublicAiDialogueScenarioModel[]>>
}
