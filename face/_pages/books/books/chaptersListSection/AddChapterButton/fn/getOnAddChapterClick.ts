import { useCallback, useState } from 'react'
import { Book_GetUserBooksDocument, useBookChapter_Create } from '@/graphql'
import { NotifyArg } from '@/ui/Notification/context'
import { booksLogic } from '../../../booksLogic'

export function useGetOnAddChapterClick(notify: (data: NotifyArg) => void) {
	const book = booksLogic.useGetCurrentBook()

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createChapter] = useBookChapter_Create({ refetchQueries: [Book_GetUserBooksDocument] })

	const onAddChapterClick = useCallback(
		async function () {
			if (!book) return
			setStatus('loading')

			const { errors } = await createChapter({
				variables: { input: { bookId: book.id, header: null, name: null, content: null, note: null } },
			})

			setStatus('loading')

			if (errors) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			}

			setStatus('idle')
		},
		[book, createChapter, notify],
	)

	return {
		status,
		onAddChapterClick,
	}
}
