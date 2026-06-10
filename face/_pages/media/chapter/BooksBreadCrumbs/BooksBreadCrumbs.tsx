import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from 'utils/pageUrls'
import { createMediaIdUrl } from 'utils/pageUrls'
import { useChapterStore } from '_pages/media/chapter/chapterStore'
import { bookConfig } from '_pages/media/commonComponents/bookConfig'

function BooksBreadCrumbs() {
	const privateBook = useChapterStore((s) => s.privateBook)

	const bookName = privateBook.data?.name || bookConfig.emptyBookName
	const bookIdInUrl = createMediaIdUrl(privateBook.data?.id, 'private')
	const bookUrl = pageUrls.books.book(bookIdInUrl)?.path ?? '1'

	const breadcrumbOptionsOptions = [pageUrls.books, { name: bookName, path: bookUrl }]

	return <BreadCrumbs items={breadcrumbOptionsOptions} />
}

export default BooksBreadCrumbs
