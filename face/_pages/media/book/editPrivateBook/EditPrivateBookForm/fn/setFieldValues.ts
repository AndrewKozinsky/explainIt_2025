import { useEffect } from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { useBook_GetLazyQuery } from '@/graphql'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useSetFieldValues(
	reset: UseFormReset<ChangeBookFormData>,
	setValue: UseFormSetValue<ChangeBookFormData>,
) {
	const bookId = useBookStore((s) => s.privateBook.data?.id)
	const [getBook, { data, previousData }] = useBook_GetLazyQuery()

	const book = data?.book_get
	const prevBook = previousData?.book_get

	useEffect(() => {
		if (bookId) {
			getBook({ variables: { input: { id: bookId } } })
		}
	}, [getBook, bookId])

	useEffect(() => {
		if (!book) return

		// full form reset on ID change
		if (book.id !== prevBook?.id) {
			reset({
				languageCode: book.languageCode ?? '',
				author: book.author ?? '',
				name: book.name ?? '',
				note: book.note ?? '',
			})
		}
		// For same-book updates (cover upload), fields like coverUrl, fileName,
		// isFileUploaded change, but those are not form fields — so we skip reset.
	}, [book, prevBook, reset, setValue])
}
