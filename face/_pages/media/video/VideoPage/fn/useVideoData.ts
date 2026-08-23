// import { useCallback, useEffect } from 'react'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { videoQueries } from '@/entities/video/VideosQueryFacade'
// import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'

/**
 * Определяет тип видео по его идентификатору.
 *
 * Обычное видео имеет числовой id, YouTube-видео — строковый id вида "KuRr7w8tzkQ".
 */
/*function isYouTubeVideoId(videoId: string): boolean {
	return !/^\d+$/.test(videoId)
}*/

/**
 * Загружает данные видео один раз, в зависимости от типа идентификатора:
 * - обычное видео — GET /api/videos/:id (useQuery через {@link videoQueries.getVideo});
 * - YouTube-видео — POST /api/youtube/:videoId (getOrCreateVideo: создаёт видео в БД
 *   и запускает генерацию субтитров).
 *
 * Перезапрос во время генерации субтитров вынесен в отдельный хук
 * {@link usePollVideoSubtitlesStatus}.
 *
 * @returns { video, loading, error, refetch } — refetch перезапрашивает данные активного источника
 */
/*export function useVideoData(videoId: string) {
	const queryClient = useQueryClient()

	const isYouTube = isYouTubeVideoId(videoId)
	const numericId = isYouTube ? null : Number(videoId)

	const {
		data: regularVideo,
		isPending: regularLoading,
		error: regularError,
		refetch: refetchRegular,
	} = useQuery({
		...videoQueries.getVideo(numericId ?? 0),
		enabled: !isYouTube,
	})

	const {
		data: youtubeVideo,
		isPending: youtubeLoading,
		error: youtubeError,
		mutate,
	} = useMutation(youtubeQueries.getOrCreateVideo(queryClient))

	useEffect(
		function () {
			if (!isYouTube) return
			mutate(videoId)
		},
		[isYouTube, videoId, mutate],
	)

	const video = isYouTube ? youtubeVideo : regularVideo
	const loading = isYouTube ? youtubeLoading : regularLoading
	const error = isYouTube ? youtubeError : regularError

	const refetch = useCallback(
		function () {
			if (isYouTube) {
				mutate(videoId)
			} else {
				void refetchRegular()
			}
		},
		[isYouTube, videoId, mutate, refetchRegular],
	)

	return {
		video,
		loading,
		error: error ? error.message : null,
		refetch,
	}
}*/
