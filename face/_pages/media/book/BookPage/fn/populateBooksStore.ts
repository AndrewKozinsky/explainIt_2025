import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { useFetchData } from '@/shared/hooks/useFetchData'
import { useBookStore } from '_pages/media/book/bookStore'

/** Наполняет Хранилище данными для начала работы */
export function usePopulateBookStore() {
	useSetBookToStore()
	useClearDataOnUnmount()
}

function useSetBookToStore() {
	const bookIdInUrl = useParams().bookId as string
	const bookId = parseInt(bookIdInUrl)

	const api = useMemo(() => new BooksApi(), [])

	const { loading, error, data } = useFetchData(async () => {
		if (isNaN(bookId)) return null

		return api.getBook(bookId)
	}, [api, bookId])

	useEffect(
		function () {
			useBookStore.getState().updateBook({
				loading,
				errorMessage: error,
				data: data ?? null,
			})
		},
		[loading, error, data],
	)
}

function useClearDataOnUnmount() {
	useEffect(function () {
		return () => {
			useBookStore.getState().clearStore()
		}
	}, [])
}
