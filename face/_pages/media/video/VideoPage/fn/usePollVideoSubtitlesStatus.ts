import { useEffect } from 'react'
import type { SubtitlesStatusModelType } from '@/entities/video/lib/types'
import { videosService } from '@/entities/video/VideosService'

const POLL_INTERVAL_MS = 2000

/**
 * Пока генерируются субтитры, каждые 2с опрашивает лёгкий эндпоинт
 * `getSubtitlesStatus` вместо повторной загрузки полных данных видео.
 *
 * Это принципиально: полный `refetch` возвращает новый преподписанный
 * `fileUrl` (S3 URL генерируется заново на каждый запрос), из-за чего
 * `<video>` перезагружался и страница мигала каждые 2 секунды.
 *
 * Опрос идёт, пока статус `pending` или `processing`. Как только статус
 * становится `done` / `failed` — единожды вызывается `refetch`, чтобы
 * подтянуть готовые субтитры, и интервал очищается.
 */
export function usePollVideoSubtitlesStatus(
	videoId: undefined | number,
	subtitlesStatus: undefined | SubtitlesStatusModelType,
	refetch: () => void,
) {
	const shouldPoll = videoId !== undefined && (subtitlesStatus === 'pending' || subtitlesStatus === 'processing')

	useEffect(
		function () {
			if (!shouldPoll || videoId === undefined) return

			let cancelled = false

			const intervalId = setInterval(async function () {
				try {
					const result = await videosService.getSubtitlesStatus(videoId)
					if (cancelled) return

					const status = result.data?.status
					if (status === 'done' || status === 'failed') {
						clearInterval(intervalId)
						refetch()
					}
				} catch {
					// Сетевая ошибка — пропускаем цикл, следующий интервал повторит запрос
				}
			}, POLL_INTERVAL_MS)

			return function () {
				cancelled = true
				clearInterval(intervalId)
			}
		},
		[shouldPoll, videoId, refetch],
	)
}
