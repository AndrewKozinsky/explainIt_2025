import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useGetHotKeysHandler } from 'utils/hotKeysHandler'
import { useEffect, useRef } from 'react'
import { PlayerControlConfig } from './config'

export function useRewind(
	playerWrapperRef: React.RefObject<HTMLDivElement | null>,
	getPlayerWrapperPressArea: (wrapper: HTMLDivElement, clientX: number) => 'left' | 'center' | 'right',
	playerControlConfig: PlayerControlConfig,
) {
	const sendPlayerCommand = useWatchingStore((s) => s.sendPlayerCommand)

	useGetHotKeysHandler({
		key: 'ArrowLeft',
		handler(e) {
			e.preventDefault()
			const seconds = e.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			sendPlayerCommand({ type: 'REWIND', seconds: -seconds })
		},
	})

	useGetHotKeysHandler({
		key: 'ArrowRight',
		handler(e) {
			e.preventDefault()
			const seconds = e.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			sendPlayerCommand({ type: 'REWIND', seconds })
		},
	})

	const pointerDownDataRef = useRef<null | {
		pointerId: number
		clientX: number
		clientY: number
		area: 'left' | 'center' | 'right'
		shiftKey: boolean
		pointerType: string
	}>(null)

	const longPressTimeoutIdRef = useRef<null | ReturnType<typeof setTimeout>>(null)
	const longPressModeRef = useRef<'none' | 'forward2x' | 'reverse2x'>('none')

	useEffect(() => {
		const wrapper = playerWrapperRef.current
		if (!wrapper) return

		function clearLongPressTimeout() {
			if (!longPressTimeoutIdRef.current) return
			clearTimeout(longPressTimeoutIdRef.current)
			longPressTimeoutIdRef.current = null
		}

		function disableFastRateIfEnabled() {
			if (longPressModeRef.current === 'none') return
			if (longPressModeRef.current === 'forward2x') {
				sendPlayerCommand({ type: 'STOP_FORWARD_HOLD' })
			}
			if (longPressModeRef.current === 'reverse2x') {
				sendPlayerCommand({ type: 'STOP_REVERSE_SEEK' })
			}
			longPressModeRef.current = 'none'
		}

		function resetState() {
			clearLongPressTimeout()
			disableFastRateIfEnabled()
			pointerDownDataRef.current = null
		}

		function handlePointerDown(e: PointerEvent) {
			if ((e.pointerType === 'mouse' && e.button !== 0) || !wrapper) return

			const area = getPlayerWrapperPressArea(wrapper, e.clientX)
			if (area === 'center') return
			if (e.pointerType !== 'mouse') e.preventDefault()

			pointerDownDataRef.current = {
				pointerId: e.pointerId,
				clientX: e.clientX,
				clientY: e.clientY,
				area,
				shiftKey: e.shiftKey,
				pointerType: e.pointerType,
			}

			try {
				wrapper.setPointerCapture(e.pointerId)
			} catch {
				// ignore
			}

			clearLongPressTimeout()
			longPressTimeoutIdRef.current = setTimeout(() => {
				const down = pointerDownDataRef.current
				if (!down) return
				if (down.area === 'right') {
					longPressModeRef.current = 'forward2x'
					sendPlayerCommand({ type: 'START_FORWARD_HOLD', rate: playerControlConfig.forwardHoldSpeed })
				}
				if (down.area === 'left') {
					longPressModeRef.current = 'reverse2x'
					sendPlayerCommand({ type: 'START_REVERSE_SEEK', rate: playerControlConfig.forwardHoldSpeed })
				}
			}, playerControlConfig.longPressDelayMs)
		}

		function handleContextMenu(e: MouseEvent) {
			const down = pointerDownDataRef.current
			if (!down) return
			if (down.area === 'center') return
			if (down.pointerType === 'mouse') return
			e.preventDefault()
		}

		function handlePointerUp(e: PointerEvent) {
			const down = pointerDownDataRef.current
			if (!down) return
			if (down.pointerId !== e.pointerId) return

			clearLongPressTimeout()
			const wasLongPress = longPressModeRef.current !== 'none'
			disableFastRateIfEnabled()
			if (wasLongPress) {
				pointerDownDataRef.current = null
				return
			}

			const deltaX = Math.abs(e.clientX - down.clientX)
			const deltaY = Math.abs(e.clientY - down.clientY)
			if (
				deltaX > playerControlConfig.cursorMoveThresholdPx ||
				deltaY > playerControlConfig.cursorMoveThresholdPx
			) {
				pointerDownDataRef.current = null
				return
			}

			const seconds = down.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			const direction = down.area === 'left' ? -1 : 1
			sendPlayerCommand({ type: 'REWIND', seconds: seconds * direction })

			pointerDownDataRef.current = null
		}

		function handlePointerCancel(e: PointerEvent) {
			const down = pointerDownDataRef.current
			if (!down) return
			if (down.pointerId !== e.pointerId) return
			resetState()
		}

		wrapper.addEventListener('pointerdown', handlePointerDown)
		wrapper.addEventListener('pointerup', handlePointerUp)
		wrapper.addEventListener('pointercancel', handlePointerCancel)
		wrapper.addEventListener('contextmenu', handleContextMenu)

		return () => {
			wrapper.removeEventListener('pointerdown', handlePointerDown)
			wrapper.removeEventListener('pointerup', handlePointerUp)
			wrapper.removeEventListener('pointercancel', handlePointerCancel)
			wrapper.removeEventListener('contextmenu', handleContextMenu)
			resetState()
		}
	}, [playerWrapperRef, sendPlayerCommand, getPlayerWrapperPressArea, playerControlConfig])
}
