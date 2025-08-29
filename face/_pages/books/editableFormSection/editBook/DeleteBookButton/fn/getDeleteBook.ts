import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Delete } from '../../../../../../graphql'
import { NotificationContext } from '../../../../../../ui/Notification/context'
import { pageUrls } from '../../../../../../сonsts/pageUrls'
import { booksLogic } from '../../../../booksLogic'
import { redirect } from 'next/navigation'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const book = booksLogic.useGetCurrentBook()
	const [deleteBook] = useBook_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteBookClick = useCallback(
		async function () {
			if (!book) return
			const bookId = book.id

			setStatus('loading')

			const { errors } = await deleteBook({ variables: { input: { id: bookId } } })

			if (errors) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			}

			setStatus('idle')

			redirect(pageUrls.books.path)
		},
		[book],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
