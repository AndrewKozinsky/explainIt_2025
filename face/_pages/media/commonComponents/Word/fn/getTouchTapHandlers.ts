import type { MutableRefObject, TouchEvent } from 'react'

type TouchStartPos = {
	x: number
	y: number
}

type GetTouchTapHandlersInput = {
	thresholdPx: number
	onTap: () => void
	touchStartPosRef: MutableRefObject<TouchStartPos | null>
	touchMovedTooMuchRef: MutableRefObject<boolean>
}

function getTouchTapHandlers(input: GetTouchTapHandlersInput) {
	const { thresholdPx, onTap, touchStartPosRef, touchMovedTooMuchRef } = input

	function onTouchStart(e: TouchEvent<HTMLSpanElement>) {
		const t = e.touches[0]
		if (!t) return
		touchStartPosRef.current = { x: t.clientX, y: t.clientY }
		touchMovedTooMuchRef.current = false
	}

	function onTouchMove(e: TouchEvent<HTMLSpanElement>) {
		const start = touchStartPosRef.current
		const t = e.touches[0]
		if (!start || !t) return
		const dx = t.clientX - start.x
		const dy = t.clientY - start.y
		const dist = Math.hypot(dx, dy)
		if (dist > thresholdPx) touchMovedTooMuchRef.current = true
	}

	function onTouchEnd() {
		if (!touchMovedTooMuchRef.current) {
			onTap()
		}
		touchStartPosRef.current = null
		touchMovedTooMuchRef.current = false
	}

	function onTouchCancel() {
		touchStartPosRef.current = null
		touchMovedTooMuchRef.current = false
	}

	return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel }
}

export { getTouchTapHandlers }
