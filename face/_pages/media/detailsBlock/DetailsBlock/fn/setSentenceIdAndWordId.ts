import { useEffect } from 'react'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../../detailsStore'
import { useGetShowingMediaType } from './useGetShowingMediaType'

export function useSetBookSentenceIdAndWordId() {
	const mediaType = useGetShowingMediaType()

	const bookSentences = useReadingStore((s) => s.populatedChapter?.sentences)
	const bookSelection = useReadingStore((s) => s.selection)

	useEffect(
		function () {
			if (mediaType !== 'book' || !bookSentences) return

			const sentence = bookSentences.find((s) => s.id === bookSelection.sentenceId)
			const sentenceText = sentence?.sentence ?? null

			applySelectionToDetailsStore({
				sentenceId: bookSelection.sentenceId,
				wordId: bookSelection.wordId,
				sentenceText,
			})
		},
		[bookSelection.sentenceId, bookSelection.wordId],
	)
}

export function useSetVideoSentenceIdAndWordId() {
	const mediaType = useGetShowingMediaType()
	const videoSubSentences = useWatchingStore((s) => s.populatedSubtitles?.sentences)
	const videoTextSentences = useWatchingStore((s) => s.populatedPlainText?.sentences)
	const videoSelection = useWatchingStore((s) => s.selection)

	useEffect(
		function () {
			if (mediaType !== 'video') return

			const plainTextSentence = videoSubSentences?.find((s) => s.id === videoSelection.sentenceId)
			const subtitleSentence = videoTextSentences?.find((s) => s.id === videoSelection.sentenceId)
			const sentence = plainTextSentence ?? subtitleSentence
			const sentenceText = sentence?.text || null

			applySelectionToDetailsStore({
				sentenceId: videoSelection.sentenceId,
				wordId: videoSelection.wordId,
				sentenceText,
			})
		},
		[videoSelection.sentenceId, videoSelection.wordId],
	)
}

type ApplySelectionInput = {
	sentenceId: null | number
	sentenceText: null | string
	wordId: null | number
}

function applySelectionToDetailsStore(input: ApplySelectionInput) {
	useDetailsStore.getState().updateStore({
		currentSentenceId: input.sentenceId,
		currentSentenceText: input.sentenceText,
		currentWordId: input.wordId,
	})
}
