import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/**
 * Унифицированная модель треда чата — не зависит от API.
 */
export type SentenceChatThreadModel = {
	id: number
	sentenceId: number
	messages: SentenceChatMessageModel[]
	createdAt: string
	updatedAt: string
}

/**
 * Унифицированная модель сообщения чата.
 */
export type SentenceChatMessageModel = {
	id: number
	threadId: number
	role: string
	content: string
	status: string
	errorMessage: string | null
	createdAt: string
	updatedAt: string
}

/**
 * Репозиторий чата с ИИ по предложению — абстракция над серверным API.
 */
export type SentenceChatRepository = {
	/** Получить существующий тред для предложения. null — треда ещё нет. */
	getThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel | null>>

	/** Создать новый тред для предложения */
	createThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel>>

	/** Отправить сообщение пользователя в тред */
	createUserMessage(threadId: number, question: string): Promise<ApiResult<SentenceChatMessageModel>>
}
