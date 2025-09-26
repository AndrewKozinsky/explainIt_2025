import { routesUtils } from '@/utils/routes'
import { pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает булево значение - является ли текущая страница текущей книги
 * @param bookId — id of book
 */
export function useGetIsBookCurrent(bookId: number) {
	return routesUtils.useIsCurrentPageOrParentForCurrentPage(pageUrls.books.book(bookId).path)
}
