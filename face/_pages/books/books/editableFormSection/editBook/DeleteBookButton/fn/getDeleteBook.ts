import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetUserBooksDocument, useBook_Delete } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { pageUrls } from '@/сonsts/pageUrls'
import { useBooksStore } from '_pages/books/books/booksStore'

export function useGetDeleteBook() {
	const book = useBooksStore((s) => s.book)
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteBook] = useBook_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteBookClick = useCallback(
		async function () {
			if (!book) return
			setStatus('loading')

			const { errors } = await deleteBook({ variables: { input: { id: book.id } } })

			if (errors) {
				notify({
					type: 'error',
					message:
						'Не удалось удалить книгу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				return
			}

			setStatus('idle')

			redirect(pageUrls.books.path)
		},
		[book, deleteBook, notify],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
