import { PhraseApi } from '@/entities/phrase/repository/PhraseApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	PhraseRepository,
	PhraseModel,
	TranscriptionModel,
	AudioPronunciationModel,
} from './repository/PhraseRepository'
export type { PhraseRepository, PhraseModel, TranscriptionModel, AudioPronunciationModel }

/**
 * Сервис фраз — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link PhraseRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new PhraseApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class PhraseService {
	private phraseRepository: PhraseRepository

	constructor(phraseRepository: PhraseRepository) {
		this.phraseRepository = phraseRepository
	}

	/**
	 * Получить существующую фразу или создать новую.
	 * null — фраза не найдена и не может быть создана.
	 */
	async resolvePhrase(text: string, sourceLanguageCode: string): Promise<ApiResult<PhraseModel | null>> {
		return this.phraseRepository.resolvePhrase(text, sourceLanguageCode)
	}

	/** Получить или создать транскрипцию для фразы */
	async getOrCreateTranscription(universalPhraseId: number): Promise<ApiResult<TranscriptionModel>> {
		return this.phraseRepository.getOrCreateTranscription(universalPhraseId)
	}

	/** Получить или создать аудио-произношение для фразы */
	async getOrCreateAudio(universalPhraseId: number): Promise<ApiResult<AudioPronunciationModel>> {
		return this.phraseRepository.getOrCreateAudio(universalPhraseId)
	}
}

export const phraseService = new PhraseService(new PhraseApi())
