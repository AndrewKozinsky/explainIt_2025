import { playerControlConfig } from '_pages/video/watching/video/VideoRoot/fn/config'
import { usePlayPause } from './usePlayPause'
import { useRewind } from './useRewind'

export function usePlayerControl(playerWrapperRef: React.RefObject<HTMLDivElement | null>) {
	usePlayPause(playerWrapperRef, getPlayerWrapperPressArea)
	useRewind(playerWrapperRef, getPlayerWrapperPressArea, playerControlConfig)
}

export function getPlayerWrapperPressArea(wrapper: HTMLDivElement, clientX: number): 'left' | 'center' | 'right' {
	const rect = wrapper.getBoundingClientRect()
	const x = clientX - rect.left
	const ratio = x / rect.width

	if (ratio < 0.3) return 'left'
	if (ratio <= 0.7) return 'center'
	return 'right'
}
