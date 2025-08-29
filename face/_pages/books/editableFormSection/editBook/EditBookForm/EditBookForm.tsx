import React from 'react'
import { booksLogic } from '../../../booksLogic'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'

export default function EditBookForm() {
	const book = booksLogic.useGetCurrentBook()
	const currentChapterId = booksLogic.useGetCurrentChapterId()

	if (!book || currentChapterId) return null

	return (
		<BookFormSurface leftBottomButtons={[<DeleteBookButton key='1' />]} rightBottomButtons={[]}>
			Book
		</BookFormSurface>
	)
}
