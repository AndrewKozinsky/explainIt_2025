import type { CurrentTimeSource } from '@/entities/sentencesAndSubtitles/ui/Subtitles/fn/useSubtitlesPlaybackDomSync'
import { useVideoStore } from '../../videoStore'

export const currentTimeSource: CurrentTimeSource = {
	getCurrentTime: () => useVideoStore.getState().player.currentTime,
	subscribe: (listener) =>
		useVideoStore.subscribe((state, prevState) => {
			if (state.player.currentTime === prevState.player.currentTime) return
			listener(state.player.currentTime)
		}),
}
