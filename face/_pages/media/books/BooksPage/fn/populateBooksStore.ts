import { useEffect } from 'react'
import { useUser } from '@/shared/api/auth/UserProvider'
import { useBookPrivateControllerGetUserBooks } from '@/shared/api/generated/book-private/book-private'
import { useBookPublicControllerGetBooks } from '@/shared/api/generated/book-public/book-public'
import type { BookPublicOutModel, BookPrivateOutModel } from '@/shared/api/generated/models'
import { useBooksStore } from '_pages/media/books/booksStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBooksStore() {
	useFetchPublicBooksAndSetToStore()
	useFetchPrivateBooksAndSetToStore()
}

function useFetchPublicBooksAndSetToStore() {
	const { data, error, isLoading } = useBookPublicControllerGetBooks()

	useEffect(
		function () {
			if (isLoading) {
				useBooksStore.getState().updatePublicBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePublicBooks({
					loading: false,
					errorMessage: 'Не удалось загрузить список публичных книг.',
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
					data: data as unknown as BookPublicOutModel[],
				})
			}
		},
		[data, error, isLoading],
	)
}

function useFetchPrivateBooksAndSetToStore() {
	const user = useUser()

	const { data, error, isLoading } = useBookPrivateControllerGetUserBooks({
		query: { enabled: !!user?.id },
	})

	useEffect(
		function () {
			if (isLoading) {
				useBooksStore.getState().updatePrivateBooks({
					loading: true,
					errorMessage: null,
					data: [],
				})
			} else if (error) {
				useBooksStore.getState().updatePrivateBooks({
					loading: false,
					errorMessage: 'Не удалось загрузить список ваших книг.',
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
					data: data as unknown as BookPrivateOutModel[],
				})
			}
		},
		[data, error, isLoading],
	)
}
