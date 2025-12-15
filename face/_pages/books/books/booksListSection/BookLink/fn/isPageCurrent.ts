import { routesUtils } from '@/utils/routes'
import { createBookIdUrl, pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * — nested — текущая страница является вложенной в эту
 * @param bookType — type of the book
 * @param bookId — id of book
 */
export function useGetBookLinkStatus(bookId: number, bookType: 'public' | 'private'): 'idle' | 'current' | 'nested' {
	const bookIdInUrl = createBookIdUrl(bookId, bookType)
	const pageUrl = pageUrls.books.book(bookIdInUrl).path

	const isCurrentPage = routesUtils.useIsCurrentPage(pageUrl)
	const isNestedPage = routesUtils.useIsCurrentPage(pageUrl)

	if (!isCurrentPage && !isNestedPage) {
		return 'idle'
	}
	if (isCurrentPage) {
		return 'current'
	}

	return 'nested'
}
