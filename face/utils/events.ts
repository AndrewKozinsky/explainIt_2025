import { useCallback, useRef } from 'react'

type LongPressInput = {
	onLongPress: (e: React.SyntheticEvent) => void
	onClick?: (e: React.SyntheticEvent) => void
	delay: number
	vibrate: number | false
}

export function useLongPress(input: LongPressInput) {
	const { onLongPress, onClick, delay = 500, vibrate = 50 } = input

	const onLongPressRef = useRef(onLongPress)
	const onClickRef = useRef(onClick)
	
	onLongPressRef.current = onLongPress
	onClickRef.current = onClick

	const timerRef = useRef<number | null>(null)
	const startPosRef = useRef<{ x: number; y: number } | null>(null)

	const start = useCallback(
		(e: React.PointerEvent) => {
			if (e.pointerType === 'mouse' && e.button !== 0) return
			if (e.persist) e.persist()

			// Захватываем указатель, чтобы отслеживать движение за пределами элемента
			const target = e.target as HTMLElement
			if (target.setPointerCapture) {
				target.setPointerCapture(e.pointerId)
			}

			startPosRef.current = { x: e.clientX, y: e.clientY }

			timerRef.current = window.setTimeout(() => {
				timerRef.current = null

				// Хаптический отклик
				if (vibrate && navigator.vibrate) {
					try {
						navigator.vibrate(vibrate)
					} catch (e) {
						// Ignore vibration errors
					}
				}

				onLongPressRef.current(e)
			}, delay)
		},
		[delay, vibrate],
	)

	const move = useCallback((e: React.PointerEvent) => {
		if (timerRef.current && startPosRef.current) {
			const moveThreshold = 10
			const diffX = Math.abs(e.clientX - startPosRef.current.x)
			const diffY = Math.abs(e.clientY - startPosRef.current.y)

			if (diffX > moveThreshold || diffY > moveThreshold) {
				if (timerRef.current) {
					clearTimeout(timerRef.current)
					timerRef.current = null
				}
			}
		}
	}, [])

	const end = useCallback(
		(e: React.PointerEvent) => {
			const target = e.target as HTMLElement
			if (target.releasePointerCapture) {
				target.releasePointerCapture(e.pointerId)
			}

			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
				// Если таймер не сработал (и не был отменен движением), значит это клик
				onClickRef.current?.(e)
			}
		},
		[],
	)

	const cancel = useCallback((e: React.PointerEvent) => {
		const target = e.target as HTMLElement
		if (target.releasePointerCapture) {
			target.releasePointerCapture(e.pointerId)
		}

		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}, [])

	return {
		onPointerDown: start,
		onPointerUp: end,
		onPointerCancel: cancel,
		onPointerMove: move,
	}
}
