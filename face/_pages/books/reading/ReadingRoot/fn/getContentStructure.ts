// import { useEffect } from 'react'
// import { BookChapterOutModel, BookOutModel, useBook_Get, useBookChapter_Get } from '@/graphql'
// import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
// import { populateChapterStructure } from '_pages/books/commonLogic/populateChapterStructure'
// import { useReadingStore } from '_pages/books/reading/readingStore'
// import { useParams } from 'next/navigation'

/*export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
}*/

/*function useFetchBookAndSetToStore() {
	const bookId = useParams().bookId as string
	const { data, error, loading } = useBook_Get({ variables: { input: { id: parseInt(bookId) } } })

	useEffect(
		function () {
			if (loading) {
				useReadingStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (error) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookOutModel,
				})
			} else if (!data) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: data.book_get,
				})
			}
		},
		[data, error, loading],
	)
}*/

/*function useFetchChapterAndSetToStore() {
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId) } },
		skip: !chapterId,
	})

	useEffect(
		function () {
			if (loading) {
				useReadingStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else if (error) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookChapterOutModel,
				})
			} else if (!data) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else {
				const chapter = data.book_chapter_get

				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: chapter,
				})
			}
		},
		[data, error, loading, chapterId],
	)
}*/

/*function useCreatePopulatedChapterAndSetToStore() {
	const chapter = useReadingStore((s) => s.chapter)

	useEffect(
		function () {
			const chapterData = chapter?.data
			if (!chapterData || !chapterData.content) return

			const chapterStructure = JSON.parse(chapterData.content) as ChapterTextStructure.Chapter
			const populatedChapter = populateChapterStructure({
				id: chapterData.id,
				header: chapterData.header,
				name: chapterData.name,
				content: chapterStructure,
				phrases: chapterData.phrases,
			})

			useReadingStore.getState().updatePopulatedChapter(populatedChapter)
		},
		[chapter],
	)
}*/
