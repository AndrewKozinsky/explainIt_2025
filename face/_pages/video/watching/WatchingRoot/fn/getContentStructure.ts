import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
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
			if (!videoData || !videoData.resolvedText) return

			const resolvedTextStructure = JSON.parse(videoData.resolvedText) as
				| ResolvedTextStructure.Structure
				| ResolvedSubtitlesStructure.Structure

			if (resolvedTextStructure.type === 'plainText') {
				const populatedPlainText = createPopulatedPlainText(resolvedTextStructure)
				useWatchingStore.getState().updateStore({ populatedPlainText })
			}

			if (resolvedTextStructure.type === 'subtitles') {
				const populatedSubtitles = createPopulatedSubtitles(resolvedTextStructure)
				useWatchingStore.getState().updateStore({ populatedSubtitles })
			}
		},
		[video],
	)
}

function createPopulatedPlainText(
	resolvedTextStructure: ResolvedTextStructure.Structure,
): PopulatedTextStructure.Structure {
	return {
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
}

function createPopulatedSubtitles(
	resolvedSubtitlesStructure: ResolvedSubtitlesStructure.Structure,
): PopulatedSubtitlesStructure.Structure {
	const subtitles = createSubtitlesWithSpeechlessBars(resolvedSubtitlesStructure)

	return {
		subtitles,
		sentences: resolvedSubtitlesStructure.sentences.map((resolvedSentence, i) => {
			return {
				id: i,
				text: sentenceToParts(resolvedSentence.s),
				translation: resolvedSentence.t,
			}
		}),
		selected: {
			subtitleId: null,
			wordIds: [],
		},
		playingSubtitleOrSpeechlessBarId: 0,
	}
}

function createSubtitlesWithSpeechlessBars(
	resolvedSubtitlesStructure: ResolvedSubtitlesStructure.Structure,
): PopulatedSubtitlesStructure.Structure['subtitles'] {
	const subtitles: PopulatedSubtitlesStructure.Structure['subtitles'] = []
	let id = 0
	let prevEndMs = 0

	for (let i = 0; i < resolvedSubtitlesStructure.subtitles.length; i++) {
		const subtitle = resolvedSubtitlesStructure.subtitles[i]
		const fromMs = timeCodeToMs(subtitle.from)
		const toMs = timeCodeToMs(subtitle.to)

		if (fromMs > prevEndMs) {
			subtitles.push({
				type: 'speechlessBar',
				id: id,
				fromSeconds: prevEndMs / 1000,
				toSeconds: fromMs / 1000,
			})
			id += 1
		}

		subtitles.push({
			type: 'subtitle',
			id: id,
			from: subtitle.from,
			fromSeconds: fromMs / 1000,
			to: subtitle.to,
			toSeconds: toMs / 1000,
			texts: subtitle.ts.map((text) => {
				return {
					textParts: sentenceToParts(text.t),
					sentenceId: text.sId,
				}
			}),
		})

		id += 1
		prevEndMs = Math.max(prevEndMs, toMs)
	}

	return subtitles
}

function timeCodeToMs(timecode: string): number {
	const trimmed = timecode.trim()
	const match = trimmed.match(/^(\d+):(\d{2}):(\d{2})(?:[,.](\d{1,3}))?$/)
	if (!match) return 0

	const hours = parseInt(match[1])
	const minutes = parseInt(match[2])
	const seconds = parseInt(match[3])
	const msStr = match[4] ?? '0'
	const millis = parseInt(msStr.padEnd(3, '0'))

	return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000 + millis
}
