import { useReadingStore } from '_pages/media/reading/readingStore'

/**
 * Пытается обновить reading store полученными грамматическими концептами.
 * Возвращает true, если в сторе были данные и обновление произведено.
 */
export function tryUpdateReadingStore(
	sentenceId: number,
	grammarConcepts: any[],
	missingGrammarConcepts: any[],
): boolean {
	const state = useReadingStore.getState()

	if (!state.populatedChapter?.sentences) {
		return false
	}

	const newSentences = state.populatedChapter.sentences.map((sentence) =>
		sentence.id === sentenceId ? { ...sentence, grammarConcepts, missingGrammarConcepts } : sentence,
	)

	state.updatePopulatedChapter({ ...state.populatedChapter, sentences: newSentences })

	return true
}
