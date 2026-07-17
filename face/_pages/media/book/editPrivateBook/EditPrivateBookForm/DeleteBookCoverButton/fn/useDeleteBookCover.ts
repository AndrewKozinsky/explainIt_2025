import { useContext, useCallback, useMemo, useState } from 'react'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { useBookStore } from '_pages/media/book/bookStore'

export function useDeleteBookCover() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const api = useMemo(() => new BooksApi(), [])

	const onDeleteClick = useCallback(async () => {
		const book = useBookStore.getState().book.data
		if (!book) return

		setStatus('loading')

		try {
			const updatedBook = await api.updateBook(book.id, {
				coverFileName: null,
				languageCode: book.languageCode,
			})

			useBookStore.getState().updateBook({
				loading: false,
				errorMessage: null,
				data: updatedBook,
			})

			setStatus('idle')
		} catch {
			notify({
				type: 'error',
				message:
					'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
		}
	}, [api, notify])

	return {
		status,
		onDeleteClick,
	}
}
