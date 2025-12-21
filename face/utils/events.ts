import { useCallback, useRef } from 'react'

type LongPressInput = {
	onLongPress: (e: React.SyntheticEvent) => void
	onClick?: (e: React.SyntheticEvent) => void
	delay: number
	vibrate: number | false
}

let globalPreventMouseUntil = 0
let globalTouchStartTime = 0
let globalDidLongPressFire = false

export function useLongPress(input: LongPressInput) {
	const { onLongPress, onClick, delay = 500, vibrate = 50 } = input

	const timerRef = useRef<number | null>(null)
	const isLongPressRef = useRef(false)
	const wasCancelledRef = useRef(false)
	const startXRef = useRef(0)
	const startYRef = useRef(0)

	const start = useCallback(
		(e: React.SyntheticEvent) => {
			if (e.type === 'touchstart') {
				globalPreventMouseUntil = Date.now() + 1500
				globalTouchStartTime = Date.now()
				globalDidLongPressFire = false

				const touch = (e as unknown as React.TouchEvent).touches[0]
				startXRef.current = touch.clientX
				startYRef.current = touch.clientY
			} else if (e.type === 'mousedown' && Date.now() < globalPreventMouseUntil) {
				return
			}

			if (timerRef.current) return

			isLongPressRef.current = false
			wasCancelledRef.current = false

			timerRef.current = window.setTimeout(() => {
				isLongPressRef.current = true
				globalDidLongPressFire = true
				timerRef.current = null

				// Хаптический отклик
				if (vibrate && navigator.vibrate) {
					navigator.vibrate(vibrate)
				}

				onLongPress(e)
			}, delay)
		},
		[onLongPress, delay, vibrate],
	)

	const onMove = useCallback((e: React.SyntheticEvent) => {
		if (e.type === 'touchmove' && timerRef.current) {
			const touch = (e as unknown as React.TouchEvent).touches[0]
			const x = touch.clientX
			const y = touch.clientY

			const dx = Math.abs(x - startXRef.current)
			const dy = Math.abs(y - startYRef.current)

			// Если палец сдвинулся более чем на 10px, считаем это скроллом/свайпом
			if (dx > 10 || dy > 10) {
				clearTimer()
				wasCancelledRef.current = true
			}
		}
	}, [])

	const clearTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}

	const onFinish = useCallback(
		(e: React.SyntheticEvent) => {
			if (e.type === 'touchend') {
				globalPreventMouseUntil = Date.now() + 1500
				e.preventDefault()
			} else if (e.type === 'mouseup' && Date.now() < globalPreventMouseUntil) {
				return
			}

			if (wasCancelledRef.current) {
				clearTimer()
				return
			}

			clearTimer()

			const isTouch = e.type === 'touchend'

			// Логика клика:
			// 1. Для тача: используем глобальный флаг. Если long press сработал (таймер выполнился),
			//    то флаг true и клик не нужен. Если флаг false, значит палец убрали до таймера -> клик.
			// 2. Для мыши: используем локальный ref.
			const shouldClick = isTouch ? !globalDidLongPressFire : !isLongPressRef.current

			if (shouldClick && onClick) {
				onClick(e)
			}
		},
		[onClick],
	)

	const onCancel = useCallback((e: React.SyntheticEvent) => {
		wasCancelledRef.current = true
		clearTimer()
	}, [])

	return {
		onMouseDown: start,
		onMouseUp: onFinish,
		onMouseLeave: onCancel,

		onTouchStart: start,
		onTouchMove: onMove,
		onTouchEnd: onFinish,
		onTouchCancel: onCancel,
	}
}
