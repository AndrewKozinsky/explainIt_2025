import { useEffect } from 'react'
import type { SubtitlesStatusModelType } from '@/entities/video/lib/types'

const POLL_INTERVAL_MS = 2000

/**
 * Перезапрашивает данные видео, пока генерируются субтитры.
 *
 * Принимает текущий статус субтитров и функцию перезапроса данных
 * активного источника видео (см. {@link useYouTubeVideoData}).
 * Пока статус `pending` или `processing` — каждые 2с вызывает `refetch`.
 * Когда статус меняется на `done` / `failed` / `idle` — интервал очищается.
 */
export function usePollVideoSubtitlesStatus(
	subtitlesStatus: undefined | SubtitlesStatusModelType,
	refetch: () => void,
) {
	const shouldPoll = subtitlesStatus === 'pending' || subtitlesStatus === 'processing'

	useEffect(
		function () {
			if (!shouldPoll) return

			const intervalId = setInterval(refetch, POLL_INTERVAL_MS)

			return function () {
				clearInterval(intervalId)
			}
		},
		[shouldPoll, refetch],
	)
}
