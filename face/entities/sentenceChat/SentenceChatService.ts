// import { SentenceChatApi } from '@/entities/sentenceChat/repository/SentenceChatApi'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import type {
// 	SentenceChatRepository,
// 	SentenceChatThreadModel,
// 	SentenceChatMessageModel,
// } from './repository/SentenceChatRepository'
// export type { SentenceChatRepository, SentenceChatThreadModel, SentenceChatMessageModel }

/**
 * Сервис чата с ИИ по предложению — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link SentenceChatRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new SentenceChatApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
/*export class SentenceChatService {
	private sentenceChatRepository: SentenceChatRepository

	constructor(sentenceChatRepository: SentenceChatRepository) {
		this.sentenceChatRepository = sentenceChatRepository
	}

	/!** Получить существующий тред для предложения. null — треда ещё нет. *!/
	async getThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel | null>> {
		return this.sentenceChatRepository.getThread(sentenceId)
	}

	/!** Создать новый тред для предложения *!/
	async createThread(sentenceId: number): Promise<ApiResult<SentenceChatThreadModel>> {
		return this.sentenceChatRepository.createThread(sentenceId)
	}

	/!** Отправить сообщение пользователя в тред *!/
	async createUserMessage(threadId: number, question: string): Promise<ApiResult<SentenceChatMessageModel>> {
		return this.sentenceChatRepository.createUserMessage(threadId, question)
	}
}*/

// export const sentenceChatService = new SentenceChatService(new SentenceChatApi())
