// import {
// 	bookControllerGetBooks,
// 	bookControllerCreateBook,
// 	bookControllerGetBook,
// 	bookControllerUpdateBook,
// 	bookControllerDeleteBook,
// } from '@/shared/api/generated/book/book'
// import type {
// 	BookOutModel,
// 	CreateBookInput as OrvalCreateBookInput,
// 	UpdateBookInput as OrvalUpdateBookInput,
// } from '@/shared/api/generated/models'
// import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'
// import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import { LanguageCode } from '@/shared/utils/languages'
// import { mapToChapterLite } from '../../chapter/repository/ChaptersApi'
// import type { BookModel, BooksRepository, CreateBookInput, UpdateBookInput } from './BooksRepository'

/**
 * Реализация BooksRepository через REST API.
 */
/*export class BooksApi implements BooksRepository {
	async getBooks(): Promise<ApiResult<BookModel[]>> {
		return executeApiCall(
			() => bookControllerGetBooks(),
			(data) => data.map(mapToBook),
		)
	}

	async createBook(input: CreateBookInput): Promise<ApiResult<BookModel>> {
		return executeApiCall(
			() => bookControllerCreateBook(input as unknown as OrvalCreateBookInput),
			(data) => mapToBook(data),
		)
	}

	async getBook(id: number): Promise<ApiResult<null | BookModel>> {
		return executeApiCall(
			() => bookControllerGetBook(id),
			(data) => (data === null ? null : mapToBook(data)),
		)
	}

	async updateBook(id: number, input: UpdateBookInput): Promise<ApiResult<BookModel>> {
		return executeApiCall(
			() => bookControllerUpdateBook(id, input as unknown as OrvalUpdateBookInput),
			(data) => mapToBook(data),
		)
	}

	async deleteBook(id: number): Promise<ApiResult<void>> {
		return executeApiCall(() => bookControllerDeleteBook(id))
	}
}*/

/*function mapToBook(raw: BookOutModel): BookModel {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		author: extractString(raw.author),
		languageCode: extractString(raw.languageCode) as LanguageCode,
		about: extractString(raw.about),
		userId: extractNumber(raw.userId),
		coverUrl: extractString(raw.coverUrl),
		coverFileName: extractString(raw.coverFileName),
		coverFileS3Key: extractString(raw.coverFileS3Key),
		isCoverFileUploaded: extractBoolean(raw.isCoverFileUploaded),
		uploadUrl: extractString(raw.uploadUrl),
		chapters: (raw.chapters ?? []).map(mapToChapterLite),
	}
}*/

/*function mapType(raw: string): BookModel['type'] {
	return raw === 'public' || raw === 'private' ? raw : 'private'
}*/
