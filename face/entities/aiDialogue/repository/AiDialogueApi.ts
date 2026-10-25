import { mapToAiDialogueScenario } from '@/entities/aiDialogueScenario/repository/mapToAiDialogueScenario'
import {
	aiDialogueControllerCheckAiDialogueUserMessageText,
	aiDialogueControllerCreateAiDialogue,
	aiDialogueControllerCreateAiDialogueMessage,
	aiDialogueControllerDeleteAiDialogue,
	aiDialogueControllerGetAiDialogue,
	aiDialogueControllerGetAiDialogueAudio,
	aiDialogueControllerGetAiDialogues,
	aiDialogueControllerGetAiDialogueVisuals,
	aiDialogueControllerUpdateAiDialogue,
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
import type {
	AiDialogueClientEvent,
	AiDialogueEvent,
	DialogueServerMessage,
} from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { mapToAiDialoguesPage } from './mapToAiDialoguesPage'
import type {
	AiDialogueModel,
	AiDialogueRepository,
	AiDialogueVisualsModel,
	CreateAiDialogueInput,
	UpdateAiDialogueInput,
} from './AiDialogueRepository'
import type { DialogueAudioSnapshot } from '../audio/dialogueAudioTypes'
import type { CheckUserMessageInput, UserMessageCheck } from '../messageCheck/userMessageCheckTypes'
import type { AiDialoguesPageModel, GetUserDialoguesParams } from '../types/aiDialogueList'

/**
 * Реализация AiDialogueRepository через REST API.
 */
export class AiDialogueApi implements AiDialogueRepository {
	async checkUserMessageText(
		id: number,
		input: CheckUserMessageInput,
		signal?: AbortSignal,
	): Promise<ApiResult<UserMessageCheck>> {
		return executeApiCall(async () => {
			const response = await aiDialogueControllerCheckAiDialogueUserMessageText(id, input, {
				signal,
				cache: 'no-store',
			})

			if (response.status !== 200) throw new Error('Draft check failed')

			return response
		}, mapUserMessageCheck)
	}

	async updateDialogue(id: number, input: UpdateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return executeApiCall(
			() => aiDialogueControllerUpdateAiDialogue(id, input),
			(data) => mapToAiDialogue(data),
		)
	}

	async createDialogue(input: CreateAiDialogueInput): Promise<ApiResult<AiDialogueModel>> {
		return executeApiCall(
			() => aiDialogueControllerCreateAiDialogue(input as unknown as OrvalCreateAiDialogueInput),
			(data) => mapToAiDialogue(data),
		)
	}

	async getUserDialogues(
		params: GetUserDialoguesParams,
		signal?: AbortSignal,
	): Promise<ApiResult<AiDialoguesPageModel>> {
		return executeApiCall(
			() => aiDialogueControllerGetAiDialogues(params, { signal, cache: 'no-store' }),
			mapToAiDialoguesPage,
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

	async getAudio(id: number, signal?: AbortSignal): Promise<ApiResult<DialogueAudioSnapshot>> {
		return executeApiCall(
			() => aiDialogueControllerGetAiDialogueAudio(id, { signal, cache: 'no-store' }),
			(snapshot) => ({
				...snapshot,
				items: snapshot.items.map((item) => ({
					...item,
					messageId: typeof item.messageId === 'number' ? item.messageId : null,
				})),
			}),
		)
	}

	async getVisuals(id: number, signal?: AbortSignal): Promise<ApiResult<AiDialogueVisualsModel>> {
		return executeApiCall(() => aiDialogueControllerGetAiDialogueVisuals(id, { signal, cache: 'no-store' }))
	}

	async createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>> {
		return executeApiCall(
			() =>
				aiDialogueControllerCreateAiDialogueMessage(id, event as unknown as OrvalCreateAiDialogueMessageInput),
			(data) => mapToAiDialogueMessage(data),
		)
	}
}

/** Не трактуем пустой/повреждённый HTTP-ответ как отсутствие грамматических ошибок. */
function mapUserMessageCheck(raw: unknown): UserMessageCheck {
	if (!raw || typeof raw !== 'object') throw new Error('Invalid draft check response')

	const result = raw as UserMessageCheck

	for (const key of ['speech', 'action'] as const) {
		const part = result[key]

		if (!part || !Array.isArray(part.critical) || !Array.isArray(part.suggestions))
			throw new Error('Invalid draft check field')

		if (
			!part.critical.every(
				(issue) =>
					issue &&
					typeof issue.title === 'string' &&
					typeof issue.sentenceMarkdown === 'string' &&
					typeof issue.explanationMarkdown === 'string',
			)
		)
			throw new Error('Invalid critical issue')

		if (
			!part.suggestions.every(
				(issue) => issue && typeof issue.explanationMarkdown === 'string' && typeof issue.example === 'string',
			)
		)
			throw new Error('Invalid suggestion')
	}

	return result
}

function mapToAiDialogue(raw: AiDialogueOutModel): AiDialogueModel {
	return {
		id: raw.id,
		scenario: mapToAiDialogueScenario(raw.scenario),
		sourceLanguageCode: extractString(raw.sourceLanguageCode) as LanguageCode,
		targetLanguageCode: extractString(raw.targetLanguageCode) as LanguageCode,
		maxCefrLevel: raw.maxCefrLevel,
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
