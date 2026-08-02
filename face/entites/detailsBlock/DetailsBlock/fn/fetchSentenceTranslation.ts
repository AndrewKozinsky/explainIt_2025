import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { makePhraseId, SentencePhraseType, useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import { translateApi } from '@/entites/translate/repository/TranslateApi'
import { PhraseTranslationModel } from '@/entites/translate/repository/TranslateRepository'
import { findSentenceEntry } from './selectors'
import { wordIdsFromOffsets } from './wordSegmentation'

export function useFetchCurrentSentenceTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const retryFetchSentenceTranslationQueue = useDetailsStore((s) => s.retryFetchSentenceTranslationQueue)
	const locale = useLocale()

	// Process retry queue: sentences that the user explicitly asked to re-fetchData.
	useEffect(
		function () {
			if (retryFetchSentenceTranslationQueue.length === 0) return

			const state = useDetailsStore.getState()

			for (const item of retryFetchSentenceTranslationQueue) {
				void runFetchForSentence({
					sentenceId: item.sentenceId,
					sentenceText: item.sentenceText,
					bookName: state.bookName,
					bookAuthor: state.bookAuthor,
					videoName: state.videoName,
					languageCode: state.languageCode,
					targetLanguageCode: locale,
				}).catch(function () {})
			}

			// Clear processed items from the queue
			useDetailsStore.getState().updateStore({ retryFetchSentenceTranslationQueue: [] })
		},
		[retryFetchSentenceTranslationQueue],
	)

	// Fetch translation for the current sentence when it changes and has no cached entry.
	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null) return

			const state = useDetailsStore.getState()

			const sentence = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})

			// Пропускаем только если перевод уже есть или уже грузится
			if (sentence && sentence.data.translation.translation) return

			void runFetchForSentence({
				sentenceId: currentSentenceId,
				sentenceText: currentSentenceText,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				languageCode: state.languageCode,
				targetLanguageCode: locale,
			}).catch(function () {})
		},
		[currentSentenceId],
	)
}

type RunFetchForSentenceInput = {
	sentenceId: number
	sentenceText: string
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	languageCode: null | string
	targetLanguageCode: string
}

async function runFetchForSentence(input: RunFetchForSentenceInput): Promise<void> {
	const store = useDetailsStore.getState()

	store.insertLoadingSentence({
		sentenceId: input.sentenceId,
		text: input.sentenceText,
	})

	void seedPhraseTranslationsCache(input)

	try {
		const translation = await fetchSentenceTranslation(input)

		useDetailsStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: { text: translation, loading: false, error: null, translation },
		})
	} catch (error) {
		useDetailsStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: {
				loading: false,
				error: 'Не удалось получить перевод предложения',
			},
		})

		throw error
	}
}

async function seedPhraseTranslationsCache(input: RunFetchForSentenceInput): Promise<void> {
	try {
		const result = await translateApi.getPhraseTranslationsBySentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
		})

		if (result.error || !result.data.length) return

		const store = useDetailsStore.getState()
		for (const phraseTranslation of result.data) {
			store.upsertPhraseTranslation({
				sentenceId: input.sentenceId,
				phrase: mapPhraseTranslationToStatus({
					phraseTranslation,
					sentenceText: input.sentenceText,
					languageCode: input.languageCode,
				}),
			})
		}
	} catch {
		// Кеш фраз — некритичная подсказка, ошибки игнорируем
	}
}

export function mapPhraseTranslationToStatus(input: {
	phraseTranslation: PhraseTranslationModel
	sentenceText: string
	languageCode: null | string
}): SentencePhraseType {
	const { phraseTranslation, sentenceText, languageCode } = input

	const wordIds = wordIdsFromOffsets({
		sentenceText,
		locale: languageCode,
		startOffset: phraseTranslation.phraseStartOffset,
		endOffset: phraseTranslation.phraseEndOffset,
	})

	return {
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: phraseTranslation.id,
		flashcardId: phraseTranslation.flashcardId,
		wordIds,
		phrase: phraseTranslation.phrase,
		loading: false,
		error: null,
		translation: phraseTranslation.translation,
		examples: phraseTranslation.examples.map((example) => ({
			text: example.text ?? '',
			translate: example.translate ?? '',
		})),
	}
}

async function fetchSentenceTranslation(input: RunFetchForSentenceInput): Promise<string> {
	const result = await translateApi.translateSentence({
		sentenceId: input.sentenceId,
		targetLanguageCode: input.targetLanguageCode,
		bookName: input.bookName,
		bookAuthor: input.bookAuthor,
		videoName: input.videoName,
	})

	if (result.error || !result.data.translation) {
		throw new Error(result.error ?? 'Не удалось получить перевод предложения')
	}

	return result.data.translation
}
