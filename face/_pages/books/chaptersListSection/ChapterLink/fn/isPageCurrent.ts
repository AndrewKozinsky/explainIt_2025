import { routesUtils } from '../../../../../utils/routes'
import { pageUrls } from '../../../../../сonsts/pageUrls'

export function useGetIsPageCurrent(bookId: string | number, chapterId: string | number) {
	return routesUtils.useIsCurrentPageOrParentForCurrentPage(pageUrls.books.book(bookId).chapter(chapterId).path)
}
