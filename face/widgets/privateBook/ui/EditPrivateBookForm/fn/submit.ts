import { useCallback } from 'react'
import { booksService } from '@/entities/book/BooksService'
import type { BookModel, UpdateBookInput } from '@/entities/book/repository/BooksRepository'
import { FormStatus, setErrorsToForm } from '@/shared/utils/forms'
import { ChangeBookFormData } from './form'

export function useGetOnUpdateBookFormSubmit(
	book: BookModel,
	onBookUpdated: (book: BookModel) => void,
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	return useCallback(
		async function (formData: ChangeBookFormData) {
			setFormError(null)
			setFormStatus('submitting')

			const data: UpdateBookInput = {
				author: formData.author ?? null,
				name: formData.name ?? null,
				languageCode: formData.languageCode ?? null,
			}

			try {
				const result = await booksService.updateBook(book.id, data)

				if (result.error || result.errors) {
					setFormError(result.error ?? 'Неизвестная ошибка')
					setFormStatus('idle')
					return
				}

				if (result.data) {
					onBookUpdated(result.data)
				}

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[book.id, booksService, onBookUpdated, setFieldError, setFormError, setFormStatus],
	)
}
