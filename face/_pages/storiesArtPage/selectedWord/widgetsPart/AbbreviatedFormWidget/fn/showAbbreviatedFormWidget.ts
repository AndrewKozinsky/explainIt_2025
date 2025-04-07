// import { useMemo } from 'react'
// import { useGetSelectedWord } from '../../../common'
// import { StoryManager } from '../../../storyManager'

/**
 * Хук получает выделенное предложение и слово и вычисляет отмечено ли оно как сокращённое.
 * Если да, то находит полную форму слова и возвращает
 */
/*export function useGetAbbreviatedFormData(): null | { shortWord: string; fullWord: string } {
	const selectedWord = useGetSelectedWord()

	const storyManager = new StoryManager()
	const sentence = storyManager.getSelectedSentence()

	return useMemo(
		function () {
			if (!selectedWord || !sentence) {
				return null
			}

			if (!selectedWord.word.fullEngWord) {
				return null
			}

			return { shortWord: selectedWord.word.engWord, fullWord: selectedWord.word.fullEngWord }
		},
		[selectedWord, sentence],
	)
}*/
