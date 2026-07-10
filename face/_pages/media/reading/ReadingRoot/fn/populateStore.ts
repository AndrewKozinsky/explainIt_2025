import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { localStorageManager } from 'utils/localStorageManager'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
import { useBookChapterControllerGetBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
import { useBookPrivateControllerGetBook } from '@/shared/api/generated/book-private/book-private'
import { useBookPublicControllerGetBook } from '@/shared/api/generated/book-public/book-public'
import type { BookChapterOutModel, BookPrivateOutModel, BookPublicOutModel } from '@/shared/api/generated/models'
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
		isError: privateBookIsError,
		isLoading: privateBookLoading,
	} = useBookPrivateControllerGetBook(bookId!, {
		query: { enabled: bookType === 'private' && !!bookId },
	})

	const {
		data: publicBookData,
		isError: publicBookIsError,
		isLoading: publicBookLoading,
	} = useBookPublicControllerGetBook(bookId!, {
		query: { enabled: bookType === 'public' && !!bookId },
	})

	useEffect(
		function () {
			const book =
				bookType === 'private'
					? (privateBookData as unknown as BookPrivateOutModel | undefined)
					: (publicBookData as unknown as BookPublicOutModel | undefined)
			const error = bookType === 'private' ? privateBookIsError : publicBookIsError
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
					errorMessage: 'Не удалось загрузить книгу',
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
			privateBookIsError,
			privateBookLoading,
			publicBookData,
			publicBookIsError,
			publicBookLoading,
		],
	)
}

function useFetchChapterAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getMediaTypeByUrlMediaId(bookIdInUrl)
	const chapterId = useParams().chapterId as string

	const { data, isError, isLoading } = useBookChapterControllerGetBookChapter(
		parseInt(chapterId),
		{ bookType: bookType || 'private', targetLanguageCode: 'ru' },
		{ query: { enabled: !!chapterId } },
	)

	useEffect(
		function () {
			if (isLoading) {
				useReadingStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else if (isError) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: 'Не удалось загрузить главу',
					data: null as any as BookChapterOutModel,
				})
			} else if (!data) {
				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null as any as BookChapterOutModel,
				})
			} else {
				const chapter = data as unknown as BookChapterOutModel

				useReadingStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: chapter,
				})
				localStorageManager.lastBookChapter.set(bookIdInUrl, chapter.id)
			}
		},
		[data, isError, isLoading, chapterId],
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
					header: (chapterData.header as unknown as string) ?? null,
					name: (chapterData.name as unknown as string) ?? null,
					sentences: [],
				})

				return
			}

			const populatedChapter = populateChapterStructure({
				id: chapterData.id,
				header: chapterData.header as unknown as string,
				name: chapterData.name as unknown as string,
				content: chapterData.processedContent as unknown as string,
				sentences: chapterData.sentences,
			})

			useReadingStore.getState().updatePopulatedChapter(populatedChapter)
		},
		[chapter],
	)
}
