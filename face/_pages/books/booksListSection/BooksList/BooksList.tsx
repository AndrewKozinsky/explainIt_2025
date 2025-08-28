import React from 'react'
import ErrorMessage from '../../../../ui/ErrorMessage/ErrorMessage'
import { useBooksStore } from '../../booksStore'
import BookLink from '../BookButton/BookLink'

function BooksList() {
	const books = useBooksStore().books
	const booksError = useBooksStore().booksError

	if (booksError) return <ErrorMessage text={booksError} />
	if (!books) return null

	return books.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
