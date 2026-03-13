import { create } from 'zustand'
// import { BookChapterOutModel } from '@/graphql'
import { BookPublicOutModel, BookPrivateOutModel } from '@/graphql'

export const bookStoreValues: BooksStoreValues = {
	publicBook: {
		loading: true,
		errorMessage: null,
		data: null as any as BookPublicOutModel,
	},
	privateBook: {
		loading: true,
		errorMessage: null,
		data: null as any as BookPrivateOutModel,
	},
	// publicBook: null,
	// privateBook: null,
	/*chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},*/
}

export const useBookStore = create<ReadingStore>()((set) => {
	return {
		...bookStoreValues,
		updatePublicBook: (book: BooksStore.PublicBookData) => {
			set((state) => {
				return {
					publicBook: {
						...book,
					},
				}
			})
		},
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
				return bookStoreValues
			})
		},
		/*updatePrivateBooks: (books: BooksStore.PrivateBooksData) => {
			set((state) => {
				return {
					privateBooks: {
						...books,
					},
				}
			})
		},*/
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
	publicBook: BooksStore.PublicBookData
	privateBook: BooksStore.PrivateBookData
	// privateBooks: BooksStore.PrivateBooksData
	// publicBook: null | BookPublicOutModel
	// privateBook: null | BookPrivateOutModel
	// chapter: BooksStore.ChapterData
}

export namespace BooksStore {
	export type PrivateBookData = {
		loading: boolean
		errorMessage: null | string
		data: BookPrivateOutModel
	}
	export type PublicBookData = {
		loading: boolean
		errorMessage: null | string
		data: BookPublicOutModel
	}
	/*export type ChapterData = {
		loading: boolean
		errorMessage: null | string
		data: null | BookChapterOutModel
	}*/
}

type BooksStoreMethods = {
	updatePublicBook: (book: BooksStore.PublicBookData) => void
	updatePrivateBook: (book: BooksStore.PrivateBookData) => void
	clearStore: () => void
	// updatePrivateBooks: (books: BooksStore.PrivateBooksData) => void
	// updateChapter: (books: BooksStore.ChapterData) => void
}
