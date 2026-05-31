import { useContext, useCallback, useState } from 'react'
import { NotificationContext } from 'ui/Notification/context'
import { useBook_Update, Book_GetUserBooksDocument, Book_GetDocument } from '@/graphql'
import { useBookStore } from '_pages/media/book/bookStore'

export function useDeleteBookCover() {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [updateBook] = useBook_Update()

	const onDeleteClick = useCallback(async () => {
		const book = useBookStore.getState().privateBook.data
		if (!book) return

		setStatus('loading')

		const input: { id: number; fileName: null; languageCode?: string | null } = {
			id: book.id,
			fileName: null,
		}
		if (book.languageCode) input.languageCode = book.languageCode

		const { errors } = await updateBook({
			variables: { input },
			refetchQueries: [
				Book_GetUserBooksDocument,
				{ query: Book_GetDocument, variables: { input: { id: book.id } } },
			],
		})

		if (errors) {
			notify({
				type: 'error',
				message:
					'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
			})
			return
		}

		setStatus('idle')
	}, [updateBook, notify])

	return {
		status,
		onDeleteClick,
	}
}
