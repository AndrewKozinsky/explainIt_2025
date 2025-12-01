import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Book_GetUserBooksDocument, useBookChapter_Create } from '@/graphql'
import { NotifyArg } from '@/ui/Notification/context'
import { useBooksStore } from '_pages/books/books/booksStore'
import { pageUrls } from 'сonsts/pageUrls'

export function useGetOnAddChapterClick(notify: (data: NotifyArg) => void) {
	const privateBook = useBooksStore((s) => s.privateBook)

	const [status, setStatus] = useState<'idle' | 'loading'>('idle')
	const [createChapter] = useBookChapter_Create({
		refetchQueries: [Book_GetUserBooksDocument],
		awaitRefetchQueries: true,
	})

	const onAddChapterClick = useCallback(
		async function () {
			if (!privateBook) {
				return
			}

			setStatus('loading')

			try {
				const { data, errors } = await createChapter({
					variables: {
						input: {
							bookId: privateBook.id,
							bookType: 'private',
							header: null,
							name: null,
							content: null,
							note: null,
						},
					},
				})

				if (errors) {
					throw new Error('Не удалось создать главу.')
				}

				const chapterId = data?.book_chapter_create.id
				if (!chapterId) {
					throw new Error('Не удалось создать главу.')
				}

				// Open a page with created chapter
				redirect(pageUrls.books.book(chapterId, 'private').chapter(chapterId).path)
			} catch (error) {
				notify({ type: 'error', message: 'Не удалось создать главу.' })
			} finally {
				setStatus('idle')
			}
		},
		[privateBook, createChapter, notify],
	)

	return {
		status,
		onAddChapterClick,
	}
}
