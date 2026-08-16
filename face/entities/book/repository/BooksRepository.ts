/**
 * Унифицированный тип книги.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { LanguageCode } from '@/shared/utils/languages'
import type { BookChapterLiteModel } from '../../chapter/repository/ChaptersRepository'

export type BookModel = {
	id: number
	type: 'public' | 'private'
	name: null | string
	author: null | string
	languageCode: LanguageCode
	about: null | string
	userId: null | number
	coverUrl: null | string
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: null | boolean
	uploadUrl: null | string
	chapters: BookChapterLiteModel[]
}

/**
 * Унифицированный тип для создания книги.
 */
export type CreateBookInput = {
	name: null | string
	author: null | string
	about: null | string
	languageCode: string
}

/**
 * Унифицированный тип для обновления книги.
 * Все поля опциональны — передаются только те, что нужно изменить.
 */
export type UpdateBookInput = {
	author?: null | string
	name?: null | string
	languageCode?: null | string
	about?: null | string
	coverFileName?: null | string
	fileMimeType?: null | string
	isCoverFileUploaded?: null | boolean
}

/**
 * Репозиторий книг — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type BooksRepository = {
	/** Получить все книги (публичные + приватные пользователя) */
	getBooks(): Promise<ApiResult<BookModel[]>>
	/** Получить одну книгу по ID. null — книга не найдена. */
	getBook(id: number): Promise<ApiResult<null | BookModel>>
	/** Создать приватную книгу с пустой первой главой */
	createBook(input: CreateBookInput): Promise<ApiResult<BookModel>>
	/** Обновить приватную книгу */
	updateBook(id: number, input: UpdateBookInput): Promise<ApiResult<BookModel>>
	/** Удалить приватную книгу */
	deleteBook(id: number): Promise<ApiResult<void>>
}
