import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { getButtonText, getParagraphText, shouldShowButton, shouldShowParagraph } from './logic'

export function useGetParagraphVisibilityAndText() {
	const selectedSentence = useReadingStore((s) => s.selectedSentence)

	const selectedWordIds = React.useMemo(() => selectedSentence?.selectedWordIds ?? [], [selectedSentence])
	const translatedPhrases = React.useMemo(() => selectedSentence?.translatedPhrases ?? [], [selectedSentence])
	const isLoading = React.useMemo(() => Boolean(selectedSentence?.fetchTranslation?.isLoading), [selectedSentence])

	const isParagraphVisible = React.useMemo(
		() => shouldShowParagraph({ selectedWordIds, translatedPhrases, isLoading }),
		[selectedWordIds, translatedPhrases, isLoading],
	)

	const paragraphText = React.useMemo(() => getParagraphText(), [])

	return { isParagraphVisible, paragraphText }
}
