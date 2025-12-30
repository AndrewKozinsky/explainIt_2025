import { useVideosStore } from '_pages/video/videos/videosStore'
import { useVideoPrivate_GetUserVideos } from '@/graphql'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateVideosStore() {
	useDefineCurrentPageType()
	useFetchPrivateVideosAndSetToStore()
	useSetVideoToStore()
}

// Определяет тип текущей страницы и возвращает в виде типа
export function useDefineCurrentPageType() {
	const videoId = useParams().videoId as string
	const pathname = usePathname()

	// Важно: не обновляем Zustand-хранилище синхронно во время рендера,
	// чтобы избежать ошибки "Cannot update a component while rendering a different component".
	// Обновляем pageType внутри useEffect при изменении входных данных.
	useEffect(() => {
		useVideosStore.setState({
			pageUrlType: !videoId ? 'videos' : 'video',
		})
	}, [videoId, pathname])
}

function useFetchPrivateVideosAndSetToStore() {
	const { data, error, loading } = useVideoPrivate_GetUserVideos()

	useEffect(
		function () {
			if (loading) {
				useVideosStore.getState().updatePrivateVideos({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useVideosStore.getState().updatePrivateVideos({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useVideosStore.getState().updatePrivateVideos({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useVideosStore.getState().updatePrivateVideos({
					loading: false,
					errorMessage: null,
					data: data.video_private_user_videos,
				})
			}
		},
		[data, error, loading],
	)
}

function useSetVideoToStore() {
	const privateVideos = useVideosStore((s) => s.privateVideos.data)

	const videoId = useParams().videoId as string

	useEffect(
		function () {
			if (!privateVideos) {
				useVideosStore.setState({
					privateVideo: null,
				})
				return
			}

			const privateVideo = privateVideos.find((video) => video.id === parseInt(videoId)) ?? null

			useVideosStore.setState({
				privateVideo: privateVideo ? privateVideo : null,
			})
		},
		[privateVideos, videoId],
	)
}
