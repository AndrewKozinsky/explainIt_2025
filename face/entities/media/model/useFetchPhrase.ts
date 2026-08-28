import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { fetchPhrase } from './fetchPhrase'
import { MediaTranslationContext } from './mediaTranslationContext'
import { makePhraseId, offsetsFromWordIds } from './prepareData'

export function useFetchPhraseTranslation(input: MediaTranslationContext) {
	const locale = useLocale()

	const { mediaStore, sentences, languageCode, selectedSentenceId, selectedWordId } = input

	useEffect(() => {
		if (selectedSentenceId === null || selectedWordId === null) return

		const state = mediaStore.getState()
		const entry = state.sentences.find((item) => item.sentenceId === selectedSentenceId)
		if (!entry) return

		const existing = entry.data.phrases.find((phrase) => phrase.wordIds.includes(selectedWordId))
		if (existing)
			return state.setSelectedPhraseId({
				sentenceId: selectedSentenceId,
				phraseId: existing.randomGeneratedPhraseId,
			})

		const offsets = offsetsFromWordIds({
			sentenceText: entry.sentenceText,
			locale: state.languageCode,
			wordIds: [selectedWordId],
		})
		if (!offsets) return

		const phraseId = makePhraseId()

		state.upsertPhraseTranslation({
			sentenceId: selectedSentenceId,
			phrase: {
				randomGeneratedPhraseId: phraseId,
				sentencePhraseId: null,
				flashcardId: null,
				wordIds: [selectedWordId],
				phrase: offsets.text || null,
				loading: true,
				error: null,
				translation: null,
				examples: [],
			},
		})

		state.setSelectedPhraseId({ sentenceId: selectedSentenceId, phraseId })

		void fetchPhrase({
			...input,
			sentenceId: selectedSentenceId,
			sentenceText: entry.sentenceText,
			phraseId,
			wordStartOffset: offsets.startOffset,
			wordEndOffset: offsets.endOffset,
			targetLanguageCode: locale,
		})
	}, [mediaStore, selectedSentenceId, selectedWordId, locale])
}
