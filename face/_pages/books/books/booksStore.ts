import { BookChapterOutModel } from '@/graphql'
import { BookPublicOutModel, BookOutModel } from '@/graphql'
import { create } from 'zustand'

export const booksStoreValues: BooksStoreValues = {
	pageUrlType: 'books',
	mobileCurrentContentType: 'books',
	publicBooks: {
		loading: true,
		errorMessage: null,
		data: null as any as BookPublicOutModel[],
	},
	privateBooks: {
		loading: true,
		errorMessage: null,
		data: null as any as BookOutModel[],
	},
	publicBook: null,
	privateBook: null,
	chapter: {
		loading: true,
		errorMessage: null,
		data: null as any as BookChapterOutModel,
	},
}

export const useBooksStore = create<ReadingStore>()((set) => {
	return {
		...booksStoreValues,
		updateMobileCurrentContentType: (contentType: BooksStore.MobileCurrentContentType) => {
			set((state) => {
				return {
					mobileCurrentContentType: contentType,
				}
			})
		},
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
	pageUrlType: BooksStore.PageUrlType
	mobileCurrentContentType: BooksStore.MobileCurrentContentType
	publicBooks: BooksStore.PublicBooksData
	privateBooks: BooksStore.PrivateBooksData
	publicBook: null | BookPublicOutModel
	privateBook: null | BookOutModel
	chapter: BooksStore.ChapterData
}

export namespace BooksStore {
	export type PageUrlType = 'books' | 'book' | 'chapter'
	// На телефоне показываются 3 кнопки: Книги, Главы и Детали.
	// В зависимости от нажатой кнопки показывается одна из трёх колонок
	export type MobileCurrentContentType = 'books' | 'book' | 'chapter'

	export type PublicBooksData = {
		loading: boolean
		errorMessage: null | string
		data: BookPublicOutModel[]
	}

	export type PrivateBooksData = {
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
	updateMobileCurrentContentType: (contentType: BooksStore.MobileCurrentContentType) => void
	updatePublicBooks: (books: BooksStore.PublicBooksData) => void
	updatePrivateBooks: (books: BooksStore.PrivateBooksData) => void
	updateChapter: (books: BooksStore.ChapterData) => void
}
