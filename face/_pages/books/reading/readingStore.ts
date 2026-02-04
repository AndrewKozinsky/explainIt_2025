import { produce } from 'immer'
import { useSystemStore } from 'stores/systemStore'
import { create } from 'zustand'
import { BookChapterOutModel, BookOutModel, BookPublicOutModel } from '@/graphql'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export const readingStoreValues: ReadingStoreValues = {
	book: null as any as ReadingStore.BookData,
	chapter: null as any as ReadingStore.ChapterData,
	populatedChapter: null as any as ChapterTextStructurePopulated.Chapter,
	selection: {
		sentenceId: null,
		wordIds: [],
	},
}

export const useReadingStore = create<ReadingStoreNext>()((set, get) => {
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
		selectWord(input: { sentenceId: number; wordId: number }) {
			set((state) => {
				return {
					selection: {
						sentenceId: input.sentenceId,
						wordIds: [input.wordId],
					},
				}
			})
		},
	}
})

export namespace ReadingStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: BookOutModel | BookPublicOutModel
		type: 'public' | 'private'
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: BookChapterOutModel
	}
}

export type ReadingStoreNext = ReadingStoreValues & ReadingStoreMethods

export type ReadingStoreValues = {
	book: ReadingStore.BookData
	chapter: ReadingStore.ChapterData
	populatedChapter: ChapterTextStructurePopulated.Chapter
	// Данные выделенного предложения и слов
	selection: SelectedSentence
}

export type SelectedSentence = {
	sentenceId: null | number
	// Идентификаторы выделенных слов
	wordIds: number[]
}

export type ReadingStoreMethods = {
	updateBook: (book: ReadingStore.BookData) => void
	updateChapter: (chapter: ReadingStore.ChapterData) => void
	updatePopulatedChapter: (populatedChapter: ChapterTextStructurePopulated.Chapter) => void
	selectWord: (input: { sentenceId: number; wordId: number }) => void
}
