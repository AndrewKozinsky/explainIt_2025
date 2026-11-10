import { useRef } from 'react'
import type { TouchEvent } from 'react'

/** Насколько палец может сдвинуться, чтобы касание ещё считалось нажатием, а не прокруткой. */
const TAP_MOVE_THRESHOLD_PX = 5

/**
 * Нажатие пальцем на слово. Если палец сдвинулся дальше порога (пользователь прокручивал страницу), нажатия нет.
 * После касания браузер сам вызвал бы click; он подавляется, чтобы прокрутка с небольшим сдвигом не выбирала слово.
 * Мышь и клавиатура по-прежнему работают через click.
 */
export function useTouchTap() {
	const touchStartPositionRef = useRef<null | { x: number; y: number }>(null)
	const hasMovedTooFarRef = useRef(false)

	function resetTouch() {
		touchStartPositionRef.current = null
		hasMovedTooFarRef.current = false
	}

	function handleTouchStart(event: TouchEvent) {
		const touch = event.touches[0]
		if (!touch) return

		touchStartPositionRef.current = { x: touch.clientX, y: touch.clientY }
		hasMovedTooFarRef.current = false
	}

	function handleTouchMove(event: TouchEvent) {
		const startPosition = touchStartPositionRef.current
		const touch = event.touches[0]
		if (!startPosition || !touch) return

		const distance = Math.hypot(touch.clientX - startPosition.x, touch.clientY - startPosition.y)
		if (distance > TAP_MOVE_THRESHOLD_PX) hasMovedTooFarRef.current = true
	}

	function handleTouchEnd(event: TouchEvent, onTap: () => void) {
		const isTap = touchStartPositionRef.current !== null && !hasMovedTooFarRef.current

		// Без этого после касания пришёл бы click и выбрал слово ещё раз — или выбрал бы его после прокрутки.
		if (event.cancelable) event.preventDefault()
		if (isTap) onTap()

		resetTouch()
	}

	return { handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel: resetTouch }
}
