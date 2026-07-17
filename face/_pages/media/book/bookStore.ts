import { create } from 'zustand'
import type { Book } from '@/entites/books/repository/BooksRepository'

export const bookStoreValues: BooksStoreValues = {
	book: {
		loading: true,
		errorMessage: null,
		data: null,
	},
}

export const useBookStore = create<ReadingStore>()((set) => {
	return {
		...bookStoreValues,
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
				return bookStoreValues
			})
		},
	}
})

export type ReadingStore = BooksStoreValues & BooksStoreMethods

export type BooksStoreValues = {
	book: BooksStore.BookData
}

export namespace BooksStore {
	export type BookData = {
		loading: boolean
		errorMessage: null | string
		data: null | Book
	}
}

type BooksStoreMethods = {
	updateBook: (book: BooksStore.BookData) => void
	clearStore: () => void
}
