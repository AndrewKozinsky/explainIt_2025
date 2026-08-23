import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { YouTubeVideoCardData } from '@/entities/video/YouTubeVideosList/YouTubeVideosList'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import { YouTubeVideosFilterValues } from '../../VideosFilterForm/fn/types'
import { mapFilterValuesToParams } from './mapFilterValuesToParams'
import { mapToYouTubeVideoCardData } from './mapToYouTubeVideoCardData'

type UseSavedVideosResult = {
	items: YouTubeVideoCardData[]
	loading: boolean
	loadingMore: boolean
	hasMore: boolean
	loadMore: () => void
	errorText: string | null
}

export function useGetSavedVideos(filterValues: YouTubeVideosFilterValues): UseSavedVideosResult {
	const params = useMemo(
		function () {
			return mapFilterValuesToParams(filterValues)
		},
		[filterValues],
	)

	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } = useInfiniteQuery(
		youtubeQueries.getSavedVideosInfinite(params),
	)

	const items: YouTubeVideoCardData[] = useMemo(
		function () {
			if (!data) return []

			return data.pages.flatMap(function (page) {
				return mapToYouTubeVideoCardData(page.items)
			})
		},
		[data],
	)

	const errorText: string | null = useMemo(
		function () {
			// Показываем ошибку только при первой загрузке, чтобы не скрывать
			// уже накопленные страницы при сбое догрузки.
			if (!error || data) return null

			return error instanceof Error ? error.message : 'Неизвестная ошибка'
		},
		[error, data],
	)

	return {
		items,
		loading: isLoading,
		loadingMore: isFetchingNextPage,
		hasMore: hasNextPage,
		loadMore: fetchNextPage,
		errorText,
	}
}
