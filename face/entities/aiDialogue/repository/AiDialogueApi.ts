import { mapToAiDialogueScenario } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioApi'
import {
	aiDialogueControllerCreateAiDialogue,
	aiDialogueControllerCreateAiDialogueMessage,
	aiDialogueControllerDeleteAiDialogue,
	aiDialogueControllerGetAiDialogue,
	aiDialogueControllerGetAiDialogues,
} from '@/shared/api/generated/ai-dialogue/ai-dialogue'
import type {
	AiDialogueMessageOutModel,
	AiDialogueOutModel,
	CreateAiDialogueInput as OrvalCreateAiDialogueInput,
	CreateAiDialogueMessageInput as OrvalCreateAiDialogueMessageInput,
} from '@/shared/api/generated/models'
import { extractString } from '@/shared/utils/extractors'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import type { AiDialogueModel, AiDialogueRepository, CreateAiDialogueInput } from './AiDialogueRepository'
import type { AiDialogueClientEvent, AiDialogueEvent, DialogueServerMessage } from '../types/aiDialogueMessage'

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

	async getDialogue(id: number): Promise<ApiResult<AiDialogueModel>> {
		return executeApiCall(
			() => aiDialogueControllerGetAiDialogue(id),
			(data) => mapToAiDialogue(data),
		)
	}

	async deleteDialogue(id: number): Promise<ApiResult<void>> {
		return executeApiCall(() => aiDialogueControllerDeleteAiDialogue(id))
	}

	async createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>> {
		return executeApiCall(
			() =>
				aiDialogueControllerCreateAiDialogueMessage(id, event as unknown as OrvalCreateAiDialogueMessageInput),
			(data) => mapToAiDialogueMessage(data),
		)
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

function mapToAiDialogueMessage(raw: AiDialogueMessageOutModel): DialogueServerMessage {
	return {
		id: raw.id,
		dialogueId: raw.dialogueId,
		createdAt: raw.createdAt,
		payload: raw.payload as unknown as AiDialogueEvent,
	}
}
