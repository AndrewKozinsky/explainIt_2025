import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetUserBooksDocument, useBookChapter_Delete } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { createMediaIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { useChapterStore } from '_pages/media/chapter/chapterStore'

export function useGetDeleteBook() {
	// Subscribe to the store to trigger re-renders if needed
	useChapterStore((s) => s.chapter)
	useChapterStore((s) => s.privateBook)

	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteChapter] = useBookChapter_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteChapterClick = useCallback(
		async function () {
			// Read fresh values from the store to avoid stale closures
			const { chapter, privateBook } = useChapterStore.getState()
			if (!chapter.data || !privateBook.data) return

			const bookId = privateBook.data.id
			const chapterId = chapter.data.id

			setStatus('loading')

			const { errors } = await deleteChapter({ variables: { input: { id: chapterId } } })

			if (errors) {
				notify({
					type: 'error',
					message:
						'Не удалось удалить главу. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
				return
			}

			setStatus('idle')

			const bookIdInUrl = createMediaIdUrl(bookId, 'private')
			redirect(pageUrls.books.book(bookIdInUrl).path)
		},
		[deleteChapter, notify],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}
