import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { getButtonText, getParagraphText, shouldShowButton, shouldShowParagraph } from './logic'

export function useGetParagraphLogic() {
	const selectedSentence = useReadingStore((s) => s.sentence)

	const selectedWordIds = selectedSentence?.selectedWordIds ?? []
	const translatedPhrases = selectedSentence?.translatedPhrases ?? []
	const isLoading = Boolean(selectedSentence?.fetchTranslation?.isLoading)

	const isParagraphVisible = React.useMemo(
		() => shouldShowParagraph({ selectedWordIds, translatedPhrases, isLoading }),
		[selectedWordIds, translatedPhrases, isLoading],
	)

	const paragraphText = React.useMemo(() => getParagraphText(), [])

	return { isParagraphVisible, paragraphText }
}

export function useGetButtonLogic() {
	const selectedSentence = useReadingStore((s) => s.sentence)

	const selectedWordIds = selectedSentence?.selectedWordIds ?? []
	const translatedPhrases = selectedSentence?.translatedPhrases ?? []
	const sentenceTranslation = selectedSentence?.sentenceTranslation ?? null
	const sentenceParts = selectedSentence?.sentence ?? []

	const isButtonVisible = React.useMemo(() => shouldShowButton(selectedWordIds), [selectedWordIds])
	const buttonText = React.useMemo(
		() =>
			isButtonVisible
				? getButtonText({
						sentenceTranslation,
						selectedWordIds,
						translatedPhrases,
						sentenceParts,
				})
				: '',
		[
			isButtonVisible,
			sentenceTranslation,
			JSON.stringify(selectedWordIds),
			JSON.stringify(translatedPhrases),
			JSON.stringify(sentenceParts),
		],
	)

	return { isButtonVisible, buttonText }
}
