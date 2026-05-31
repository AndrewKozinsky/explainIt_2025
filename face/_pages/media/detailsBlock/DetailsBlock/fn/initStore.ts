import { useEffect } from 'react'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../../detailsStore'
import { useGetShowingMediaType } from './useGetShowingMediaType'

export function useInitStore() {
	const mediaType = useGetShowingMediaType()

	const bookName = useReadingStore((s) => s.book?.data?.name)
	const bookAuthor = useReadingStore((s) => s.book?.data?.author)
	const bookLanguageCode = useReadingStore((s) => s.book?.data?.languageCode)
	const chapterId = useReadingStore((s) => s.chapter?.data?.id)

	useEffect(
		function () {
			if (mediaType !== 'book') return

			applySelectionToDetailsStore({
				bookName: bookName ?? null,
				bookAuthor: bookAuthor ?? null,
				chapterId,
				videoId: null,
				videoName: null,
				videoYear: null,
				languageCode: bookLanguageCode ?? null,
			})
		},
		[bookAuthor, bookName, bookLanguageCode, mediaType, chapterId],
	)

	const videoId = useWatchingStore((s) => s.video?.data?.id)
	const videoName = useWatchingStore((s) => s.video?.data?.name)
	const videoYear = useWatchingStore((s) => s.video?.data?.year)
	const videoLanguageCode = useWatchingStore((s) => s.video?.data?.languageCode)

	useEffect(
		function () {
			if (mediaType !== 'video') return

			applySelectionToDetailsStore({
				bookName: null,
				bookAuthor: null,
				chapterId: null,
				videoName: videoName ?? null,
				videoYear: videoYear ?? null,
				videoId,
				languageCode: videoLanguageCode ?? null,
			})
		},
		[videoName, videoYear, videoLanguageCode, mediaType, videoId],
	)
}

type ApplySelectionInput = {
	bookName: null | string
	bookAuthor: null | string
	chapterId: null | number
	videoName: null | string
	videoYear: null | string | number
	videoId: null | number
	languageCode: null | string
}

function applySelectionToDetailsStore(input: ApplySelectionInput) {
	const store = useDetailsStore.getState()

	store.updateStore({
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		chapterId: input.chapterId,
		videoName: input.videoName,
		videoYear: input.videoYear,
		videoId: input.videoId,
		languageCode: input.languageCode,
	})
}
