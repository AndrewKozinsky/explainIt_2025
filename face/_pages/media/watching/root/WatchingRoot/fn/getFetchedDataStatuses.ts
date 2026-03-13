import { useWatchingStore } from '../../../watchingStore'

export function useGetFetchedDataStatuses() {
	const video = useWatchingStore((s) => s.video)
	const plainText = useWatchingStore((s) => s.populatedPlainText)
	const subtitles = useWatchingStore((s) => s.populatedSubtitles)

	let fetchedDataLoading = video?.loading
	if (!plainText && !subtitles) {
		fetchedDataLoading = true
	}

	const fetchedDataErrorMessage = video?.errorMessage

	return {
		fetchedDataLoading,
		fetchedDataErrorMessage,
	}
}
