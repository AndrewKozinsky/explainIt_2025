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
	const selectedSentence = getSelectedSentence()

	return useMemo(
		function () {
			if (!selectedSentence) {
				return false
			}

			const wordsCount = selectedSentence.parts.reduce((acc, part) => {
				if (part.type === 'word') {
					acc++
				}
				return acc
			}, 0)

			const idlePhrase = selectedSentence.phrases.find((part) => part.type === 'idle')
			if (!idlePhrase) return false

			return wordsCount > idlePhrase.wordIds.length
		},
		[selectedSentence],
	)
}
