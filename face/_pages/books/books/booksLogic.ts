import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { BookChapterOutModel, useBook_GetUserBooks, useBookChapter_Get } from '../../../graphql'

export const booksLogic = {
	useGetBooks() {
		const { data, error, loading } = useBook_GetUserBooks()

		return useMemo(
			function () {
				if (loading) return null

				if (error || !data) {
					return null
				}

				return data.book_user_books
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
		const books = this.useGetBooks()
		const currentBookId = this.useGetCurrentBookIdFromUrl()

		if (!books || !currentBookId) {
			return null
		}

		return books.find((book) => book.id.toString() === currentBookId)
	},
	useGetCurrentLiteChapter() {
		const book = this.useGetCurrentBook()
		const currentChapterId = this.useGetCurrentChapterIdFromUrl()

		if (!book || !currentChapterId) {
			return null
		}

		return book.chapters.find((chapter) => chapter.id.toString() === currentChapterId)
	},
	useGetCurrentChapter(): BookChapterOutModel | null {
		const chapterId = this.useGetCurrentChapterIdFromUrl()

		const { data, error, loading } = useBookChapter_Get({
			variables: { input: { id: parseInt(chapterId) } },
			skip: !chapterId,
		})

		return useMemo(
			function () {
				if (loading) return null

				if (error || !data) {
					return null
				}

				return data.book_chapter_get
			},
			[data, error, loading],
		)
	},
}
