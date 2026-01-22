import { PlayerCommand, useWatchingStore } from '_pages/video/watching/watchingStore'
import { useGetHotKeysHandler } from 'utils/hotKeysHandler'
import { useEffect, useMemo } from 'react'

export function usePlayPause(
	playerWrapperRef: React.RefObject<HTMLDivElement | null>,
	getPlayerWrapperPressArea: (wrapper: HTMLDivElement, clientX: number) => 'left' | 'center' | 'right',
) {
	const isPaused = useWatchingStore((s) => s.player.paused)
	const sendPlayerCommand = useWatchingStore((s) => s.sendPlayerCommand)
	const nextCommand: PlayerCommand = useMemo(() => (isPaused ? { type: 'PLAY' } : { type: 'PAUSE' }), [isPaused])

	useGetHotKeysHandler({
		key: ' ',
		handler(e) {
			e.preventDefault()
			sendPlayerCommand(nextCommand)
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

			sendPlayerCommand(nextCommand)
		}

		return () => {
			wrapper.removeEventListener('pointerup', handlePointerUp)
		}
	}, [playerWrapperRef, sendPlayerCommand, nextCommand, getPlayerWrapperPressArea])
}
