import { BookModel } from '@/entites/books/repository/BooksRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getConfig(booksData: BookModel[]) {
	return booksData.map((bookData) => {
		const chapterId = resolveFirstChapterId(bookData)

		return {
			id: bookData.id,
			name: bookData.name,
			subName: bookData.author,
			coverUrl: bookData.coverUrl,
			url: pageUrls.books.book(bookData.id).chapter(chapterId).path,
			actionUrl: pageUrls.books.book(bookData.id).path,
		}
	})
}

function resolveFirstChapterId(book: BookModel): number {
	return book.chapters[0]?.id ?? 0
}
