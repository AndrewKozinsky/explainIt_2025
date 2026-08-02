import type { BookModel } from '@/entites/books/repository/BooksRepository'
import type { BookChapterModel } from '@/entites/chapter/repository/ChaptersRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getMediaNavigationData(book: BookModel, chapter: BookChapterModel) {
	const bookId = book.id.toString()
	const chapters = book.chapters ?? []

	const currentIndex = chapters.findIndex((ch) => ch.id === chapter.id)
	const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
	const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

	return {
		bookLink: {
			href: pageUrls.books.book(bookId).path,
			text: book.name,
			smallText: book.author,
			coverUrl: book.coverUrl,
		},
		prevChapterLink: prevChapter
			? {
					href: pageUrls.books.book(bookId).chapter(prevChapter.id).path,
					text: prevChapter.header,
					smallText: prevChapter.name,
				}
			: undefined,
		nextChapterLink: nextChapter
			? {
					href: pageUrls.books.book(bookId).chapter(nextChapter.id).path,
					text: nextChapter.header,
					smallText: nextChapter.name,
				}
			: undefined,
	}
}
