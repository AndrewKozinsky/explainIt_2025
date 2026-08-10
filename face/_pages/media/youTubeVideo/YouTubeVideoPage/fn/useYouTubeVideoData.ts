// import { useCallback, useEffect, useMemo } from 'react'
// import { YoutubeApi } from '@/entities/youtube/repository/YoutubeApi'
// import { YoutubeService } from '@/entities/youtube/YoutubeService'
// import { useFetchData } from '@/shared/utils/fetchData/useFetchData'

/**
 * Загружает данные YouTube-видео и опрашивает сервер, пока генерируются субтитры.
 *
 * 1. При маунте — POST /api/youtube/:videoId (создаёт видео в БД, запускает генерацию).
 * 2. Если subtitlesStatus = pending или processing — каждые 2с запускает refetch.
 *    Идемпотентный getOrCreateVideo возвращает существующее видео.
 * 3. Когда статус меняется на done / failed / idle — effect очищает интервал.
 *
 * @returns { loading, error, video } — video обновляется реактивно при получении новых данных
 */
/*export function useYouTubeVideoData(videoId: string) {
	const youtubeService = useMemo(function () {
		return new YoutubeService(new YoutubeApi())
	}, [])

	const fetchVideo = useCallback(() => youtubeService.getOrCreateVideo(videoId), [youtubeService, videoId])

	const { data: video, loading, error, refetch } = useFetchData(fetchVideo, [fetchVideo])

	const shouldPoll = video?.subtitlesStatus === 'pending' || video?.subtitlesStatus === 'processing'

	useEffect(
		function () {
			if (!shouldPoll) return

			const intervalId = setInterval(() => void refetch(), 2000)

			return function () {
				clearInterval(intervalId)
			}
		},
		[shouldPoll, refetch],
	)

	return {
		video,
		loading,
		error,
	}
}*/
