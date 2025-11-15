import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { useCallback } from 'react'

export function useGetSelectPhrase() {
	const selection = useReadingStoreNext((s) => s.selection)
	const changeSelectedPhraseId = useReadingStoreNext((s) => s.changeSelectedPhraseId)

	return useCallback(
		function (phraseId: number) {
			if (!selection.phraseId || selection.phraseId === phraseId) {
				return
			}

			changeSelectedPhraseId(phraseId)
		},
		[changeSelectedPhraseId, selection.phraseId],
	)
}
