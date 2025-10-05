import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { BookChapterOutModel, BookOutModel } from 'graphql'
import { create } from 'zustand'

export const readingStoreValues: ReadingStoreValues = {
	book: {
		loading: true,
		errorMessage: null,
		data: null,
	},
	chapter: {
		loading: true,
		errorMessage: null,
		data: null,
	},
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selectedSentence: {
		context: '',
		sentenceId: null,
		sentence: null as any as ChapterTextStructurePopulated.SentencePart[],
		sentenceTranslation: null,
		selectedWordIds: [],
		fetchTranslation: {
			isLoading: false,
			error: null,
		},
		translatedPhrases: [],
	},
}

export const useReadingStore = create<ReadingStore>()((set) => {
	return {
		...readingStoreValues,
		updateBook: (book: ReadingStore.BookData) => {
			set((state) => {
				return {
					book,
				}
			})
		},
		updateChapter: (chapter: ReadingStore.ChapterData) => {
			set((state) => {
				return {
					chapter,
				}
			})
		},
		updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => {
			set((state) => {
				return {
					populatedChapter,
				}
			})
		},
		updateSentence(sentence: Partial<Sentence>) {
			set((state) => {
				return {
					selectedSentence: {
						...state.selectedSentence,
						...sentence,
					},
				}
			})
		},
		selectSingleWord: (wordId: number) =>
			set((state) => {
				const sentence = state.selectedSentence
				if (!sentence) return state

				return {
					selectedSentence: {
						...sentence,
						selectedWordIds: [wordId],
					},
				}
			}),
		addWordToSelection: (wordId: number) =>
			set((state) => {
				const sentence = state.selectedSentence
				if (!sentence) return state

				const isWordAlreadySelected = sentence.selectedWordIds.includes(wordId)
				if (isWordAlreadySelected) return state

				return {
					selectedSentence: {
						...sentence,
						selectedWordIds: [...sentence.selectedWordIds, wordId],
					},
				}
			}),
		/*addPhraseAnalysisIntoSentence(input: {sentenceId: number}) {
			set((state) => {
				const sentence = state.selectedSentence
				if (!sentence) return state

				const isWordAlreadySelected = sentence.selectedWordIds.includes(wordId)
				if (isWordAlreadySelected) return state

				return {
					selectedSentence: {
						...sentence,
						selectedWordIds: [...sentence.selectedWordIds, wordId],
					},
				}
			}),
		}*/
	}
})

export namespace ReadingStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookOutModel
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}
}

export type ReadingStore = ReadingStoreValues & ReadingStoreMethods

export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения
	selectedSentence: Sentence
	// Возможно сюда же следует записать сам текст предложения...
	// И ещё настройки отображения главы...
}

export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	updateSentence: (sentence: Partial<Sentence>) => void
	// Заменяет выбор одним словом
	selectSingleWord: (wordId: number) => void
	// Добавляет слово к выбору, если его ещё нет
	addWordToSelection: (wordId: number) => void
}

export type Sentence = {
	// Текст из нескольких предложений до выделенного и несколько после чтобы ИИ понимал контекст
	context: string
	// Идентификатор выделенного предложения
	sentenceId: null | number
	// Выделенное предложение
	sentence: ChapterTextStructurePopulated.SentencePart[]
	// Перевод выделенного предложения
	sentenceTranslation: null | string
	// Выделенные слова, которые хотят перевести и разобрать
	selectedWordIds: number[]
	// Данные о загрузке анализа фразы
	fetchTranslation: {
		isLoading: boolean
		error: null | string
	}
	// Уже переведённые и разобранные фразы
	translatedPhrases: Phrase[]
}

type Phrase = {
	id: number
	wordIds: number[]
}
