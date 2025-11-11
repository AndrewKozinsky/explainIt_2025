import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { useMemo } from 'react'

export function useGetSelectedSentence() {
	const populatedChapter = useReadingStoreNext((s) => s.populatedChapter)
	const selection = useReadingStoreNext((s) => s.selection)

	return useMemo(
		function () {
			if (!selection.sentenceId) return null

			const sentence = populatedChapter.parts.find((part) => part.id === selection.sentenceId)
			if (!sentence || sentence.type !== 'sentence') return null

			return sentence
		},
		[populatedChapter, selection],
	)
}
