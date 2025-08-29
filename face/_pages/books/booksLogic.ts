import { useParams } from 'next/navigation'
import { useBooksStore } from './booksStore'

export const booksLogic = {
	useGetBooks() {
		return useBooksStore().books
	},
	useGetCurrentBookId() {
		return useParams().bookId as string
	},
	useGetCurrentChapterId() {
		return useParams().chapterId as string
	},
	useGetCurrentBook() {
		const books = this.useGetBooks()
		const currentBookId = this.useGetCurrentBookId()

		if (!books || !currentBookId) {
			return null
		}

		return books.find((book) => book.id.toString() === currentBookId)
	},
	useGetCurrentChapter() {
		const book = this.useGetCurrentBook()
		const currentChapterId = this.useGetCurrentChapterId()

		if (!book || !currentChapterId) {
			return null
		}

		return book.chapters.find((book) => book.id.toString() === currentChapterId)
	},
}
