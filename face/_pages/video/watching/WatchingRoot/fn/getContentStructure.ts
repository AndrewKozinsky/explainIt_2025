import { useEffect } from 'react'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import { ResolvedSubtitlesStructure } from '_pages/video/watching/common/resolvedSubtitlesStructure'
import { ResolvedTextStructure } from '_pages/video/watching/common/resolvedTextStructure'
import { useVideoPrivate_Get, VideoPrivateOutModel } from '@/graphql'
import { useParams } from 'next/navigation'
import { useWatchingStore } from '../../watchingStore'
import { sentenceToParts } from './sentenceToParts'

export function usePopulateWatchingStore() {
	useFetchVideoAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
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

function useCreatePopulatedChapterAndSetToStore() {
	const video = useWatchingStore((s) => s.video)

	useEffect(
		function () {
			const videoData = video?.data
			if (!videoData || !videoData.resolvedText) return

			const resolvedTextStructure = JSON.parse(videoData.resolvedText) as
				| ResolvedTextStructure.Structure
				| ResolvedSubtitlesStructure.Structure

			if (resolvedTextStructure.type === 'plainText') {
				const populatedPlainText: PopulatedTextStructure.Structure = {
					sentences: resolvedTextStructure.sentences.map((resolvedSentence, i) => {
						return {
							id: i,
							parts: sentenceToParts(resolvedSentence.s),
							translation: resolvedSentence.t,
						}
					}),
					selected: {
						sentenceId: null,
						wordIds: [],
					},
				}

				useWatchingStore.getState().updateStore({ populatedPlainText })
			}
		},
		[video],
	)
}
