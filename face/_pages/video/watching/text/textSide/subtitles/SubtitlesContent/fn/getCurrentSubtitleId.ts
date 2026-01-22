import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useEffect, useState } from 'react'

export function useGetCurrentSubtitleId() {
	const currentVideoTime = useWatchingStore((s) => s.player.currentTime)
	const subtitles = useWatchingStore((s) => s.populatedSubtitles.subtitles)

	const [currentSubtitleIdx, setCurrentSubtitleIdx] = useState(0)

	useEffect(
		function () {
			const thisSubtitle = subtitles[currentSubtitleIdx]

			// 1. Всё ещё внутри текущего субтитра
			if (thisSubtitle.fromSeconds <= currentVideoTime && thisSubtitle.toSeconds >= currentVideoTime) {
				return
			}

			// 2. Если время больше текущего субтитра
			if (currentVideoTime > thisSubtitle.toSeconds) {
				// То найти подходящий субтитр дальше
				const nextRelativeIdx = subtitles
					.slice(currentSubtitleIdx)
					.findIndex((subtitle) => subtitle.toSeconds >= currentVideoTime)

				if (nextRelativeIdx > -1) {
					setCurrentSubtitleIdx(currentSubtitleIdx + nextRelativeIdx)
				}
				return
			}

			// 3. Если время меньше текущего субтитра, то найти подходящий субтитр ранее
			const prevIdx = subtitles
				.slice(0, currentSubtitleIdx)
				.findLastIndex((subtitle) => subtitle.fromSeconds <= currentVideoTime)

			if (prevIdx > -1) {
				setCurrentSubtitleIdx(prevIdx)
			}
		},
		[currentSubtitleIdx, currentVideoTime, subtitles],
	)

	return subtitles[currentSubtitleIdx].id
}
