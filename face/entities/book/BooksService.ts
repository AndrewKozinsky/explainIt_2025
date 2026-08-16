import { BooksApi } from '@/entities/book/repository/BooksApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { BookModel, BooksRepository, CreateBookInput, UpdateBookInput } from './repository/BooksRepository'
export type { BookModel, BooksRepository, CreateBookInput, UpdateBookInput }

/**
 * Сервис книг — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link BooksRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new BooksApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class BooksService {
	/** Поддерживаемые форматы файлов обложки */
	static readonly supportedCoverFormats = {
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp'],
			'image/avif': ['.avif'],
		},
		description: 'JPG, JPEG, PNG, WebP, AVIF',
	}

	private booksRepository: BooksRepository

	constructor(booksRepository: BooksRepository) {
		this.booksRepository = booksRepository
	}

	/** Получить публичные и личные книги, разделённые по типу */
	async getBooks(): Promise<ApiResult<{ public: BookModel[]; private: BookModel[] }>> {
		const result = await this.booksRepository.getBooks()

		if (result.error || result.errors) {
			return {
				error: result.error,
				errors: result.errors,
				data: null as unknown as { public: BookModel[]; private: BookModel[] },
			}
		}

		return {
			error: null,
			errors: null,
			data: {
				public: result.data.filter((book) => book.type === 'public'),
				private: result.data.filter((book) => book.type === 'private'),
			},
		}
	}

	/** Получить одну книгу по ID. null — книга не найдена. */
	async getBook(id: number): Promise<ApiResult<null | BookModel>> {
		return this.booksRepository.getBook(id)
	}

	/** Создать приватную книгу с пустой первой главой */
	async createBook(input: CreateBookInput): Promise<ApiResult<BookModel>> {
		return this.booksRepository.createBook(input)
	}

	/** Удалить личную книгу */
	async deleteBook(id: number): Promise<ApiResult<void>> {
		return this.booksRepository.deleteBook(id)
	}

	/** Обновить приватную книгу */
	async updateBook(id: number, input: UpdateBookInput): Promise<ApiResult<BookModel>> {
		return this.booksRepository.updateBook(id, input)
	}

	/**
	 * Запросить pre-signed URL для загрузки обложки.
	 * Обновляет метаданные обложки в книге и возвращает URL для загрузки файла в S3.
	 */
	async requestCoverUploadUrl(
		bookId: number,
		fileName: string,
		fileMimeType: string,
		languageCode: string | null,
	): Promise<ApiResult<BookModel>> {
		return this.booksRepository.updateBook(bookId, {
			coverFileName: fileName,
			fileMimeType: fileMimeType,
			languageCode: languageCode,
		})
	}

	/** Подтвердить завершение загрузки обложки */
	async confirmCoverUpload(bookId: number, languageCode: string | null): Promise<ApiResult<BookModel>> {
		return this.booksRepository.updateBook(bookId, {
			isCoverFileUploaded: true,
			languageCode: languageCode,
		})
	}
}

export const booksService = new BooksService(new BooksApi())
