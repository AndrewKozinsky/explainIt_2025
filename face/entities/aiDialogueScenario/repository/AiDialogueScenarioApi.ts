import { AiDialogueScenarioGroupApi } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupApi'
import type {
	AiDialogueScenarioGroupRepository,
	PublicAiDialogueScenarioModel,
} from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { AiDialogueScenarioRepository } from './AiDialogueScenarioRepository'

/** Публичные сценарии доступны через существующий API групп. */
export class AiDialogueScenarioApi implements AiDialogueScenarioRepository {
	constructor(private readonly groups: AiDialogueScenarioGroupRepository = new AiDialogueScenarioGroupApi()) {}

	async getPublicScenarios(signal?: AbortSignal): Promise<ApiResult<PublicAiDialogueScenarioModel[]>> {
		const result = await this.groups.getAiDialogueScenarioGroups(signal)

		if (result.error || result.errors) {
			return {
				error: result.error,
				errors: result.errors,
				data: null as unknown as PublicAiDialogueScenarioModel[],
			}
		}

		return { error: null, errors: null, data: result.data.flatMap((group) => group.scenarios) }
	}
}
