import { useGetSelectedSentence } from '_pages/books/reading/logic'
import { useMemo } from 'react'

/** Returns all phrases apart with a status 'idle' */
export function useGetPhrases() {
	const sentence = useGetSelectedSentence()

	return useMemo(
		function () {
			return sentence.phrases.filter((phrase) => phrase.type !== 'idle')
		},
		[sentence],
	)
}
