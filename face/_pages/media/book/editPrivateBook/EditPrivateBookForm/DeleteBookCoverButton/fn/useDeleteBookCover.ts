import { useContext, useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useBookPrivateControllerUpdateBook } from '@/shared/api/generated/book-private/book-private'
import {
	getBookPrivateControllerGetUserBooksQueryKey,
	getBookPrivateControllerGetBookQueryKey,
} from '@/shared/api/generated/book-private/book-private'
import type { UpdateBookDtoLanguageCode } from '@/shared/api/generated/models'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { useBookStore } from '_pages/media/book/bookStore'

export function useDeleteBookCover() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const { mutateAsync: updateBook } = useBookPrivateControllerUpdateBook()
	const queryClient = useQueryClient()

	const onDeleteClick = useCallback(async () => {
		const book = useBookStore.getState().privateBook.data
		if (!book) return

		setStatus('loading')

		const data: { fileName: null; languageCode?: UpdateBookDtoLanguageCode } = {
			fileName: null,
		}
		if (book.languageCode) {
			data.languageCode = book.languageCode as unknown as UpdateBookDtoLanguageCode
		}

		try {
			await updateBook({
				id: book.id,
				data,
			})

			queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetUserBooksQueryKey() })
			queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetBookQueryKey(book.id) })

			setStatus('idle')
		} catch {
			notify({
				type: 'error',
				message:
					'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
		}
	}, [updateBook, notify, queryClient])

	return {
		status,
		onDeleteClick,
	}
}
