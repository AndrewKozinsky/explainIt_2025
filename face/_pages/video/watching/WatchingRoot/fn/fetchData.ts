import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useVideoPrivate_Get, useVideoPublic_Get, VideoPrivateOutModel, VideoPublicOutModel } from '@/graphql'
import { useWatchingStore } from '../../watchingStore'
import { createPopulatedPlainText } from './createPopulatedPlainText'
import { createPopulatedSubtitles } from './createPopulatedText'
import { extractVideoIdFromUrlVideoId, getVideoTypeByUrlVideoId } from 'сonsts/pageUrls'

export function usePopulateWatchingStore() {
	useFetchVideoAndSetToStore()
	usePopulatedTextAndSetToStore()
}

function useFetchVideoAndSetToStore() {
	const urlVideoId = useParams().videoId as string
	const videoType = getVideoTypeByUrlVideoId(urlVideoId)
	const videoId = extractVideoIdFromUrlVideoId(urlVideoId)

	const {
		data: privateVideoData,
		error: privateVideoError,
		loading: privateVideoLoading,
	} = useVideoPrivate_Get({
		variables: { input: { id: videoId! } },
		skip: videoType !== 'private' || !videoId,
	})

	const {
		data: publicVideoData,
		error: publicVideoError,
		loading: publicVideoLoading,
	} = useVideoPublic_Get({
		variables: { input: { id: videoId! } },
		skip: videoType !== 'public' || !videoId,
	})

	useEffect(
		function () {
			if (!videoType || !videoId) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
					type: 'private',
				})
				return
			}

			const video =
				videoType === 'private' ? privateVideoData?.video_private_get : publicVideoData?.video_public_get
			const error = videoType === 'private' ? privateVideoError : publicVideoError
			const loading = videoType === 'private' ? privateVideoLoading : publicVideoLoading

			if (loading) {
				useWatchingStore.getState().updateVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
					type: videoType,
				})
			} else if (error) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: error.message,
					data: null as any as VideoPrivateOutModel,
					type: videoType,
				})
			} else if (!video) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
					type: videoType,
				})
			} else {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: video as VideoPrivateOutModel | VideoPublicOutModel,
					type: videoType,
				})
			}
		},
		[
			videoType,
			videoId,
			privateVideoData,
			privateVideoError,
			privateVideoLoading,
			publicVideoData,
			publicVideoError,
			publicVideoLoading,
		],
	)
}

function usePopulatedTextAndSetToStore() {
	const video = useWatchingStore((s) => s.video)

	useEffect(
		function () {
			const videoData = video?.data
			if (!videoData || !videoData.processedContent) return

			if (videoData.contentType === 'text') {
				const populatedPlainText = createPopulatedPlainText(videoData)
				useWatchingStore.getState().updateStore({ populatedPlainText })
			}

			if (videoData.contentType === 'subtitles') {
				const populatedSubtitles = createPopulatedSubtitles(videoData)
				useWatchingStore.getState().updateStore({ populatedSubtitles })
			}
		},
		[video],
	)
}
