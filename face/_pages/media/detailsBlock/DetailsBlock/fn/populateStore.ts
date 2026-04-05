import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../../detailsStore'
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

			const sentence = bookSentences.find((s) => s.id === bookSelection.sentenceId)

			useDetailsStore.getState().updateStore({
				bookName: bookName ?? null,
				bookAuthor: bookAuthor ?? null,
				videoName: null,
				videoYear: null,
				sentenceId: bookSelection.sentenceId,
				wordIds: bookSelection.wordIds,
				sentenceText: sentence?.sentence ?? null,
				selectWord: bookSelectWord,
			})
		},
		[
			bookAuthor,
			bookName,
			bookSelectWord,
			bookSelection.sentenceId,
			bookSelection.wordIds,
			bookSentences,
			mediaType,
		],
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

			const plainTextSentence = videoSubSentences?.find((s) => s.id === videoSelection.sentenceId)
			const subtitleSentence = videoTextSentences?.find((s) => s.id === videoSelection.sentenceId)

			const sentence = plainTextSentence ?? subtitleSentence

			useDetailsStore.getState().updateStore({
				bookName: null,
				bookAuthor: null,
				videoName: videoName ?? null,
				videoYear: videoYear ?? null,
				sentenceId: videoSelection.sentenceId,
				wordIds: videoSelection.wordIds,
				sentenceText: sentence?.text || null,
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

export function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useDetailsStore.getState().clearStoreData()
		}
	}, [])
}
