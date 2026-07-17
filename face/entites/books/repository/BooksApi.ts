import {
	bookControllerGetBooks,
	bookControllerCreateBook,
	bookControllerGetBook,
	bookControllerUpdateBook,
	bookControllerDeleteBook,
} from '@/shared/api/generated/book/book'
import { bookChapterControllerCreateBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
import type {
	BookOutModel,
	BookChapterLiteOutModel,
	BookChapterOutModel,
	CreateBookInput as OrvalCreateBookInput,
	CreateBookChapterInput as OrvalCreateBookChapterInput,
	UpdateBookInput as OrvalUpdateBookInput,
} from '@/shared/api/generated/models'
import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'
import type {
	Book,
	BookChapter,
	BookChapterLite,
	BooksRepository,
	CreateBookInput,
	CreateBookChapterInput,
	UpdateBookInput,
} from './BooksRepository'

/**
 * Реализация BooksRepository через REST API.
 * Внутри использует Orval-сгенерированные функции, снаружи отдаёт унифицированные типы.
 *
 * ## Обработка ошибок
 *
 * Методы НЕ содержат try/catch. Вместо этого они полагаются на цепочку:
 *
 * ```
 * Сервер (ошибка)
 *   → GlobalExceptionFilter формирует JSON с errorMessageCode
 *   → customMutator видит !res.ok и выбрасывает ApiError
 *   → метод НЕ ловит — ошибка прокидывается наверх
 *   → useFetchData / useAsyncMutation ловит в try/catch
 *   → resolveError извлекает errorMessageCode → читаемый текст
 *   → Компонент получает { error: "Книга не найдена." }
 * ```
 */
export class BooksApi implements BooksRepository {
	async getBooks(): Promise<Book[]> {
		const response = await bookControllerGetBooks()

		// При ошибке customMutator выбрасывает ApiError, сюда попадаем только при успехе.
		return response.data.map(mapToBook)
	}

	async createBook(input: CreateBookInput): Promise<Book> {
		const response = await bookControllerCreateBook(input as unknown as OrvalCreateBookInput)

		return mapToBook(response.data)
	}

	async getBook(id: number): Promise<Book> {
		const response = await bookControllerGetBook(id)

		return mapToBook(response.data)
	}

	async updateBook(id: number, input: UpdateBookInput): Promise<Book> {
		const response = await bookControllerUpdateBook(id, input as unknown as OrvalUpdateBookInput)

		return mapToBook(response.data)
	}

	async deleteBook(id: number): Promise<void> {
		await bookControllerDeleteBook(id)
	}

	async createChapter(input: CreateBookChapterInput): Promise<BookChapter> {
		const response = await bookChapterControllerCreateBookChapter(input as unknown as OrvalCreateBookChapterInput)

		return mapToChapter(response.data)
	}
}

// ─── Приватные мапперы ─────────────────────────────────────────────────────

function mapToBook(raw: BookOutModel): Book {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		author: extractString(raw.author),
		languageCode: extractString(raw.languageCode),
		note: extractString(raw.note),
		userId: extractNumber(raw.userId),
		coverUrl: extractString(raw.coverUrl),
		coverFileName: extractString(raw.coverFileName),
		coverFileS3Key: extractString(raw.coverFileS3Key),
		isCoverFileUploaded: extractBoolean(raw.isCoverFileUploaded),
		uploadUrl: extractString(raw.uploadUrl),
		chapters: (raw.chapters ?? []).map(mapToChapterLite),
	}
}

function mapToChapterLite(raw: BookChapterLiteOutModel): BookChapterLite {
	return {
		id: raw.id,
		bookId: raw.bookId,
		name: extractString(raw.name),
		header: extractString(raw.header),
		note: extractString(raw.note),
	}
}

function mapToChapter(raw: BookChapterOutModel): BookChapter {
	return {
		id: raw.id,
		name: extractString(raw.name),
		header: extractString(raw.header),
		note: extractString(raw.note),
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
	}
}

function mapType(raw: string): Book['type'] {
	return raw === 'public' || raw === 'private' ? raw : 'private'
}
