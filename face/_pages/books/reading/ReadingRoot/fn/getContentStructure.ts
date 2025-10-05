import { useBook_Get, useBookChapter_Get } from '@/graphql'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
import { fullChapterStructureUsefulData } from '_pages/books/commonLogic/fullChapterStructureUsefulData/fullChapterStructureUsefulData'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
}

function useFetchBookAndSetToStore() {
	const bookId = useParams().bookId as string
	const { data, error, loading } = useBook_Get({ variables: { input: { id: parseInt(bookId) } } })

	useEffect(
		function () {
			if (loading) {
				useReadingStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null,
				})
			} else if (error) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: error.message,
					data: null,
				})
			} else if (!data) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null,
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
				useReadingStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null,
				})
			} else if (error) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: error.message,
					data: null,
				})
			} else if (!data) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null,
				})
			} else {
				const chapter = data.book_chapter_get

				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: chapter,
				})

				const chapterStructure = chapter.content
					? (JSON.parse(chapter.content) as ChapterTextStructure.Chapter)
					: null

				if (!chapterStructure) return

				const populatedChapter = fullChapterStructureUsefulData(chapterStructure, chapter.phrases)

				useReadingStore.getState().updatePopulatedChapter(populatedChapter)
			}
		},
		[data, error, loading],
	)
}
