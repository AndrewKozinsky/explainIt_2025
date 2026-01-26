import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useVideoPrivate_Get, VideoPrivateOutModel } from '@/graphql'
import { useWatchingStore } from '../../watchingStore'
import { createPopulatedPlainText } from './createPopulatedPlainText'
import { createPopulatedSubtitles } from './createPopulatedText'

export function usePopulateWatchingStore() {
	useFetchVideoAndSetToStore()
	usePopulatedTextAndSetToStore()
}

function useFetchVideoAndSetToStore() {
	const videoIdStr = useParams().videoId as string
	const videoId = parseInt(videoIdStr)

	const { data, error, loading } = useVideoPrivate_Get({ variables: { input: { id: videoId! } } })

	useEffect(
		function () {
			const video = data?.video_private_get

			if (loading) {
				useWatchingStore.getState().updateVideo({
					loading: true,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (error) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: error.message,
					data: null as any as VideoPrivateOutModel,
				})
			} else if (!video) {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: null as any as VideoPrivateOutModel,
				})
			} else {
				useWatchingStore.getState().updateVideo({
					loading: false,
					errorMessage: null,
					data: video,
				})
			}
		},
		[data, error, loading],
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
