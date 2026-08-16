import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { pageUrls } from '@/shared/utils/pageUrls'
import { extractYouTubeVideoId } from '@/shared/utils/youtube'
import { useYouTubeVideos } from '_pages/media/videos/VideosPage/fn/setupVideosDeps'

/**
 * Хук-оркестратор страницы поиска YouTube-видео.
 *
 * Хранит строку запроса, управляет поиском и перехватывает ввод
 * YouTube-адреса: если пользователь вставил ссылку — извлекает videoId
 * и сразу переводит на страницу видео, минуя поиск.
 */
function useYouTubeVideosSearch() {
	const [query, setQuery] = useState('')
	const router = useRouter()

	const { loading, videos, error, hasMore, hasSearched, search, loadMore } = useYouTubeVideos(query)

	function handleQueryChange(value: string) {
		setQuery(value)

		// Проверка на каждой смене значения — покрывает и вставку из буфера обмена.
		const videoId = extractYouTubeVideoId(value)
		if (videoId) {
			router.push(pageUrls.videos.video(videoId).path)
		}
	}

	function handleHintSelect(text: string) {
		setQuery(text)
		search(text)
	}

	return {
		query,
		loading,
		videos,
		error,
		hasMore,
		hasSearched,
		search,
		loadMore,
		handleQueryChange,
		handleHintSelect,
	}
}

export default useYouTubeVideosSearch
