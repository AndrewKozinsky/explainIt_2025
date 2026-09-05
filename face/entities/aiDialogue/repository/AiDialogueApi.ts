import { mapToAiDialogueScenario } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioApi'
import {
	aiDialogueControllerCreateAiDialogue,
	aiDialogueControllerDeleteAiDialogue,
	aiDialogueControllerGetAiDialogues,
} from '@/shared/api/generated/ai-dialogue/ai-dialogue'
import type {
	AiDialogueOutModel,
	CreateAiDialogueInput as OrvalCreateAiDialogueInput,
} from '@/shared/api/generated/models'
import { extractString } from '@/shared/utils/extractors'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import type { AiDialogueModel, AiDialogueRepository, CreateAiDialogueInput } from './AiDialogueRepository'

/**
 * Реализация AiDialogueRepository через REST API.
 */
export class AiDialogueApi implements AiDialogueRepository {
	async createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return executeApiCall(
			() => aiDialogueControllerCreateAiDialogue(input as unknown as OrvalCreateAiDialogueInput),
			(data) => mapToAiDialogue(data),
		)
	}

	async getUserDialogues(): Promise<ApiResult<AiDialogueModel[]>> {
		return executeApiCall(
			() => aiDialogueControllerGetAiDialogues(),
			(data) => data.map(mapToAiDialogue),
		)
	}

	async deleteDialogue(id: number): Promise<ApiResult<void>> {
		return executeApiCall(() => aiDialogueControllerDeleteAiDialogue(id))
	}
}

function mapToAiDialogue(raw: AiDialogueOutModel): AiDialogueModel {
	return {
		id: raw.id,
		scenario: mapToAiDialogueScenario(raw.scenario),
		sourceLanguageCode: extractString(raw.sourceLanguageCode) as LanguageCode,
		targetLanguageCode: extractString(raw.targetLanguageCode) as LanguageCode,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
	}
}
