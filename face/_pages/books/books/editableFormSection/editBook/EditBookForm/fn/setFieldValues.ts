import { useEffect } from 'react'
import { booksFetcher } from '@/_pages/books/booksFetcher'

export function useSetFieldValues(reset: (data: any) => void) {
	const book = booksFetcher.useGetCurrentBook()

	useEffect(() => {
		if (!book) return

		reset({
			author: book.author ?? '',
			name: book.name ?? '',
			note: book.note ?? '',
		})
	}, [book, reset])
}
