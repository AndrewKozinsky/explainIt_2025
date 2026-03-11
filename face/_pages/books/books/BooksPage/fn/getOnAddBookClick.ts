import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetUserBooksDocument, useBook_Create } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { createBookIdUrl, pageUrls } from 'сonsts/pageUrls'

export function useGetAddBookConfig() {
	const { notify } = useContext(NotificationContext)

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const [createBook] = useBook_Create({ refetchQueries: [Book_GetUserBooksDocument], awaitRefetchQueries: true })

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdBookId: string | number | null = null

			try {
				const { errors, data } = await createBook({
					variables: { input: { author: null, name: null, note: null } },
				})

				if (errors) {
					setErrorMessage('Не удалось создать книгу.')
					return
				}

				const bookId = data?.book_create.id
				if (!bookId) {
					setErrorMessage('Не удалось создать книгу.')
					return
				}

				createdBookId = bookId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось получить список книг.' })
			} finally {
				setLoading(false)
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
		loading,
		errorMessage,
		onClick,
	}
}
