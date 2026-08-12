// import type { AiModel } from '@/shared/api/AIModels'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import type { TranscriptionModel } from '../../phrase/repository/PhraseRepository'

/**
 * Унифицированная модель перевода фразы — не зависит от API.
 */
/*export type PhraseTranslationModel = {
	id: number
	universalPhraseId: number | null
	targetLanguageCode: string
	translation: PhraseTranslationDataModel | null
	status: TranslationStatus
	errorCode: string | null
	nonExistentWord: boolean
	createdAt: string
	transcription: TranscriptionModel | null
}*/

export type TranslationStatus = 'pending' | 'ready' | 'error'

/**
 * Данные перевода — массив типизированных блоков от LLM.
 * На верхнем уровне могут быть любые типы блоков.
 */
export type PhraseTranslationDataModel = TranslationBlockModel[]

export type TranslationBlockModel =
	| BlockBlockModel
	| UseCaseBlockModel
	| PaperBlockModel
	| ExampleBlockModel
	| PhrasesButtonsBlockModel
	| TextBlockModel

/** Секция с заголовком и вложенными блоками */
export type BlockBlockModel = {
	type: 'block'
	header: string
	children: TranslationBlockModel[]
}

/** Сценарий употребления с заголовком и вложенными блоками */
export type UseCaseBlockModel = {
	type: 'useCase'
	header: string
	children: TranslationBlockModel[]
}

/** Визуальная обёртка-карточка */
export type PaperBlockModel = {
	type: 'paper'
	children: TranslationBlockModel[]
}

/** Пример предложения с переводом */
export type ExampleBlockModel = {
	type: 'example'
	sentence: string
	translation: string
}

/** Кнопки фраз (только текст, без перевода) */
export type PhrasesButtonsBlockModel = {
	type: 'phrasesButtons'
	labels: string[]
}

/** Текст в формате Markdown */
export type TextBlockModel = {
	type: 'text'
	text: string
}

/**
 * Входные данные для запроса перевода.
 */
/*export type GetOrCreateTranslationInput = {
	universalPhraseId?: number | null
	phraseText?: string | null
	sourceLanguageCode?: string | null
	targetLanguageCode: string
	model?: AiModel | null
}*/

/**
 * Репозиторий переводов фраз — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 */
/*export type PhraseTranslationRepository = {
	/!** Получить или создать перевод фразы *!/
	getOrCreateTranslation(
		input: GetOrCreateTranslationInput,
		signal?: AbortSignal,
	): Promise<ApiResult<PhraseTranslationModel>>
}*/
