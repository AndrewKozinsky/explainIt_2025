/**
 * Определяет "первичный" тип (primary type) слова для UI на основе текущего выделения.
 *
 * Возвращает `'selected'`, если слово находится внутри выделенного предложения
 * и его `wordId` присутствует в `selectedWordIds`. Во всех остальных случаях
 * возвращает `null`.
 *
 * @param input - Входные данные.
 * @param input.selectedSentenceId - `id` выделенного предложения (или `null`, если ничего не выделено).
 * @param input.selectedWordIds - Список `id` выделенных слов *внутри* выделенного предложения.
 * @param input.sentenceId - `id` предложения, к которому относится проверяемое слово.
 * @param input.wordId - `id` проверяемого слова.
 *
 * @returns `"selected"`, если слово выделено; иначе `null`.
 *
 * @example
 * getWordPrimaryType({
 * 	selectedSentenceId: 10,
 * 	selectedWordIds: [1, 2],
 * 	sentenceId: 10,
 * 	wordId: 2,
 * }) // => 'selected'
 *
 * @example
 * getWordPrimaryType({
 * 	selectedSentenceId: 10,
 * 	selectedWordIds: [1, 2],
 * 	sentenceId: 11,
 * 	wordId: 2,
 * }) // => null
 */
/*export function getWordPrimaryType(input: {
	selectedSentenceId: null | number
	selectedWordIds: number[]
	sentenceId: number
	wordId: number
}): null | 'selected' {
	const { selectedSentenceId, selectedWordIds, sentenceId, wordId } = input

	// Если перебираемое предложение является выделенным
	if (selectedSentenceId === sentenceId) {
		// то проверить, что в словах выделенного предложения есть идентификатор текущего слова
		// Из чего можно заключить, что текущее слово является выделенным.
		if (selectedWordIds.includes(wordId)) {
			return 'selected'
		}
	}

	return null
}*/
