import { useCallback, useContext, useMemo, useState } from 'react'
import { booksService, BooksService } from '@/entities/book/BooksService'
import { BooksApi } from '@/entities/book/repository/BooksApi'
import { useRouter } from '@/i18n/routing'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls } from '@/shared/utils/pageUrls'

export function useGetDeleteBook(bookId: number) {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const onDeleteBookClick = useCallback(
		async function () {
			setStatus('loading')

			const result = await booksService.deleteBook(Number(bookId))

			if (result.error) {
				notify({
					type: 'error',
					message: result.error,
				})
				setStatus('idle')
				return
			}

			setStatus('idle')
			router.push(pageUrls.books.path)
		},
		[booksService, notify, router],
	)

	return {
		status,
		onDeleteBookClick,
	}
}
