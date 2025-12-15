import { useMemo } from 'react'
import { getFullSelectedSentence } from '_pages/books/reading/lib/getFullSelectedSentence'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useGetSelectedSentence } from './getSelectedSentence'
import { ChapterTextStructurePopulated } from '../../commonLogic/chapterStructureTypes'

export function useGetSelectedPhrase<T extends ChapterTextStructurePopulated.Phrase>(): T {
	const selection = useReadingStore((state) => state.selection)
	const selectedSentence = useGetSelectedSentence()

	return useMemo(getSelectedPhrase as () => T, [selection, selectedSentence])
}

export function getSelectedPhrase() {
	const { selection } = useReadingStore.getState()
	const selectedSentence = getFullSelectedSentence()
	if (!selection.phraseId || !selectedSentence) {
		return null
	}

	return selectedSentence.phrases.find((phrase) => {
		return phrase.id === selection.phraseId
	})
}
