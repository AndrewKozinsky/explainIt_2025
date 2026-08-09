import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/**
 * Пример употребления фразы во флеш-карточке.
 */
export type FlashcardExampleModel = {
	text: string
	translate: string
}

/**
 * Унифицированная модель флеш-карточки — не зависит от API.
 */
export type FlashcardModel = {
	id: number
	languageCode: null | string
	sentenceText: string
	sentenceTranslation: null | string
	phrase: string
	phraseStartOffset: number
	phraseEndOffset: number
	phraseTranslation: null | string
	phraseTranscription: null | string
	examples: FlashcardExampleModel[]
	bookId: null | number
	videoId: null | number
	sentencePhraseTranslationId: null | number
	createdAt: string
}

/**
 * Унифицированный тип для создания флеш-карточки.
 */
export type AddFlashcardInput = {
	sentencePhraseTranslationId: number
}

/**
 * Унифицированный тип для удаления флеш-карточки.
 */
export type RemoveFlashcardInput = {
	flashcardId: number
}

/**
 * Параметры запроса списка флеш-карточек.
 */
export type GetMyFlashcardsParams = {
	languageCode?: null | string
}

/**
 * Репозиторий флеш-карточек — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 */
export type FlashcardRepository = {
	/** Получить все флеш-карточки текущего пользователя, опционально фильтруя по языку */
	getMyFlashcards(params?: GetMyFlashcardsParams): Promise<ApiResult<FlashcardModel[]>>

	/** Создать флеш-карточку из перевода фразы в предложении */
	addFlashcard(input: AddFlashcardInput): Promise<ApiResult<FlashcardModel>>

	/** Удалить флеш-карточку по ID */
	removeFlashcard(input: RemoveFlashcardInput): Promise<ApiResult<void>>
}
