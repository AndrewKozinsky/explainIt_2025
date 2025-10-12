import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { getPhaseTextFromWordIdx, useGetSelectedSentence } from '_pages/books/reading/logic'
import { useMemo } from 'react'

export function useGetPhraseData(phrase: ChapterTextStructurePopulated.LoadingPhrase) {
	const sentence = useGetSelectedSentence()

	return useMemo(() => {
		return {
			phraseText: getPhaseTextFromWordIdx(sentence.parts, phrase.wordIds),
		}
	}, [phrase.wordIds, sentence.parts])
}
