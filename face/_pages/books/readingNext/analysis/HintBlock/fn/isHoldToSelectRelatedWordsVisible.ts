import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { useMemo } from 'react'
import { isMacOS } from 'utils/utils'

export function getHotKeyName() {
	const isMac = isMacOS()

	return isMac ? 'Cmd ⌘' : 'Ctrl'
}

/** Определяет видимость кнопки "Зажмите Cmd для выделения связанных слов" */
export function useIsHoldToSelectRelatedWordsVisible() {
	// Не показывать кнопку если выделены все слова в выделенном предложении
	return useIsAllWordsSelected()
}

/** Определяет, выбраны ли все слова в выделенном предложении */
export function useIsAllWordsSelected() {
	const getSelectedSentence = useReadingStoreNext((s) => s.getSelectedSentence)
	const fullSelectedSentence = getSelectedSentence()
	const selectedSentence = useReadingStoreNext((s) => s.selection)

	return useMemo(
		function () {
			if (!selectedSentence.sentenceId || !fullSelectedSentence) {
				return false
			}

			const wordsCount = fullSelectedSentence.parts.reduce((acc, part) => {
				if (part.type === 'word') {
					acc++
				}
				return acc
			}, 0)

			return wordsCount > selectedSentence.wordIds.length
		},
		[fullSelectedSentence, selectedSentence.sentenceId, selectedSentence.wordIds.length],
	)
}
