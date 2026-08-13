import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'

/**
 * Загружает данные YouTube-видео и опрашивает сервер, пока генерируются субтитры.
 *
 * 1. При маунте — POST /api/youtube/:videoId (создаёт видео в БД, запускает генерацию).
 * 2. Если subtitlesStatus = pending или processing — каждые 2с повторяет вызов.
 *    Идемпотентный getOrCreateVideo возвращает существующее видео.
 * 3. Когда статус меняется на done / failed / idle — effect очищает интервал.
 *
 * @returns { loading, error, video } — video обновляется реактивно при получении новых данных
 */
export function useYouTubeVideoData(videoId: string) {
	const queryClient = useQueryClient()
	const { data: video, isPending, error, mutate } = useMutation(youtubeQueries.getOrCreateVideo(queryClient))

	const shouldPoll = video?.subtitlesStatus === 'pending' || video?.subtitlesStatus === 'processing'

	useEffect(
		function () {
			mutate(videoId)
		},
		[mutate, videoId],
	)

	useEffect(
		function () {
			if (!shouldPoll) return

			const intervalId = setInterval(function () {
				mutate(videoId)
			}, 2000)

			return function () {
				clearInterval(intervalId)
			}
		},
		[shouldPoll, mutate, videoId],
	)

	return {
		video,
		loading: isPending,
		error: error ? error.message : null,
	}
}
