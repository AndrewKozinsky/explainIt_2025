// import { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { localStorageManager } from 'utils/localStorageManager'
// import { useBookControllerGetBook } from '@/shared/api/generated/book/book'
// import { useBookChapterControllerGetBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
// import type { BookChapterOutModel, BookOutModel } from '@/shared/api/generated/models'
// import { useReadingStore } from '_pages/media/reading/readingStore'
// import { populateChapterStructure } from './populateChapterStructure'

/*export function usePopulateReadingStore() {
	useFetchBookAndSetToStore()
	useFetchChapterAndSetToStore()
	useCreatePopulatedChapterAndSetToStore()
}*/

/*function useFetchBookAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookId = parseInt(bookIdInUrl)

	const {
		data: bookData,
		isError,
		isLoading,
	} = useBookControllerGetBook(bookId, {
		query: { enabled: !isNaN(bookId) },
	})

	useEffect(
		function () {
			if (isLoading) {
				useReadingStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (isError) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: 'Не удалось загрузить книгу',
					data: null as any as BookOutModel,
				})
			} else if (!bookData) {
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				const book = bookData as unknown as BookOutModel
				useReadingStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookData, isError, isLoading],
	)
}*/

/*function useFetchChapterAndSetToStore() {
	const bookIdInUrl = useParams().bookId as string
	const chapterId = useParams().chapterId as string

	const { data, isError, isLoading } = useBookChapterControllerGetBookChapter(
		parseInt(chapterId),
		{ bookType: 'private', targetLanguageCode: 'ru' },
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
}*/

/*function useCreatePopulatedChapterAndSetToStore() {
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
}*/
