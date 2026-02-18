// import { useWatchingStore } from '_pages/video/watching/watchingStore'

/*export function useGetSelectedSentenceData() {
	const selection = useWatchingStore((s) => s.selection)
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)

	if (!selection.sentenceId || !selection.wordIds.length) {
		return {
			sentenceId: null,
			sentenceText: null,
			wordIds: [],
		}
	}

	const plainTextSentence = populatedPlainText?.sentences.find((s) => s.id === selection.sentenceId)
	const subtitleSentence = populatedSubtitles?.sentences.find((s) => s.id === selection.sentenceId)

	return {
		sentenceId: selection.sentenceId,
		sentenceText: plainTextSentence?.text ?? subtitleSentence?.text,
		wordIds: selection.wordIds,
	}
}*/
