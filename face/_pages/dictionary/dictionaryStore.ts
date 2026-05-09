import { create } from 'zustand'
import { LanguageCode } from '@/utils/utils'

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

export type DictionaryFlashcardSentencePart = {
	type: 'text' | 'phrase'
	value: string
}

export type DictionaryFlashcardData = {
	id: number
	languageCode: string
	sentenceText: DictionaryFlashcardSentencePart[]
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
	currentLang: LanguageCode
	flashcards: DictionaryFlashcardData[]
	isFlashcardsLoading: boolean
	getFlashcardsErrorMessage: string
}

export type DictionaryStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DictionaryStoreValues>) => void
	setCurrentLang: (currentLang: LanguageCode) => void
	setFlashcards: (flashcards: DictionaryFlashcardData[]) => void
	setIsFlashcardsLoading: (isFlashcardsLoading: boolean) => void
	setGetFlashcardsErrorMessage: (getFlashcardsErrorMessage: string) => void
}
