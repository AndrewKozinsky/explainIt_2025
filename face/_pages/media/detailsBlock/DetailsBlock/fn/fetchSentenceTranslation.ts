import { useEffect } from 'react'
import {
	SentencePhraseTranslationOutModel,
	useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery,
	useTranslate_Get_Sentence_TranslationLazyQuery,
	useTranslate_Translate_Sentence,
} from '@/graphql'
import { makePhraseId, PhraseTranslationStatus, useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { findSentenceEntry } from './selectors'

export function useFetchCurrentSentenceTranslation() {
	const currentSentenceId = useDetailsStore((s) => s.currentSentenceId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)

	const [getSentenceTranslation] = useTranslate_Get_Sentence_TranslationLazyQuery()
	const [getPhraseTranslationsBySentence] = useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery()
	const [translateSentence] = useTranslate_Translate_Sentence()

	useEffect(
		function () {
			if (currentSentenceId === null || currentSentenceText === null) return

			const state = useDetailsStore.getState()

			const entry = findSentenceEntry({
				sentences: state.sentences,
				sentenceId: currentSentenceId,
			})

			if (entry) return

			void runFetchForSentence({
				sentenceId: currentSentenceId,
				sentenceText: currentSentenceText,
				bookName: state.bookName,
				bookAuthor: state.bookAuthor,
				videoName: state.videoName,
				videoYear: state.videoYear,
				getSentenceTranslation,
				getPhraseTranslationsBySentence,
				translateSentence,
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
	getSentenceTranslation: ReturnType<typeof useTranslate_Get_Sentence_TranslationLazyQuery>[0]
	getPhraseTranslationsBySentence: ReturnType<typeof useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery>[0]
	translateSentence: ReturnType<typeof useTranslate_Translate_Sentence>[0]
}

async function runFetchForSentence(input: RunFetchForSentenceInput): Promise<void> {
	const store = useDetailsStore.getState()

	store.insertLoadingSentence({
		sentenceId: input.sentenceId,
		text: input.sentenceText,
	})

	void seedPhraseTranslationsCache(input)

	try {
		const translation = await getOrCreateSentenceTranslation(input)

		useDetailsStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: { loading: false, error: null, translation },
		})
	} catch (error) {
		useDetailsStore.getState().patchSentenceTranslation({
			sentenceId: input.sentenceId,
			patch: {
				loading: false,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
		})

		throw error
	}
}

type SeedPhraseTranslationsInput = {
	sentenceId: number
	getPhraseTranslationsBySentence: ReturnType<typeof useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery>[0]
}

async function seedPhraseTranslationsCache(input: SeedPhraseTranslationsInput): Promise<void> {
	try {
		const response = await input.getPhraseTranslationsBySentence({
			variables: {
				input: {
					sentenceId: input.sentenceId,
				},
			},
			fetchPolicy: 'network-only',
		})

		const phraseTranslations = response.data?.translate_get_phrase_translations_by_sentence ?? []
		const store = useDetailsStore.getState()

		for (const phraseTranslation of phraseTranslations) {
			store.upsertPhraseTranslation({
				sentenceId: input.sentenceId,
				phrase: mapPhraseTranslationToStatus(phraseTranslation),
			})
		}
	} catch {
		// Кеш фраз — некритичная подсказка, ошибки игнорируем
	}
}

export function mapPhraseTranslationToStatus(
	phraseTranslation: SentencePhraseTranslationOutModel,
): PhraseTranslationStatus {
	return {
		id: makePhraseId(),
		startOffset: phraseTranslation.phraseStartOffset,
		endOffset: phraseTranslation.phraseEndOffset,
		phrase: phraseTranslation.phrase ?? null,
		loading: false,
		error: null,
		translation: phraseTranslation.translate ?? null,
		examples: (phraseTranslation.examples ?? []).map((example) => ({
			text: example.text ?? '',
			translate: example.translate ?? '',
		})),
	}
}

async function getOrCreateSentenceTranslation(input: RunFetchForSentenceInput): Promise<string> {
	const existing = await input.getSentenceTranslation({
		variables: {
			input: {
				sentenceId: input.sentenceId,
			},
		},
		fetchPolicy: 'network-only',
	})

	const existingTranslation = existing.data?.translate_get_sentence_translation?.translation
	if (existingTranslation) {
		return existingTranslation
	}

	const generated = await input.translateSentence({
		variables: {
			input: {
				sentenceId: input.sentenceId,
				text: input.sentenceText,
				bookName: input.bookName ?? undefined,
				bookAuthor: input.bookAuthor ?? undefined,
				videoName: input.videoName ?? undefined,
				videoYear: toNullableString(input.videoYear) ?? undefined,
			},
		},
	})

	const generatedTranslation = generated.data?.translate_translate_sentence?.translation
	if (!generatedTranslation) {
		throw new Error('Не удалось получить перевод предложения')
	}

	return generatedTranslation
}

export function toNullableString(value: null | string | number): null | string {
	if (value === null || value === undefined) return null
	return String(value)
}
