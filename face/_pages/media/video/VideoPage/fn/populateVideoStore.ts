import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useVideoPrivate_Get, useVideoPublic_Get, VideoPrivateOutModel, VideoPublicOutModel } from '@/graphql'
import { useVideoStore } from '_pages/media/video/videoStore'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'сonsts/pageUrls'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateVideoStore() {
	useSetVideoToStore()
	useClearDataOnUnmount()
}

function useSetVideoToStore() {
	const videoIdInUrl = useParams().videoId as string
	const videoType = getMediaTypeByUrlMediaId(videoIdInUrl)
	const videoId = extractMediaIdFromUrlBookId(videoIdInUrl)

	const {
		data: privateBookData,
		error: privateBookError,
		loading: privateBookLoading,
	} = useVideoPrivate_Get({ variables: { input: { id: videoId! } }, skip: videoType !== 'private' })

	useEffect(
		function () {
			if (videoType !== 'private') return

			const video = privateBookData?.video_private_get

			if (privateBookLoading) {
				useVideoStore.getState().updatePrivateVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (privateBookError) {
				useVideoStore.getState().updatePrivateVideo({
					loading: false,
					errorMessage: privateBookError.message,
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
		[videoType, privateBookData, privateBookError, privateBookLoading],
	)

	const {
		data: publicVideoData,
		error: publicVideoError,
		loading: publicVideoLoading,
	} = useVideoPublic_Get({
		variables: { input: { id: videoId! } },
		skip: videoType !== 'public',
	})

	useEffect(
		function () {
			if (videoType !== 'public') return

			const video = publicVideoData?.video_public_get

			if (publicVideoLoading) {
				useVideoStore.getState().updatePublicVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPublicOutModel,
				})
			} else if (publicVideoError) {
				useVideoStore.getState().updatePublicVideo({
					loading: false,
					errorMessage: publicVideoError.message,
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
		[videoType, publicVideoData, publicVideoError, publicVideoLoading],
	)
}

function useClearDataOnUnmount() {
	useEffect(function () {
		useVideoStore.getState().clearStore()
	}, [])
}
