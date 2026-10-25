import { aiDialogueScenarioGroupControllerGetAiDialogueScenarioGroups } from '@/shared/api/generated/ai-dialogue-scenario-group/ai-dialogue-scenario-group'
import type { AiDialogueScenarioGroupOutModel } from '@/shared/api/generated/models'
import { executeApiCall, type ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	AiDialogueScenarioGroupModel,
	AiDialogueScenarioGroupRepository,
} from './AiDialogueScenarioGroupRepository'

export class AiDialogueScenarioGroupApi implements AiDialogueScenarioGroupRepository {
	async getAiDialogueScenarioGroups(signal?: AbortSignal): Promise<ApiResult<AiDialogueScenarioGroupModel[]>> {
		return executeApiCall(
			() => aiDialogueScenarioGroupControllerGetAiDialogueScenarioGroups({ signal, cache: 'no-store' }),
			(data) => data.map(mapToAiDialogueScenarioGroup),
		)
	}
}

/** Оставляет только данные групп и карточек, сохраняя порядок ответа API. */
export function mapToAiDialogueScenarioGroup(raw: AiDialogueScenarioGroupOutModel): AiDialogueScenarioGroupModel {
	return {
		id: raw.id,
		slug: raw.slug,
		title: raw.title,
		scenarios: raw.scenarios.map((scenario) => ({
			id: scenario.id,
			slug: scenario.slug,
			title: scenario.title,
			description: scenario.description,
			coverUrl: scenario.coverUrl,
		})),
	}
}
