import { useContext, useEffect, useMemo } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import type { CreateBookInput, Book } from '@/entites/books/repository/BooksRepository'
import { useRouter } from '@/i18n/routing'
import { useUser } from '@/shared/api/auth/UserProvider'
import { useAsyncMutation } from '@/shared/hooks/useAsyncMutation'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

export function useAddBook() {
	const router = useRouter()
	const { notify } = useContext(NotificationContext)
	const user = useUser()
	const locale = useLocale()

	const api = useMemo(() => new BooksApi(), [])

	const { loading, error, mutate } = useAsyncMutation<CreateBookInput, Book>((input) => api.createBook(input))

	useEffect(
		function () {
			if (error) {
				notify({ type: 'error', message: error })
			}
		},
		[error, notify],
	)

	const handleClick = async function () {
		if (!user) {
			redirect(localizePath(locale, pageUrls.auth.login.path))
			return
		}

		const book = await mutate({
			name: null,
			author: null,
			note: null,
			languageCode: 'en',
		})

		if (book) {
			router.push(pageUrls.books.book(book.id).path)
		}
	}

	return { handleClick, loading, error }
}
