import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@/i18n/routing'
import { useBookPrivateControllerDeleteBook } from '@/shared/api/generated/book-private/book-private'
import { getBookPrivateControllerGetUserBooksQueryKey } from '@/shared/api/generated/book-private/book-private'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls } from '@/utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const { mutateAsync: deleteBook } = useBookPrivateControllerDeleteBook()
	const queryClient = useQueryClient()

	const onDeleteBookClick = useCallback(
		async function () {
			const book = useBookStore.getState().privateBook.data
			if (!book) return

			setStatus('loading')

			try {
				await deleteBook({ id: book.id })

				queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetUserBooksQueryKey() })

				setStatus('idle')
				router.push(pageUrls.books.path)
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось удалить книгу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			}
		},
		[deleteBook, notify, router, queryClient],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
