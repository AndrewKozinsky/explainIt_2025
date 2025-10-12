import { useCallback } from 'react'
import { useBookChapter_AnalyseSentenceAndPhraseLazyQuery, BookChapter_UpdateDocument } from '@/graphql'
import { apolloClient } from '@/graphql/apollo'
import { populatedChapterStructureIntoChapterStructure } from '_pages/books/commonLogic/populatedChapterStructureIntoChapterStructure'
import { getPhaseTextFromWordIdx, useGetSentenceById } from '_pages/books/reading/logic'
import { chapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetTranslatePhraseAndSentence(sentenceId: number, phraseWordIds: number[]) {
	const bookAuthor = useReadingStore((s) => s.book.data?.author)
	const bookName = useReadingStore((s) => s.book.data?.name)
	const chapter = useReadingStore((s) => s.chapter)
	const turnPhraseIntoLoadingInSelectedSentence = useReadingStore((s) => s.turnPhraseIntoLoadingInSelectedSentence)
	const turnPhraseIntoErrorPhrase = useReadingStore((s) => s.turnPhraseIntoErrorPhrase)
	const setSentenceTranslation = useReadingStore((s) => s.setSentenceTranslation)
	const setPhraseAnalysisIntoSentence = useReadingStore((s) => s.setPhraseAnalysisIntoSentence)
	const sentence = useGetSentenceById(sentenceId)

	// Use the lazy query version
	const [analyzeSentence] = useBookChapter_AnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		if (!chapter || !chapter.data?.id) {
			console.error('No chapter selected')
			return
		}

		let sentenceText = chapterStructureIntoText([sentence])
		let phraseText = getPhaseTextFromWordIdx(sentence.parts, phraseWordIds)

		try {
			turnPhraseIntoLoadingInSelectedSentence(phraseWordIds)

			const result = await analyzeSentence({
				variables: {
					input: {
						bookChapterId: chapter.data.id,
						bookAuthor,
						bookName,
						context: sentence.context,
						sentence: sentenceText,
						sentenceId: sentence.id,
						phrase: phraseText,
						phraseWordsIdx: phraseWordIds,
					},
				},
			})

			if (!result.data) {
				throw new Error('No result')
			}

			// Put sentence translation
			const sentenceTranslation = result.data.book_chapter_AnalyseSentenceAndPhrase.sentenceTranslation
			if (sentenceTranslation) {
				const { sentenceId } = result.data.book_chapter_AnalyseSentenceAndPhrase.phrase
				setSentenceTranslation(sentenceId, sentenceTranslation)
				await saveChapterInDB(chapter.data.id)
			}

			// Put phrase analysis
			setPhraseAnalysisIntoSentence(result.data)

			// Handle the result here
			console.log('Analysis result:', result.data)
			return result
		} catch (error) {
			turnPhraseIntoErrorPhrase(phraseWordIds)
			console.error('Error analyzing sentence:', error)
		}
	}, [
		chapter,
		sentence,
		phraseWordIds,
		turnPhraseIntoLoadingInSelectedSentence,
		analyzeSentence,
		bookAuthor,
		bookName,
		setPhraseAnalysisIntoSentence,
		setSentenceTranslation,
		turnPhraseIntoErrorPhrase,
	])
}

async function saveChapterInDB(chapterId: number) {
	const dryChapterStructure = populatedChapterStructureIntoChapterStructure(
		useReadingStore.getState().populatedChapter,
	)

	apolloClient
		.mutate({
			mutation: BookChapter_UpdateDocument,
			variables: {
				input: {
					id: chapterId,
					content: JSON.stringify(dryChapterStructure),
				},
			},
		})
		.then((data) => {
			console.log(data)
		})
		.catch((err) => {
			console.log(err)
		})
}
