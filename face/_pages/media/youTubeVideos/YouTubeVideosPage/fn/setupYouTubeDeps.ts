import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { YoutubeVideoModel } from '@/entites/youTubeVideos/YoutubeService'
import { YoutubeService } from '@/entites/youTubeVideos/YoutubeService'

export function useYouTubeVideos(youtubeService: YoutubeService, query: string) {
	const [loading, setLoading] = useState(false)
	const [videos, setVideos] = useState<YoutubeVideoModel[]>([])
	const [error, setError] = useState<null | string>(null)
	const [nextPageToken, setNextPageToken] = useState<null | string>(null)
	const [hasSearched, setHasSearched] = useState(false)
	const paramsRef = useRef({ query })

	// Обновляем ref при изменении languageCode или query, чтобы loadMore
	// всегда использовал актуальные параметры даже без пересоздания колбэка
	useEffect(
		function () {
			paramsRef.current = { query }
		},
		[query],
	)

	const fetchVideos = useCallback(
		async function (q: string, pageToken?: string) {
			setLoading(true)
			setError(null)

			const result = await youtubeService.getVideos({
				query: q,
				limit: 20,
				pageToken,
			})

			if (result.error || result.errors) {
				setError(result.error ?? 'Неизвестная ошибка')
				if (!pageToken) {
					setVideos([])
					setHasSearched(true)
				}
				setLoading(false)
				return
			}

			const data = result.data

			if (pageToken) {
				setVideos(function (prev) {
					return [...prev, ...data.videos]
				})
			} else {
				setVideos(data.videos)
			}

			setNextPageToken(data.nextPageToken)
			setHasSearched(true)
			setLoading(false)
		},
		[youtubeService],
	)

	const search = useCallback(
		function () {
			fetchVideos(query)
		},
		[query, fetchVideos],
	)

	const loadMore = useCallback(
		function () {
			if (nextPageToken && !loading) {
				fetchVideos(paramsRef.current.query, nextPageToken)
			}
		},
		[nextPageToken, loading, fetchVideos],
	)

	return useMemo(
		function () {
			return {
				loading,
				videos,
				error,
				hasMore: nextPageToken !== null,
				hasSearched,
				search,
				loadMore,
			}
		},
		[loading, videos, error, nextPageToken, hasSearched, search, loadMore],
	)
}
