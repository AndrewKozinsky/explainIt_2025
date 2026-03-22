import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { useVideoPrivate_GetUserVideos, useVideoPublic_GetVideos } from '@/graphql'
import { useVideosStore } from '_pages/media/videos/videosStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateVideosStore() {
	useFetchPublicVideosAndSetToStore()
	useFetchPrivateVideosAndSetToStore()
}

function useFetchPublicVideosAndSetToStore() {
	const { data, error, loading } = useVideoPublic_GetVideos()

	useEffect(
		function () {
			if (loading) {
				useVideosStore.getState().updatePublicVideos({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useVideosStore.getState().updatePublicVideos({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useVideosStore.getState().updatePublicVideos({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useVideosStore.getState().updatePublicVideos({
					loading: false,
					errorMessage: null,
					data: data.video_public_get_videos,
				})
			}
		},
		[data, error, loading],
	)
}

function useFetchPrivateVideosAndSetToStore() {
	const user = useUserStore((state) => state.user)

	const { data, error, loading } = useVideoPrivate_GetUserVideos({
		skip: !user?.id,
	})

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
