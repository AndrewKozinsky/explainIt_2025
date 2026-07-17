// import { create } from 'zustand'
// import type { BookChapterOutModel, BookOutModel } from '@/shared/api/generated/models'

/*export const chapterStoreValues: BooksStoreValues = {
	book: {
		loading: true,
		errorMessage: null,
		data: null as any as BookOutModel,
	},
	chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},
}*/

/*export const useChapterStore = create<ReadingStore>()((set) => {
	return {
		...chapterStoreValues,
		updateBook: (book: BooksStore.BookData) => {
			set((state) => {
				return {
					book: {
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
})*/

// export type ReadingStore = BooksStoreValues & BooksStoreMethods

/*export type BooksStoreValues = {
	book: BooksStore.BookData
	chapter: BooksStore.ChapterData
}*/

/*export namespace BooksStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: BookOutModel
	}
	export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}
}*/

/*type BooksStoreMethods = {
	updateBook: (book: BooksStore.BookData) => void
	clearStore: () => void
	updateChapter: (books: BooksStore.ChapterData) => void
}*/
