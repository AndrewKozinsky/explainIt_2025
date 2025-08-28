import { useParams } from 'next/navigation'
import { useBooksStore } from './booksStore'

export const booksLogic = {
	useGetBooks() {
		return useBooksStore().books
	},
	useGetCurrentBookId() {
		return useParams().bookId as string
	},
	useGetCurrentBook() {
		const books = this.useGetBooks()
		const currentBookId = this.useGetCurrentBookId()

		if (!books || !currentBookId) {
			return null
		}

		return books.find((book) => book.id.toString() === currentBookId)
	},
}
