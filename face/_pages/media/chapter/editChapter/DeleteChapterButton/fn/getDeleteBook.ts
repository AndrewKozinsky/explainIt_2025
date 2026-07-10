import { useCallback, useContext, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@/i18n/routing'
import { useBookChapterControllerDeleteBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
import { getBookPrivateControllerGetUserBooksQueryKey } from '@/shared/api/generated/book-private/book-private'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { createMediaIdUrl, pageUrls } from '@/utils/pageUrls'
import { useChapterStore } from '_pages/media/chapter/chapterStore'

export function useGetDeleteBook() {
	const { notify } = useContext(NotificationContext)
	const router = useRouter()
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const { mutateAsync: deleteChapter } = useBookChapterControllerDeleteBookChapter()
	const queryClient = useQueryClient()

	const onDeleteChapterClick = useCallback(
		async function () {
			// Read fresh values from the store to avoid stale closures
			const { chapter, privateBook } = useChapterStore.getState()
			if (!chapter.data || !privateBook.data) return

			const bookId = privateBook.data.id
			const chapterId = chapter.data.id

			setStatus('loading')

			try {
				await deleteChapter({ id: chapterId })

				queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetUserBooksQueryKey() })

				setStatus('idle')

				const bookIdInUrl = createMediaIdUrl(bookId, 'private')
				router.push(pageUrls.books.book(bookIdInUrl).path)
			} catch {
				notify({
					type: 'error',
					message:
						'Не удалось удалить главу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			}
		},
		[deleteChapter, notify, router, queryClient],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}
