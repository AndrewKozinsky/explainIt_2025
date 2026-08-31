import { produce } from 'immer'
import { create } from 'zustand'
import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { LanguageCode } from '@/shared/utils/languages'
import type { DetailsSentenceEntry, SentencePhraseType, SentenceTranslation } from './translationTypes'

export type BaseMediaStore = {
	selectedSentenceId: null | number
	selectedWordId: null | number
	languageCode: null | LanguageCode
	sentences: DetailsSentenceEntry[]
	retryFetchSentenceTranslationQueue: { sentenceId: number; sentenceText: string }[]
	retryFetchPhraseQueue: {
		sentenceId: number
		randomGeneratedPhraseId: string
		wordIds: number[]
		sentenceText: string
	}[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
	setTranslationContext: (input: { languageCode: null | LanguageCode; sentences: SentenceModel[] }) => void
	// clearMediaData: () => void
	// insertLoadingSentence: (input: { sentenceId: number; text: string }) => void
	patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslation> }) => void
	upsertPhraseTranslation: (input: { sentenceId: number; phrase: SentencePhraseType }) => void
	patchPhraseTranslation: (input: {
		sentenceId: number
		phraseId: string
		patch: Partial<SentencePhraseType>
	}) => void
	finalizePhraseTranslation: (input: {
		sentenceId: number
		placeholderPhraseId: string
		phrase: SentencePhraseType
	}) => void
	setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => void
	setPhraseFlashcardId: (input: { sentencePhraseId: number; flashcardId: null | number }) => void
	retrySentenceTranslation: (sentenceId: number) => void
	retryPhraseTranslation: (sentenceId: number, randomGeneratedPhraseId: string) => void
}

export function createBaseMediaStore() {
	return create<BaseMediaStore>((set) => ({
		selectedSentenceId: null,
		selectedWordId: null,
		languageCode: null,
		sentences: [],
		retryFetchSentenceTranslationQueue: [],
		retryFetchPhraseQueue: [],
		selectWord: ({ sentenceId, wordId }) => set({ selectedSentenceId: sentenceId, selectedWordId: wordId }),
		setTranslationContext: ({ languageCode, sentences }) =>
			set({
				languageCode,
				sentences: sentences.map((sentence) => ({
					sentenceId: sentence.id,
					sentenceText: sentence.sentence,
					selectedPhraseId: null,
					data: {
						translation: {
							text: sentence.sentenceTranslation?.translation ?? '',
							loading: false,
							error: null,
							translation: sentence.sentenceTranslation?.translation ?? null,
							visible: true,
						},
						phrases: [],
					},
				})),
			}),
		/*clearMediaData: () =>
			set({
				selectedSentenceId: null,
				selectedWordId: null,
				languageCode: null,
				sentences: [],
				retryFetchSentenceTranslationQueue: [],
				retryFetchPhraseQueue: [],
			}),*/
		/*insertLoadingSentence: ({ sentenceId, text }) =>
			set(
				produce((state: BaseMediaStore) => {
					if (state.sentences.some((entry) => entry.sentenceId === sentenceId)) return
					state.sentences.push({
						sentenceId,
						sentenceText: text,
						selectedPhraseId: null,
						data: {
							translation: { text: '', loading: true, error: null, translation: null, visible: true },
							phrases: [],
						},
					})
				}),
			),*/
		patchSentenceTranslation: ({ sentenceId, patch }) =>
			set(
				produce((state: BaseMediaStore) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					if (entry) {
						Object.assign(entry.data.translation, patch)
					}
				}),
			),
		upsertPhraseTranslation: ({ sentenceId, phrase }) =>
			set(
				produce((state: BaseMediaStore) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					if (!entry) return

					const index = entry.data.phrases.findIndex((item) => sameWordIds(item.wordIds, phrase.wordIds))
					if (index >= 0) {
						entry.data.phrases[index] = {
							...phrase,
							randomGeneratedPhraseId: entry.data.phrases[index].randomGeneratedPhraseId,
						}
					} else {
						entry.data.phrases.push(phrase)
					}
				}),
			),
		patchPhraseTranslation: ({ sentenceId, phraseId, patch }) =>
			set(
				produce((state: BaseMediaStore) => {
					const phrase = state.sentences
						.find((item) => item.sentenceId === sentenceId)
						?.data.phrases.find((item) => item.randomGeneratedPhraseId === phraseId)

					if (phrase) Object.assign(phrase, patch)
				}),
			),
		finalizePhraseTranslation: ({ sentenceId, placeholderPhraseId, phrase }) =>
			set(
				produce((state: BaseMediaStore) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					if (!entry) return

					const index = entry.data.phrases.findIndex(
						(item) => item.randomGeneratedPhraseId === placeholderPhraseId,
					)

					if (index >= 0)
						entry.data.phrases[index] = { ...phrase, randomGeneratedPhraseId: placeholderPhraseId }
					else entry.data.phrases.push({ ...phrase, randomGeneratedPhraseId: placeholderPhraseId })
				}),
			),
		setSelectedPhraseId: ({ sentenceId, phraseId }) =>
			set(
				produce((state: BaseMediaStore) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					if (entry) entry.selectedPhraseId = phraseId
				}),
			),
		setPhraseFlashcardId: ({ sentencePhraseId, flashcardId }) =>
			set(
				produce((state: BaseMediaStore) => {
					for (const entry of state.sentences) {
						const phrase = entry.data.phrases.find((item) => item.sentencePhraseId === sentencePhraseId)
						if (phrase) phrase.flashcardId = flashcardId
					}
				}),
			),
		retrySentenceTranslation: (sentenceId) =>
			set(
				produce((state: BaseMediaStore) => {
					const index = state.sentences.findIndex((item) => item.sentenceId === sentenceId)
					if (index < 0) return
					const entry = state.sentences[index]
					state.sentences.splice(index, 1)
					state.retryFetchSentenceTranslationQueue.push({
						sentenceId: entry.sentenceId,
						sentenceText: entry.sentenceText,
					})
				}),
			),
		retryPhraseTranslation: (sentenceId, randomGeneratedPhraseId) =>
			set(
				produce((state: BaseMediaStore) => {
					const entry = state.sentences.find((item) => item.sentenceId === sentenceId)
					const phrase = entry?.data.phrases.find(
						(item) => item.randomGeneratedPhraseId === randomGeneratedPhraseId,
					)
					if (!entry || !phrase) return
					phrase.loading = true
					phrase.error = null
					phrase.translation = null
					state.retryFetchPhraseQueue.push({
						sentenceId,
						randomGeneratedPhraseId,
						wordIds: phrase.wordIds,
						sentenceText: entry.sentenceText,
					})
				}),
			),
	}))
}

function sameWordIds(a: number[], b: number[]): boolean {
	return a.length === b.length && a.every((value, index) => value === b[index])
}
