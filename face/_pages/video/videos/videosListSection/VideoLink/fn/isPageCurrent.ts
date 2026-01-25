import { useParams } from 'next/navigation'
import { routesUtils } from '@/utils/routes'
import { pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * — nested — текущая страница является вложенной в эту
 */
export function useGetBookLinkStatus(videoId: number): 'idle' | 'current' | 'nested' {
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
