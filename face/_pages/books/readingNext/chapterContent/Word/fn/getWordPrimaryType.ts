import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { SelectedSentence } from '_pages/books/readingNext/readingStoreNext'

/**
 * Возвращает тип слова в зависимости от того выделено ли оно
 * или для фраза с этим словом загружается перевод,
 * возникла ошибка при загрузке перевода или перевод успешно загрузился.
 * @param selectedSentence — данные о выделенном предложении
 * @param thisSentence — предложение с этим словом
 * @param wordId — идентификатор этого слова
 */
export function getWordPrimaryType(
	selectedSentence: SelectedSentence,
	thisSentence: ChapterTextStructurePopulated.Sentence,
	wordId: number,
): null | 'selected' | 'loading' | 'error' | 'success' {
	// Если перебираемое предложение является выделенным
	if (selectedSentence.id === thisSentence.id) {
		// то проверить, что в словах выделенного предложения есть идентификатор текущего слова
		// Из чего можно заключить, что текущее слово является выделенным.
		if (selectedSentence.wordIds.includes(wordId)) {
			return 'selected'
		}
	}

	const phrasesWithThisWord = thisSentence.phrases.filter((phrase) => {
		return phrase.wordIds.includes(wordId)
	})
	if (!phrasesWithThisWord.length) {
		return null
	}

	let hasLoadingPhrase = false
	let hasErrorPhrase = false
	let hasSuccessPhrase = false

	phrasesWithThisWord.forEach((phrase) => {
		if (phrase.type === 'loading') {
			hasLoadingPhrase = true
		} else if (phrase.type === 'error') {
			hasErrorPhrase = true
		} else if (phrase.type === 'success') {
			hasSuccessPhrase = true
		}
	})

	if (hasLoadingPhrase) {
		return 'loading'
	} else if (hasErrorPhrase) {
		return 'error'
	} else if (hasSuccessPhrase) {
		return 'success'
	}

	return null
}
