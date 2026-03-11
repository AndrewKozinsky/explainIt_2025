// import React from 'react'
// import { useDetailsStore } from '../../detailsStore'

/*export function useGetSelectedWord(): null | string {
	const sentenceText = useDetailsStore((s) => s.sentenceText)
	const wordIds = useDetailsStore((s) => s.wordIds)

	return React.useMemo(
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
}*/
