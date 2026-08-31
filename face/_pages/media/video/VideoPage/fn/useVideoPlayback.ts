'use client'

import { useCallback, useEffect, useMemo } from 'react'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'
import { resetPlaybackRuntime } from '_pages/media/video/VideoPage/fn/playback/playback'
import { useVideoStore } from '../../videoStore'
// import { useVideoInput } from './useVideoInput'

type UseVideoPlaybackParams = {
	videoId: number
	subtitles: null | VideoSubtitlesModel.Structure
}

export function useVideoPlayback(params: UseVideoPlaybackParams) {
	const { videoId, subtitles } = params

	const subtitleList = useMemo(
		() => subtitles?.subtitles.filter((item) => item.type === 'subtitle') ?? null,
		[subtitles],
	)

	// При смене видео: обновляем субтитры и гасим авто-остановку/шэдоуинг,
	// но сохраняем выбранный режим (чтобы подсветка активной кнопки не пропадала).
	useEffect(() => {
		resetPlaybackRuntime()

		useVideoStore.getState().setSubtitles(subtitleList)
		useVideoStore.getState().setPlayback({ stopAt: null })
	}, [videoId, subtitleList])

	const command = useVideoStore((state) => state.player.commandQueue[0] ?? null)

	const handleCommandHandled = useCallback((id: number) => {
		const queue = useVideoStore.getState().player.commandQueue
		if (queue[0]?.id !== id) return

		useVideoStore.getState().setPlayerState({ commandQueue: queue.slice(1) })
	}, [])

	// Авто-остановка по stopAt
	// const currentTime = useVideoStore((state) => state.player.currentTime)
	// const stopAt = useVideoStore((state) => state.playback.stopAt)

	/*useEffect(() => {
		if (stopAt == null || currentTime < stopAt) return

		handleAutoStop()
	}, [currentTime, stopAt])*/

	// useVideoInput()

	return { command, handleCommandHandled }
}
