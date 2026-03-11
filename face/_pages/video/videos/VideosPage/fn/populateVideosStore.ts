import { useEffect } from 'react'
// import { useParams, usePathname } from 'next/navigation'
import { useUserStore } from 'stores/userStore'
import { useVideoPrivate_GetUserVideos, useVideoPublic_GetVideos } from '@/graphql'
// import { extractVideoIdFromUrlVideoId, getVideoTypeByUrlVideoId } from '@/сonsts/pageUrls'
import { useVideosStore } from '_pages/video/videos/videosStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateVideosStore() {
	useFetchPublicVideosAndSetToStore()
	useFetchPrivateVideosAndSetToStore()
	// useSetVideoToStore()
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

/*function useSetVideoToStore() {
	const publicVideos = useVideosStore((s) => s.publicVideos.data)
	const privateVideos = useVideosStore((s) => s.privateVideos.data)

	const urlVideoId = useParams().videoId
	const videoType = getVideoTypeByUrlVideoId(urlVideoId)

	useEffect(
		function () {
			const videoId = extractVideoIdFromUrlVideoId(urlVideoId)

			if (videoType === 'public' && publicVideos) {
				const publicVideo = publicVideos.find((video) => video.id === videoId) ?? null

				useVideosStore.setState({
					publicVideo,
					privateVideo: null,
				})
			} else if (videoType === 'private' && privateVideos) {
				const privateVideo = privateVideos.find((video) => video.id === videoId) ?? null

				useVideosStore.setState({
					publicVideo: null,
					privateVideo,
				})
			} else {
				useVideosStore.setState({
					publicVideo: null,
					privateVideo: null,
				})
			}
		},
		[publicVideos, privateVideos, urlVideoId, videoType],
	)
}*/
