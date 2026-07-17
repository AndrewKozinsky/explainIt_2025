/**
 * Унифицированный тип книги.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
export type Book = {
	id: number
	type: 'public' | 'private'
	name: null | string
	author: null | string
	languageCode: null | string
	note: null | string
	userId: null | number
	coverUrl: null | string
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: null | boolean
	uploadUrl: null | string
	chapters: BookChapterLite[]
}

/**
 * Унифицированный тип главы книги (лайт-версия, без контента).
 */
export type BookChapterLite = {
	id: number
	bookId: number
	name: null | string
	header: null | string
	note: null | string
}

/**
 * Унифицированный тип для создания книги.
 */
export type CreateBookInput = {
	name: null | string
	author: null | string
	note: null | string
	languageCode: string
}

/**
 * Унифицированный тип главы книги.
 */
export type BookChapter = {
	id: number
	name: null | string
	header: null | string
	note: null | string
	originalContent: null | string
	processedContent: null | string
}

/**
 * Унифицированный тип для создания главы книги.
 */
export type CreateBookChapterInput = {
	bookId: number
	bookType: string
}

/**
 * Унифицированный тип для обновления книги.
 * Все поля опциональны — передаются только те, что нужно изменить.
 */
export type UpdateBookInput = {
	author?: null | string
	name?: null | string
	languageCode?: null | string
	note?: null | string
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
	getBooks(): Promise<Book[]>

	/** Получить одну книгу по ID */
	getBook(id: number): Promise<Book>

	/** Создать приватную книгу с пустой первой главой */
	createBook(input: CreateBookInput): Promise<Book>

	/** Обновить приватную книгу */
	updateBook(id: number, input: UpdateBookInput): Promise<Book>

	/** Удалить приватную книгу */
	deleteBook(id: number): Promise<void>

	/** Создать главу в приватной книге */
	createChapter(input: CreateBookChapterInput): Promise<BookChapter>
}
