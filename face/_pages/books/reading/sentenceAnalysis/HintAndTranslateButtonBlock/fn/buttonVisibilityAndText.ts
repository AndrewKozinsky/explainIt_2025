import React from 'react'
import { useGetIdlePhraseFromSelectedSentence } from '_pages/books/reading/logic'

export function useIsButtonVisible() {
	const idlePhrase = useGetIdlePhraseFromSelectedSentence()

	return React.useMemo(() => {
		if (!idlePhrase) return false

		return !!idlePhrase.wordIds.length
	}, [idlePhrase])
}
