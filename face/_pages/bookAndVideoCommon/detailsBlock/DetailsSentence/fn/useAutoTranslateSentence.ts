// import React from 'react'
// import { useSelectedSentenceStore } from '_pages/bookAndVideoCommon/selectedSentence/selectedSentenceStore'
// import { useTranslateSentence } from './translateSentence'

/*export function useAutoTranslateSentence() {
	const { onTranslateClick, loading, errorText } = useTranslateSentence()

	const sentenceId = useSelectedSentenceStore((s) => s.sentenceId)
	const sentenceTranslations = useSelectedSentenceStore((s) => s.sentenceTranslations)
	const sentenceTranslationsLoading = useSelectedSentenceStore((s) => s.sentenceTranslationsLoading)

	const lastAutoTranslateSentenceIdRef = React.useRef<null | number>(null)

	React.useEffect(
		function () {
			if (!sentenceId) return
			if (sentenceTranslationsLoading) return
			if (sentenceTranslations.length > 0) return
			if (loading) return
			if (lastAutoTranslateSentenceIdRef.current === sentenceId) return

			lastAutoTranslateSentenceIdRef.current = sentenceId
			onTranslateClick()
		},
		[sentenceId, sentenceTranslationsLoading, sentenceTranslations.length, loading, onTranslateClick],
	)

	return {
		errorText,
	}
}*/
