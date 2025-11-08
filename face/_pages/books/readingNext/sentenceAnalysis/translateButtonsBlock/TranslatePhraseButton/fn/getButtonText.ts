// import React from 'react'
// import { getWordValueById, useGetSelectedSentence } from '_pages/books/reading/logic'

/*export function useGetButtonText(phraseWordIds: number[]) {
	const selectedSentence = useGetSelectedSentence()

	return React.useMemo(() => {
		const withSentenceTranslate = selectedSentence.translation ? '' : 'предложение и '
		if (phraseWordIds.length === 1) {
			const word = getWordValueById(selectedSentence.parts, phraseWordIds[0])
			return `Перевести ${withSentenceTranslate}${word}`
		} else {
			return `Перевести ${withSentenceTranslate} и фразу`
		}
	}, [phraseWordIds, selectedSentence.parts, selectedSentence.translation])
}*/
