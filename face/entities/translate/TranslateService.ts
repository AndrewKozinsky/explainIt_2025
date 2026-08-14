import { TranslateApi } from '@/entities/translate/repository/TranslateApi'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	TranslateRepository,
	TranslateSentenceInput,
	TranslateSentenceResultModel,
	GetPhraseTranslationsBySentenceInput,
	GetPhraseTranslationInput,
	TranslatePhraseInput,
	PhraseTranslationModel,
} from './repository/TranslateRepository'
export type {
	TranslateRepository,
	TranslateSentenceInput,
	TranslateSentenceResultModel,
	GetPhraseTranslationsBySentenceInput,
	GetPhraseTranslationInput,
	TranslatePhraseInput,
	PhraseTranslationModel,
}

/**
 * Сервис переводов — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link TranslateRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new TranslateApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class TranslateService {
	private translateRepository: TranslateRepository

	constructor(translateRepository: TranslateRepository) {
		this.translateRepository = translateRepository
	}

	/** Перевести предложение на целевой язык */
	async translateSentence(input: TranslateSentenceInput): Promise<ApiResult<TranslateSentenceResultModel>> {
		return this.translateRepository.translateSentence(input)
	}

	/** Получить все переводы фраз для предложения */
	async getPhraseTranslationsBySentence(
		input: GetPhraseTranslationsBySentenceInput,
	): Promise<ApiResult<PhraseTranslationModel[]>> {
		return this.translateRepository.getPhraseTranslationsBySentence(input)
	}

	/** Получить существующий перевод фразы по сдвигам слова. null — перевод не найден. */
	async getPhraseTranslation(input: GetPhraseTranslationInput): Promise<ApiResult<null | PhraseTranslationModel>> {
		return this.translateRepository.getPhraseTranslation(input)
	}

	/** Сгенерировать перевод фразы через ИИ */
	async translatePhrase(input: TranslatePhraseInput): Promise<ApiResult<PhraseTranslationModel>> {
		return this.translateRepository.translatePhrase(input)
	}
}

export const translateService = new TranslateService(new TranslateApi())
