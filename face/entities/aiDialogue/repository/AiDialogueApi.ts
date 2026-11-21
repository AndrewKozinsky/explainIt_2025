import { mapToAiDialogueScenario } from '@/entities/aiDialogueScenario/repository/mapToAiDialogueScenario'
import {
	aiDialogueControllerCheckAiDialogueUserMessageText,
	aiDialogueControllerCreateAiDialogue,
	aiDialogueControllerCreateAiDialogueMessage,
	aiDialogueControllerDeleteAiDialogue,
	aiDialogueControllerGenerateAiDialogueAudio,
	aiDialogueControllerGetAiDialogue,
	aiDialogueControllerGetAiDialogueIllustrationStyles,
	aiDialogueControllerGetAiDialogues,
	aiDialogueControllerGetAiDialogueVisuals,
	aiDialogueControllerUpdateAiDialogue,
} from '@/shared/api/generated/ai-dialogue/ai-dialogue'
import type {
	AiDialogueMessageOutModel,
	AiDialogueOutModel,
	CreateAiDialogueInput as OrvalCreateAiDialogueInput,
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
import { mapToAiDialogueIllustrationStyles } from './mapToAiDialogueIllustrationStyles'
import { mapToAiDialoguesPage } from './mapToAiDialoguesPage'
import type {
	AiDialogueModel,
	AiDialogueRepository,
	AiDialogueVisualsModel,
	CreateAiDialogueInput,
	UpdateAiDialogueInput,
} from './AiDialogueRepository'
import type { DialogueAudioAddress, DialogueAudioFile } from '../audio/dialogueAudioTypes'
import type {
	CheckUserMessageInput,
	UserMessageCheck,
	UserMessagePartCheck,
} from '../messageCheck/userMessageCheckTypes'
import type { AiDialogueIllustrationStylesModel } from '../types/aiDialogueIllustrationStyles'
import type { AiDialoguesPageModel, GetUserDialoguesParams } from '../types/aiDialogueList'

/**
 * Реализация AiDialogueRepository через REST API.
 */
export class AiDialogueApi implements AiDialogueRepository {
	getIllustrationStyles(signal?: AbortSignal): Promise<ApiResult<AiDialogueIllustrationStylesModel>> {
		return executeApiCall(
			() => aiDialogueControllerGetAiDialogueIllustrationStyles({ signal, cache: 'no-store' }),
			mapToAiDialogueIllustrationStyles,
		)
	}

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

	async getAudio(id: number, address: DialogueAudioAddress): Promise<ApiResult<DialogueAudioFile>> {
		return executeApiCall(async () => {
			const response = await aiDialogueControllerGenerateAiDialogueAudio(id, address, { cache: 'no-store' })
			if (response.status !== 200) throw new Error('Audio generation failed')

			return response
		})
	}

	async getVisuals(id: number, signal?: AbortSignal): Promise<ApiResult<AiDialogueVisualsModel>> {
		return executeApiCall(() => aiDialogueControllerGetAiDialogueVisuals(id, { signal, cache: 'no-store' }))
	}

	async createMessage(id: number, event: AiDialogueClientEvent): Promise<ApiResult<DialogueServerMessage>> {
		return executeApiCall(() => aiDialogueControllerCreateAiDialogueMessage(id, event), mapToAiDialogueMessage)
	}
}

/** Не трактуем пустой/повреждённый HTTP-ответ как отсутствие грамматических ошибок. */
function mapUserMessageCheck(raw: unknown): UserMessageCheck {
	if (!raw || typeof raw !== 'object') throw new Error('Invalid draft check response')

	const result = raw as UserMessageCheck

	validateTextAnalysis(result.speech)
	validateTextAnalysis(result.action)
	return result
}

function validateTextAnalysis(part: UserMessagePartCheck) {
	if (!part || !Array.isArray(part.critical) || !Array.isArray(part.suggestions)) {
		throw new Error('Invalid text analysis')
	}
	if (
		!part.critical.every(
			(issue) =>
				issue &&
				typeof issue.title === 'string' &&
				typeof issue.sentenceMarkdown === 'string' &&
				typeof issue.explanationMarkdown === 'string',
		)
	) {
		throw new Error('Invalid text analysis issue')
	}
	if (
		!part.suggestions.every(
			(issue) => issue && typeof issue.explanationMarkdown === 'string' && typeof issue.example === 'string',
		)
	) {
		throw new Error('Invalid text analysis suggestion')
	}
}

function mapToAiDialogue(raw: AiDialogueOutModel): AiDialogueModel {
	return {
		id: raw.id,
		scenario: mapToAiDialogueScenario(raw.scenario),
		sourceLanguageCode: extractString(raw.sourceLanguageCode) as LanguageCode,
		targetLanguageCode: extractString(raw.targetLanguageCode) as LanguageCode,
		cefrLevel: raw.cefrLevel,
		mode: raw.mode,
		illustrationStyleId: raw.illustrationStyleId,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
	}
}

function mapToAiDialogueMessage(raw: AiDialogueMessageOutModel): DialogueServerMessage {
	if (!Number.isInteger(raw?.id) || !Number.isInteger(raw.dialogueId) || typeof raw.createdAt !== 'string') {
		throw new Error('Invalid message response')
	}

	const payload = raw.payload as unknown as AiDialogueEvent

	if (payload?.type === 'userActions') {
		if (
			!Array.isArray(payload.actions) ||
			payload.actions.length === 0 ||
			!Array.isArray(payload.textReview) ||
			payload.textReview.length !== payload.actions.length
		) {
			throw new Error('Invalid user message response')
		}

		for (const [index, action] of payload.actions.entries()) {
			const review = payload.textReview[index]

			if (
				(action?.type !== 'speech' && action?.type !== 'action') ||
				typeof action.content !== 'string' ||
				(action.translation !== undefined && typeof action.translation !== 'string') ||
				typeof review?.originalText !== 'string'
			) {
				throw new Error('Invalid user message part')
			}

			validateTextAnalysis(review.analysis)
		}
	} else if (payload?.type !== 'userAvoidsNPC') {
		throw new Error('Invalid user message type')
	}

	return {
		id: raw.id,
		dialogueId: raw.dialogueId,
		createdAt: raw.createdAt,
		payload,
	}
}
