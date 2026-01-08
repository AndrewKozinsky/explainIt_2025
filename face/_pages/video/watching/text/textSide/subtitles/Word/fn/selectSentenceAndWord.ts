// import { useWatchingStore } from '_pages/video/watching/watchingStore'
// import { useCallback } from 'react'

/** Возвращает обработчик нажатия на слово в тексте. */
/*export function useGetOnWordClick() {
	const updatePopulatedPlainTextSelected = useWatchingStore((s) => s.updateSelectedPlainText)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			updatePopulatedPlainTextSelected(sentenceId, wordId)
		},
		[updatePopulatedPlainTextSelected],
	)
}*/

/** Возвращает обработчик долгого нажатия на слово в тексте главы. */
/*export function useGetOnWordLongTap() {
	const updatePopulatedPlainTextSelected = useWatchingStore((s) => s.updateSelectedPlainText)
	const deviceType = useWatchingStore((s) => s.deviceType)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (deviceType !== 'touch') return

			updatePopulatedPlainTextSelected(sentenceId, wordId)
		},
		[deviceType, updatePopulatedPlainTextSelected],
	)
}*/
