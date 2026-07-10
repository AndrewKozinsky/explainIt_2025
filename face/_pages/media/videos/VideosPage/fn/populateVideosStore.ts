import { useEffect } from 'react'
import { useUser } from '@/shared/api/auth/UserProvider'
import type { VideoPublicLiteOutModel, VideoPrivateLiteOutModel } from '@/shared/api/generated/models'
import { useVideoPrivateControllerGetUserVideosPrivate } from '@/shared/api/generated/video-private/video-private'
import { useVideoPublicControllerGetVideosPublic } from '@/shared/api/generated/video-public/video-public'
import { useVideosStore } from '_pages/media/videos/videosStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateVideosStore() {
	useFetchPublicVideosAndSetToStore()
	useFetchPrivateVideosAndSetToStore()
}

function useFetchPublicVideosAndSetToStore() {
	const { data, error, isLoading } = useVideoPublicControllerGetVideosPublic()

	useEffect(
		function () {
			if (isLoading) {
				useVideosStore.getState().updatePublicVideos({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useVideosStore.getState().updatePublicVideos({
					loading: false,
					errorMessage: 'Не удалось загрузить список публичных видео.',
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
					data: data as unknown as VideoPublicLiteOutModel[],
				})
			}
		},
		[data, error, isLoading],
	)
}

function useFetchPrivateVideosAndSetToStore() {
	const user = useUser()

	const { data, error, isLoading } = useVideoPrivateControllerGetUserVideosPrivate({
		query: { enabled: !!user?.id },
	})

	useEffect(
		function () {
			if (isLoading) {
				useVideosStore.getState().updatePrivateVideos({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useVideosStore.getState().updatePrivateVideos({
					loading: false,
					errorMessage: 'Не удалось загрузить список ваших видео.',
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
					data: data as unknown as VideoPrivateLiteOutModel[],
				})
			}
		},
		[data, error, isLoading],
	)
}
