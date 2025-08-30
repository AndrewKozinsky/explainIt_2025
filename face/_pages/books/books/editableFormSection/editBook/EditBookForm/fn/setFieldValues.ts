import { useEffect } from 'react'
import { booksLogic } from '../../../../booksLogic'

export function useSetFieldValues(reset: (data: any) => void) {
	const book = booksLogic.useGetCurrentBook()

	useEffect(() => {
		if (!book) return

		reset({
			author: book.author ?? '',
			name: book.name ?? '',
			note: book.note ?? '',
		})
	}, [book, reset])
}
