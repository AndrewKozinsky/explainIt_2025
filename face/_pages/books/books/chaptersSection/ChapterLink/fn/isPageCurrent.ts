import { routesUtils } from '@/utils/routes'
import { createBookIdUrl, pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * @param bookType — type of the book
 * @param bookId — id of a book
 * @param chapterId — id of a chapter
 */
export function useGetChapterLinkStatus(
	bookId: number | string,
	bookType: 'public' | 'private',
	chapterId: number,
): 'idle' | 'current' {
	const bookIdInUrl = createBookIdUrl(bookId, bookType)
	const pageUrl = pageUrls.books.book(bookIdInUrl).chapter(chapterId).path

	return routesUtils.useIsCurrentPage(pageUrl) ? 'current' : 'idle'
}
