import { ChaptersApi } from '@/entities/chapter/repository/ChaptersApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	BookChapterModel,
	ChaptersRepository,
	CreateBookChapterInput,
	UpdateChapterInput,
} from './repository/ChaptersRepository'

export type {
	BookChapterModel,
	ChaptersRepository,
	CreateBookChapterInput,
	SentenceModel,
	UpdateChapterInput,
} from './repository/ChaptersRepository'

/**
 * Сервис глав — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link ChaptersRepository} в конструкторе, что позволяет
 * подменять источник данных.
 */
export class ChaptersService {
	private chaptersRepository: ChaptersRepository

	constructor(chaptersRepository: ChaptersRepository) {
		this.chaptersRepository = chaptersRepository
	}

	/** Получить полные данные главы (с контентом) */
	async getChapter(id: number): Promise<ApiResult<BookChapterModel>> {
		return this.chaptersRepository.getChapter(id)
	}

	/** Создать новую главу */
	async createChapter(input: CreateBookChapterInput): Promise<ApiResult<BookChapterModel>> {
		return this.chaptersRepository.createChapter(input)
	}

	/** Обновить главу */
	async updateChapter(id: number, input: UpdateChapterInput): Promise<ApiResult<BookChapterModel>> {
		return this.chaptersRepository.updateChapter(id, input)
	}

	/** Удалить главу */
	async deleteChapter(id: number): Promise<ApiResult<void>> {
		return this.chaptersRepository.deleteChapter(id)
	}
}

export const chaptersService = new ChaptersService(new ChaptersApi())
