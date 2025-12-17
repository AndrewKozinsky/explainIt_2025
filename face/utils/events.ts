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
	const isLongPressRef = useRef(false)
	const preventMouseRef = useRef(false)
	const startPosRef = useRef<{ x: number; y: number } | null>(null)

	const start = useCallback(
		(e: React.SyntheticEvent) => {
			if (e.type === 'mousedown' && preventMouseRef.current) return
			if (e.type === 'touchstart') {
				preventMouseRef.current = true
				const touch = (e as unknown as React.TouchEvent).touches[0]
				startPosRef.current = { x: touch.clientX, y: touch.clientY }
			}

			if (e.persist) e.persist()

			isLongPressRef.current = false

			timerRef.current = window.setTimeout(() => {
				isLongPressRef.current = true

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

	const cancel = useCallback(
		(e: React.SyntheticEvent) => {
			if (e.type === 'mouseup' && preventMouseRef.current) {
				return
			}
			// Блокируем вызов onMouseLeave, если он произошел сразу после тача
			if (e.type === 'mouseleave' && preventMouseRef.current) {
				return
			}

			if (e.type === 'touchmove' && startPosRef.current) {
				const touch = (e as unknown as React.TouchEvent).touches[0]
				const moveThreshold = 10
				const diffX = Math.abs(touch.clientX - startPosRef.current.x)
				const diffY = Math.abs(touch.clientY - startPosRef.current.y)

				if (diffX < moveThreshold && diffY < moveThreshold) {
					return
				}
			}

			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}

			if (e.type === 'touchend' || e.type === 'touchcancel' || e.type === 'touchmove') {
				// Сбрасываем блокировку мыши через небольшую задержку, чтобы пропустить все эмулированные события
				setTimeout(() => {
					preventMouseRef.current = false
				}, 600)
			}

			if (e.type === 'touchmove') return

			if (!isLongPressRef.current && onClickRef.current) {
				onClickRef.current(e)
			}
		},
		[],
	)

	return {
		onMouseDown: start,
		onMouseUp: cancel,
		onMouseLeave: cancel,

		onTouchStart: start,
		onTouchEnd: cancel,
		onTouchCancel: cancel,
		onTouchMove: cancel,
	}
}
