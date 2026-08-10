/**
 * Перевод всего предложения.
 */
/*export type SentenceTranslationModel = {
	id: number
	sentenceId: number
	translation: string
}*/

/**
 * Пример использования фразы (в составе перевода фразы).
 */
/*export type SentencePhraseTranslationExampleModel = {
	text: string
	translate: string
}*/

/**
 * Перевод фразы внутри предложения.
 */
/*export type SentencePhraseTranslationModel = {
	id: number
	sentenceId: number
	phrase: string
	phraseStartOffset: number
	phraseEndOffset: number
	translate: null | string
	examples: SentencePhraseTranslationExampleModel[]
	status: 'pending' | 'ready' | 'error'
	errorMessage: null | string
	flashcardId: null | number
}*/

/**
 * Унифицированный тип предложения.
 * Содержит готовый текст предложения, извлечённый из контента на уровне маппинга API,
 * а также переводы с сервера.
 */
/*export type SentenceModel = {
	id: number
	sentence: string
	sentenceTranslation: SentenceTranslationModel | null
	sentencePhraseTranslations: SentencePhraseTranslationModel[] | null
}*/
