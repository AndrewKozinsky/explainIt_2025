// import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

// Реэкспорт для обратной совместимости
/*export type {
	SentenceTranslationModel,
	SentencePhraseTranslationExampleModel,
	SentencePhraseTranslationModel,
	SentenceModel,
} from '@/entities/media/repository/SentenceTypes'*/

/**
 * Унифицированный тип главы книги (лайт-версия, без контента).
 */
/*export type BookChapterLiteModel = {
	id: number
	bookId: number
	name: null | string
	header: null | string
	note: null | string
}*/

/**
 * Унифицированный тип главы книги.
 */
/*export type BookChapterModel = {
	id: number
	name: null | string
	header: null | string
	note: null | string
	originalContent: null | string
	processedContent: null | string
	sentences: SentenceModel[] | null
}*/

/**
 * Унифицированный тип для создания главы книги.
 */
/*export type CreateBookChapterInput = {
	bookId: number
	bookType: string
}*/

/**
 * Унифицированный тип для обновления главы книги.
 * Все поля опциональны — передаются только те, что нужно изменить.
 */
/*export type UpdateChapterInput = {
	name?: null | string
	header?: null | string
	originalContent?: null | string
	note?: null | string
}*/

/**
 * Репозиторий глав — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 */
/*export type ChaptersRepository = {
	/!** Создать главу *!/
	createChapter(input: CreateBookChapterInput): Promise<ApiResult<BookChapterModel>>

	/!** Получить полные данные главы (с контентом) *!/
	getChapter(id: number): Promise<ApiResult<BookChapterModel>>

	/!** Обновить главу *!/
	updateChapter(id: number, input: UpdateChapterInput): Promise<ApiResult<BookChapterModel>>

	/!** Удалить главу *!/
	deleteChapter(id: number): Promise<ApiResult<void>>
}*/
