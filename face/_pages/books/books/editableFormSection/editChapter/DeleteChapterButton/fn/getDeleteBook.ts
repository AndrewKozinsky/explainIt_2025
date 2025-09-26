import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetUserBooksDocument, useBookChapter_Delete } from '@/graphql'
import { NotificationContext } from '@/ui//Notification/context'
import { pageUrls } from '@/сonsts/pageUrls'
import { BookChapterOutModel } from 'graphql'
import { booksFetcher } from '@/_pages/books/commonLogic/booksFetcher'

export function useGetDeleteBook(chapter: BookChapterOutModel) {
	const { notify } = useContext(NotificationContext)
	const [status, setStatus] = useState<'idle' | 'loading'>('idle')

	const bookId = booksFetcher.useGetCurrentBookIdFromUrl()
	const [deleteChapter] = useBookChapter_Delete({ refetchQueries: [Book_GetUserBooksDocument] })

	const onDeleteChapterClick = useCallback(
		async function () {
			const chapterId = chapter.id

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
		[bookId, chapter, deleteChapter, notify],
	)

	return {
		status,
		onDeleteChapterClick,
	}
}
