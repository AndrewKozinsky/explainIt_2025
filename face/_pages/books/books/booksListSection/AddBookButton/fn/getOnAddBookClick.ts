import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Create } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { pageUrls } from 'сonsts/pageUrls'
import { redirect } from 'next/navigation'

export function useGetOnAddBookClick() {
	const { notify } = useContext(NotificationContext)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createBook] = useBook_Create({ refetchQueries: [Book_GetUserBooksDocument], awaitRefetchQueries: true })

	const onAddBookClick = useCallback(
		async function () {
			setStatus('loading')

			const { errors, data } = await createBook({
				variables: { input: { author: null, name: null, note: null } },
			})

			if (errors) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			}

			setStatus('idle')

			const bookId = data?.book_create.id
			if (!bookId) {
				notify({ type: 'error', message: 'Не удалось создать книгу.' })
				return
			}

			// Open a page with created book
			redirect(pageUrls.books.book(bookId).path)
		},
		[createBook, notify],
	)

	return {
		status,
		onAddBookClick,
	}
}
