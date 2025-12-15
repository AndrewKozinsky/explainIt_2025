import { useEffect } from 'react'
import {
	BookChapterOutModel,
	BookOutModel,
	useBook_Get,
	useBook_GetBookPublic,
	useBook_GetBooksPublic,
	useBookChapter_Get,
} from '@/graphql'
import { ChapterTextStructure } from '_pages/books/commonLogic/chapterStructureTypes'
import { populateChapterStructure } from '_pages/books/commonLogic/populateChapterStructure'
import { useParams } from 'next/navigation'
import { useReadingStore } from '_pages/books/reading/readingStore'
import invariant from 'ts-invariant'
import { extractBookIdFromUrlBookId, getBookTypeByUrlBookId } from 'сonsts/pageUrls'
import log = invariant.log

export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
}

function useFetchBookAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getBookTypeByUrlBookId(bookIdInUrl)
	const bookId = extractBookIdFromUrlBookId(bookIdInUrl)

	const {
		data: privateBookData,
		error: privateBookError,
		loading: privateBookLoading,
	} = useBook_Get({ variables: { input: { id: bookId! } }, skip: bookType !== 'private' })

	const {
		data: publicBookData,
		error: publicBookError,
		loading: publicBookLoading,
	} = useBook_GetBookPublic({
		variables: { input: { id: bookId! } },
		skip: bookType !== 'public',
	})

	useEffect(
		function () {
			const book = bookType === 'private' ? privateBookData?.book_get : publicBookData?.book_public_get_book
			const error = bookType === 'private' ? privateBookError : publicBookError
			const loading = bookType === 'private' ? privateBookLoading : publicBookLoading

			if (loading) {
				useReadingStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
					type: 'public',
				})
			} else if (error) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookOutModel,
					type: 'public',
				})
			} else if (!book) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
					type: 'public',
				})
			} else {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: book,
					type: bookType || 'public',
				})
			}
		},
		[
			bookType,
			privateBookData,
			privateBookError,
			privateBookLoading,
			publicBookData,
			publicBookError,
			publicBookLoading,
		],
	)
}

function useFetchChapterAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getBookTypeByUrlBookId(bookIdInUrl)
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId), bookType: bookType || 'private' } },
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
}

function useCreatePopulatedChapterAndSetToStore() {
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
}
