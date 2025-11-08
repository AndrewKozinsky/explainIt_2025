import { useEffect } from 'react'
import { BookChapterOutModel, BookOutModel, useBook_Get, useBookChapter_Get } from '@/graphql'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
import { populateChapterStructure } from '_pages/books/commonLogic/populateChapterStructure'
import { useParams } from 'next/navigation'
import { useReadingStoreNext } from '../../readingStoreNext'

export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
}

function useFetchBookAndSetToStore() {
	const bookId = useParams().bookId as string
	const { data, error, loading } = useBook_Get({ variables: { input: { id: parseInt(bookId) } } })

	useEffect(
		function () {
			if (loading) {
				useReadingStoreNext.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (error) {
				useReadingStoreNext.getState().updateBook({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookOutModel,
				})
			} else if (!data) {
				useReadingStoreNext.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				useReadingStoreNext.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: data.book_get,
				})
			}
		},
		[data, error, loading],
	)
}

function useFetchChapterAndSetToStore() {
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId) } },
		skip: !chapterId,
	})

	useEffect(
		function () {
			if (loading) {
				useReadingStoreNext.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else if (error) {
				useReadingStoreNext.getState().updateChapter({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookChapterOutModel,
				})
			} else if (!data) {
				useReadingStoreNext.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else {
				const chapter = data.book_chapter_get

				useReadingStoreNext.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: chapter,
				})
			}
		},
		[data, error, loading, chapterId],
	)
}

function useCreatePopulatedChapterAndSetToStore() {
	const chapter = useReadingStoreNext((s) => s.chapter)

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

			useReadingStoreNext.getState().updatePopulatedChapter(populatedChapter)
		},
		[chapter],
	)
}
