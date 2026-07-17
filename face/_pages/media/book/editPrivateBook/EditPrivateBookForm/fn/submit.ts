import { useCallback, useMemo } from 'react'
import { BooksApi } from '@/entites/books/repository/BooksApi'
import type { UpdateBookInput } from '@/entites/books/repository/BooksRepository'
import { FormStatus, setErrorsToForm } from '@/shared/utils/forms'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useGetOnUpdateBookFormSubmit(
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const book = useBookStore((s) => s.book.data)
	const api = useMemo(() => new BooksApi(), [])

	return useCallback(
		async function (formData: ChangeBookFormData) {
			if (!book) return

			setFormError(null)
			setFormStatus('submitting')

			const data: UpdateBookInput = {
				author: formData.author ?? null,
				name: formData.name ?? null,
				languageCode: formData.languageCode ?? null,
				note: formData.note ?? null,
			}

			try {
				const updatedBook = await api.updateBook(book.id, data)

				useBookStore.getState().updateBook({
					loading: false,
					errorMessage: null,
					data: updatedBook,
				})

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[book, api, setFieldError, setFormError, setFormStatus],
	)
}
