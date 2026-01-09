import { useWatchingStore } from '_pages/video/watching/watchingStore'

/**
 * Возвращает булево значение является ли это слово выделенным
 * @param thisSubtitleId — идентификатор этого предложения
 * @param thisWordId — идентификатор этого слова
 */
export function useGetIsWordSelected(thisSubtitleId: number, thisSentenceId: number, thisWordId: number): boolean {
	const selectedSubtitleId = useWatchingStore((state) => state.populatedSubtitles.selected.subtitleId)
	const selectedSentenceId = useWatchingStore((state) => state.populatedSubtitles.selected.sentenceId)
	const selectedWordsIds = useWatchingStore((state) => state.populatedSubtitles.selected.wordIds)

	return (
		selectedSubtitleId === thisSubtitleId &&
		selectedSentenceId === thisSentenceId &&
		selectedWordsIds.includes(thisWordId)
	)
}
