'use client'

import { useCallback, useEffect, useMemo } from 'react'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'
import { useYouTubeVideoStore } from '../../videoStore'
import { handleAutoStop, resetPlaybackRuntime } from './playback'
import { useVideoInput } from './useVideoInput'

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

		useYouTubeVideoStore.getState().setSubtitles(subtitleList)
		useYouTubeVideoStore.getState().setPlayback({ stopAt: null })
	}, [videoId, subtitleList])

	const command = useYouTubeVideoStore((state) => state.player.commandQueue[0] ?? null)

	const handleCommandHandled = useCallback((id: number) => {
		const queue = useYouTubeVideoStore.getState().player.commandQueue
		if (queue[0]?.id !== id) return

		useYouTubeVideoStore.getState().setPlayerState({ commandQueue: queue.slice(1) })
	}, [])

	// Авто-остановка по stopAt
	const currentTime = useYouTubeVideoStore((state) => state.player.currentTime)
	const stopAt = useYouTubeVideoStore((state) => state.playback.stopAt)

	useEffect(() => {
		if (stopAt == null || currentTime < stopAt) return

		handleAutoStop()
	}, [currentTime, stopAt])

	useVideoInput()

	return { command, handleCommandHandled }
}
