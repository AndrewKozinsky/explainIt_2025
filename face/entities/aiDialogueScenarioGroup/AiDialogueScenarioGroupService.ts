import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { AiDialogueScenarioGroupApi } from './repository/AiDialogueScenarioGroupApi'
import type {
	AiDialogueScenarioGroupModel,
	AiDialogueScenarioGroupRepository,
} from './repository/AiDialogueScenarioGroupRepository'

/** Доменный сервис списка групп; API можно подменить через репозиторий. */
export class AiDialogueScenarioGroupService {
	constructor(private readonly repository: AiDialogueScenarioGroupRepository) {}

	getAiDialogueScenarioGroups(signal?: AbortSignal): Promise<ApiResult<AiDialogueScenarioGroupModel[]>> {
		return this.repository.getAiDialogueScenarioGroups(signal)
	}
}

export const aiDialogueScenarioGroupService = new AiDialogueScenarioGroupService(new AiDialogueScenarioGroupApi())
