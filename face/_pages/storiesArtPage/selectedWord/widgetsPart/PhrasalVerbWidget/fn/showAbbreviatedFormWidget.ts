// import { useMemo } from 'react'
// import { getFullWordFormFromAbbreviatedForm } from '../../../../../../utils/strings'
// import { GrammarAliases, GrammarConfigT } from '../../../../grammarTypes'
// import { StoryConfigT } from '../../../../storyTypes'
// import { useGetSelectedWord } from '../../../common'
// import { StoryManager } from '../../../storyManager'

/**
 * Хук получает выделенное предложение и слово и вычисляет является ли оно частью фразового глагола.
 * Если да, то находит все слова принадлежащие фразовому глаголу с переводами
 * и в конце добавляет фразовый глагол с переводом и возвращает этот массив:
 * [
 *     {engWord: 'go', rusWord 'идти'},
 *     {engWord: 'on', rusWord 'на'},
 *     {engWord: 'go on', rusWord 'продолжать'}
 * ]
 * Если слово не часть фразового глагола, то возвращает null
 */
/*export function useGetPhraseVerbConfig(): null | { engWord: string; rusWord: string }[] {
	const selectedWord = useGetSelectedWord()

	const storyManager = new StoryManager()
	const sentence = storyManager.getSelectedSentence()

	return useMemo(
		function () {
			if (!selectedWord || !sentence) {
				return null
			}

			const phraseIdWithPhraseVerb = getPhraseIdWithPhraseVerb(sentence, selectedWord)
			if (!phraseIdWithPhraseVerb) return null

			return getPhraseVerbConfig(sentence, phraseIdWithPhraseVerb)
		},
		[selectedWord, sentence],
	)
}*/

/*function getPhraseIdWithPhraseVerb(
	sentence: StoryConfigT.Sentence,
	selectedWord: StoryConfigT.Word,
): null | number {
	// Поиск грамматического объекта фразового глагола
	let phraseVerbId: null | number = null

	// Пройду по идентификаторам фраз этого слова
	selectedWord.phraseIds.forEach((phraseId) => {
		// Найти фразы от
		sentence.phrases.find((phrase) => {
			phrase.grammars.forEach((grammar) => {
				if (grammar.topic === GrammarAliases.PhraseVerb) {
					phraseVerbId = phraseId
				}
			})
		})
	})

	return phraseVerbId
}*/

/*function getPhraseVerbConfig(
	sentence: StoryConfigT.Sentence,
	phraseIdWithPhraseVerb: number,
): { engWord: string; rusWord: string }[] {
	const phraseObj = sentence.phrases.find((phrase) => {
		return phrase.phraseId === phraseIdWithPhraseVerb
	})
	if (!phraseObj) return []

	const config = phraseObj.grammars.find(
		(grammar) => grammar.topic === GrammarAliases.PhraseVerb,
	) as GrammarConfigT.PhraseVerb
	if (!config) return []

	// Найти все слова относящиеся к этой фразе
	const phraseWords = sentence.sentenceParts.filter((sentencePart) => {
		return (
			sentencePart.type === 'word' && sentencePart.phraseIds.includes(phraseIdWithPhraseVerb)
		)
	}) as StoryConfigT.Word[]

	const phraseWordsArr = phraseWords.map((phraseWord) => {
		return {
			engWord: phraseWord.word.engWord,
			rusWord: phraseWord.word.rusWord,
		}
	})

	let engWord = phraseWordsArr.reduce((acc, item) => {
		return (acc += item.engWord + ' ')
	}, '')
	engWord = engWord.trim()

	phraseWordsArr.push({
		engWord: engWord,
		rusWord: config.translate,
	})

	return phraseWordsArr
}*/
