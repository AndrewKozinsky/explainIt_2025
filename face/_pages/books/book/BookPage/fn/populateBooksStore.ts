import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { BookOutModel, BookPublicOutModel, useBook_Get, useBook_GetBookPublic } from '@/graphql'
import { useBookStore } from '_pages/books/book/bookStore'
import { extractBookIdFromUrlBookId, getBookTypeByUrlBookId, pageUrls } from 'сonsts/pageUrls'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBookStore() {
	useSetBookToStore()
	useClearDataOnUnmount()
}

function useSetBookToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookType = getBookTypeByUrlBookId(bookIdInUrl)
	const bookId = extractBookIdFromUrlBookId(bookIdInUrl)

	const {
		data: privateBookData,
		error: privateBookError,
		loading: privateBookLoading,
	} = useBook_Get({ variables: { input: { id: bookId! } }, skip: bookType !== 'private' })

	useEffect(
		function () {
			if (bookType !== 'private') return

			const book = privateBookData?.book_get

			if (privateBookLoading) {
				useBookStore.getState().updatePrivateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else if (privateBookError) {
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: privateBookError.message,
					data: null as any as BookOutModel,
				})
			} else if (!book) {
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookOutModel,
				})
			} else {
				useBookStore.getState().updatePrivateBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, privateBookData, privateBookError, privateBookLoading],
	)

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
			if (bookType !== 'public') return

			const book = publicBookData?.book_public_get_book

			if (publicBookLoading) {
				useBookStore.getState().updatePublicBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
				})
			} else if (publicBookError) {
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: publicBookError.message,
					data: null as any as BookPublicOutModel,
				})
			} else if (!book) {
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
				})
			} else {
				useBookStore.getState().updatePublicBook({
					loading: false,
					errorMessage: null,
					data: book,
				})
			}
		},
		[bookType, publicBookData, publicBookError, publicBookLoading],
	)

	/*useEffect(
		function () {
			const book = bookType === 'private' ? privateBookData?.book_get : publicBookData?.book_public_get_book
			const error = bookType === 'private' ? privateBookError : publicBookError
			const loading = bookType === 'private' ? privateBookLoading : publicBookLoading

			if (loading) {
				useBookStore.getState().updateBook({
					loading: true,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
					type: 'public',
				})
			} else if (error) {
				useBookStore.getState().updateBook({
					loading: false,
					errorMessage: error.message,
					data: null as any as BookPublicOutModel,
					type: 'public',
				})
			} else if (!book) {
				useBookStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: null as any as BookPublicOutModel,
					type: 'public',
				})
			} else {
				useBookStore.getState().updateBook({
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
	)*/
}

function useClearDataOnUnmount() {
	useEffect(function () {
		useBookStore.getState().clearStore()
	}, [])
}
