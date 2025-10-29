import { useCallback } from 'react'
import { useBookChapter_AnalyseSentenceAndPhraseLazyQuery, BookChapter_UpdateDocument } from '@/graphql'
import { populatedChapterStructureIntoChapterStructure } from '_pages/books/commonLogic/populatedChapterStructureIntoChapterStructure'
import { getPhaseTextFromWordIdx, useGetSentenceById } from '_pages/books/reading/logic'
import { chapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetTranslatePhraseAndSentence(sentenceId: number, phraseWordIds: number[]) {
	const bookAuthor = useReadingStore((s) => s.book.data?.author)
	const bookName = useReadingStore((s) => s.book.data?.name)
	const chapter = useReadingStore((s) => s.chapter)
	const turnPhraseIntoLoadingInSelectedSentence = useReadingStore((s) => s.turnPhraseIntoLoadingInSelectedSentence)
	const turnPhraseIntoErrorPhrase = useReadingStore((s) => s.turnPhraseIntoErrorPhraseInSelectedSentence)
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
				const errorMessage = result.error?.message
					? result.error.message
					: 'Данных нет. Возможно недостаточный баланс.'

				throw new Error(errorMessage)
			}

			// Put sentence translation
			const sentenceTranslation = result.data.book_chapter_AnalyseSentenceAndPhrase.sentenceTranslation
			if (sentenceTranslation) {
				const { sentenceId } = result.data.book_chapter_AnalyseSentenceAndPhrase.phrase
				setSentenceTranslation(sentenceId, sentenceTranslation)
				// Use direct HTTP request to avoid Apollo cache updates
				updateChapterInDBToSaveSentenceTranslationDirect(chapter.data.id)
			}

			// Put phrase analysis
			setPhraseAnalysisIntoSentence(result.data)
		} catch (error) {
			if (error instanceof Error) {
				turnPhraseIntoErrorPhrase(phraseWordIds, error.message)
				console.error('Error analyzing sentence:')
			} else {
				turnPhraseIntoErrorPhrase(phraseWordIds, 'Возникла неизвестная ошибка.')
			}
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

// GraphQL mutation for updating book chapter (for direct HTTP request)
const UPDATE_CHAPTER_MUTATION = `
	mutation BookChapter_update($input: UpdateBookChapterInput!) {
		book_chapter_update(input: $input) {
			id
			content
		}
	}
`

async function updateChapterInDBToSaveSentenceTranslationDirect(chapterId: number) {
	const dryChapterStructure = populatedChapterStructureIntoChapterStructure(
		useReadingStore.getState().populatedChapter,
	)

	// Use direct fetch to avoid Apollo cache updates
	try {
		const response = await fetch('/graphql', {
			method: 'POST',
			credentials: 'same-origin', // Include cookies for authentication
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: UPDATE_CHAPTER_MUTATION,
				variables: {
					input: {
						id: chapterId,
						content: JSON.stringify(dryChapterStructure),
					},
				},
			}),
		})

		const result = await response.json()

		if (result.errors) {
			console.error('GraphQL errors:', result.errors)
		} else {
			console.log('Chapter updated successfully:', result.data)
		}
	} catch (error) {
		console.error('Error updating chapter:', error)
	}
}
