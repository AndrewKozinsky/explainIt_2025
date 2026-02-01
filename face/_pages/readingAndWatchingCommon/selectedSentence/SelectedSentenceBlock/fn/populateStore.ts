import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useSelectedSentenceStore } from '_pages/readingAndWatchingCommon/selectedSentence/selectedSentenceStore'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { pageUrls } from 'сonsts/pageUrls'

export function usePopulateStore() {
	const mediaType = useGetShowingMediaType()

	const bookSentences = useReadingStore((s) => s.populatedChapter?.sentences)
	const bookSelection = useReadingStore((s) => s.selection)
	const bookSelectWord = useReadingStore((s) => s.selectWord)

	useEffect(
		function () {
			if (mediaType !== 'book' || !bookSentences) return
			if (!bookSelection.sentenceId) return

			const sentence = bookSentences.find((s) => s.id === bookSelection.sentenceId)
			if (!sentence) return

			useSelectedSentenceStore.getState().updateStore({
				sentenceId: bookSelection.sentenceId,
				sentenceText: sentence.sentence,
				wordIds: bookSelection.wordIds,
				selectWord: bookSelectWord,
			})
		},
		[bookSelectWord, bookSelection.sentenceId, bookSelection.wordIds, bookSentences, mediaType],
	)

	// ---

	const videoSubSentences = useWatchingStore((s) => s.populatedSubtitles?.sentences)
	const videoTextSentences = useWatchingStore((s) => s.populatedPlainText?.sentences)
	const videoSelection = useWatchingStore((s) => s.selection)
	const videoSelectWord = useWatchingStore((s) => s.selectWord)

	useEffect(
		function () {
			if (mediaType !== 'video') return
			if (!videoSelection.sentenceId) return

			const plainTextSentence = videoSubSentences?.find((s) => s.id === videoSelection.sentenceId)
			const subtitleSentence = videoTextSentences?.find((s) => s.id === videoSelection.sentenceId)

			const sentence = plainTextSentence ?? subtitleSentence
			if (!sentence) return

			useSelectedSentenceStore.getState().updateStore({
				sentenceId: videoSelection.sentenceId,
				sentenceText: sentence.text,
				wordIds: videoSelection.wordIds,
				selectWord: videoSelectWord,
			})
		},
		[
			mediaType,
			videoSelectWord,
			videoSelection.sentenceId,
			videoSelection.wordIds,
			videoSubSentences,
			videoTextSentences,
		],
	)
}

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
