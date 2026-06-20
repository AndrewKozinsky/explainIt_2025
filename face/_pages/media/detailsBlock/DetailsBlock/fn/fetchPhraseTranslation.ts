import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { getTextByUnknownError } from 'utils/extractErrorText'
import { useTranslate_Get_Phrase_TranslationLazyQuery, useTranslate_Translate_Phrase } from '@/graphql'
import { makePhraseId, SentencePhraseType, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { mapPhraseTranslationToStatus, toNullableString } from './fetchSentenceTranslation'
import { findSentenceEntry } from './selectors'
import { offsetsFromWordIds } from './wordSegmentation'

export function useFetchCurrentPhraseTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const currentWordId = useDetailsStore((s) => s.currentWordId)
	const retryFetchPhraseQueue = useDetailsStore((s) => s.retryFetchPhraseQueue)
	const locale = useLocale()

	const [getPhraseTranslation] = useTranslate_Get_Phrase_TranslationLazyQuery()
	const [translatePhrase] = useTranslate_Translate_Phrase()

	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null || currentWordId === null) return

			const state = useDetailsStore.getState()

			const sentence = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})
			if (!sentence) return

			const phrase = sentence.data.phrases.find((p) => p.wordIds.includes(currentWordId))
			if (phrase) {
				state.setSelectedPhraseId({
					sentenceId: currentSentenceId,
					phraseId: phrase.randomGeneratedPhraseId,
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
				targetLanguageCode: locale,
				getPhraseTranslation,
				translatePhrase,
			})
		},
		[currentSentenceId, currentSentenceText, currentWordId],
	)

	// Process retry queue: phrases that the user explicitly asked to re-fetch.
	useEffect(
		function () {
			if (retryFetchPhraseQueue.length === 0) return

			const state = useDetailsStore.getState()

			for (const item of retryFetchPhraseQueue) {
				const wordOffsets = offsetsFromWordIds({
					sentenceText: item.sentenceText,
					locale: state.languageCode,
					wordIds: item.wordIds,
				})
				if (!wordOffsets) continue

				void runFetchForPhrase({
					sentenceId: item.sentenceId,
					sentenceText: item.sentenceText,
					phraseId: item.randomGeneratedPhraseId,
					wordStartOffset: wordOffsets.startOffset,
					wordEndOffset: wordOffsets.endOffset,
					bookName: state.bookName,
					bookAuthor: state.bookAuthor,
					videoName: state.videoName,
					videoYear: state.videoYear,
					languageCode: state.languageCode,
					targetLanguageCode: locale,
					getPhraseTranslation,
					translatePhrase,
				}).catch(function () {})
			}

			useDetailsStore.getState().updateStore({ retryFetchPhraseQueue: [] })
		},
		[retryFetchPhraseQueue],
	)
}

type RunFetchForPhraseInput = {
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
	targetLanguageCode: string
	getPhraseTranslation: ReturnType<typeof useTranslate_Get_Phrase_TranslationLazyQuery>[0]
	translatePhrase: ReturnType<typeof useTranslate_Translate_Phrase>[0]
}

async function runFetchForPhrase(input: RunFetchForPhraseInput): Promise<void> {
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
				error: getTextByUnknownError(error),
			},
		})
	}
}

async function getOrCreatePhraseTranslation(input: RunFetchForPhraseInput): Promise<SentencePhraseType> {
	const existing = await input.getPhraseTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				targetLanguageCode: input.targetLanguageCode,
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
				targetLanguageCode: input.targetLanguageCode,
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
}
