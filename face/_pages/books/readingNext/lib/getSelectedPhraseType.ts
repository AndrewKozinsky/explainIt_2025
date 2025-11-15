import { useMemo } from 'react'
import { getFullSelectedSentence } from '_pages/books/readingNext/lib/getFullSelectedSentence'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { useGetSelectedSentence } from './getSelectedSentence'
import { ChapterTextStructurePopulated } from '../../commonLogic/chapterStructureTypes'

export function useGetSelectedPhrase<T extends ChapterTextStructurePopulated.Phrase>(): T {
	const selection = useReadingStoreNext((state) => state.selection)
	const selectedSentence = useGetSelectedSentence()

	return useMemo(getSelectedPhrase as () => T, [selection, selectedSentence])
}

export function getSelectedPhrase() {
	const { selection } = useReadingStoreNext.getState()
	const selectedSentence = getFullSelectedSentence()
	if (!selection.phraseId || !selectedSentence) {
		return null
	}

	return selectedSentence.phrases.find((phrase) => {
		return phrase.id === selection.phraseId
	})
}
