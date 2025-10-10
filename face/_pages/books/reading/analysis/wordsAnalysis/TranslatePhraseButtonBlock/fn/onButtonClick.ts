import { useBookChapter_AnalyseSentenceAndPhraseLazyQuery } from '@/graphql'
import { useGetIdlePhraseIsSelectedSentence, useGetSelectedSentence } from '_pages/books/reading/logic'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { chapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'
import { useCallback } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetTranslatePhraseAndSentence() {
	const bookAuthor = useReadingStore((s) => s.book.data?.author)
	const bookName = useReadingStore((s) => s.book.data?.name)
	const chapter = useReadingStore((s) => s.chapter)
	const selectedSentence = useReadingStore((s) => s.selectedSentence)
	const turnIdlePhraseIntoLoadingInSelectedSentence = useReadingStore(
		(s) => s.turnIdlePhraseIntoLoadingInSelectedSentence,
	)
	const sentence = useGetSelectedSentence()
	const idlePhrase = useGetIdlePhraseIsSelectedSentence()

	// Use the lazy query version
	const [analyzeSentence] = useBookChapter_AnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		if (!chapter || !chapter.data?.id || !idlePhrase) {
			console.error('No chapter selected')
			return
		}

		if (!sentence.id) {
			console.error('No sentence selected')
			return
		}

		let sentenceText = chapterStructureIntoText([sentence])
		let phraseText = getPhaseText(sentence.parts, idlePhrase.wordIds)

		try {
			/*const result = await analyzeSentence({
				variables: {
					input: {
						bookChapterId: chapter.data.id,
						bookAuthor,
						bookName,
						context: selectedSentence.context,
						sentence: sentenceText,
						sentenceId: sentence.id,
						phrase: phraseText,
						phraseWordsIdx: idlePhrase.wordIds,
					},
				},
			})*/

			turnIdlePhraseIntoLoadingInSelectedSentence()

			// Handle the result here
			// console.log('Analysis result:', result.data)
			// return result
		} catch (error) {
			console.error('Error analyzing sentence:', error)
			throw error
		}
	}, [
		chapter,
		idlePhrase,
		sentence,
		analyzeSentence,
		bookAuthor,
		bookName,
		selectedSentence.context,
		turnIdlePhraseIntoLoadingInSelectedSentence,
	])
}

/**
 * Получает массив данных предложения, идентификаторы выделенных слов и формирует строку из текста выделенных слов.
 * @param sentence — данные предложения
 * @param wordIds — id выделенных слов
 */
function getPhaseText(sentence: ChapterTextStructurePopulated.SentencePart[], wordIds: number[]) {
	return wordIds
		.map((selectedWordId) => {
			const selectedWord: undefined | ChapterTextStructurePopulated.Word = sentence.find(
				(word): word is ChapterTextStructurePopulated.Word => {
					return word.type === 'word' && word.id === selectedWordId
				},
			)

			if (selectedWord) {
				return selectedWord.value
			}
		})
		.join(' ')
}
