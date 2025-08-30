import { useParams } from 'next/navigation'
import { useBooksStore } from './booksStore'

export const booksLogic = {
	useGetBooks() {
		return useBooksStore().books
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
	useGetCurrentChapter() {
		return useBooksStore.getState().chapter
	},
}
