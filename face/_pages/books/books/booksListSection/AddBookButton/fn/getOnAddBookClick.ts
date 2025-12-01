import { useCallback, useContext, useState } from 'react'
import { Book_GetUserBooksDocument, useBook_Create } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'
import { redirect } from 'next/navigation'

export function useGetOnAddBookClick() {
	const { notify } = useContext(NotificationContext)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createBook] = useBook_Create({ refetchQueries: [Book_GetUserBooksDocument], awaitRefetchQueries: true })

	const onAddBookClick = useCallback(
		async function () {
			setStatus('loading')

			let createdBookId: string | number | null = null

			try {
				const { errors, data } = await createBook({
					variables: { input: { author: null, name: null, note: null } },
				})

				if (errors) {
					throw new Error('Не удалось создать книгу.')
				}

				const bookId = data?.book_create.id
				if (!bookId) {
					throw new Error('Не удалось создать книгу.')
				}

				createdBookId = bookId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			} finally {
				setStatus('idle')
			}

			if (createdBookId) {
				// Open a page with created book
				const bookIdInUrl = createBookIdUrl(createdBookId, 'private')
				redirect(pageUrls.books.book(bookIdInUrl).path)
			}
		},
		[createBook, notify],
	)

	return {
		status,
		onAddBookClick,
	}
}
