import { getTextByPhraseId } from '_pages/books/readingNext/lib/getTextByWordIds'
import { useMemo } from 'react'
import { useReadingStoreNext } from '../../../readingStoreNext'

export function useGetText() {
	const { sentenceId, phraseId } = useReadingStoreNext((s) => s.selection)

	return useMemo(
		function () {
			if (!sentenceId || !phraseId) return ''

			return getTextByPhraseId(sentenceId, phraseId)
		},
		[phraseId, sentenceId],
	)
}
