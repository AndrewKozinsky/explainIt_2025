// import { useEffect } from 'react'
// import { useTranslate_Get_Phrase_TranslationLazyQuery, useTranslate_Translate_Phrase } from '@/graphql'
// import { getCurrentUserLanguageCode } from '@/utils/currentUserLanguage'
// import { getTextByUnknownError } from '@/utils/errorMessages'
// import { makePhraseId, SentencePhrase, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
// import { mapPhraseTranslationToStatus, toNullableString } from './fetchSentenceTranslation'
// import { findSentenceEntry } from './selectors'
// import { offsetsFromWordIds } from './wordSegmentation'

/*export function useFetchCurrentPhraseTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const currentWordId = useDetailsStore((s) => s.currentWordId)

	const [getPhraseTranslation] = useTranslate_Get_Phrase_TranslationLazyQuery()
	const [translatePhrase] = useTranslate_Translate_Phrase()

	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null || currentWordId === null) return

			const state = useDetailsStore.getState()

			const entry = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})
			if (!entry) return

			const covering = entry.data.phrases.find((p) => p.wordIds.includes(currentWordId))

			if (covering) {
				state.setSelectedPhraseId({
					sentenceId: currentSentenceId,
					phraseId: covering.randomGeneratedPhraseId,
				})
				return
			}

			const wordOffsets = offsetsFromWordIds({
				sentenceText: currentSentenceText,
				locale: state.languageCode,
				wordIds: [currentWordId],
			})
			if (!wordOffsets) return

			const phraseId = makePhraseId()

			state.upsertPhraseTranslation({
				sentenceId: currentSentenceId,
				phrase: {
					randomGeneratedPhraseId: phraseId,
					sentencePhraseId: null,
					flashcardId: null,
					wordIds: [currentWordId],
					phrase: wordOffsets.text || null,
					loading: true,
					error: null,
					translation: null,
					examples: [],
				},
			})

			state.setSelectedPhraseId({
				sentenceId: currentSentenceId,
				phraseId,
			})

			void runFetchForPhrase({
				sentenceId: currentSentenceId,
				sentenceText: currentSentenceText,
				phraseId,
				wordStartOffset: wordOffsets.startOffset,
				wordEndOffset: wordOffsets.endOffset,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				videoYear: state.videoYear,
				languageCode: state.languageCode,
				getPhraseTranslation,
				translatePhrase,
			})
		},
		[currentSentenceId, currentSentenceText, currentWordId],
	)
}*/

/*type RunFetchForPhraseInput = {
	sentenceId: number
	sentenceText: string
	phraseId: string
	wordStartOffset: number
	wordEndOffset: number
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	languageCode: null | string
	getPhraseTranslation: ReturnType<typeof useTranslate_Get_Phrase_TranslationLazyQuery>[0]
	translatePhrase: ReturnType<typeof useTranslate_Translate_Phrase>[0]
}*/

/*async function runFetchForPhrase(input: RunFetchForPhraseInput): Promise<void> {
	try {
		const phrase = await getOrCreatePhraseTranslation(input)

		useDetailsStore.getState().finalizePhraseTranslation({
			sentenceId: input.sentenceId,
			placeholderPhraseId: input.phraseId,
			phrase,
		})
	} catch (error) {
		useDetailsStore.getState().patchPhraseTranslation({
			sentenceId: input.sentenceId,
			phraseId: input.phraseId,
			patch: {
				loading: false,
				error: getTextByUnknownError(error, 'Unknown error'),
			},
		})
	}
}*/

/*async function getOrCreatePhraseTranslation(input: RunFetchForPhraseInput): Promise<SentencePhrase> {
	const existing = await input.getPhraseTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				targetLanguageCode: getCurrentUserLanguageCode(),
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
			},
		},
		fetchPolicy: 'network-only',
	})

	const existingPhrase = existing.data?.translate_get_phrase_translation
	if (existingPhrase?.translate) {
		return mapPhraseTranslationToStatus({
			phraseTranslation: existingPhrase,
			sentenceText: input.sentenceText,
			languageCode: input.languageCode,
		})
	}

	const selectedWord = input.sentenceText.slice(input.wordStartOffset, input.wordEndOffset)

	const generated = await input.translatePhrase({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				selectedWord,
				targetLanguageCode: getCurrentUserLanguageCode(),
				selectedWordStartOffset: input.wordStartOffset,
				selectedWordEndOffset: input.wordEndOffset,
				bookName: input.bookName ?? undefined,
				bookAuthor: input.bookAuthor ?? undefined,
				videoName: input.videoName ?? undefined,
				videoYear: toNullableString(input.videoYear) ?? undefined,
			},
		},
	})

	const generatedPhrase = generated.data?.translate_translate_phrase
	if (!generatedPhrase?.translate) {
		throw new Error('Не удалось получить перевод слова')
	}

	return mapPhraseTranslationToStatus({
		phraseTranslation: generatedPhrase,
		sentenceText: input.sentenceText,
		languageCode: input.languageCode,
	})
}*/
