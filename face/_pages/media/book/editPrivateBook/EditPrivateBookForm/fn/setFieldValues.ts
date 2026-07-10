import { useEffect, useRef } from 'react'
import { UseFormReset, UseFormSetValue } from 'react-hook-form'
import { useBookPrivateControllerGetBook } from '@/shared/api/generated/book-private/book-private'
import type { BookPrivateOutModel } from '@/shared/api/generated/models'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useSetFieldValues(
	reset: UseFormReset<ChangeBookFormData>,
	setValue: UseFormSetValue<ChangeBookFormData>,
) {
	const bookId = useBookStore((s) => s.privateBook.data?.id)
	const prevBookIdRef = useRef<number | undefined>(undefined)

	const { data } = useBookPrivateControllerGetBook(bookId!, {
		query: { enabled: !!bookId },
	})

	const book = data as unknown as BookPrivateOutModel | undefined

	useEffect(
		function () {
			if (!book) return

			if (book.id !== prevBookIdRef.current) {
				reset({
					languageCode: (book.languageCode as unknown as string) ?? '',
					author: (book.author as unknown as string) ?? '',
					name: (book.name as unknown as string) ?? '',
					note: (book.note as unknown as string) ?? '',
				})
				prevBookIdRef.current = book.id
			}
		},
		[book, reset, setValue],
	)
}
