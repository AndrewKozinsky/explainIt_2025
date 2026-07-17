import { useCallback, useContext, useMemo, useState } from 'react'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { useRouter } from '@/i18n/routing'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls } from '@/shared/utils/pageUrls'
import { useBookStore } from '_pages/media/book/bookStore'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const api = useMemo(() => new BooksApi(), [])

	const onDeleteBookClick = useCallback(
		async function () {
			const book = useBookStore.getState().book.data
			if (!book) return

			setStatus('loading')

			try {
				await api.deleteBook(book.id)

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
		[api, notify, router],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
