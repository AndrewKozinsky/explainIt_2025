import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { useCallback } from 'react'

/** Возвращает обработчик нажатия на слово в тексте. */
export function useGetOnWordClick() {
	const updatePopulatedSubtitleSelected = useWatchingStore((s) => s.updateSelectedSubtitle)

	return useCallback(
		function (subtitleId: number, sentenceId: number, wordId: number) {
			updatePopulatedSubtitleSelected(subtitleId, sentenceId, wordId)
		},
		[updatePopulatedSubtitleSelected],
	)
}

/** Возвращает обработчик долгого нажатия на слово в тексте главы. */
export function useGetOnWordLongTap() {
	const updatePopulatedSubtitleSelected = useWatchingStore((s) => s.updateSelectedSubtitle)
	const changeWordsAddingMode = useWatchingStore((s) => s.changeWordsAddingMode)
	const deviceType = useWatchingStore((s) => s.deviceType)

	return useCallback(
		function (subtitleId: number, sentenceId: number, wordId: number) {
			if (deviceType !== 'touch') return
			changeWordsAddingMode(true)
			updatePopulatedSubtitleSelected(subtitleId, sentenceId, wordId)
			changeWordsAddingMode(false)
		},
		[changeWordsAddingMode, deviceType, updatePopulatedSubtitleSelected],
	)
}
