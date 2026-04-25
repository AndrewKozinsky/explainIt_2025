import { produce } from 'immer'
import { create } from 'zustand'

export const detailsStoreValues: DetailsStoreValues = {
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	currentSentenceId: null,
	currentWordStartOffset: null,
	currentWordEndOffset: null,
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
		upsertSentenceEntry: (input: { sentenceId: number; text: string }) => {
			set(
				produce((state: DetailsStoreNext) => {
					const existing = state.sentences.find((entry) => entry.sentenceId === input.sentenceId)
					if (existing) {
						if (input.text && existing.data.sentence.text !== input.text) {
							existing.data.sentence.text = input.text
						}

						return
					}

					state.sentences.push({
						sentenceId: input.sentenceId,
						data: {
							sentence: {
								text: input.text,
								loading: false,
								error: null,
								translation: null,
							},
							phrases: [],
						},
					})
				}),
			)
		},
		patchSentenceTranslation: (input: {
			sentenceId: number
			patch: Partial<SentenceTranslationStatus>
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					Object.assign(entry.data.sentence, input.patch)
				}),
			)
		},
		upsertPhraseTranslation: (input: {
			sentenceId: number
			locator: { startOffset: number; endOffset: number }
			phrase: PhraseTranslationStatus
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phraseIdx = entry.data.phrases.findIndex(
						(item) =>
							item.startOffset === input.locator.startOffset &&
							item.endOffset === input.locator.endOffset,
					)

					if (phraseIdx >= 0) {
						entry.data.phrases[phraseIdx] = input.phrase
						return
					}

					entry.data.phrases.push(input.phrase)
				}),
			)
		},
		patchPhraseTranslation: (input: {
			sentenceId: number
			locator: { startOffset: number; endOffset: number }
			patch: Partial<PhraseTranslationStatus>
		}) => {
			set(
				produce((state: DetailsStoreNext) => {
					const entry = state.sentences.find((item) => item.sentenceId === input.sentenceId)
					if (!entry) return

					const phrase = entry.data.phrases.find(
						(item) =>
							item.startOffset === input.locator.startOffset &&
							item.endOffset === input.locator.endOffset,
					)
					if (!phrase) return

					Object.assign(phrase, input.patch)
				}),
			)
		},
	}
})

export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

export type DetailsTranscription = {
	phrase: string
	transcription: string
}

export type SentenceTranslationStatus = {
	text: string
	loading: boolean
	error: null | string
	translation: null | string
}

export type PhraseExample = {
	text: string
	translate: string
}

export type PhraseTranslationStatus = {
	startOffset: number
	endOffset: number
	phrase: null | string
	loading: boolean
	error: null | string
	translation: null | string
	examples: PhraseExample[]
}

export type DetailsSentenceEntry = {
	sentenceId: number
	data: {
		sentence: SentenceTranslationStatus
		phrases: PhraseTranslationStatus[]
	}
}

export type DetailsStoreValues = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	currentSentenceId: null | number
	currentWordStartOffset: null | number
	currentWordEndOffset: null | number
	sentences: DetailsSentenceEntry[]
	transcriptions: DetailsTranscription[]
}

export type DetailsStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DetailsStoreValues>) => void
	upsertSentenceEntry: (input: { sentenceId: number; text: string }) => void
	patchSentenceTranslation: (input: {
		sentenceId: number
		patch: Partial<SentenceTranslationStatus>
	}) => void
	upsertPhraseTranslation: (input: {
		sentenceId: number
		locator: { startOffset: number; endOffset: number }
		phrase: PhraseTranslationStatus
	}) => void
	patchPhraseTranslation: (input: {
		sentenceId: number
		locator: { startOffset: number; endOffset: number }
		patch: Partial<PhraseTranslationStatus>
	}) => void
}
