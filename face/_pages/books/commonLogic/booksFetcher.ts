import { useMemo } from 'react'
import { useBook_GetUserBooks, useBookChapter_Get } from '@/graphql'
import { useParams, usePathname } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'

export const booksFetcher = {
	useGetBooks() {
		const { data, error, loading } = useBook_GetUserBooks()

		return useMemo(
			function () {
				if (loading) {
					return {
						status: 'loading',
					} as const
				}

				if (error) {
					return {
						status: 'error',
						error,
					} as const
				}

				if (!data) {
					return {
						status: 'noData',
					} as const
				}

				return {
					status: 'success',
					data: data.book_user_books,
				} as const
			},
			[data, error, loading],
		)
	},
	useGetCurrentBookIdFromUrl() {
		return useParams().bookId as string
	},
	useGetCurrentChapterIdFromUrl() {
		return useParams().chapterId as string
	},
	useGetCurrentBook() {
		const getBooksRes = this.useGetBooks()
		const currentBookId = this.useGetCurrentBookIdFromUrl()

		if (getBooksRes.status !== 'success') {
			return getBooksRes
		}

		if (!currentBookId) {
			return {
				status: 'error',
				error: 'Неправильный идентификатор книги',
			} as const
		}

		const book = getBooksRes.data.find((book) => book.id.toString() === currentBookId)
		if (!book) {
			return {
				status: 'error',
				error: 'Книга не найдена',
			} as const
		}

		return {
			status: 'success',
			data: book,
		} as const
	},
	/*useGetCurrentLiteChapter() {
		const book = this.useGetCurrentBook()
		const currentChapterId = this.useGetCurrentChapterIdFromUrl()

		if (!book || !currentChapterId) {
			return null
		}

		return book.chapters.find((chapter) => chapter.id.toString() === currentChapterId)
	},*/
	useGetCurrentChapter() {
		const chapterId = this.useGetCurrentChapterIdFromUrl()

		const { data, error, loading } = useBookChapter_Get({
			variables: { input: { id: parseInt(chapterId) } },
			skip: !chapterId,
		})

		return useMemo(
			function () {
				if (loading) {
					return {
						status: 'loading',
					} as const
				}

				if (error) {
					return {
						status: 'error',
					} as const
				}

				if (!data) {
					return {
						status: 'noData',
					} as const
				}

				return {
					status: 'success',
					data: data.book_chapter_get,
				} as const
			},
			[data, error, loading],
		)
	},
	useGetPageType() {
		const bookId = this.useGetCurrentBookIdFromUrl()
		const pathname = usePathname()

		if (!bookId) {
			return 'anotherPage'
		} else if (pathname === pageUrls.books.book(bookId).path) {
			return 'bookPage'
		} else {
			return 'chapterPage'
		}
	},
}
