// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/**
 * Входные данные для перевода предложения.
 */
/*export type TranslateSentenceInput = {
	sentenceId: number
	targetLanguageCode: string
	bookName?: null | string
	bookAuthor?: null | string
	videoName?: null | string
}*/

/**
 * Результат перевода предложения.
 */
/*export type TranslateSentenceResultModel = {
	sentenceId: number
	translation: string
}*/

/**
 * Пример использования фразы в контексте.
 */
/*export type PhraseTranslationExampleModel = {
	text: string
	translate: string
}*/

/**
 * Перевод фразы внутри предложения.
 */
/*export type PhraseTranslationModel = {
	id: number
	phraseStartOffset: number
	phraseEndOffset: number
	flashcardId: null | number
	phrase: null | string
	translation: null | string
	examples: PhraseTranslationExampleModel[]
}*/

/**
 * Входные данные для получения переводов фраз предложения.
 */
/*export type GetPhraseTranslationsBySentenceInput = {
	sentenceId: number
	targetLanguageCode: string
}*/

/**
 * Входные данные для получения существующего перевода фразы.
 */
/*export type GetPhraseTranslationInput = {
	sentenceId: number
	targetLanguageCode: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
}*/

/**
 * Входные данные для генерации перевода фразы (через ИИ).
 */
/*export type TranslatePhraseInput = {
	sentenceId: number
	text: string
	selectedWord: string
	targetLanguageCode: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	bookName?: null | string
	bookAuthor?: null | string
	videoName?: null | string
}*/

/**
 * Репозиторий переводов — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
/*export type TranslateRepository = {
	/!** Перевести предложение на целевой язык *!/
	translateSentence(input: TranslateSentenceInput): Promise<ApiResult<TranslateSentenceResultModel>>

	/!** Получить все переводы фраз для предложения *!/
	getPhraseTranslationsBySentence(
		input: GetPhraseTranslationsBySentenceInput,
	): Promise<ApiResult<PhraseTranslationModel[]>>

	/!** Получить существующий перевод фразы по сдвигам слова. null — перевод не найден. *!/
	getPhraseTranslation(input: GetPhraseTranslationInput): Promise<ApiResult<null | PhraseTranslationModel>>

	/!** Сгенерировать перевод фразы через ИИ *!/
	translatePhrase(input: TranslatePhraseInput): Promise<ApiResult<PhraseTranslationModel>>
}*/
