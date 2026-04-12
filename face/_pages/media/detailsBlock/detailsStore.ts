import { create } from 'zustand'

export const detailsStoreValues: DetailsStoreValues = {
	bookName: null,
	bookAuthor: null,
	videoName: null,
	videoYear: null,
	sentenceId: null,
	wordIds: [],
	sentenceText: null,
	isLoading: false,
	error: null,
	sentenceTranslation: null,
	wordAnalysis: null,
	wordAnalyses: [],
	selectWord: () => {},
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
		upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => {
			set({
				sentenceTranslation: sentenceTranslation?.translation ?? null,
				wordAnalysis: sentenceTranslation?.wordAnalysis ?? null,
				wordAnalyses: sentenceTranslation?.wordAnalyses ?? [],
			})
		},
	}
})

export type DetailsStoreNext = DetailsStoreValues & DetailsStoreMethods

export type SentenceTranslationLite = {
	translation: string
	wordAnalysis?: null | string
	wordAnalyses?: string[]
}

export type DetailsStoreValues = {
	bookName: null | string
	bookAuthor: null | string
	videoName: null | string
	videoYear: null | string | number
	// Идентификатор выбранного предложения
	sentenceId: null | number
	// Идентификаторы выбранных слов
	wordIds: number[]
	// Текст выбранного предложения
	sentenceText: null | string
	// Идёт ли загрузка анализа предложения
	isLoading: boolean
	// Ошибка при загрузке анализа предложения
	error: null | string
	// Полученные варианты анализа предложения
	sentenceTranslation: string | null
	wordAnalysis: string | null
	wordAnalyses: string[]
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}

export type DetailsStoreMethods = {
	clearStoreData: () => void
	updateStore: (store: Partial<DetailsStoreValues>) => void
	upsertSentenceTranslation: (sentenceTranslation: SentenceTranslationLite) => void
}
