import { useCallback, useContext, useMemo, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { pageUrls } from '@/shared/utils/pageUrls'

export function useGetOnAddChapterClick({ bookId, bookIdInUrl }: { bookId: number; bookIdInUrl: string }) {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const api = useMemo(() => new BooksApi(), [])

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdChapterId: number | null = null

			try {
				const chapter = await api.createChapter({ bookId, bookType: 'private' })

				if (!chapter.id) {
					setErrorMessage('Не удалось создать главу.')
					return
				}

				createdChapterId = chapter.id
			} catch {
				notify({ type: 'error', message: 'Не удалось создать главу.' })
			} finally {
				setLoading(false)
			}

			if (createdChapterId) {
				router.push(pageUrls.books.book(bookIdInUrl).chapter(createdChapterId).path)
			}
		},
		[api, notify, router, bookId, bookIdInUrl],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
