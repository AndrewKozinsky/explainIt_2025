import { create } from 'zustand'

export const dictionaryStoreValues: DictionaryStoreValues = {
	currentLang: 'en',
	flashcards: [],
	isFlashcardsLoading: false,
	getFlashcardsErrorMessage: '',
}

export const useDictionaryStore = create<DictionaryStore>()((set) => {
	return {
		...dictionaryStoreValues,
		clearStoreData: () => {
			set(dictionaryStoreValues)
		},
		updateStore: (storePart) => {
			set(storePart)
		},
		setCurrentLang: (currentLang) => {
			set({ currentLang })
		},
		setIsFlashcardsLoading: (isFlashcardsLoading) => {
			set({ isFlashcardsLoading })
		},
		setGetFlashcardsErrorMessage: (getFlashcardsErrorMessage) => {
			set({ getFlashcardsErrorMessage })
		},
		setFlashcards: (flashcards) => {
			set({ flashcards })
		},
	}
})

export type DictionaryStore = DictionaryStoreValues & DictionaryStoreMethods

export type DictionaryFlashcardExample = {
	text: string
	translate: string
}

export type DictionaryFlashcard = {
	id: number
	languageCode: string
	sentenceText: string
	sentenceTranslation: string
	phrase: string
	phraseStartOffset: number
	phraseEndOffset: number
	phraseTranslation: string
	phraseTranscription: string
	phraseAudioUrl: string
	examples: DictionaryFlashcardExample[]
}

export type DictionaryStoreValues = {
	currentLang: string
	flashcards: DictionaryFlashcard[]
	isFlashcardsLoading: boolean
	getFlashcardsErrorMessage: string
}

export type DictionaryStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DictionaryStoreValues>) => void
	setCurrentLang: (currentLang: string) => void
	setFlashcards: (flashcards: DictionaryFlashcard[]) => void
	setIsFlashcardsLoading: (isFlashcardsLoading: boolean) => void
	setGetFlashcardsErrorMessage: (getFlashcardsErrorMessage: string) => void
}
