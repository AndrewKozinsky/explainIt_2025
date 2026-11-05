import { BreadCrumbsItem } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getChapterBreadCrumbsConfig(input: {
	bookId: string
	bookName: string
	booksPageName: string
}): BreadCrumbsItem[] {
	const { bookId, bookName, booksPageName } = input

	return [
		{ name: booksPageName, path: pageUrls.books.path },
		{ name: bookName, path: pageUrls.books.book(bookId).path },
	]
}
