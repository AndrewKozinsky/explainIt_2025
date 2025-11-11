// import { useMemo } from 'react'
// import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
// import { getPhaseTextFromWordIdx, useGetSelectedSentence } from '_pages/books/reading/logic'

/*export function useGetPhraseData(phrase: ChapterTextStructurePopulated.SuccessPhrase) {
	const sentence = useGetSelectedSentence()

	return useMemo(() => {
		return {
			phraseText: getPhaseTextFromWordIdx(sentence.parts, phrase.wordIds),
			translation: phrase.analysis.translation,
			analysis: phrase.analysis.analysis,
			examples: phrase.analysis.examples,
		}
	}, [phrase, sentence.parts])
}*/
