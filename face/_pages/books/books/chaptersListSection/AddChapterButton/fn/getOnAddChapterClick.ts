import { useCallback, useState } from 'react'
import { Book_GetUserBooksDocument, useBookChapter_Create } from '@/graphql'
import { NotifyArg } from '@/ui/Notification/context'
import { useBooksStore } from '_pages/books/books/booksStore'

export function useGetOnAddChapterClick(notify: (data: NotifyArg) => void) {
	const book = useBooksStore((s) => s.book)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createChapter] = useBookChapter_Create({
		refetchQueries: [Book_GetUserBooksDocument],
		awaitRefetchQueries: true,
	})

	const onAddChapterClick = useCallback(
		async function () {
			if (!book) {
				return
			}

			setStatus('loading')

			const { errors } = await createChapter({
				variables: { input: { bookId: book.id, header: null, name: null, content: null, note: null } },
			})

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
