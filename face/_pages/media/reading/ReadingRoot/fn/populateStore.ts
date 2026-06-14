import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import header from 'ui/articleBuilder/components/Header/Header'
import { localStorageManager } from 'utils/localStorageManager'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
import {
	BookChapterOutModel,
	BookPrivateOutModel,
	useBook_Get,
	useBook_GetBookPublic,
	useBookChapter_Get,
} from '@/graphql'
import { getTextByUnknownError } from '@/utils/errorMessages'
import { useReadingStore } from '_pages/media/reading/readingStore'
import { populateChapterStructure } from './populateChapterStructure'

export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
}

function useFetchBookAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getMediaTypeByUrlMediaId(bookIdInUrl)
	const bookId = extractMediaIdFromUrlBookId(bookIdInUrl)

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
					data: null as any as BookPrivateOutModel,
					type: 'public',
				})
			} else if (error) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: getTextByUnknownError(error),
					data: null as any as BookPrivateOutModel,
					type: 'public',
				})
			} else if (!book) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPrivateOutModel,
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
	const bookType = getMediaTypeByUrlMediaId(bookIdInUrl)
	const chapterId = useParams().chapterId as string

	const { data, error, loading } = useBookChapter_Get({
		variables: { input: { id: parseInt(chapterId), bookType: bookType || 'private', targetLanguageCode: 'ru' } },
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
					errorMessage: getTextByUnknownError(error),
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
				localStorageManager.lastBookChapter.set(bookIdInUrl, chapter.id)
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
			if (!chapterData) return

			if (!chapterData.originalContent) {
				useReadingStore.getState().updatePopulatedChapter({
					id: chapterData.id,
					header: chapterData.header ?? null,
					name: chapterData.name ?? null,
					sentences: [],
				})

				return
			}

			const populatedChapter = populateChapterStructure({
				id: chapterData.id,
				header: chapterData.header,
				name: chapterData.name,
				content: chapterData.processedContent,
				sentences: chapterData.sentences,
			})

			useReadingStore.getState().updatePopulatedChapter(populatedChapter)
		},
		[chapter],
	)
}
