// 'use client'

import {
	playSub,
	playSubAndRevert,
	playVideoShadowing,
	stopOrPlayVideo,
	toNextSub,
	toPrevSub,
	toVideoStart,
} from '_pages/media/video/VideoPage/fn/playback/playback'
import { useVideoStore } from '../../videoStore'

export function useVideoControls() {
	const activeMode = useVideoStore((state) => state.playback.mode)
	const areSubsAvailable = useVideoStore((state) => state.subtitles !== null)

	return {
		activeMode,
		areSubsAvailable,
		toVideoStart,
		stopOrPlayVideo,
		playVideoShadowing,
		toPrevSub,
		playSubAndRevert,
		playSub,
		toNextSub,
	}
}
