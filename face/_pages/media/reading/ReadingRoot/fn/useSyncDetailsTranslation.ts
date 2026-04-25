import { useEffect } from 'react'
import {
	buildWordAnalysisFromPhrase,
	findCoveringPhrase,
	findSentenceEntry,
} from '_pages/media/detailsBlock/DetailsBlock/fn/selectors'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { useReadingStore } from '_pages/media/reading/readingStore'

export function useSyncDetailsTranslation() {
	const sentenceId = useDetailsStore((s) => s.currentSentenceId)
	const sentenceLoading = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		return entry?.data.sentence.loading ?? false
	})
	const phraseLoading = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		if (!entry) return false
		const phrase = findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})
		return phrase?.loading ?? false
	})
	const sentenceError = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		return entry?.data.sentence.error ?? null
	})
	const phraseError = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		if (!entry) return null
		const phrase = findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})
		return phrase?.error ?? null
	})
	const sentenceTranslation = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		return entry?.data.sentence.translation ?? null
	})
	const wordAnalysis = useDetailsStore(function (s) {
		const entry = findSentenceEntry({ sentences: s.sentences, sentenceId: s.currentSentenceId })
		if (!entry) return null
		const phrase = findCoveringPhrase({
			phrases: entry.data.phrases,
			startOffset: s.currentWordStartOffset,
			endOffset: s.currentWordEndOffset,
		})
		return buildWordAnalysisFromPhrase(phrase)
	})

	const isLoading = sentenceLoading || phraseLoading
	const error = sentenceError ?? phraseError

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
		[error, isLoading, sentenceId],
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
