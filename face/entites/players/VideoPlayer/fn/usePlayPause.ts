import { useEffect, useMemo } from 'react'
import { useGetHotKeysHandler } from '@/shared/utils/hotKeysHandler'
import { usePlayerContext } from '../PlayerContext'
import type { PlayerCommand } from './types'

export function usePlayPause(
	playerWrapperRef: React.RefObject<HTMLDivElement | null>,
	getPlayerWrapperPressArea: (wrapper: HTMLDivElement, clientX: number) => 'left' | 'center' | 'right',
) {
	const { paused, sendCommand } = usePlayerContext()
	const nextCommand: PlayerCommand = useMemo(() => (paused ? { type: 'PLAY' } : { type: 'PAUSE' }), [paused])

	useGetHotKeysHandler({
		key: ' ',
		handler(e) {
			e.preventDefault()
			sendCommand(nextCommand)
		},
	})

	useEffect(() => {
		const wrapper = playerWrapperRef.current
		if (!wrapper) return

		wrapper.addEventListener('pointerup', handlePointerUp)

		function handlePointerUp(e: PointerEvent) {
			if (!wrapper) return

			const area = getPlayerWrapperPressArea(wrapper, e.clientX)
			if (area !== 'center') return

			sendCommand(nextCommand)
		}

		return () => {
			wrapper.removeEventListener('pointerup', handlePointerUp)
		}
	}, [playerWrapperRef, sendCommand, nextCommand, getPlayerWrapperPressArea])
}
