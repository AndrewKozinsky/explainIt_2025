import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { AiDialogueScenarioApi } from './repository/AiDialogueScenarioApi'
import type { AiDialogueScenarioRepository } from './repository/AiDialogueScenarioRepository'

/** Доменный сервис сценариев с подменяемым источником данных. */
export class AiDialogueScenarioService {
	constructor(private readonly repository: AiDialogueScenarioRepository) {}

	async getPublicScenarioCount(signal?: AbortSignal): Promise<ApiResult<number>> {
		const result = await this.repository.getPublicScenarios(signal)

		if (result.error || result.errors) {
			return { error: result.error, errors: result.errors, data: null as unknown as number }
		}

		return { error: null, errors: null, data: result.data.length }
	}
}

export const aiDialogueScenarioService = new AiDialogueScenarioService(new AiDialogueScenarioApi())
