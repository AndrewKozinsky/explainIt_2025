// import { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
// import { useVideoPrivateControllerGetVideoPrivate } from '@/shared/api/generated/video-private/video-private'
// import { useVideoPublicControllerGetVideoPublic } from '@/shared/api/generated/video-public/video-public'
// import type { VideoPrivateOutModel, VideoPublicOutModel } from '@/shared/api/generated/models'
// import { useVideoStore } from '_pages/media/video/videoStore'

/** Наполняет Хранилище данными для начала работы */
/*export function usePopulateVideoStore() {
	useSetVideoToStore()
	useClearDataOnUnmount()
}*/

/*function useSetVideoToStore() {
	const videoIdInUrl = useParams().videoId as string
	const videoType = getMediaTypeByUrlMediaId(videoIdInUrl)
	const videoId = extractMediaIdFromUrlBookId(videoIdInUrl)

	const {
		data: privateVideoData,
		isError: privateVideoIsError,
		isLoading: privateVideoLoading,
	} = useVideoPrivateControllerGetVideoPrivate(videoId!, {
		query: { enabled: videoType === 'private' && !!videoId },
	})

	useEffect(
		function () {
			if (videoType !== 'private') return

			const video = privateVideoData as unknown as VideoPrivateOutModel | undefined

			if (privateVideoLoading) {
				useVideoStore.getState().updatePrivateVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (privateVideoIsError) {
				useVideoStore.getState().updatePrivateVideo({
					loading: false,
					errorMessage: 'Не удалось загрузить видео',
					data: null as any as VideoPrivateOutModel,
				})
			} else if (!video) {
				useVideoStore.getState().updatePrivateVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else {
				useVideoStore.getState().updatePrivateVideo({
					loading: false,
					errorMessage: null,
					data: video,
				})
			}
		},
		[videoType, privateVideoData, privateVideoIsError, privateVideoLoading],
	)

	const {
		data: publicVideoData,
		isError: publicVideoIsError,
		isLoading: publicVideoLoading,
	} = useVideoPublicControllerGetVideoPublic(videoId!, {
		query: { enabled: videoType === 'public' && !!videoId },
	})

	useEffect(
		function () {
			if (videoType !== 'public') return

			const video = publicVideoData as unknown as VideoPublicOutModel | undefined

			if (publicVideoLoading) {
				useVideoStore.getState().updatePublicVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPublicOutModel,
				})
			} else if (publicVideoIsError) {
				useVideoStore.getState().updatePublicVideo({
					loading: false,
					errorMessage: 'Не удалось загрузить видео',
					data: null as any as VideoPublicOutModel,
				})
			} else if (!video) {
				useVideoStore.getState().updatePublicVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPublicOutModel,
				})
			} else {
				useVideoStore.getState().updatePublicVideo({
					loading: false,
					errorMessage: null,
					data: video,
				})
			}
		},
		[videoType, publicVideoData, publicVideoIsError, publicVideoLoading],
	)
}*/

/*function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useVideoStore.getState().clearStore()
		}
	}, [])
}*/
