// import { useRef } from 'react'
// import { getTouchTapHandlers } from './getTouchTapHandlers'

/*type UseWordSelectHandlersInput = {
	deviceType: string
	thresholdPx: number
	onSelect: () => void
}*/

/*function useWordSelectHandlers(input: UseWordSelectHandlersInput) {
	const { deviceType, thresholdPx, onSelect } = input

	const touchStartPosRef = useRef<{ x: number; y: number } | null>(null)
	const touchMovedTooMuchRef = useRef(false)

	const { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = getTouchTapHandlers({
		thresholdPx,
		onTap: onSelect,
		touchStartPosRef,
		touchMovedTooMuchRef,
	})

	function onClick() {
		if (deviceType === 'touch') return
		onSelect()
	}

	return { onClick, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel }
}*/

// export { useWordSelectHandlers }
