import { produce } from 'immer'
import { create } from 'zustand'

export const detailsStoreValues: DetailsStoreValues = {
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	currentSentenceId: null,
	currentSentenceText: null,
	currentWordId: null,
	sentences: [],
	transcriptions: [],
}

export const useDetailsStore = create<DetailsStoreNext>()((set, get) => {
	return {
		...detailsStoreValues,
		clearStoreData: () => {
			set(detailsStoreValues)
		},
		updateStore: (storePart: Partial<DetailsStoreValues>) => {
			set(storePart)
		},
		insertLoadingSentence: (input: { sentenceId: number; text: string }) => {
			set(
				produce((state: DetailsStoreNext) => {
					state.sentences.push({
						sentenceId: input.sentenceId,
						selectedPhraseId: null,
						data: {
							sentence: {
								text: input.text,
								loading: true,
								error: null,
								translation: null,
							},
							phrases: [],
						},
					})
				}),
			)
		},
		patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslationStatus> }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					Object.assign(entry.data.sentence, input.patch)
				}),
			)
		},
		upsertPhraseTranslation: (input: { sentenceId: number; phrase: PhraseTranslationStatus }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phraseIdx = entry.data.phrases.findIndex(
						(item) =>
							item.startOffset === input.phrase.startOffset &&
							item.endOffset === input.phrase.endOffset,
					)

					if (phraseIdx >= 0) {
						const existingId = entry.data.phrases[phraseIdx].id
						entry.data.phrases[phraseIdx] = { ...input.phrase, id: existingId }
						return
					}

					entry.data.phrases.push(input.phrase)
				}),
			)
		},
		patchPhraseTranslation: (input: {
			sentenceId: number
			phraseId: string
			patch: Partial<PhraseTranslationStatus>
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phrase = entry.data.phrases.find((item) => item.id === input.phraseId)
					if (!phrase) return

					Object.assign(phrase, input.patch)
				}),
			)
		},
		finalizePhraseTranslation: (input: {
			sentenceId: number
			placeholderPhraseId: string
			phrase: PhraseTranslationStatus
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const placeholderIdx = entry.data.phrases.findIndex(
						(item) => item.id === input.placeholderPhraseId,
					)
					const existingIdx = entry.data.phrases.findIndex(
						(item) =>
							item.id !== input.placeholderPhraseId &&
							item.startOffset === input.phrase.startOffset &&
							item.endOffset === input.phrase.endOffset,
					)

					if (existingIdx >= 0) {
						const existingId = entry.data.phrases[existingIdx].id
						entry.data.phrases[existingIdx] = { ...input.phrase, id: existingId }

						if (placeholderIdx >= 0) {
							entry.data.phrases.splice(placeholderIdx, 1)
						}
						if (entry.selectedPhraseId === input.placeholderPhraseId) {
							entry.selectedPhraseId = existingId
						}
						return
					}

					if (placeholderIdx >= 0) {
						entry.data.phrases[placeholderIdx] = {
							...input.phrase,
							id: input.placeholderPhraseId,
						}
						return
					}

					entry.data.phrases.push({ ...input.phrase, id: input.placeholderPhraseId })
				}),
			)
		},
		setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					entry.selectedPhraseId = input.phraseId
				}),
			)
		},
	}
})

export function makePhraseId(): string {
	return 'p_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36)
}

export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

export type DetailsTranscription = {
	phrase: string
	transcription: string
}

export type DetailsSentenceEntry = {
	sentenceId: number
	selectedPhraseId: string | null
	data: {
		sentence: SentenceTranslationStatus
		phrases: PhraseTranslationStatus[]
	}
}

export type SentenceTranslationStatus = {
	text: string
	loading: boolean
	error: null | string
	translation: null | string
}

export type PhraseTranslationStatus = {
	id: string
	startOffset: number
	endOffset: number
	phrase: null | string
	loading: boolean
	error: null | string
	translation: null | string
	examples: PhraseExample[]
}

export type PhraseExample = {
	text: string
	translate: string
}

export type DetailsStoreValues = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	currentSentenceId: null | number
	currentSentenceText: null | string
	currentWordId: null | number
	sentences: DetailsSentenceEntry[]
	transcriptions: DetailsTranscription[]
}

export type DetailsStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DetailsStoreValues>) => void
	insertLoadingSentence: (input: { sentenceId: number; text: string }) => void
	patchSentenceTranslation: (input: { sentenceId: number; patch: Partial<SentenceTranslationStatus> }) => void
	upsertPhraseTranslation: (input: { sentenceId: number; phrase: PhraseTranslationStatus }) => void
	patchPhraseTranslation: (input: {
		sentenceId: number
		phraseId: string
		patch: Partial<PhraseTranslationStatus>
	}) => void
	finalizePhraseTranslation: (input: {
		sentenceId: number
		placeholderPhraseId: string
		phrase: PhraseTranslationStatus
	}) => void
	setSelectedPhraseId: (input: { sentenceId: number; phraseId: string | null }) => void
}
