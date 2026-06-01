import { useCallback, useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { Book_GetDocument, useBookChapter_Create } from '@/graphql'
import { NotificationContext } from '@/ui/Notification/context'
import { pageUrls } from 'сonsts/pageUrls'

export function useGetOnAddChapterClick({ bookId, bookIdInUrl }: { bookId: number; bookIdInUrl: string }) {
	const { notify } = useContext(NotificationContext)

	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)

	const [createBookChapter] = useBookChapter_Create({
		refetchQueries: [{ query: Book_GetDocument, variables: { input: { id: bookId } } }],
		awaitRefetchQueries: true,
	})

	const onClick = useCallback(
		async function () {
			setLoading(true)

			let createdChapterId: string | number | null = null

			try {
				const { errors, data } = await createBookChapter({
					variables: { input: { bookId, bookType: 'private' } },
				})

				if (errors) {
					setErrorMessage('Не удалось создать главу.')
					return
				}

				const chapterId = data?.book_chapter_create.id
				if (!chapterId) {
					setErrorMessage('Не удалось создать главу.')
					return
				}

				createdChapterId = chapterId
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось создать главу.' })
			} finally {
				setLoading(false)
			}

			if (createdChapterId) {
				redirect(pageUrls.books.book(bookIdInUrl).chapter(createdChapterId).path)
			}
		},
		[createBookChapter, notify, bookId, bookIdInUrl],
	)

	return {
		loading,
		errorMessage,
		onClick,
	}
}
