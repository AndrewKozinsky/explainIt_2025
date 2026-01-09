import { useCallback, useRef } from 'react'

type LongPressInput = {
	onLongPress: (e: React.SyntheticEvent) => void
	onClick?: (e: React.SyntheticEvent) => void
	delay: number
	vibrate: number | false
	getScrollContainer?: (e: React.SyntheticEvent) => HTMLElement | null
}

export function useLongPress(input: LongPressInput) {
	const { onLongPress, onClick, delay = 500, vibrate = 50, getScrollContainer } = input

	const timerRef = useRef<number | null>(null)
	const isLongPressRef = useRef(false)
	const isPressActiveRef = useRef(false)
	const isMovedRef = useRef(false)
	const touchStartRef = useRef<{ x: number; y: number } | null>(null)
	const windowTouchMoveHandlerRef = useRef<((e: TouchEvent) => void) | null>(null)
	const scrollContainerRef = useRef<HTMLElement | null>(null)
	const scrollHandlerRef = useRef<(() => void) | null>(null)

	function clearTimer() {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}

	function cleanupWindowTouchMoveListener() {
		if (typeof window === 'undefined') return
		if (windowTouchMoveHandlerRef.current) {
			window.removeEventListener('touchmove', windowTouchMoveHandlerRef.current)
			windowTouchMoveHandlerRef.current = null
		}
	}

	function cleanupScrollListener() {
		if (scrollContainerRef.current && scrollHandlerRef.current) {
			scrollContainerRef.current.removeEventListener('scroll', scrollHandlerRef.current)
		}
		scrollContainerRef.current = null
		scrollHandlerRef.current = null
	}

	function cancelAsMoved() {
		isMovedRef.current = true
		clearTimer()
		cleanupWindowTouchMoveListener()
		cleanupScrollListener()
	}

	const start = useCallback(
		(e: React.SyntheticEvent) => {
			isPressActiveRef.current = true
			isLongPressRef.current = false
			isMovedRef.current = false
			cleanupWindowTouchMoveListener()
			cleanupScrollListener()

			if ('touches' in e && Array.isArray((e as any).touches) && (e as any).touches.length > 0) {
				const touch = (e as any).touches[0]
				touchStartRef.current = { x: touch.clientX, y: touch.clientY }
			} else {
				touchStartRef.current = null
			}

			timerRef.current = window.setTimeout(() => {
				isLongPressRef.current = true

				// Хаптический отклик
				if (vibrate && navigator.vibrate) {
					navigator.vibrate(vibrate)
				}

				onLongPress(e)
			}, delay)

			if (getScrollContainer) {
				const scrollContainer = getScrollContainer(e)
				if (scrollContainer) {
					const onScroll = () => {
						cancelAsMoved()
					}
					scrollContainerRef.current = scrollContainer
					scrollHandlerRef.current = onScroll
					scrollContainer.addEventListener('scroll', onScroll, { passive: true })
				}
			}

			if (typeof window !== 'undefined' && touchStartRef.current) {
				const moveThreshold = 10
				const handler = (nativeEvent: TouchEvent) => {
					if (!touchStartRef.current) return
					if (!nativeEvent.touches || nativeEvent.touches.length === 0) return
					const touch = nativeEvent.touches[0]
					const dx = Math.abs(touch.clientX - touchStartRef.current.x)
					const dy = Math.abs(touch.clientY - touchStartRef.current.y)
					if (dx > moveThreshold || dy > moveThreshold) {
						cancelAsMoved()
					}
				}
				windowTouchMoveHandlerRef.current = handler
				window.addEventListener('touchmove', handler, { passive: true })
			}
		},
		[delay, getScrollContainer, onLongPress, vibrate],
	)

	const cancel = useCallback(
		(e: React.SyntheticEvent) => {
			if (!isPressActiveRef.current) return
			isPressActiveRef.current = false
			clearTimer()
			cleanupWindowTouchMoveListener()
			cleanupScrollListener()

			if (!isLongPressRef.current && !isMovedRef.current && onClick) {
				onClick(e)
			}
		},
		[onClick],
	)

	const cancelOnMouseLeave = useCallback(() => {
		if (!isPressActiveRef.current) return
		isPressActiveRef.current = false
		clearTimer()
		cleanupWindowTouchMoveListener()
		cleanupScrollListener()
	}, [])

	const move = useCallback((e: React.SyntheticEvent) => {
		if (!('touches' in e) || !touchStartRef.current) return
		if (!Array.isArray((e as any).touches) || (e as any).touches.length === 0) return

		const touch = (e as any).touches[0]
		const dx = Math.abs(touch.clientX - touchStartRef.current.x)
		const dy = Math.abs(touch.clientY - touchStartRef.current.y)
		const moveThreshold = 10

		if (dx > moveThreshold || dy > moveThreshold) {
			cancelAsMoved()
		}
	}, [])

	return {
		onMouseDown: start,
		onMouseUp: cancel,
		onMouseLeave: cancelOnMouseLeave,

		onTouchStart: start,
		onTouchMove: move,
		onTouchEnd: cancel,
		onTouchCancel: cancel,
	}
}
