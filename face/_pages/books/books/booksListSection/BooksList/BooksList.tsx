import { booksFetcher } from '@/_pages/books/booksFetcher'
import React from 'react'
import BookLink from '../BookLink/BookLink'

function BooksList() {
	const books = booksFetcher.useGetBooks()
	if (!books) return null

	return books.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
