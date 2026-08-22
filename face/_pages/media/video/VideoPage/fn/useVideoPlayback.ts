'use client'

import { useEffect, useMemo } from 'react'
import type { RefObject } from 'react'
import type { VideoPlayerHandle } from '@/entities/players/VideoPlayer/VideoPlayer'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'
import { useYouTubeVideoStore } from '../../videoStore'
import { handleAutoStop, resetPlaybackRuntime } from './playback'
import { useVideoInput } from './useVideoInput'

type UseVideoPlaybackParams = {
	videoId: number
	subtitles: null | VideoSubtitlesModel.Structure
	playerRef: RefObject<VideoPlayerHandle | null>
}

export function useVideoPlayback(params: UseVideoPlaybackParams) {
	const { videoId, subtitles, playerRef } = params

	const subtitleList = useMemo(
		() => subtitles?.subtitles.filter((item) => item.type === 'subtitle') ?? null,
		[subtitles],
	)

	// При смене видео: обновляем субтитры и гасим авто-остановку/шэдоуинг,
	// но сохраняем выбранный режим (чтобы подсветка активной кнопки не пропадала).
	useEffect(() => {
		resetPlaybackRuntime()
		useYouTubeVideoStore.getState().setSubtitles(subtitleList)
		useYouTubeVideoStore.getState().setPlayback({ stopAt: null })
	}, [videoId, subtitleList])

	// Мост: очередь команд из стора → плеер (по одной за проход эффекта)
	const commandQueue = useYouTubeVideoStore((state) => state.player.commandQueue)
	useEffect(() => {
		if (commandQueue.length === 0) return

		const [head, ...rest] = commandQueue

		useYouTubeVideoStore.getState().setPlayerState({ commandQueue: rest })
		playerRef.current?.sendCommand(head)
	}, [commandQueue, playerRef])

	// Авто-остановка по stopAt
	const currentTime = useYouTubeVideoStore((state) => state.player.currentTime)
	const stopAt = useYouTubeVideoStore((state) => state.playback.stopAt)

	useEffect(() => {
		if (stopAt == null || currentTime < stopAt) return

		handleAutoStop()
	}, [currentTime, stopAt])

	useVideoInput()
}
