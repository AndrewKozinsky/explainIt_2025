import { useCallback, useState } from 'react'
import { Book_GetUserBooksDocument, useBookChapter_Create } from '@/graphql'
import { NotifyArg } from '@/ui/Notification/context'
import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'

export function useGetOnAddChapterClick(notify: (data: NotifyArg) => void) {
	const getBookRes = booksFetcher.useGetCurrentBook()

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createChapter] = useBookChapter_Create({ refetchQueries: [Book_GetUserBooksDocument] })

	const onAddChapterClick = useCallback(
		async function () {
			if (getBookRes.status !== 'success' || !getBookRes.data) {
				setStatus('loading')
				return
			}
			const book = getBookRes.data

			const { errors } = await createChapter({
				variables: { input: { bookId: book.id, header: null, name: null, content: null, note: null } },
			})

			setStatus('loading')

			if (errors) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			}

			setStatus('idle')
		},
		[getBookRes, createChapter, notify],
	)

	return {
		status,
		onAddChapterClick,
	}
}
