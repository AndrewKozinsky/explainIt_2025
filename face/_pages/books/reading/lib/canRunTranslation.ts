import { useMemo } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { areArraysEqualIgnoringOrder } from 'utils/arrays'
import { getFullSelectedSentence } from './getFullSelectedSentence'

export function useCanRunTranslation() {
	const selectedSentence = useReadingStore((s) => s.selection)
	const populatedChapter = useReadingStore((s) => s.populatedChapter)

	return useMemo(canRunTranslation, [selectedSentence, populatedChapter])
}

export function canRunTranslation() {
	const selectedSentence = useReadingStore.getState().selection
	if (!selectedSentence.sentenceId || !selectedSentence.wordIds.length) {
		return false
	}

	const fullSelectedSentence = getFullSelectedSentence()
	if (!fullSelectedSentence) {
		return false
	}

	// Get the phrase which has all selected words
	const selectedPhrase = fullSelectedSentence.phrases.find((phrase) => {
		return areArraysEqualIgnoringOrder(phrase.wordIds, selectedSentence.wordIds)
	})
	if (!selectedPhrase) {
		return true
	}

	return !['success', 'loading'].includes(selectedPhrase.type)
}
