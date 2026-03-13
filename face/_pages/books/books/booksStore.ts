import { create } from 'zustand'
// import { BookChapterOutModel } from '@/graphql'
import { BookPublicOutModel, BookPrivateOutModel } from '@/graphql'

export const booksStoreValues: BooksStoreValues = {
	publicBooks: {
		loading: true,
		errorMessage: null,
		data: null as any as BookPublicOutModel[],
	},
	privateBooks: {
		loading: true,
		errorMessage: null,
		data: null as any as BookPrivateOutModel[],
	},
	// publicBook: null,
	// privateBook: null,
	/*chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},*/
}

export const useBooksStore = create<ReadingStore>()((set) => {
	return {
		...booksStoreValues,
		updatePublicBooks: (publicBooks: BooksStore.PublicBooksData) => {
			set((state) => {
				return {
					publicBooks: {
						...publicBooks,
					},
				}
			})
		},
		updatePrivateBooks: (books: BooksStore.PrivateBooksData) => {
			set((state) => {
				return {
					privateBooks: {
						...books,
					},
				}
			})
		},
		/*updateChapter: (chapter: BooksStore.ChapterData) => {
			set((state) => {
				return {
					chapter: {
						...chapter,
					},
				}
			})
		},*/
	}
})

export type ReadingStore = BooksStoreValues & BooksStoreMethods

export type BooksStoreValues = {
	publicBooks: BooksStore.PublicBooksData
	privateBooks: BooksStore.PrivateBooksData
	// publicBook: null | BookPublicOutModel
	// privateBook: null | BookPrivateOutModel
	// chapter: BooksStore.ChapterData
}

export namespace BooksStore {
	export type PublicBooksData = {
		loading: boolean
		errorMessage: null | string
		data: BookPublicOutModel[]
	}

	export type PrivateBooksData = {
		loading: boolean
		errorMessage: null | string
		data: BookPrivateOutModel[]
	}

	/*export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}*/
}

type BooksStoreMethods = {
	updatePublicBooks: (books: BooksStore.PublicBooksData) => void
	updatePrivateBooks: (books: BooksStore.PrivateBooksData) => void
	// updateChapter: (books: BooksStore.ChapterData) => void
}
