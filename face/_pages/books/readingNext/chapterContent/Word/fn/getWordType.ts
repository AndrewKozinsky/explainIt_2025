import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export function getWordType(
	sentence: ChapterTextStructurePopulated.Sentence,
	wordId: number,
): null | 'idle' | 'loading' | 'error' | 'success' {
	const phrasesWithThisWord = sentence.phrases.filter((phrase) => {
		return phrase.wordIds.includes(wordId)
	})
	if (!phrasesWithThisWord.length) {
		return null
	}

	let hasIdlePhrase = false
	let hasLoadingPhrase = false
	let hasErrorPhrase = false
	let hasSuccessPhrase = false

	phrasesWithThisWord.forEach((phrase) => {
		if (phrase.type === 'idle') {
			hasIdlePhrase = true
		} else if (phrase.type === 'loading') {
			hasLoadingPhrase = true
		} else if (phrase.type === 'error') {
			hasErrorPhrase = true
		} else if (phrase.type === 'success') {
			hasSuccessPhrase = true
		}
	})

	if (hasIdlePhrase) {
		return 'idle'
	} else if (hasLoadingPhrase) {
		return 'loading'
	} else if (hasErrorPhrase) {
		return 'error'
	} else if (hasSuccessPhrase) {
		return 'success'
	}

	return null
}
