import { useEffect, useRef } from 'react'
import { UseFormReset } from 'react-hook-form'
import { BookModel } from '@/entites/books/repository/BooksRepository'
import { ChangeBookFormData } from './form'

export function useSetFieldValues(book: BookModel, reset: UseFormReset<ChangeBookFormData>) {
	const prevBookIdRef = useRef<number | undefined>(undefined)

	useEffect(
		function () {
			if (book.id !== prevBookIdRef.current) {
				reset({
					languageCode: book.languageCode ?? '',
					author: book.author ?? '',
					name: book.name ?? '',
				})

				prevBookIdRef.current = book.id
			}
		},
		[book, reset],
	)
}
