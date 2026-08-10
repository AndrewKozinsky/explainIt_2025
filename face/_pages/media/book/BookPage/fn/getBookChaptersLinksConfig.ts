// import { bookConfig } from '@/entities/book/lib/bookConfig'
// import { BookModel } from '@/entities/book/repository/BooksRepository'
// import { pageUrls } from '@/shared/utils/pageUrls'

/*export function getBookChaptersLinksConfig(book: BookModel) {
	return book.chapters.map((chapter) => {
		return {
			name: chapter.header || chapter.name || bookConfig.emptyChapterName,
			subName: chapter.header && chapter.name ? chapter.name : null,
			href: pageUrls.books.book(book.id).chapter(chapter.id).path,
		}
	})
}*/
