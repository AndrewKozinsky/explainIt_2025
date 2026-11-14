'use client'

import { useEffect, useRef } from 'react'

/** Доступ к часам и паузе конкретного проигрывателя. */
export type AutoStopPlayer = {
	isPlaying: () => boolean
	getCurrentTime: () => number
	getPlaybackRate: () => number
	pause: () => void
}

type UseAutoStopParams = {
	/** Время видео (сек), на котором нужно остановиться. null — авто-остановки нет. */
	stopAt: null | number | undefined
	/** Возвращает проигрыватель или null, если он ещё не готов. */
	getPlayer: () => null | AutoStopPlayer
	onStopAtReached?: () => void
}

/** Как часто сверяться с часами проигрывателя, пока до остановки далеко. */
const CLOCK_CHECK_INTERVAL_MS = 50

/**
 * Останавливает проигрыватель точно на stopAt.
 *
 * Пауза ставится напрямую из таймера, заведённого на оставшееся до stopAt время, а не по факту
 * «время уже прошло stopAt»: иначе к остановке добавляются шаг опроса времени и рендер React,
 * и слышно начало следующего субтитра.
 */
export function useAutoStop(params: UseAutoStopParams) {
	const { stopAt } = params

	const getPlayerRef = useRef(params.getPlayer)
	getPlayerRef.current = params.getPlayer

	const onStopAtReachedRef = useRef(params.onStopAtReached)
	onStopAtReachedRef.current = params.onStopAtReached

	useEffect(() => {
		if (stopAt == null) return

		const targetTime = stopAt
		let timerId: null | ReturnType<typeof setTimeout> = null

		function scheduleCheck(delayMs: number) {
			timerId = setTimeout(checkClock, delayMs)
		}

		function checkClock() {
			const player = getPlayerRef.current()

			if (!player || !player.isPlaying()) {
				scheduleCheck(CLOCK_CHECK_INTERVAL_MS)
				return
			}

			const playbackRate = player.getPlaybackRate() || 1
			const msUntilPause = ((targetTime - player.getCurrentTime()) / playbackRate) * 1000

			if (msUntilPause > 0) {
				// Последнее ожидание равно остатку, поэтому пауза не опаздывает на шаг опроса.
				scheduleCheck(Math.min(msUntilPause, CLOCK_CHECK_INTERVAL_MS))
				return
			}

			player.pause()

			// Владельца оповещаем отдельной задачей. Пауза YouTube — это postMessage в iframe, и браузер
			// отправляет его только после завершения текущей задачи. Если в ней же обновить стор,
			// синхронный перерендер страницы задержит паузу на всё время рендера.
			timerId = setTimeout(notifyStopAtReached, 0)
		}

		function notifyStopAtReached() {
			timerId = null
			onStopAtReachedRef.current?.()
		}

		checkClock()

		return () => {
			if (timerId != null) clearTimeout(timerId)
		}
	}, [stopAt])
}
