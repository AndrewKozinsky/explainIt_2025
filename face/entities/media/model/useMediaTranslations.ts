import { useEffect } from 'react'
import { useFetchPhraseTranslation } from '@/entities/media/model/useFetchPhrase'
import { useFetchSentenceTranslation } from '@/entities/media/model/useFetchSentence'
import { MediaTranslationContext } from './mediaTranslationContext'
// import type { PhraseTranslationModel } from '@/entities/translate/TranslateService'
// import type { SentencePhraseType } from '../store/translationTypes'
// import { offsetsFromWordIds, wordIdsFromOffsets } from '@/entities/detailsBlock/DetailsBlock/fn/wordSegmentation'

/** Координирует загрузку переводов для всех потребителей текущего media-контекста. */
export function useMediaTranslations(input: MediaTranslationContext): void {
	const { mediaStore, sentences, languageCode } = input

	useEffect(() => {
		mediaStore.getState().setTranslationContext({ languageCode: languageCode ?? null, sentences: sentences ?? [] })
	}, [mediaStore, languageCode, sentences])

	useFetchSentenceTranslation(input)

	// useEffect(() => () => mediaStore.getState().clearMediaData(), [mediaStore])

	useFetchPhraseTranslation(input)

	// const sentenceRetries = mediaStore((state) => state.retryFetchSentenceTranslationQueue)

	/*useEffect(() => {
		if (!sentenceRetries.length) return
		mediaStore.setState({ retryFetchSentenceTranslationQueue: [] })

		for (const item of sentenceRetries)
			void fetchSentence({
				...input,
				sentenceId: item.sentenceId,
				sentenceText: item.sentenceText,
				targetLanguageCode: locale,
			})
	}, [mediaStore, sentenceRetries, locale])*/

	// const phraseRetries = mediaStore((state) => state.retryFetchPhraseQueue)

	/*useEffect(() => {
		if (!phraseRetries.length) return

		mediaStore.setState({ retryFetchPhraseQueue: [] })
		const state = mediaStore.getState()

		for (const item of phraseRetries) {
			const offsets = offsetsFromWordIds({
				sentenceText: item.sentenceText,
				locale: state.languageCode,
				wordIds: item.wordIds,
			})

			if (offsets)
				void fetchPhrase({
					...input,
					sentenceId: item.sentenceId,
					sentenceText: item.sentenceText,
					phraseId: item.randomGeneratedPhraseId,
					wordStartOffset: offsets.startOffset,
					wordEndOffset: offsets.endOffset,
					targetLanguageCode: locale,
				})
		}
	}, [mediaStore, phraseRetries, locale])*/
}
