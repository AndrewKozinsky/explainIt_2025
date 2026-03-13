import { create } from 'zustand'
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
	}
})

export type ReadingStore = BooksStoreValues & BooksStoreMethods

export type BooksStoreValues = {
	publicBook: BooksStore.PublicBookData
	privateBook: BooksStore.PrivateBookData
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
}

type BooksStoreMethods = {
	updatePublicBook: (book: BooksStore.PublicBookData) => void
	updatePrivateBook: (book: BooksStore.PrivateBookData) => void
	clearStore: () => void
}
