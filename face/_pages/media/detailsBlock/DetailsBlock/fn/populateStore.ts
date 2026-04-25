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
	const bookName = useReadingStore((s) => s.book?.data?.name)
	const bookAuthor = useReadingStore((s) => s.book?.data?.author)

	useEffect(
		function () {
			if (mediaType !== 'book' || !bookSentences) return

			const sentence = bookSentences.find((s) => s.id === bookSelection.sentenceId)
			const sentenceText = sentence?.sentence ?? null

			applySelectionToDetailsStore({
				bookName: bookName ?? null,
				bookAuthor: bookAuthor ?? null,
				videoName: null,
				videoYear: null,
				sentenceId: bookSelection.sentenceId,
				wordIds: bookSelection.wordIds,
				sentenceText,
			})
		},
		[
			bookAuthor,
			bookName,
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
	const videoName = useWatchingStore((s) => s.video?.data?.name)
	const videoYear = useWatchingStore((s) => s.video?.data?.year)

	useEffect(
		function () {
			if (mediaType !== 'video') return

			const plainTextSentence = videoSubSentences?.find((s) => s.id === videoSelection.sentenceId)
			const subtitleSentence = videoTextSentences?.find((s) => s.id === videoSelection.sentenceId)
			const sentence = plainTextSentence ?? subtitleSentence
			const sentenceText = sentence?.text || null

			applySelectionToDetailsStore({
				bookName: null,
				bookAuthor: null,
				videoName: videoName ?? null,
				videoYear: videoYear ?? null,
				sentenceId: videoSelection.sentenceId,
				wordIds: videoSelection.wordIds,
				sentenceText,
			})
		},
		[
			mediaType,
			videoName,
			videoSelection.sentenceId,
			videoSelection.wordIds,
			videoSubSentences,
			videoTextSentences,
			videoYear,
		],
	)
}

type ApplySelectionInput = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	sentenceId: null | number
	wordIds: number[]
	sentenceText: null | string
}

function applySelectionToDetailsStore(input: ApplySelectionInput) {
	const offsets = getSelectedWordOffsets({
		sentenceText: input.sentenceText,
		wordIds: input.wordIds,
	})

	const store = useDetailsStore.getState()

	store.updateStore({
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
		videoYear: input.videoYear,
		currentSentenceId: input.sentenceId,
		currentWordStartOffset: offsets?.startOffset ?? null,
		currentWordEndOffset: offsets?.endOffset ?? null,
	})

	if (input.sentenceId !== null && input.sentenceText) {
		store.upsertSentenceEntry({
			sentenceId: input.sentenceId,
			text: input.sentenceText,
		})
	}
}

export function getSelectedWordOffsets(input: {
	sentenceText: null | string
	wordIds: number[]
	locale?: string
}): null | { word: string; startOffset: number; endOffset: number } {
	const { sentenceText, wordIds, locale } = input

	const wordId = wordIds[0]
	if (!wordId || !sentenceText) return null

	const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
	const segments = [...segmenter.segment(sentenceText)].filter((segment) => segment.isWordLike)
	const selectedSegment = segments[wordId - 1]

	if (!selectedSegment?.segment) return null

	return {
		word: selectedSegment.segment,
		startOffset: selectedSegment.index,
		endOffset: selectedSegment.index + selectedSegment.segment.length,
	}
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
