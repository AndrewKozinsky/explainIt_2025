import { routesUtils } from '@/utils/routes'
import { pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * @param bookType — type of the book
 * @param bookId — id of book
 */
export function useGetChapterLinkStatus(bookId: number, bookType: 'public' | 'private'): 'idle' | 'current' {
	const pageUrl = pageUrls.books.book(bookId, bookType).path

	return routesUtils.useIsCurrentPage(pageUrl) ? 'current' : 'idle'
}
