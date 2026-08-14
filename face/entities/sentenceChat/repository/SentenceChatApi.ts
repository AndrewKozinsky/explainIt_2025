import type {
	CreateSentenceChatThreadInput,
	CreateSentenceChatUserMessageInput,
	SentenceChatMessageOutModel,
	SentenceChatThreadOutModel,
} from '@/shared/api/generated/models'
import {
	sentenceChatControllerCreateThread,
	sentenceChatControllerCreateUserMessage,
	sentenceChatControllerGetThread,
} from '@/shared/api/generated/sentence-chat/sentence-chat'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	SentenceChatMessageModel,
	SentenceChatRepository,
	SentenceChatThreadModel,
} from './SentenceChatRepository'

/**
 * Реализация SentenceChatRepository через REST API.
 */
export class SentenceChatApi implements SentenceChatRepository {
	async getThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel | null>> {
		return executeApiCall(
			() => sentenceChatControllerGetThread({ sentenceId }),
			(data) => (data ? mapToThread(data) : null),
		)
	}

	async createThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel>> {
		return executeApiCall(
			() => sentenceChatControllerCreateThread({ sentenceId } as CreateSentenceChatThreadInput),
			(data) => mapToThread(data),
		)
	}

	async createUserMessage(threadId: number, question: string): Promise<ApiResult<SentenceChatMessageModel>> {
		return executeApiCall(
			() =>
				sentenceChatControllerCreateUserMessage(threadId, {
					threadId,
					question,
				} as CreateSentenceChatUserMessageInput),
			(data) => mapToMessage(data),
		)
	}
}

export const sentenceChatApi = new SentenceChatApi()

// ─── Mappers ────────────────────────────────────────────────────────────────

function mapToThread(raw: SentenceChatThreadOutModel): SentenceChatThreadModel {
	return {
		id: raw.id,
		sentenceId: raw.sentenceId,
		messages: raw.messages.map(mapToMessage),
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
	}
}

function mapToMessage(raw: SentenceChatMessageOutModel): SentenceChatMessageModel {
	return {
		id: raw.id,
		threadId: raw.threadId,
		role: raw.role,
		content: raw.content,
		status: raw.status,
		errorMessage: raw.errorMessage ?? null,
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
	}
}
