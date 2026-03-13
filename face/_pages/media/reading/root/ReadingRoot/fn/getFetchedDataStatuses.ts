import { useReadingStore } from '../../../readingStore'

export function useGetFetchedDataStatuses() {
	const book = useReadingStore((s) => s.book)
	const chapter = useReadingStore((s) => s.chapter)

	const populatedChapter = useReadingStore((s) => s.populatedChapter)
	const fetchedDataLoading = book?.loading || chapter?.loading || !populatedChapter
	const fetchedDataErrorMessage = book?.errorMessage || chapter?.errorMessage

	return {
		fetchedDataLoading,
		fetchedDataErrorMessage,
	}
}
