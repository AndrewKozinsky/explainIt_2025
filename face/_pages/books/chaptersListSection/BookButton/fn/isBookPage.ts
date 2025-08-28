import { routesUtils } from '../../../../../utils/routes'
import { pageUrls } from '../../../../../сonsts/pageUrls'

export function useGetIsBookPage(currentBookId: string) {
	return routesUtils.useIsCurrentPage(pageUrls.books.book(currentBookId).path)
}
