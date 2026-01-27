/**
 * Возвращает тип слова в зависимости от того выделено ли оно.
 * @param selectedSentenceId — идентификатор выделенного предложения
 * @param selectedWordIds — идентификаторы выделенных слов
 * @param sentenceId — идентификатор этого предложения
 * @param wordId — идентификатор этого слова
 */
export function getWordPrimaryType(input: {
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
}
