import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import {
	translateControllerGetPhraseTranslationsBySentence,
	translateControllerTranslateSentence,
} from '@/shared/api/generated/translate/translate'
import { makePhraseId, SentencePhraseType, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { findSentenceEntry } from './selectors'
import { wordIdsFromOffsets } from './wordSegmentation'

export function useFetchCurrentSentenceTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)
	const retryFetchSentenceTranslationQueue = useDetailsStore((s) => s.retryFetchSentenceTranslationQueue)
	const locale = useLocale()

	// Process retry queue: sentences that the user explicitly asked to re-fetch.
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
					videoYear: state.videoYear,
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

			if (sentence) return

			void runFetchForSentence({
				sentenceId: currentSentenceId,
				sentenceText: currentSentenceText,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				videoYear: state.videoYear,
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
	videoYear: null | string | number
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
		const response = await translateControllerGetPhraseTranslationsBySentence({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
		})

		const phraseTranslations = (response as unknown as Record<string, unknown>[]) ?? []

		const store = useDetailsStore.getState()

		for (const phraseTranslation of phraseTranslations) {
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
	phraseTranslation: Record<string, unknown>
	sentenceText: string
	languageCode: null | string
}): SentencePhraseType {
	const { phraseTranslation, sentenceText, languageCode } = input

	const phraseStartOffset = phraseTranslation.phraseStartOffset as number
	const phraseEndOffset = phraseTranslation.phraseEndOffset as number

	const wordIds = wordIdsFromOffsets({
		sentenceText,
		locale: languageCode,
		startOffset: phraseStartOffset,
		endOffset: phraseEndOffset,
	})

	return {
		randomGeneratedPhraseId: makePhraseId(),
		sentencePhraseId: phraseTranslation.id as number,
		flashcardId: (phraseTranslation.flashcardId as number | null) ?? null,
		wordIds,
		phrase: (phraseTranslation.phrase as string) ?? null,
		loading: false,
		error: null,
		translation: (phraseTranslation.translate as string | null) ?? null,
		examples: ((phraseTranslation.examples as Array<{ text: string; translate: string }>) ?? []).map((example) => ({
			text: example.text ?? '',
			translate: example.translate ?? '',
		})),
	}
}

async function fetchSentenceTranslation(input: RunFetchForSentenceInput): Promise<string> {
	const response = await translateControllerTranslateSentence({
		sentenceId: input.sentenceId,
		targetLanguageCode: input.targetLanguageCode,
		bookName: input.bookName ?? undefined,
		bookAuthor: input.bookAuthor ?? undefined,
		videoName: input.videoName ?? undefined,
		videoYear: toNullableString(input.videoYear) ?? undefined,
	})

	const result = response as unknown as { translation: string } | null
	const generatedTranslation = result?.translation
	if (!generatedTranslation) {
		throw new Error('Не удалось получить перевод предложения')
	}

	return generatedTranslation
}

export function toNullableString(value: null | string | number): null | string {
	if (value === null || value === undefined) return null
	return String(value)
}
