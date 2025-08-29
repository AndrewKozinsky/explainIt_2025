import React from 'react'
import { booksLogic } from '../../../booksLogic'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import DeleteBookButtonAndModal from '../DeleteBookButtonAndModal/DeleteBookButtonAndModal'

export default function EditBookForm() {
	const book = booksLogic.useGetCurrentBook()
	const currentChapterId = booksLogic.useGetCurrentChapterId()

	if (!book || currentChapterId) return null

	return (
		<BookFormSurface leftBottomButtons={[<DeleteBookButtonAndModal key='1' />]} rightBottomButtons={[]}>
			Book
		</BookFormSurface>
	)
}
