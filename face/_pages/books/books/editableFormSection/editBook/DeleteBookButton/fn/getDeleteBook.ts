import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetUserBooksDocument, useBook_Delete } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { pageUrls } from '@/сonsts/pageUrls'

export function useGetDeleteBook(bookId: number) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteBook] = useBook_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteBookClick = useCallback(
		async function () {
			setStatus('loading')

			const { errors } = await deleteBook({ variables: { input: { id: bookId } } })

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
		[bookId, deleteBook, notify],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
