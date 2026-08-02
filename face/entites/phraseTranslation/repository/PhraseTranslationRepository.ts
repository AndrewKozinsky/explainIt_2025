import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { TranscriptionModel } from '../../phrase/repository/PhraseRepository'

/**
 * Унифицированная модель перевода фразы — не зависит от API.
 */
export type PhraseTranslationModel = {
	id: number
	universalPhraseId: number | null
	targetLanguageCode: string
	translation: PhraseTranslationDataModel | null
	status: TranslationStatus
	errorMessage: string | null
	nonExistentWord: boolean
	createdAt: string
	transcription: TranscriptionModel | null
}

export type TranslationStatus = 'pending' | 'ready' | 'error'

/**
 * Данные перевода — структурированный результат от LLM.
 */
export type PhraseTranslationDataModel = {
	coreIdea: string
	usageGroups: UsageGroupModel[]
	similarWords: string | null
	commonMistakes: string | null
	patterns: PatternItemModel[] | null
}

export type UsageGroupModel = {
	title: string
	explain: string
	examples: ExampleModel[]
}

export type ExampleModel = {
	sentence: string
	translate: string
}

export type PatternItemModel = {
	phrase: string
	translate: string
}

/**
 * Входные данные для запроса перевода.
 */
export type GetOrCreateTranslationInput = {
	universalPhraseId?: number | null
	phraseText?: string | null
	sourceLanguageCode?: string | null
	targetLanguageCode: string
	provider?: string | null
}

/**
 * Репозиторий переводов фраз — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 */
export type PhraseTranslationRepository = {
	/** Получить или создать перевод фразы */
	getOrCreateTranslation(
		input: GetOrCreateTranslationInput,
		signal?: AbortSignal,
	): Promise<ApiResult<PhraseTranslationModel>>
}
