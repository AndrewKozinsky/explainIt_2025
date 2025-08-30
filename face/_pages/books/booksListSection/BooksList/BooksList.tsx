import React from 'react'
import ErrorMessage from '../../../../ui/ErrorMessage/ErrorMessage'
import { booksLogic } from '../../booksLogic'
import { useBooksStore } from '../../booksStore'
import BookLink from '../BookLink/BookLink'

function BooksList() {
	const books = booksLogic.useGetBooks()
	const booksError = useBooksStore().booksFetchError

	if (booksError) return <ErrorMessage text={booksError} />
	if (!books) return null

	return books.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
