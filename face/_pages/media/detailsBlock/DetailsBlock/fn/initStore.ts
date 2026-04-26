import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { useWatchingStore } from '_pages/media/watching/watchingStore'
import { useDetailsStore } from '../../detailsStore'
import { pageUrls } from 'сonsts/pageUrls'

export function useInitStore() {
	const mediaType = useGetShowingMediaType()

	const bookName = useReadingStore((s) => s.book?.data?.name)
	const bookAuthor = useReadingStore((s) => s.book?.data?.author)

	useEffect(
		function () {
			if (mediaType !== 'book') return

			applySelectionToDetailsStore({
				bookName: bookName ?? null,
				bookAuthor: bookAuthor ?? null,
				videoName: null,
				videoYear: null,
			})
		},
		[bookAuthor, bookName, mediaType],
	)

	const videoName = useWatchingStore((s) => s.video?.data?.name)
	const videoYear = useWatchingStore((s) => s.video?.data?.year)

	useEffect(
		function () {
			if (mediaType !== 'video') return

			applySelectionToDetailsStore({
				bookName: null,
				bookAuthor: null,
				videoName: videoName ?? null,
				videoYear: videoYear ?? null,
			})
		},
		[videoName, videoYear, mediaType],
	)
}

type ApplySelectionInput = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
}

function applySelectionToDetailsStore(input: ApplySelectionInput) {
	const store = useDetailsStore.getState()

	store.updateStore({
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
	})
}

export function useGetShowingMediaType() {
	const pathname = usePathname()
	return pathname.startsWith(pageUrls.books.path) ? 'book' : 'video'
}
