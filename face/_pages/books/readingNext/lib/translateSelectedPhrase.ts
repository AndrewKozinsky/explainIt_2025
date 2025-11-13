import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { getSentenceById } from '_pages/books/readingNext/lib/getSentenceById'
import { getTextByPhraseId } from '_pages/books/readingNext/lib/getTextByWordIds'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'
import { useCallback } from 'react'
import { canRunTranslation } from './canRunTranslation'
import { useBook_Chapter_AnalysePhraseLazyQuery } from '@/graphql'
import { chapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'

export function useGetRunTranslation() {
	const populatedChapter = useReadingStoreNext((s) => s.populatedChapter)
	const selection = useReadingStoreNext((s) => s.selection)
	const bookAuthor = useReadingStoreNext((s) => s.book.data.author)
	const bookName = useReadingStoreNext((s) => s.book.data.name)
	const chapter = useReadingStoreNext((s) => s.chapter)
	const createLoadingPhraseInSelectedSentenceFromSelectedWords = useReadingStoreNext(
		(s) => s.createLoadingPhraseInSelectedSentenceFromSelectedWords,
	)
	const turnPhraseIntoErrorPhrase = useReadingStoreNext((s) => s.turnPhraseIntoErrorPhrase)
	const setPhraseAnalysisIntoSentence = useReadingStoreNext((s) => s.setPhraseAnalysisIntoSentence)

	const [analyzePhrase] = useBook_Chapter_AnalysePhraseLazyQuery()

	return useCallback(async () => {
		if (!canRunTranslation() || !selection.sentenceId || !selection.phraseId) return
		const { wordIds, sentenceId, phraseId } = selection

		const sentence = getSentenceById(sentenceId)
		if (!sentence) return

		const context = buildContext(populatedChapter, sentenceId, 20)
		let sentenceText = chapterStructureIntoText([sentence])
		let phraseText = getTextByPhraseId(sentenceId, phraseId)

		try {
			createLoadingPhraseInSelectedSentenceFromSelectedWords()

			const result = await analyzePhrase({
				variables: {
					input: {
						bookChapterId: chapter.data.id,
						bookAuthor,
						bookName,
						context,
						sentence: sentenceText,
						sentenceId: sentenceId,
						phrase: phraseText,
						phraseWordsIdx: wordIds,
					},
				},
			})

			if (!result.data) {
				const errorMessage = result.error?.message
					? result.error.message
					: 'Данных нет. Возможно недостаточный баланс.'

				throw new Error(errorMessage)
			}

			// Put phrase analysis
			setPhraseAnalysisIntoSentence(result.data.book_chapter_AnalysePhrase)
		} catch (error) {
			if (error instanceof Error) {
				turnPhraseIntoErrorPhrase(sentenceId, phraseId, error.message)
				console.error('Error analyzing sentence:')
			} else {
				turnPhraseIntoErrorPhrase(sentenceId, phraseId, 'Возникла неизвестная ошибка.')
			}
		}
	}, [
		selection,
		populatedChapter,
		createLoadingPhraseInSelectedSentenceFromSelectedWords,
		analyzePhrase,
		chapter.data.id,
		bookAuthor,
		bookName,
		setPhraseAnalysisIntoSentence,
		turnPhraseIntoErrorPhrase,
	])
}

// Builds textual context around the sentence so that
// - there are at least `thresholdValue` words BEFORE the selected sentence
// - and at least `thresholdValue` words AFTER the selected sentence
// Words from the selected sentence are NOT counted for the thresholds.
// Only whole sentences can be added; overshooting the threshold is acceptable.
function buildContext(
	chapter: ChapterTextStructurePopulated.Chapter | null,
	sentenceId: number,
	thresholdValue = 100,
): string {
	if (!chapter) return ''

	const currentIndex = chapter.parts.findIndex(
		(el): el is ChapterTextStructurePopulated.Sentence => el.type === 'sentence' && el.id === sentenceId,
	)
	if (currentIndex === -1) return ''

	const countWords = (s: ChapterTextStructurePopulated.Sentence) =>
		s.parts.reduce((acc, p) => acc + (p.type === 'word' ? 1 : 0), 0)

	// Start with the selected sentence bounds
	let minSentenceIdx = currentIndex
	let maxSentenceIdx = currentIndex

	// Collect enough words ABOVE (before) the selected sentence
	let wordsAbove = 0
	for (let i = currentIndex - 1; i >= 0 && wordsAbove < thresholdValue; i--) {
		if (chapter.parts[i].type === 'sentence') {
			wordsAbove += countWords(chapter.parts[i] as ChapterTextStructurePopulated.Sentence)
			minSentenceIdx = i
		}
	}

	// Collect enough words BELOW (after) the selected sentence
	let wordsBelow = 0
	for (let i = currentIndex + 1; i < chapter.parts.length && wordsBelow < thresholdValue; i++) {
		if (chapter.parts[i].type === 'sentence') {
			wordsBelow += countWords(chapter.parts[i] as ChapterTextStructurePopulated.Sentence)
			maxSentenceIdx = i
		}
	}

	// Slice the original content to preserve spaces/punctuation between the chosen sentences
	const contextSlice = chapter.parts.slice(minSentenceIdx, maxSentenceIdx + 1)
	return chapterStructureIntoText(contextSlice)
}
