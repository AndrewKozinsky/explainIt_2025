import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type { LanguageCode } from '@/shared/utils/languages'
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
	errorCode: string | null
	nonExistentWord: boolean
	createdAt: string
	transcription: TranscriptionModel | null
}

export type TranslationStatus = 'pending' | 'ready' | 'error'

/**
 * Словарная статья: основная часть, фоновые разделы и заранее подготовленные формы слова.
 */
export type PhraseTranslationDataModel = {
	blocks: TranslationBlockModel[]
	deepSections: TranslationBlockModel[]
	wordForms: WordFormsModel[]
}

/** Вид строки форм: неправильный глагол, особое множественное число или степени сравнения */
export type WordFormsKind = 'irregularVerb' | 'plural' | 'comparison'

/** Формы слова по порядку, варианты одной формы разделены косой чертой */
export type WordFormsModel = {
	kind: WordFormsKind
	forms: string[]
}

export type TranslationBlockModel =
	| BlockBlockModel
	| SenseBlockModel
	| ExampleBlockModel
	| TextBlockModel
	| WordsBlockModel
	| ListBlockModel

/** Секция с заголовком и вложенными блоками */
export type BlockBlockModel = {
	type: 'block'
	header: string
	children: TranslationBlockModel[]
}

/** Одно значение слова: перевод, необязательная иллюстрация и вложенные блоки */
export type SenseBlockModel = {
	type: 'sense'
	header: string
	imageUrl: string | null
	imageAspect: string | null
	children: TranslationBlockModel[]
}

/** Пример предложения с переводом */
export type ExampleBlockModel = {
	type: 'example'
	sentence: string
	translation: string
}

/** Текст в формате Markdown */
export type TextBlockModel = {
	type: 'text'
	text: string
}

/** Слово с коротким описанием */
export type WordCardModel = {
	word: string
	description: string
}

/** Похожие слова: текущее слово и слова, статью о которых можно открыть */
export type WordsBlockModel = {
	type: 'words'
	currentWord: WordCardModel | null
	similarWords: WordCardModel[]
}

/** Список выражений с переводом */
export type ListBlockModel = {
	type: 'list'
	items: { term: string; translation: string }[]
}

/**
 * Входные данные для запроса перевода.
 */
export type GetOrCreateTranslationInput = {
	universalPhraseId?: number | null
	phraseText?: string | null
	sourceLanguageCode?: LanguageCode | null
	targetLanguageCode: LanguageCode
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
