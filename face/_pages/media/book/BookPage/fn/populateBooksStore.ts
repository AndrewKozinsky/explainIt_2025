import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { extractMediaIdFromUrlBookId, getMediaTypeByUrlMediaId } from 'utils/pageUrls'
import { useBookPrivateControllerGetBook } from '@/shared/api/generated/book-private/book-private'
import { useBookPublicControllerGetBook } from '@/shared/api/generated/book-public/book-public'
import type { BookPrivateOutModel, BookPublicOutModel } from '@/shared/api/generated/models'
import { useBookStore } from '_pages/media/book/bookStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBookStore() {
	useSetBookToStore()
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

			if (privateBookLoading) {
				useBookStore.getState().updatePrivateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookPrivateOutModel,
				})
			} else if (privateBookIsError) {
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: 'Не удалось загрузить книгу',
					data: null as any as BookPrivateOutModel,
				})
			} else if (!privateBookData) {
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPrivateOutModel,
				})
			} else {
				const book = privateBookData as unknown as BookPrivateOutModel
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, privateBookData, privateBookIsError, privateBookLoading],
	)

	const {
		data: publicBookData,
		isError: publicBookIsError,
		isLoading: publicBookLoading,
	} = useBookPublicControllerGetBook(bookId!, {
		query: { enabled: bookType === 'public' && !!bookId },
	})

	useEffect(
		function () {
			if (bookType !== 'public') return

			if (publicBookLoading) {
				useBookStore.getState().updatePublicBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
				})
			} else if (publicBookIsError) {
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: 'Не удалось загрузить книгу',
					data: null as any as BookPublicOutModel,
				})
			} else if (!publicBookData) {
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
				})
			} else {
				const book = publicBookData as unknown as BookPublicOutModel
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, publicBookData, publicBookIsError, publicBookLoading],
	)
}

function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useBookStore.getState().clearStore()
		}
	}, [])
}
