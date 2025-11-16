import { useReadingStore } from '_pages/books/reading/readingStore'
import { useMemo } from 'react'

export function useGetSelectedSentence() {
	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	const selection = useReadingStore((s) => s.selection)

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
