import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { fetchSentence } from './fetchSentence'
import { MediaTranslationContext } from './mediaTranslationContext'

export function useFetchSentenceTranslation(input: MediaTranslationContext) {
	const locale = useLocale()

	const { mediaStore, selectedSentenceId } = input

	useEffect(() => {
		if (selectedSentenceId === null) return

		const state = mediaStore.getState()

		const foundSentence = state.sentences.find((item) => {
			return item.sentenceId === selectedSentenceId
		})

		if (!foundSentence || foundSentence.data.translation.translation || foundSentence.data.translation.loading) {
			return
		}

		void fetchSentence({
			...input,
			sentenceId: selectedSentenceId,
			sentenceText: foundSentence.sentenceText,
			targetLanguageCode: locale,
		})
	}, [mediaStore, selectedSentenceId, locale])
}
