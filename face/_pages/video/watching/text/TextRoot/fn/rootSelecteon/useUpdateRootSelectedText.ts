import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useEffect } from 'react'
import { updateFromSubtitlesSelected } from './subtitles'
import { updateFromPlainTextSelected } from './plainText'

export function useUpdateRootSelectedText() {
	const populatedSubtitles = useWatchingStore((s) => s.populatedSubtitles)
	const populatedPlainText = useWatchingStore((s) => s.populatedPlainText)

	const updateSelectedText = useWatchingStore((s) => s.updateSelectedText)

	useEffect(
		function () {
			if (populatedSubtitles) {
				updateFromSubtitlesSelected(populatedSubtitles, updateSelectedText)
			} else {
				updateFromPlainTextSelected(populatedPlainText, updateSelectedText)
			}
		},
		[populatedPlainText, populatedSubtitles, updateSelectedText],
	)
}
