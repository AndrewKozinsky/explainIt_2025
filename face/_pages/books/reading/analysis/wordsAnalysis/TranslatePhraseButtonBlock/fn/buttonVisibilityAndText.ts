import {
	getButtonText,
	shouldShowButton,
} from '_pages/books/reading/analysis/wordsAnalysis/TranslatePhraseButtonBlock/fn/logic'
import { useReadingStore } from '_pages/books/reading/readingStore'
import React from 'react'

export function useGetButtonVisibilityAndText() {
	const selectedSentence = useReadingStore((s) => s.selectedSentence)

	const selectedWordIds = React.useMemo(() => selectedSentence?.selectedWordIds ?? [], [selectedSentence])
	const translatedPhrases = React.useMemo(() => selectedSentence?.translatedPhrases ?? [], [selectedSentence])
	const sentenceTranslation = React.useMemo(() => selectedSentence?.sentenceTranslation ?? null, [selectedSentence])
	const sentenceParts = React.useMemo(() => selectedSentence?.sentence ?? [], [selectedSentence])

	const isButtonVisible = React.useMemo(() => shouldShowButton(selectedWordIds), [selectedWordIds])

	const buttonText = React.useMemo(() => {
		if (!isButtonVisible) return ''
		return getButtonText({
			sentenceTranslation,
			selectedWordIds,
			translatedPhrases,
			sentenceParts,
		})
	}, [isButtonVisible, sentenceTranslation, selectedWordIds, translatedPhrases, sentenceParts])

	return { isButtonVisible, buttonText }
}
