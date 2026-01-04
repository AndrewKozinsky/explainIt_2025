import { PlayerCommand, useWatchingStore } from '_pages/video/watching/watchingStore'
import { useGetHotKeysHandler } from 'utils/hotKeysHandler'
import { useEffect, useMemo } from 'react'

export function usePlayerControl(playerWrapperRef: React.RefObject<HTMLDivElement | null>) {
	usePlayPause(playerWrapperRef)
	useRewind(playerWrapperRef)
}

function usePlayPause(playerWrapperRef: React.RefObject<HTMLDivElement | null>) {
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
			handlePlayPauseByPointer(e.clientX)
		}

		function handlePlayPauseByPointer(clientX: number) {
			if (!wrapper) return

			const area = getPlayerWrapperPressArea(wrapper, clientX)
			if (area !== 'center') return

			sendPlayerCommand(nextCommand)
		}

		return () => {
			wrapper.removeEventListener('pointerup', handlePointerUp)
		}
	}, [playerWrapperRef, sendPlayerCommand, nextCommand])
}

function useRewind(playerWrapperRef: React.RefObject<HTMLDivElement | null>) {
	//
}

function getPlayerWrapperPressArea(wrapper: HTMLDivElement, clientX: number): 'left' | 'center' | 'right' {
	const rect = wrapper.getBoundingClientRect()
	const x = clientX - rect.left
	const ratio = x / rect.width

	if (ratio < 0.3) return 'left'
	if (ratio <= 0.7) return 'center'
	return 'right'
}
