import { aiDialogueScenarioControllerGetAiDialogueScenarios } from '@/shared/api/generated/ai-dialogue-scenario/ai-dialogue-scenario'
import type { AiDialogueScenarioOutModel } from '@/shared/api/generated/models'
import { extractString } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { AiDialogueScenarioModel, AiDialogueScenarioRepository } from './AiDialogueScenarioRepository'

/**
 * Реализация AiDialogueScenarioRepository через REST API.
 */
export class AiDialogueScenarioApi implements AiDialogueScenarioRepository {
	async getAiDialogueScenarios(): Promise<ApiResult<AiDialogueScenarioModel[]>> {
		return executeApiCall(
			() => aiDialogueScenarioControllerGetAiDialogueScenarios(),
			(data) => data.map(mapToAiDialogueScenario),
		)
	}
}

export function mapToAiDialogueScenario(raw: AiDialogueScenarioOutModel): AiDialogueScenarioModel {
	return {
		id: raw.id,
		slug: extractString(raw.slug),
		title: raw.title,
		description: raw.description,
	}
}
