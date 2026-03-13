import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { useChapterStore } from '_pages/books/chapter/chapterStore'
import { bookConfig } from '_pages/books/common/bookConfig'
import { createMediaIdUrl, pageUrls } from 'сonsts/pageUrls'

function BooksBreadCrumbs() {
	const privateBook = useChapterStore((s) => s.privateBook)

	const bookName = privateBook.data?.name || bookConfig.emptyBookName
	const bookIdInUrl = createMediaIdUrl(privateBook.data?.id, 'private')
	const bookUrl = pageUrls.books.book(bookIdInUrl)?.path ?? '1'

	const breadcrumbOptionsOptions = [pageUrls.books, { name: bookName, path: bookUrl }]

	return <BreadCrumbs items={breadcrumbOptionsOptions} />
}

export default BooksBreadCrumbs
