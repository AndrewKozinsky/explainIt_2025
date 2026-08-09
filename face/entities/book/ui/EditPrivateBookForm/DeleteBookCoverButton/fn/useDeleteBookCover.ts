import { useContext, useCallback, useMemo, useState } from 'react'
import { BooksService } from '@/entities/book/BooksService'
import { BooksApi } from '@/entities/book/repository/BooksApi'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useDeleteBookCover(bookId: number) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const booksService = useMemo(() => new BooksService(new BooksApi()), [])

	const onDeleteClick = useCallback(async () => {
		setStatus('loading')

		const result = await booksService.updateBook(bookId, {
			coverFileName: null,
		})

		if (result.error || result.errors) {
			notify({
				type: 'error',
				message:
					'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
			setStatus('idle')
			return
		}

		setStatus('idle')
	}, [bookId, booksService, notify])

	return {
		status,
		onDeleteClick,
	}
}
