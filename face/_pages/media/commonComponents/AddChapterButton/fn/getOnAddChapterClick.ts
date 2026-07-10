import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { pageUrls } from 'utils/pageUrls'
import { useRouter } from '@/i18n/routing'
import { useBookChapterControllerCreateBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
import { getBookPrivateControllerGetBookQueryKey } from '@/shared/api/generated/book-private/book-private'
import type { BookChapterOutModel } from '@/shared/api/generated/models'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'

export function useGetOnAddChapterClick({ bookId, bookIdInUrl }: { bookId: number; bookIdInUrl: string }) {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const queryClient = useQueryClient()

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const { mutateAsync: createBookChapter } = useBookChapterControllerCreateBookChapter()

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdChapterId: string | number | null = null

			try {
				const response = await createBookChapter({
					data: { bookId, bookType: 'private' },
				})

				const chapter = response as unknown as BookChapterOutModel
				const chapterId = chapter.id
				if (!chapterId) {
					setErrorMessage('Не удалось создать главу.')
					return
				}

				queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetBookQueryKey(bookId) })

				createdChapterId = chapterId
			} catch {
				notify({ type: 'error', message: 'Не удалось создать главу.' })
			} finally {
				setLoading(false)
			}

			if (createdChapterId) {
				router.push(pageUrls.books.book(bookIdInUrl).chapter(createdChapterId).path)
			}
		},
		[createBookChapter, notify, router, bookId, bookIdInUrl, queryClient],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
