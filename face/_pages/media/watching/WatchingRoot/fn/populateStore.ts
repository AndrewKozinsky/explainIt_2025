import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
import type { VideoPrivateOutModel, VideoPublicOutModel } from '@/shared/api/generated/models'
import { useVideoPrivateControllerGetVideoPrivate } from '@/shared/api/generated/video-private/video-private'
import { useVideoPublicControllerGetVideoPublic } from '@/shared/api/generated/video-public/video-public'
import { useWatchingStore } from '../../watchingStore'
import { createPopulatedPlainText } from './createPopulatedPlainText'
import { createPopulatedSubtitles } from './createPopulatedText'

export function usePopulateWatchingStore() {
	useFetchVideoAndSetToStore()
	usePopulatedTextAndSetToStore()
}

function useFetchVideoAndSetToStore() {
	const urlVideoId = useParams().videoId as string
	const videoType = getMediaTypeByUrlMediaId(urlVideoId)
	const videoId = extractMediaIdFromUrlBookId(urlVideoId)

	const {
		data: privateVideoData,
		isError: privateVideoIsError,
		isLoading: privateVideoLoading,
	} = useVideoPrivateControllerGetVideoPrivate(videoId!, {
		query: { enabled: videoType === 'private' && !!videoId },
	})

	const {
		data: publicVideoData,
		isError: publicVideoIsError,
		isLoading: publicVideoLoading,
	} = useVideoPublicControllerGetVideoPublic(videoId!, {
		query: { enabled: videoType === 'public' && !!videoId },
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
				videoType === 'private'
					? (privateVideoData as unknown as VideoPrivateOutModel | undefined)
					: (publicVideoData as unknown as VideoPublicOutModel | undefined)
			const error = videoType === 'private' ? privateVideoIsError : publicVideoIsError
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
					errorMessage: 'Не удалось загрузить видео',
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
				let errorMessage: null | string = null
				if (!video.fileUrl) {
					errorMessage = 'Видео не загружено'
				}
				if (!video.originalContent) {
					errorMessage = 'Субтитры не загружены'
				}

				if (errorMessage) {
					useWatchingStore.getState().updateVideo({
						loading: false,
						errorMessage,
						data: null as any as VideoPrivateOutModel,
						type: videoType,
					})

					return
				}

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
			privateVideoIsError,
			privateVideoLoading,
			publicVideoData,
			publicVideoIsError,
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
