import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { FlashcardApi } from './repository/FlashcardApi'
import type {
	AddFlashcardInput,
	FlashcardModel,
	FlashcardRepository,
	GetMyFlashcardsParams,
	RemoveFlashcardInput,
} from './repository/FlashcardRepository'

export type {
	AddFlashcardInput,
	FlashcardModel,
	FlashcardRepository,
	GetMyFlashcardsParams,
	RemoveFlashcardInput,
} from './repository/FlashcardRepository'

/**
 * Сервис флеш-карточек — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link FlashcardRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new FlashcardApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class FlashcardService {
	private flashcardRepo: FlashcardRepository

	constructor(flashcardRepo: FlashcardRepository) {
		this.flashcardRepo = flashcardRepo
	}

	/** Получить все флеш-карточки текущего пользователя, опционально фильтруя по языку */
	async getMyFlashcards(params?: GetMyFlashcardsParams): Promise<ApiResult<FlashcardModel[]>> {
		return this.flashcardRepo.getMyFlashcards(params)
	}

	/** Создать флеш-карточку из перевода фразы в предложении */
	async addFlashcard(input: AddFlashcardInput): Promise<ApiResult<FlashcardModel>> {
		return this.flashcardRepo.addFlashcard(input)
	}

	/** Удалить флеш-карточку по ID */
	async removeFlashcard(input: RemoveFlashcardInput): Promise<ApiResult<void>> {
		return this.flashcardRepo.removeFlashcard(input)
	}
}

/** Готовый экземпляр сервиса с реальным API */
export const flashcardService = new FlashcardService(new FlashcardApi())
