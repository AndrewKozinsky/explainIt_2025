import { create } from 'zustand'
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
	}
})

export type ReadingStore = BooksStoreValues & BooksStoreMethods

export type BooksStoreValues = {
	publicBooks: BooksStore.PublicBooksData
	privateBooks: BooksStore.PrivateBooksData
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
}

type BooksStoreMethods = {
	updatePublicBooks: (books: BooksStore.PublicBooksData) => void
	updatePrivateBooks: (books: BooksStore.PrivateBooksData) => void
}
