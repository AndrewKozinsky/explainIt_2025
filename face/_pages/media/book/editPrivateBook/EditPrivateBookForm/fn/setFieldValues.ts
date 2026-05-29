import { useEffect } from 'react'
import { useBookStore } from '_pages/media/book/bookStore'

export function useSetFieldValues(reset: (data: any) => void) {
	const book = useBookStore((s) => s.privateBook.data)

	useEffect(() => {
		if (!book) return

		reset({
			languageCode: book.languageCode ?? '',
			author: book.author ?? '',
			name: book.name ?? '',
			note: book.note ?? '',
		})
	}, [book, reset])
}
