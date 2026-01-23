// import { populatedChapterStructureIntoChapterStructure } from '_pages/books/commonLogic/populatedChapterStructureIntoChapterStructure'
// import { useCallback, useEffect, useState } from 'react'
// import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { useBook_Chapter_TranslateSentences } from '@/graphql'
// import { extractGraphQLError } from '@/graphql/extractGraphQLError'

/*export function useGetTranslateSentencesButtonDetails() {
	const bookType = useReadingStore((s) => s.book.type)

	const [isButtonVisible, setIsButtonVisible] = useState(true)
	const [isButtonDisabled, setIsButtonDisabled] = useState(false)
	const [error, setError] = useState('')

	const putTranslatedSentencesIntoChapter = useReadingStore((s) => s.putTranslatedSentencesIntoChapter)
	const [translateSentences] = useBook_Chapter_TranslateSentences()

	useEffect(
		function () {
			if (bookType === 'public') {
				setIsButtonVisible(false)
				return
			}

			const sentences: ChapterTextStructurePopulated.Sentence[] = useReadingStore
				.getState()
				.populatedChapter.parts.filter((part) => part.type === 'sentence')
			if (!sentences.length) return

			if (sentences[0].translation) {
				setIsButtonVisible(false)
			}
		},
		[bookType],
	)

	const onButtonClick = useCallback(
		async function () {
			const { chapterId, bookName, bookAuthor } = getBookNameAndAuthorName()
			const sentences = collectSentences()

			try {
				setIsButtonDisabled(true)

				const translateSentencesRes = await translateSentences({
					variables: {
						input: {
							bookAuthor,
							bookName,
							sentences,
						},
					},
				})

				if (!translateSentencesRes.data) return
				const translatedSentences = translateSentencesRes.data.book_chapter_TranslateSentences.translates

				putTranslatedSentencesIntoChapter(translatedSentences)
				await updateChapterInDB(chapterId)

				setIsButtonVisible(false)
				setIsButtonVisible(false)
			} catch (err: unknown) {
				const graphQLError = extractGraphQLError(err)
				const errorMessage = graphQLError?.message || 'Во время перевода возникла ошибка'
				setError(errorMessage)
				setIsButtonDisabled(false)
			}
		},
		[putTranslatedSentencesIntoChapter, translateSentences],
	)

	return { isButtonVisible, onButtonClick, isButtonDisabled, error }
}*/

/*function getBookNameAndAuthorName() {
	const chapterId = useReadingStore.getState().populatedChapter.id
	const bookName = useReadingStore.getState().book.data.name || null
	const bookAuthor = useReadingStore.getState().book.data.author || null

	return {
		chapterId,
		bookName,
		bookAuthor,
	}
}*/
/*function collectSentences(): string[] {
	const sentences: ChapterTextStructurePopulated.Sentence[] = useReadingStore
		.getState()
		.populatedChapter.parts.filter((part) => part.type === 'sentence')

	return sentences.map((sentence) => {
		return sentence.parts.reduce((acc, part) => {
			if (part.type === 'word') {
				acc += part.value
			}
			if (part.type === 'space') {
				acc += ' '
			}
			if (part.type === 'punctuation') {
				acc += part.value
			}

			return acc
		}, '')
	})
}*/

/*async function updateChapterInDB(chapterId: number) {
	const populatedChapter = useReadingStore.getState().populatedChapter
	const dryChapterStructure = populatedChapterStructureIntoChapterStructure(populatedChapter)

	const UPDATE_CHAPTER_MUTATION = `
	mutation BookChapter_update($input: UpdateBookChapterInput!) {
		book_chapter_update(input: $input) {
			id
			content
		}
	}
`

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
}*/
