import { bookConfig } from '@/entites/books/lib/bookConfig'
import { BookModel } from '@/entites/books/repository/BooksRepository'

export function getHeaderAndSubHeader(bookData: BookModel) {
	return {
		header: bookData.name || bookConfig.emptyBookName,
		subHeader: bookData.author,
	}
}
