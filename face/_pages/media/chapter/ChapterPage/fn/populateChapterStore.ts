import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
import { useBookChapterControllerGetBookChapter } from '@/shared/api/generated/book-chapter/book-chapter'
import { useBookPrivateControllerGetBook } from '@/shared/api/generated/book-private/book-private'
import type { BookChapterOutModel, BookPrivateOutModel } from '@/shared/api/generated/models'
import { useChapterStore } from '../../chapterStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateChapterStore() {
	useSetBookToStore()
	useFetchChapterAndSetToStore()
	useClearDataOnUnmount()
}

function useSetBookToStore() {
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

	useEffect(
		function () {
			if (bookType !== 'private') return

			const book = privateBookData as unknown as BookPrivateOutModel | undefined

			if (privateBookLoading) {
				useChapterStore.getState().updatePrivateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookPrivateOutModel,
				})
			} else if (privateBookIsError) {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: 'Не удалось загрузить книгу',
					data: null as any as BookPrivateOutModel,
				})
			} else if (!book) {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPrivateOutModel,
				})
			} else {
				useChapterStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, privateBookData, privateBookIsError, privateBookLoading],
	)
}

function useFetchChapterAndSetToStore() {
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
}

function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useChapterStore.getState().clearStore()
		}
	}, [])
}
