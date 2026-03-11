// import { usePathname } from 'next/navigation'
// import { createVideoIdUrl, pageUrls } from '@/сonsts/pageUrls'

/**
 * Возвращает статус ссылки для визуальной подсветки:
 * — idle — текущая страница не является этой
 * — current — это текущая страница
 */
/*export function useGetVideoLinkStatus(videoId: number, videoType: 'public' | 'private'): 'idle' | 'current' | 'nested' {
	const videoIdInUrl = createVideoIdUrl(videoId, videoType)
	const videoUrl = pageUrls.videos.video(videoIdInUrl).path

	const pathname = usePathname()

	if (pathname !== videoUrl) {
		return 'idle'
	}

	return 'current'
}*/
