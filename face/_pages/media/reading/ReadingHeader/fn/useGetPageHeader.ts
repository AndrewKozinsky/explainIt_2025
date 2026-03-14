import { useReadingStore } from '_pages/media/reading/readingStore'

export function useGetPageHeader() {
	const header = useReadingStore((store) => store.populatedChapter.header)
	const name = useReadingStore((store) => store.populatedChapter.name)
	return header || name || ''
}
