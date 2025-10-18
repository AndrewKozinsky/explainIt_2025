import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { getPhaseTextFromWordIdx, useGetSelectedSentence } from '_pages/books/reading/logic'
import { useMemo } from 'react'
import errorMessage from 'ui/ErrorMessage/ErrorMessage'

export function useGetPhraseData(phrase: ChapterTextStructurePopulated.ErrorPhrase) {
	const sentence = useGetSelectedSentence()

	return useMemo(() => {
		let errorMessage = phrase.errorMessage
		if (errorMessage.toLowerCase().includes('баланс')) {
			errorMessage += ' Пополните на странице «Моя учётная запись».'
		}

		return {
			phraseText: getPhaseTextFromWordIdx(sentence.parts, phrase.wordIds),
			errorMessage,
		}
	}, [phrase.errorMessage, phrase.wordIds, sentence.parts])
}
