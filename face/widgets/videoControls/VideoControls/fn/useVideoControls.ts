'use client'

import {
	playSub,
	playSubAndRevert,
	playVideo,
	playVideoShadowing,
	toNextSub,
	toPrevSub,
	toVideoStart,
} from '_pages/media/video/VideoPage/fn/playback'
import { useYouTubeVideoStore } from '_pages/media/video/videoStore'

export function useVideoControls() {
	const activeMode = useYouTubeVideoStore((state) => state.playback.mode)
	const areSubsAvailable = useYouTubeVideoStore((state) => state.subtitles !== null)

	return {
		activeMode,
		areSubsAvailable,
		toVideoStart,
		playVideo,
		playVideoShadowing,
		toPrevSub,
		playSubAndRevert,
		playSub,
		toNextSub,
	}
}
