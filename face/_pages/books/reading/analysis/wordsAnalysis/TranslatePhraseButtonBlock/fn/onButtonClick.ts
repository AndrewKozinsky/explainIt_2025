import { useCallback } from 'react'
import { ChapterTextStructureFull } from '_pages/books/chapterStructureTypes'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useAiAnalyseSentenceAndPhraseLazyQuery } from '@/graphql'
import { booksHelper } from '_pages/books/booksHelper'

export function useGetTranslatePhraseAndSentence() {
	const bookAuthor = useReadingStore((s) => s.bookAuthor)
	const bookName = useReadingStore((s) => s.bookName)
	const sentence = useReadingStore((s) => s.sentence)
	const chapter = useReadingStore((s) => s.chapter)

	// Use the lazy query version
	const [analyzeSentence] = useAiAnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		if (!sentence.sentenceId) {
			console.error('No sentence selected')
			return
		}

		// Get sentence text here
		const selectedSentence = chapter.find((s) => s.id === sentence.sentenceId)
		if (!selectedSentence || selectedSentence.type !== 'sentence') {
			console.error('Selected sentence not found')
			return
		}

		let sentenceText = booksHelper.chapterContentStructureToText([selectedSentence])
		let phraseText = getPhaseText(selectedSentence.parts, sentence.selectedWordIds)

		try {
			const result = await analyzeSentence({
				variables: {
					input: {
						bookAuthor,
						bookName,
						context: sentence.context,
						sentence: sentenceText,
						phrase: phraseText,
					},
				},
			})

			// Handle the result here
			console.log('Analysis result:', result.data)
			return result
		} catch (error) {
			console.error('Error analyzing sentence:', error)
			throw error
		}
	}, [analyzeSentence, bookAuthor, bookName, sentence, chapter])
}

/**
 * Получает массив данных предложения, идентификаторы выделенных слов и формирует строку из текста выделенных слов.
 * @param sentence — данные предложения
 * @param wordIds — id выделенных слов
 */
function getPhaseText(sentence: ChapterTextStructureFull.SentencePart[], wordIds: number[]) {
	return wordIds
		.map((selectedWordId) => {
			const selectedWord: undefined | ChapterTextStructureFull.Word = sentence.find(
				(word): word is ChapterTextStructureFull.Word => {
					return word.type === 'word' && word.id === selectedWordId
				},
			)

			if (selectedWord) {
				return selectedWord.value
			}
		})
		.join(' ')
}
