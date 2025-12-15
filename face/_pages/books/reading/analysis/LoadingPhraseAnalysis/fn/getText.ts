import { getTextByPhraseId } from '_pages/books/reading/lib/getTextByWordIds'
import { useMemo } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetText() {
	const { sentenceId, phraseId } = useReadingStore((s) => s.selection)

	return useMemo(
		function () {
			if (!sentenceId || !phraseId) return ''

			return getTextByPhraseId(sentenceId, phraseId)
		},
		[phraseId, sentenceId],
	)
}
