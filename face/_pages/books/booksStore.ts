import { create } from 'zustand'
import { BookOutModel } from '../../graphql'

export type BooksStoreValues = {
	books: null | BookOutModel[]
	booksError: null | string
}

export const booksStoreValues: BooksStoreValues = {
	books: null,
	booksError: null,
}

export type BooksStoreMethods = {
	setBooks: (books: BooksStoreValues['books']) => void
}

export type BooksStore = BooksStoreValues & BooksStoreMethods

export const useBooksStore = create<BooksStore>()((set) => {
	return {
		...booksStoreValues,
		setBooks: (books: BooksStoreValues['books']) => {
			set({ books })
		},
	}
})
