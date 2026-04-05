import { useEffect } from 'react'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { useReadingStore } from '_pages/media/reading/readingStore'

export function useSyncDetailsTranslation() {
	const sentenceId = useDetailsStore((s) => s.sentenceId)
	const wordIds = useDetailsStore((s) => s.wordIds)
	const sentenceTranslation = useDetailsStore((s) => s.sentenceTranslation)
	const wordAnalysis = useDetailsStore((s) => s.wordAnalysis)
	const isLoading = useDetailsStore((s) => s.isLoading)
	const error = useDetailsStore((s) => s.error)

	useEffect(
		function () {
			if (!sentenceId) return

			useReadingStore.getState().updateSentenceTranslation({
				sentenceId,
				translation: {
					isVisible: true,
					isLoading,
					error,
				},
			})
		},
		[error, isLoading, sentenceId, wordIds],
	)

	useEffect(
		function () {
			if (!sentenceId) return

			useReadingStore.getState().updateSentenceTranslation({
				sentenceId,
				translation: {
					sentenceTranslation,
					wordAnalysis,
					isVisible: true,
				},
			})
		},
		[sentenceId, sentenceTranslation, wordAnalysis],
	)
}
