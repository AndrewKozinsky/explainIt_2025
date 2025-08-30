import { create } from 'zustand'
import { BookOutModel } from '../../graphql'

export type BooksStoreValues = {
	books: null | BookOutModel[]
	booksFetchError: null | string
}

export const booksStoreValues: BooksStoreValues = {
	books: null,
	booksFetchError: null,
}

export type BooksStore = BooksStoreValues

export const useBooksStore = create<BooksStore>()((set) => {
	return {
		...booksStoreValues,
	}
})
