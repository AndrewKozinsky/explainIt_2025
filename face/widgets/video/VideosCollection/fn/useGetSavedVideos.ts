import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { youtubeQueries } from '@/entities/youtube/YoutubeQueryFacade'
import type { YouTubeVideosFilterValues } from '@/widgets/video/VideosFilterForm/fn/types'
import type { YouTubeVideoCardData } from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'
import { mapFilterValuesToParams } from './mapFilterValuesToParams'
import { mapToYouTubeVideoCardData } from './mapToYouTubeVideoCardData'

type UseSavedVideosResult = {
	items: YouTubeVideoCardData[]
	loading: boolean
	errorText: string | null
}

export function useGetSavedVideos(filterValues: YouTubeVideosFilterValues): UseSavedVideosResult {
	const params = useMemo(
		function () {
			return mapFilterValuesToParams(filterValues)
		},
		[filterValues],
	)

	const { data: videos = [], isLoading, error } = useQuery(youtubeQueries.getSavedVideos(params))

	const errorText: string | null = useMemo(
		function () {
			if (!error) return null
			return error instanceof Error ? error.message : 'Неизвестная ошибка'
		},
		[error],
	)

	return {
		items: mapToYouTubeVideoCardData(videos),
		loading: isLoading,
		errorText,
	}
}
