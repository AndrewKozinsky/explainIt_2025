import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Delete } from '@/graphql'
import { useRouter } from '@/i18n/routing'
import { NotificationContext } from '@/ui/Notification/context'
import { pageUrls } from '@/utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
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

			router.push(pageUrls.books.path)
		},
		[deleteBook, notify, router],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
