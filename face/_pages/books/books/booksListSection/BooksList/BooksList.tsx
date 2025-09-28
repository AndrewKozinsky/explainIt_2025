import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import Paragraph from 'ui/Paragraph/Paragraph'
import BookLink from '../BookLink/BookLink'
import { useBooksStore } from '_pages/books/books/booksStore'

function BooksList() {
	const books = useBooksStore((state) => state.books)

	if (books.loading) {
		return <LoadingMessage text='Загрузка...' />
	} else if (books.errorMessage) {
		return <ErrorMessage text={books.errorMessage} />
	} else if (!books.data.length) {
		return <Paragraph fontSize={16}>Не создано ни одной книги</Paragraph>
	}

	return books.data.map((book) => <BookLink bookData={book} key={book.id} />)
}

export default BooksList
