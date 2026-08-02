import { mapRawSentencesToModels } from '@/entites/media/repository/SentenceMappers'
import {
	bookChapterControllerCreateBookChapter,
	bookChapterControllerGetBookChapter,
	bookChapterControllerUpdateBookChapter,
	bookChapterControllerDeleteBookChapter,
} from '@/shared/api/generated/book-chapter/book-chapter'
import type {
	BookChapterLiteOutModel,
	BookChapterOutModel,
	CreateBookChapterInput as OrvalCreateBookChapterInput,
	UpdateBookChapterInput as OrvalUpdateBookChapterInput,
} from '@/shared/api/generated/models'
import { extractString } from '@/shared/utils/extractors'
import { executeApiCall } from '@/shared/utils/fetchData/executeApiCall'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	BookChapterModel,
	BookChapterLiteModel,
	ChaptersRepository,
	CreateBookChapterInput,
	UpdateChapterInput,
} from './ChaptersRepository'

export { mapToChapterLite, mapToChapter }

/**
 * Реализация ChaptersRepository через REST API.
 */
export class ChaptersApi implements ChaptersRepository {
	async createChapter(input: CreateBookChapterInput): Promise<ApiResult<BookChapterModel>> {
		return executeApiCall(
			() => bookChapterControllerCreateBookChapter(input as unknown as OrvalCreateBookChapterInput),
			(data) => mapToChapter(data),
		)
	}

	async getChapter(id: number): Promise<ApiResult<BookChapterModel>> {
		return executeApiCall(
			() => bookChapterControllerGetBookChapter(id, { bookType: 'private' }),
			(data) => mapToChapter(data),
		)
	}

	async updateChapter(id: number, input: UpdateChapterInput): Promise<ApiResult<BookChapterModel>> {
		return executeApiCall(
			() => bookChapterControllerUpdateBookChapter(id, input as unknown as OrvalUpdateBookChapterInput),
			(data) => mapToChapter(data),
		)
	}

	async deleteChapter(id: number): Promise<ApiResult<void>> {
		return executeApiCall(() => bookChapterControllerDeleteBookChapter(id))
	}
}

function mapToChapterLite(raw: BookChapterLiteOutModel): BookChapterLiteModel {
	return {
		id: raw.id,
		bookId: raw.bookId,
		name: extractString(raw.name),
		header: extractString(raw.header),
		note: extractString(raw.note),
	}
}

function mapToChapter(raw: BookChapterOutModel): BookChapterModel {
	const processedContent = extractString(raw.processedContent)

	return {
		id: raw.id,
		name: extractString(raw.name),
		header: extractString(raw.header),
		note: extractString(raw.note),
		originalContent: extractString(raw.originalContent),
		processedContent,
		sentences: mapRawSentencesToModels(
			processedContent ?? '',
			raw.sentences as unknown as Record<string, unknown>[] | null,
		),
	}
}
