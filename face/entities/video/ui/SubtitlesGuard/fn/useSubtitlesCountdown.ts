import { useEffect, useState } from 'react'
import type { SubtitlesStatusModelType } from '@/entities/video/repository/VideosRepository'
import { formatDurationSec } from '@/shared/utils/time'

// Множитель, на который умножается длительность видео, чтобы получить
// длительность обратного отсчёта в секундах.
const COUNTDOWN_MULTIPLIER = 1

export function useSubtitlesCountdown(
	durationSeconds: number,
	subtitlesStatus: SubtitlesStatusModelType,
): null | string {
	const [remainingSeconds, setRemainingSeconds] = useState(() => Math.round(durationSeconds * COUNTDOWN_MULTIPLIER))

	useEffect(
		function () {
			if (!['pending', 'processing'].includes(subtitlesStatus)) return

			const interval = setInterval(function () {
				setRemainingSeconds(function (prevSeconds) {
					return prevSeconds - 1
				})
			}, 1000)

			return function () {
				clearInterval(interval)
			}
		},
		[subtitlesStatus],
	)

	if (subtitlesStatus !== 'pending' || remainingSeconds <= 0) {
		return null
	}

	return formatDurationSec(remainingSeconds)
}
