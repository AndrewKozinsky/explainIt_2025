import { routesUtils } from '@/utils/routes'
import { pageUrls } from '@/сonsts/pageUrls'
import { useParams } from 'next/navigation'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * — nested — текущая страница является вложенной в эту
 * @param bookType — type of the book
 * @param bookId — id of book
 */
export function useGetBookLinkStatus(bookId: number, bookType: 'public' | 'private'): 'idle' | 'current' | 'nested' {
	const videoId = useParams().videoId as string
	const pageUrl = pageUrls.videos.video(videoId).path

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
