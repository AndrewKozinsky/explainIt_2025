import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useCallback } from 'react'

/** Возвращает обработчик нажатия на слово в тексте. */
export function useGetOnWordClick() {
	const updatePopulatedSubtitleSelected = useWatchingStore((s) => s.updateSelectedSubtitle)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			updatePopulatedSubtitleSelected(sentenceId, wordId)
		},
		[updatePopulatedSubtitleSelected],
	)
}

/** Возвращает обработчик долгого нажатия на слово в тексте главы. */
export function useGetOnWordLongTap() {
	const updatePopulatedSubtitleSelected = useWatchingStore((s) => s.updateSelectedSubtitle)
	const deviceType = useWatchingStore((s) => s.deviceType)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (deviceType !== 'touch') return

			updatePopulatedSubtitleSelected(sentenceId, wordId)
		},
		[deviceType, updatePopulatedSubtitleSelected],
	)
}
