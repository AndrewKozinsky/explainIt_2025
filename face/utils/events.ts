import { useCallback, useRef } from 'react'

type LongPressInput = {
	onLongPress: (e: React.SyntheticEvent) => void
	onClick?: (e: React.SyntheticEvent) => void
	delay: number
	vibrate: number | false
}

export function useLongPress(input: LongPressInput) {
	const { onLongPress, onClick, delay = 500, vibrate = 50 } = input

	const timerRef = useRef<number | null>(null)
	const isLongPressRef = useRef(false)

	const start = useCallback(
		(e: React.SyntheticEvent) => {
			isLongPressRef.current = false

			timerRef.current = window.setTimeout(() => {
				isLongPressRef.current = true

				// Хаптический отклик
				if (vibrate && navigator.vibrate) {
					navigator.vibrate(vibrate)
				}

				onLongPress(e)
			}, delay)
		},
		[onLongPress, delay, vibrate],
	)

	const cancel = useCallback(
		(e: React.SyntheticEvent) => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}

			if (!isLongPressRef.current && onClick) {
				onClick(e)
			}
		},
		[onClick],
	)

	return {
		onMouseDown: start,
		onMouseUp: cancel,
		onMouseLeave: cancel,

		onTouchStart: start,
		onTouchEnd: cancel,
		onTouchCancel: cancel,
	}
}
