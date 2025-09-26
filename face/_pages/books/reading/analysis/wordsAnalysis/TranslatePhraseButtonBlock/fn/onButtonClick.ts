// import { useBookChapter_AnalyseSentenceAndPhraseLazyQuery } from '@/graphql'
// import { useCallback } from 'react'
// import { ChapterTextStructurePopulated } from '_pages/books/chapterStructureTypes'
// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { booksHelper } from '_pages/books/booksHelper'

/*export function useGetTranslatePhraseAndSentence() {
	const bookAuthor = useReadingStore((s) => s.bookAuthor)
	const bookName = useReadingStore((s) => s.bookName)
	const sentence = useReadingStore((s) => s.sentence)
	const chapterId = useReadingStore((s) => s.chapterId)
	const chapter = useReadingStore((s) => s.chapter)

	// Use the lazy query version
	const [analyzeSentence] = useBookChapter_AnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		if (!chapterId) {
			console.error('No chapter selected')
			return
		}

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
						bookChapterId: chapterId,
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
}*/

/**
 * Получает массив данных предложения, идентификаторы выделенных слов и формирует строку из текста выделенных слов.
 * @param sentence — данные предложения
 * @param wordIds — id выделенных слов
 */
/*function getPhaseText(sentence: ChapterTextStructurePopulated.SentencePart[], wordIds: number[]) {
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
}*/
