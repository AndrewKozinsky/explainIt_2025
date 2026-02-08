import { routesUtils } from '@/utils/routes'
import { createVideoIdUrl, pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 * — nested — текущая страница является вложенной в эту
 */
export function useGetVideoLinkStatus(videoId: number, videoType: 'public' | 'private'): 'idle' | 'current' | 'nested' {
	const videoIdInUrl = createVideoIdUrl(videoId, videoType)
	const pageUrl = pageUrls.videos.video(videoIdInUrl).path
	const watchingUrl = pageUrls.videos.video(videoIdInUrl).watching.path

	const currentUrl = videoType === 'public' ? watchingUrl : pageUrl
	const nestedCheckUrl = videoType === 'public' ? watchingUrl : pageUrl

	const isCurrentPage = routesUtils.useIsCurrentPage(currentUrl)
	const isCurrentOrNested = routesUtils.useIsCurrentPageOrNestForCurrentPage(nestedCheckUrl)

	if (!isCurrentOrNested) {
		return 'idle'
	}
	if (isCurrentPage) {
		return 'current'
	}

	return 'nested'
}
