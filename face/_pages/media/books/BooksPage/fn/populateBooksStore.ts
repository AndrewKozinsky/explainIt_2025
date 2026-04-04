import { useEffect } from 'react'
import { useUserStore } from 'stores/userStore'
import { useBook_GetBooksPublic, useBook_GetUserBooks } from '@/graphql'
import { useBooksStore } from '_pages/media/books/booksStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBooksStore() {
	useFetchPublicBooksAndSetToStore()
	useFetchPrivateBooksAndSetToStore()
}

function useFetchPublicBooksAndSetToStore() {
	const { data, error, loading } = useBook_GetBooksPublic()

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updatePublicBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: null,
					data: data.book_public_get_books,
				})
			}
		},
		[data, error, loading],
	)
}

function useFetchPrivateBooksAndSetToStore() {
	const user = useUserStore((state) => state.user)

	const { data, error, loading } = useBook_GetUserBooks({
		skip: !user?.id,
		fetchPolicy: 'cache-and-network',
	})

	useEffect(
		function () {
			if (loading) {
				useBooksStore.getState().updatePrivateBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: error.message,
					data: [],
				})
			} else if (!data) {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: null,
					data: [],
				})
			} else {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: null,
					data: data.book_user_books,
				})
			}
		},
		[data, error, loading],
	)
}
