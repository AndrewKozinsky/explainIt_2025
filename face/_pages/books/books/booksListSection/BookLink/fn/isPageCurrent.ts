import { routesUtils } from '@/utils/routes'
import { pageUrls } from '@/сonsts/pageUrls'

export function useGetIsPageCurrent(bookId: number) {
	return routesUtils.useIsCurrentPageOrParentForCurrentPage(pageUrls.books.book(bookId).path)
}
