import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import type { YoutubeVideoModel } from '@/entities/youtube/YoutubeService'

/**
 * Хук для поиска YouTube-видео с пагинацией.
 * Использует {@link youtubeQueries.getVideos} — фасад над TanStack Query.
 */
export function useYouTubeVideos(query: string) {
	const [searchQuery, setSearchQuery] = useState('')
	const [pageToken, setPageToken] = useState<string | undefined>(undefined)
	const [allVideos, setAllVideos] = useState<YoutubeVideoModel[]>([])
	const [hasSearched, setHasSearched] = useState(false)

	const { data, isLoading, error } = useQuery({
		...youtubeQueries.getVideos({ query: searchQuery, limit: 20, pageToken }),
		enabled: !!searchQuery,
	})

	const search = useCallback(
		function () {
			setSearchQuery(query)
			setPageToken(undefined)
			setAllVideos([])
			setHasSearched(true)
		},
		[query],
	)

	const loadMore = useCallback(
		function () {
			if (data?.nextPageToken && !isLoading) {
				setPageToken(data.nextPageToken)
			}
		},
		[data?.nextPageToken, isLoading],
	)

	const videos = useMemo(
		function () {
			if (!data) return allVideos
			return pageToken ? [...allVideos, ...data.videos] : data.videos
		},
		[data, pageToken, allVideos],
	)

	const errorText = useMemo(
		function () {
			if (!error) return null
			return error instanceof Error ? error.message : 'Неизвестная ошибка'
		},
		[error],
	)

	return useMemo(
		function () {
			return {
				loading: isLoading,
				videos,
				error: errorText,
				hasMore: data?.nextPageToken !== null && data?.nextPageToken !== undefined,
				hasSearched,
				search,
				loadMore,
			}
		},
		[isLoading, videos, errorText, data?.nextPageToken, hasSearched, search, loadMore],
	)
}
