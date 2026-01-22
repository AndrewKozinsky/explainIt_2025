import { useParams, usePathname } from 'next/navigation'
import { pageUrls } from 'сonsts/pageUrls'

/** Определяет какую страницу показать в зависимости от адреса страницы */
export function useGetShowingPageType(): 'videos' | 'watching' {
	const pathname = usePathname()
	const urlVideoId = useParams().videoId as string

	return pathname.endsWith('/' + pageUrls.videos.video(urlVideoId).watching.segment) ? 'watching' : 'videos'
}
