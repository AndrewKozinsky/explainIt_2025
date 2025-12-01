// import { useCallback, useContext, useState } from 'react'
// import { redirect } from 'next/navigation'
// import { Book_GetUserBooksDocument, useBookChapter_Delete } from '@/graphql'
// import { NotificationContext } from '@/ui//Notification/context'
// import { pageUrls } from '@/сonsts/pageUrls'
// import { useBooksStore } from '_pages/books/books/booksStore'

/*export function useGetDeleteBook() {
	// Subscribe to store to trigger re-renders if needed
	useBooksStore((s) => s.chapter)
	useBooksStore((s) => s.book)

	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const [deleteChapter] = useBookChapter_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteChapterClick = useCallback(
		async function () {
			// Read fresh values from the store to avoid stale closures
			const { chapter, book } = useBooksStore.getState()
			if (!chapter.data || !book) return

			const bookId = book.id
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

			redirect(pageUrls.books.book(bookId).path)
		},
		[deleteChapter, notify],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}*/
