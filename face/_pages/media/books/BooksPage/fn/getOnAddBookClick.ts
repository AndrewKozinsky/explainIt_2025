import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { createMediaIdUrl, pageUrls } from 'utils/pageUrls'
import { useRouter } from '@/i18n/routing'
import {
	useBookPrivateControllerCreateBookPrivate,
	getBookPrivateControllerGetUserBooksQueryKey,
} from '@/shared/api/generated/book-private/book-private'
import type { CreatePrivateBookDtoLanguageCode } from '@/shared/api/generated/models'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { languages } from '@/utils/languages'

export function useGetAddBookConfig() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const queryClient = useQueryClient()

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const createBook = useBookPrivateControllerCreateBookPrivate()

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdBookId: string | number | null = null

			try {
				const response = await createBook.mutateAsync({
					data: {
						author: null,
						name: null,
						note: null,
						languageCode: languages.en.code as CreatePrivateBookDtoLanguageCode,
					},
				})

				const bookId = (response as unknown as { id: number }).id
				if (!bookId) {
					setErrorMessage('Не удалось создать книгу.')
					return
				}

				createdBookId = bookId

				// Invalidate the user books query so the list refreshes when the user comes back
				queryClient.invalidateQueries({
					queryKey: getBookPrivateControllerGetUserBooksQueryKey(),
				})
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось создать книгу.' })
			} finally {
				setLoading(false)
			}

			if (createdBookId) {
				// Open a page with the created book
				const bookIdInUrl = createMediaIdUrl(createdBookId, 'private')
				router.push(pageUrls.books.book(bookIdInUrl).path)
			}
		},
		[createBook, notify, router, queryClient],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
