import { create } from 'zustand'
import { BookChapterOutModel, BookOutModel } from '../../graphql'

export type BooksStoreValues = {
	books: null | BookOutModel[]
	booksFetchError: null | string
	chapter: null | BookChapterOutModel
	chapterFetchError: null | string
}

export const booksStoreValues: BooksStoreValues = {
	books: null,
	booksFetchError: null,
	chapter: null,
	chapterFetchError: null,
}

export type BooksStoreMethods = {
	setBooks: (books: BooksStoreValues['books']) => void
	setChapter: (chapter: BooksStoreValues['chapter']) => void
}

export type BooksStore = BooksStoreValues & BooksStoreMethods

export const useBooksStore = create<BooksStore>()((set) => {
	return {
		...booksStoreValues,
		setBooks: (books: BooksStoreValues['books']) => {
			set({ books })
		},
		setChapter: (chapter: BooksStoreValues['chapter']) => {
			set({ chapter })
		},
	}
})
