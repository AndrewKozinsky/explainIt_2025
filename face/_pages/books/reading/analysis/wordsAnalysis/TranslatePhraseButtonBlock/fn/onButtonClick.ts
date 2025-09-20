import { useReadingStore } from '_pages/books/reading/readingStore'
import { useCallback } from 'react'
import { useAiAnalyseSentenceAndPhraseLazyQuery } from 'graphql'

export function useGetOnButtonClick() {
	const bookAuthor = useReadingStore((s) => s.bookAuthor)
	const bookName = useReadingStore((s) => s.bookName)
	const sentence = useReadingStore((s) => s.sentence)

	// Use the lazy query version
	const [analyzeSentence] = useAiAnalyseSentenceAndPhraseLazyQuery()

	return useCallback(async () => {
		//

		try {
			const result = await analyzeSentence({
				variables: {
					input: {
						phrase: '',
						sentence: '',
						bookAuthor,
						bookName,
						context: sentence.context,
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
	}, [analyzeSentence, bookAuthor, bookName, sentence])
}
