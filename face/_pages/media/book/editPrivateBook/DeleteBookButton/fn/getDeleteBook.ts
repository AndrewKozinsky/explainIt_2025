import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Delete } from '@/graphql'
import { serverRedirect } from '@/i18n/serverRedirect'
import { NotificationContext } from '@/ui/Notification/context'
import { pageUrls } from '@/utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteBook] = useBook_Delete({ refetchQueries: [Book_GetUserBooksDocument], awaitRefetchQueries: true })

	const onDeleteBookClick = useCallback(
		async function () {
			const book = useBookStore.getState().privateBook.data
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

			await serverRedirect(pageUrls.books.path)
		},
		[deleteBook, notify],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
