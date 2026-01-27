import { useReadingStore } from '../../../readingStore'

export function useGetSelectedSentenceData() {
	const selection = useReadingStore((s) => s.selection)

	const sentences = useReadingStore((s) => s.populatedChapter.sentences)
	const sentence = sentences.find((s) => s.id === selection.sentenceId)

	if (!selection.sentenceId || !selection.wordIds.length || !sentence) {
		return {
			sentenceId: null,
			sentenceText: null,
			wordIds: [],
		}
	}

	return {
		sentenceId: selection.sentenceId,
		sentenceText: sentence.sentence,
		wordIds: selection.wordIds,
	}
}
