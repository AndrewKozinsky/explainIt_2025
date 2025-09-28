import { useBooksStore } from '_pages/books/books/booksStore'
import { useEffect } from 'react'

export function useSetFieldValues(reset: (data: any) => void) {
	const book = useBooksStore((s) => s.book)

	useEffect(() => {
		if (!book) return

		reset({
			author: book.author ?? '',
			name: book.name ?? '',
			note: book.note ?? '',
		})
	}, [book, reset])
}
