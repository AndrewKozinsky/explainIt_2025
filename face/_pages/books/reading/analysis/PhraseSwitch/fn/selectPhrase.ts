// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { useCallback } from 'react'

/*export function useGetSelectPhrase() {
	const selection = useReadingStore((s) => s.selection)
	const changeSelectedPhraseId = useReadingStore((s) => s.changeSelectedPhraseId)

	return useCallback(
		function (phraseId: number) {
			if (!selection.phraseId || selection.phraseId === phraseId) {
				return
			}

			changeSelectedPhraseId(phraseId)
		},
		[changeSelectedPhraseId, selection.phraseId],
	)
}*/
