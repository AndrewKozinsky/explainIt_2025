import React from 'react'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'

export function useGetSelectedWord(): null | string {
	const sentenceText = useSelectedSentenceStore((s) => s.sentenceText)
	const wordIds = useSelectedSentenceStore((s) => s.wordIds)

	const selectedWord = React.useMemo(
		function () {
			const wordId = wordIds[0]
			if (!wordId) return null
			if (!sentenceText) return null

			const segmenter = new Intl.Segmenter('en', { granularity: 'word' })
			const segments = [...segmenter.segment(sentenceText)].filter((s) => s.isWordLike)
			return segments[wordId - 1]?.segment ?? null
		},
		[sentenceText, wordIds],
	)

	return selectedWord
}
