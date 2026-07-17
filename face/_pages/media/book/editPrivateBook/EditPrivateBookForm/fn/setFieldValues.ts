import { useEffect, useMemo, useRef } from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import { useFetchData } from '@/shared/hooks/useFetchData'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useSetFieldValues(
	reset: UseFormReset<ChangeBookFormData>,
	setValue: UseFormSetValue<ChangeBookFormData>,
) {
	const bookId = useBookStore((s) => s.book.data?.id)
	const prevBookIdRef = useRef<number | undefined>(undefined)

	const api = useMemo(() => new BooksApi(), [])

	const { data: book } = useFetchData(async () => {
		if (!bookId) return null

		return api.getBook(bookId)
	}, [api, bookId])

	useEffect(
		function () {
			if (!book) return

			if (book.id !== prevBookIdRef.current) {
				reset({
					languageCode: book.languageCode ?? '',
					author: book.author ?? '',
					name: book.name ?? '',
					note: book.note ?? '',
				})
				prevBookIdRef.current = book.id
			}
		},
		[book, reset, setValue],
	)
}
