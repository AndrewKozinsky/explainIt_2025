// 'use client'

import { useEffect, useRef } from 'react'
import { playerControlConfig } from '@/entities/videoPlayer'
import { useGetHotKeysHandler } from '@/shared/utils/hotKeysHandler'
import {
	rewind,
	startForwardHold,
	startReverseSeek,
	stopForwardHold,
	stopReverseSeek,
	toggleCurrentMode,
} from './playback'

const VIDEO_ROOT_SELECTOR = '.video-root'
const PROGRESS_SELECTOR = '.video-root__progress'

type PressArea = 'left' | 'center' | 'right'

export function useVideoInput() {
	// Пробел — переключение текущего режима
	useGetHotKeysHandler({
		key: ' ',
		handler(e) {
			e.preventDefault()
			toggleCurrentMode()
		},
	})

	// Стрелки — перемотка
	useGetHotKeysHandler({
		key: 'ArrowLeft',
		handler(e) {
			e.preventDefault()
			const seconds = e.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			rewind(-seconds)
		},
	})

	useGetHotKeysHandler({
		key: 'ArrowRight',
		handler(e) {
			e.preventDefault()
			const seconds = e.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			rewind(seconds)
		},
	})

	const pointerDownRef = useRef<null | {
		pointerId: number
		clientX: number
		clientY: number
		area: 'left' | 'right'
		shiftKey: boolean
		pointerType: string
	}>(null)

	const longPressTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null)
	const longPressModeRef = useRef<'none' | 'forward2x' | 'reverse2x'>('none')

	useEffect(() => {
		function clearLongPressTimeout() {
			if (!longPressTimeoutRef.current) return
			clearTimeout(longPressTimeoutRef.current)
			longPressTimeoutRef.current = null
		}

		function disableFastRateIfEnabled() {
			if (longPressModeRef.current === 'forward2x') stopForwardHold()
			if (longPressModeRef.current === 'reverse2x') stopReverseSeek()
			longPressModeRef.current = 'none'
		}

		function resetState() {
			clearLongPressTimeout()
			disableFastRateIfEnabled()
			pointerDownRef.current = null
		}

		function handlePointerDown(e: PointerEvent) {
			if (isProgressTarget(e.target)) return
			if (e.pointerType === 'mouse' && e.button !== 0) return

			const wrapper = getWrapper(e.target)
			if (!wrapper) return

			const area = getPressArea(wrapper, e.clientX)
			if (area === 'center') return
			if (e.pointerType !== 'mouse') e.preventDefault()

			pointerDownRef.current = {
				pointerId: e.pointerId,
				clientX: e.clientX,
				clientY: e.clientY,
				area,
				shiftKey: e.shiftKey,
				pointerType: e.pointerType,
			}

			clearLongPressTimeout()
			longPressTimeoutRef.current = setTimeout(() => {
				const down = pointerDownRef.current
				if (!down) return
				if (down.area === 'right') {
					longPressModeRef.current = 'forward2x'
					startForwardHold(playerControlConfig.forwardHoldSpeed)
				}
				if (down.area === 'left') {
					longPressModeRef.current = 'reverse2x'
					startReverseSeek(playerControlConfig.reverseHoldSpeed)
				}
			}, playerControlConfig.longPressDelayMs)
		}

		function handleContextMenu(e: MouseEvent) {
			const down = pointerDownRef.current
			if (!down) return
			if (down.pointerType === 'mouse') return
			e.preventDefault()
		}

		function handlePointerUp(e: PointerEvent) {
			if (isProgressTarget(e.target)) return

			const wrapper = getWrapper(e.target)
			if (!wrapper) return

			// Центр — переключение режима (не зависит от pointerDown)
			if (getPressArea(wrapper, e.clientX) === 'center') {
				const down = pointerDownRef.current
				if (down && down.pointerId === e.pointerId) resetState()
				toggleCurrentMode()
				return
			}

			const down = pointerDownRef.current
			if (!down || down.pointerId !== e.pointerId) return

			clearLongPressTimeout()
			const wasLongPress = longPressModeRef.current !== 'none'
			disableFastRateIfEnabled()
			if (wasLongPress) {
				pointerDownRef.current = null
				return
			}

			const deltaX = Math.abs(e.clientX - down.clientX)
			const deltaY = Math.abs(e.clientY - down.clientY)
			if (
				deltaX > playerControlConfig.cursorMoveThresholdPx ||
				deltaY > playerControlConfig.cursorMoveThresholdPx
			) {
				pointerDownRef.current = null
				return
			}

			const seconds = down.shiftKey ? playerControlConfig.rewindSecondsShift : playerControlConfig.rewindSeconds
			const direction = down.area === 'left' ? -1 : 1
			rewind(seconds * direction)
			pointerDownRef.current = null
		}

		function handlePointerCancel(e: PointerEvent) {
			const down = pointerDownRef.current
			if (!down || down.pointerId !== e.pointerId) return

			resetState()
		}

		document.addEventListener('pointerdown', handlePointerDown)
		document.addEventListener('pointerup', handlePointerUp)
		document.addEventListener('pointercancel', handlePointerCancel)
		document.addEventListener('contextmenu', handleContextMenu)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
			document.removeEventListener('pointerup', handlePointerUp)
			document.removeEventListener('pointercancel', handlePointerCancel)
			document.removeEventListener('contextmenu', handleContextMenu)
			resetState()
		}
	}, [])
}

function getWrapper(target: EventTarget | null): HTMLElement | null {
	if (!(target instanceof HTMLElement)) return null
	return target.closest(VIDEO_ROOT_SELECTOR)
}

function isProgressTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false
	return target.closest(PROGRESS_SELECTOR) !== null
}

function getPressArea(wrapper: HTMLElement, clientX: number): PressArea {
	const rect = wrapper.getBoundingClientRect()
	const ratio = (clientX - rect.left) / rect.width
	if (ratio < 0.3) return 'left'
	if (ratio <= 0.7) return 'center'
	return 'right'
}
