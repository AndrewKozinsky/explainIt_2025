import { useBookChapter_AnalyseSentenceAndPhraseLazyQuery } from '@/graphql'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { populatedChapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'
import { useCallback } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
// import { booksHelper } from '_pages/books/booksHelper'

export function useGetTranslatePhraseAndSentence() {
	const bookAuthor = useReadingStore((s) => s.book.data?.author)
	const bookName = useReadingStore((s) => s.book.data?.name)
	const sentence = useReadingStore((s) => s.selectedSentence)
	const chapter = useReadingStore((s) => s.chapter)
	const populatedChapter = useReadingStore((s) => s.populatedChapter)

	// Use the lazy query version
	const [analyzeSentence] = useBookChapter_AnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		if (!chapter || !chapter.data?.id) {
			console.error('No chapter selected')
			return
		}

		if (!sentence.sentenceId) {
			console.error('No sentence selected')
			return
		}

		// Get sentence text here
		const selectedSentence = populatedChapter.find((s) => s.id === sentence.sentenceId)
		if (!selectedSentence || selectedSentence.type !== 'sentence') {
			console.error('Selected sentence not found')
			return
		}

		let sentenceText = populatedChapterStructureIntoText([selectedSentence])
		let phraseText = getPhaseText(selectedSentence.parts, sentence.selectedWordIds)

		try {
			const result = await analyzeSentence({
				variables: {
					input: {
						bookChapterId: chapter.data.id,
						bookAuthor,
						bookName,
						context: sentence.context,
						sentence: sentenceText,
						sentenceId: sentence.sentenceId,
						phrase: phraseText,
						phraseWordsIdx: sentence.selectedWordIds,
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
	}, [analyzeSentence, bookAuthor, bookName, sentence, chapter, populatedChapter])
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
