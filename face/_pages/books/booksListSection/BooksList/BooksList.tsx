import React from 'react'
import { booksLogic } from '../../booksLogic'
import BookLink from '../BookLink/BookLink'

function BooksList() {
	const books = booksLogic.useGetBooks()
	if (!books) return null

	return books.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
