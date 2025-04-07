// import { useMemo } from 'react'
// import { GrammarAliases, grammarMeta } from '../../../../grammarTypes'
// import { StoryConfigT } from '../../../../storyTypes'
// import { useGetSelectedWord } from '../../../common'
// import { StoryManager } from '../../../storyManager'

/*export type PhraseGrammarsConfig = {
	// Слово, к которому относятся статьи с объяснением грамматики
	word: string
	// Названия и ссылки на страницы с объяснением грамматики
	grammars: PhraseGrammarConfig[]
}*/
// Название и ссылка на страницу объяснения грамматической темы
/*export type PhraseGrammarConfig = {
	// Название темы с объяснением грамматики
	name: string
	// Ссылка на страницу статьи, где объясняется эта тема
	href: string
}*/

/**
 * Возвращает массив с конфигурацией для отрисовки названий и ссылок на статьи с объяснением грамматики
 */
/*export function useGetGrammarsConfig(): PhraseGrammarsConfig[] {
	const selectedWord = useGetSelectedWord()

	const storyManager = new StoryManager()
	const sentence = storyManager.getSelectedSentence()

	return useMemo(
		function () {
			if (!selectedWord || !sentence) {
				return []
			}

			return selectedWord.phraseIds.map((phraseId) => {
				return {
					word: getPhraseText(sentence, phraseId),
					grammars: getGrammarNameAndHref(sentence, phraseId),
				}
			})
		},
		[selectedWord, sentence],
	)
}*/

/**
 * Так как во фразе может быть более одного слова, то функция проходит по всему предложению
 * и собирает в строку все слова где есть переданный идентификатор фразы.
 * @param sentence — предложение из истории
 * @param phraseId — идентификатор фразы
 */
/*function getPhraseText(sentence: StoryConfigT.Sentence, phraseId: number): string {
	let phrase = ''

	sentence.sentenceParts.forEach((sentencePart) => {
		if (sentencePart.type !== 'word') {
			return
		}

		if (!sentencePart.phraseIds.includes(phraseId)) {
			return
		}

		phrase += sentencePart.word.engWord
	})

	return phrase
}*/

/**
 * Получает предложение и идентификатор фразы. И по этим данным находит грамматическую тему.
 * Возвращает её название и ссылку на неё.
 * @param sentence — предложение из истории
 * @param phraseId — идентификатор фразы
 */
/*function getGrammarNameAndHref(
	sentence: StoryConfigT.Sentence,
	phraseId: number,
): PhraseGrammarConfig[] {
	const phrase = sentence.phrases.find((phrase) => {
		return phrase.phraseId === phraseId
	})
	if (!phrase) return []

	return phrase.grammars.map((grammar) => {
		const grammarTheme = grammarMeta[grammar.topic]

		return {
			name: grammarTheme.name + ' ',
			href: grammarTheme.href,
		}
	})
}*/
