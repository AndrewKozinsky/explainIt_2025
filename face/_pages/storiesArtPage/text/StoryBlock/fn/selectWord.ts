// import { useCallback, useMemo } from 'react'
// import { StoryManager } from '../../../selectedWord/storyManager'
// import { useStoryStore } from '../../../store/store'

/**
 * Возвращает обработчик щелчка по слову.
 * Функция заносит в Хранилище идентификаторы предложения и слова
 * @param sentenceId — идентификатор предложения
 * @param wordId — идентификатор слова
 */
/*export function useGetOnWordClick(sentenceId: number, wordId: number) {
	return useCallback(function () {
		const storyManager = new StoryManager()
		storyManager.selectWord(sentenceId, wordId)
	}, [])
}*/

/**
 * Возвращает булево значение выделено ли слово с переданными координатами
 * @param sentenceId — идентификатор предложения
 * @param wordId — идентификатор слова
 */
/*export function useIsWordSelected(sentenceId: number, wordId: number) {
	const selectedSentenceId = useStoryStore().selectedSentenceId
	const selectedWordId = useStoryStore().selectedWordId

	return useMemo(
		function () {
			const storyManager = new StoryManager()
			return storyManager.isWordSelected(sentenceId, wordId)
		},
		[selectedSentenceId, selectedWordId],
	)
}*/
