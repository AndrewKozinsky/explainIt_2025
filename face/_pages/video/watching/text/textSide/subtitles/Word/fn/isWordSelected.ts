import { useWatchingStore } from '_pages/video/watching/watchingStore'

/**
 * Возвращает булево значение является ли это слово выделенным
 * @param thisSubtitleId — идентификатор этого предложения
 * @param thisWordId — идентификатор этого слова
 */
export function useGetIsWordSelected(thisSubtitleId: number, thisWordId: number): boolean {
	const selectedSentenceId = useWatchingStore((state) => state.populatedSubtitles.selected.subtitleId)
	const selectedWordsIds = useWatchingStore((state) => state.populatedSubtitles.selected.wordIds)

	return selectedSentenceId === thisSubtitleId && selectedWordsIds.includes(thisWordId)
}
