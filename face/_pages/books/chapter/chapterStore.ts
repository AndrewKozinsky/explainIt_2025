import { create } from 'zustand'
import { BookChapterOutModel, BookOutModel } from '@/graphql'

export const chapterStoreValues: BooksStoreValues = {
	privateBook: {
		loading: true,
		errorMessage: null,
		data: null as any as BookOutModel,
	},
	chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},
}

export const useChapterStore = create<ReadingStore>()((set) => {
	return {
		...chapterStoreValues,
		updatePrivateBook: (book: BooksStore.PrivateBookData) => {
			set((state) => {
				return {
					privateBook: {
						...book,
					},
				}
			})
		},
		clearStore: () => {
			set((state) => {
				return chapterStoreValues
			})
		},
		updateChapter: (chapter: BooksStore.ChapterData) => {
			set((state) => {
				return {
					chapter: {
						...chapter,
					},
				}
			})
		},
	}
})

export type ReadingStore = BooksStoreValues & BooksStoreMethods

export type BooksStoreValues = {
	privateBook: BooksStore.PrivateBookData
	chapter: BooksStore.ChapterData
}

export namespace BooksStore {
	export type PrivateBookData = {
		loading: boolean
		errorMessage: null | string
		data: BookOutModel
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}
}

type BooksStoreMethods = {
	updatePrivateBook: (book: BooksStore.PrivateBookData) => void
	clearStore: () => void
	updateChapter: (books: BooksStore.ChapterData) => void
}
