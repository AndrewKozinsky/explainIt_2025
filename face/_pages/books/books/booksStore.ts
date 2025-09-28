import { BookChapterOutModel, BookOutModel } from 'graphql'
import { create } from 'zustand'

export const booksStoreValues: BooksStoreValues = {
	pageType: 'books',
	books: {
		loading: true,
		errorMessage: null,
		data: null as any as BookOutModel[],
	},
	book: null,
	chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},
}

export const useBooksStore = create<ReadingStore>()((set) => {
	return {
		...booksStoreValues,
		updateBooks: (books: BooksStore.BooksData) => {
			set((state) => {
				return {
					books: {
						...books,
					},
				}
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
	pageType: BooksStore.PageType
	books: BooksStore.BooksData
	book: null | BookOutModel
	chapter: BooksStore.ChapterData
}

export namespace BooksStore {
	export type PageType = 'books' | 'book' | 'chapter'

	export type BooksData = {
		loading: boolean
		errorMessage: null | string
		data: BookOutModel[]
	}

	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}
}

type BooksStoreMethods = {
	updateBooks: (books: BooksStore.BooksData) => void
	updateChapter: (books: BooksStore.ChapterData) => void
}
