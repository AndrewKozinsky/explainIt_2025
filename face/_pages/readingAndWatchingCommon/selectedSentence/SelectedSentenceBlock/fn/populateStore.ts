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
	const bookName = useReadingStore((s) => s.book?.data?.name)
	const bookAuthor = useReadingStore((s) => s.book?.data?.author)

	useEffect(
		function () {
			if (mediaType !== 'book' || !bookSentences) return
			if (!bookSelection.sentenceId) return

			const sentence = bookSentences.find((s) => s.id === bookSelection.sentenceId)
			if (!sentence) return

			useSelectedSentenceStore.getState().updateStore({
				sentenceId: bookSelection.sentenceId,
				sentenceText: sentence.sentence,
				bookName: bookName ?? null,
				bookAuthor: bookAuthor ?? null,
				videoName: null,
				videoYear: null,
				wordIds: bookSelection.wordIds,
				selectWord: bookSelectWord,
			})
		},
		[bookAuthor, bookName, bookSelectWord, bookSelection.sentenceId, bookSelection.wordIds, bookSentences, mediaType],
	)

	// ---

	const videoSubSentences = useWatchingStore((s) => s.populatedSubtitles?.sentences)
	const videoTextSentences = useWatchingStore((s) => s.populatedPlainText?.sentences)
	const videoSelection = useWatchingStore((s) => s.selection)
	const videoSelectWord = useWatchingStore((s) => s.selectWord)
	const videoName = useWatchingStore((s) => s.video?.data?.name)
	const videoYear = useWatchingStore((s) => s.video?.data?.year)

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
				bookName: null,
				bookAuthor: null,
				videoName: videoName ?? null,
				videoYear: videoYear ?? null,
				wordIds: videoSelection.wordIds,
				selectWord: videoSelectWord,
			})
		},
		[
			mediaType,
			videoName,
			videoSelectWord,
			videoSelection.sentenceId,
			videoSelection.wordIds,
			videoSubSentences,
			videoTextSentences,
			videoYear,
		],
	)
}

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
