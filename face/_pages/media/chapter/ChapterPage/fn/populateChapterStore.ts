// import { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { useBookControllerGetBook } from '@/shared/api/generated/book/book'
// import { useBookChapterControllerGetBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
// import type { BookChapterOutModel, BookOutModel } from '@/shared/api/generated/models'
// import { useChapterStore } from '../../chapterStore'

/** Наполняет Хранилище данными для начала работы */
/*export function usePopulateChapterStore() {
	useSetBookToStore()
	useFetchChapterAndSetToStore()
	useClearDataOnUnmount()
}*/

/*function useSetBookToStore() {
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
			const book = bookData as unknown as BookOutModel | undefined

			if (isLoading) {
				useChapterStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (isError) {
				useChapterStore.getState().updateBook({
					loading: false,
					errorMessage: 'Не удалось загрузить книгу',
					data: null as any as BookOutModel,
				})
			} else if (!book) {
				useChapterStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				useChapterStore.getState().updateBook({
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
	const chapterId = useParams().chapterId as string

	const { data, isError, isLoading } = useBookChapterControllerGetBookChapter(
		parseInt(chapterId),
		{ bookType: 'private' },
		{ query: { enabled: !!chapterId } },
	)

	useEffect(
		function () {
			if (isLoading) {
				useChapterStore.getState().updateChapter({
					loading: true,
					errorMessage: null,
					data: null,
				})
			} else if (isError) {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: 'Не удалось загрузить главу',
					data: null,
				})
			} else if (!data) {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: null,
				})
			} else {
				useChapterStore.getState().updateChapter({
					loading: false,
					errorMessage: null,
					data: data as unknown as BookChapterOutModel,
				})
			}
		},
		[data, isError, isLoading],
	)
}*/

/*function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useChapterStore.getState().clearStore()
		}
	}, [])
}*/
