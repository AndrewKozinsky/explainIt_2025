import { Book_GetUserBooks, BookChapterOutModel, BookOutModel } from 'graphql'
import { useEffect } from 'react'

export function useSetFieldValues(reset: (data: any) => void, book: BookOutModel) {
	useEffect(() => {
		reset({
			author: book.author ?? '',
			name: book.name ?? '',
			note: book.note ?? '',
		})
	}, [book, reset])
}
