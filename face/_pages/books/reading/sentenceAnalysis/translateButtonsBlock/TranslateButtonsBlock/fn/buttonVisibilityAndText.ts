import React from 'react'
import {
	useGetIdlePhraseFromSelectedSentence,
	useGetTranslatedPhraseByWordIdsFromSelectedSentence,
} from '_pages/books/reading/logic'

export function useIsButtonVisible() {
	const idlePhrase = useGetIdlePhraseFromSelectedSentence()
	const phraseWithTheSameWordIds = useGetTranslatedPhraseByWordIdsFromSelectedSentence(idlePhrase?.wordIds || [])

	return React.useMemo(() => {
		if (!idlePhrase || phraseWithTheSameWordIds) return false

		return !!idlePhrase.wordIds.length
	}, [idlePhrase, phraseWithTheSameWordIds])
}
