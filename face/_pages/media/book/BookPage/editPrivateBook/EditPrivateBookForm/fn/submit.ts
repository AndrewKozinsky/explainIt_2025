import React, { useCallback } from 'react'
import { Book_GetUserBooksDocument, useBook_Update } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useGetOnUpdateBookFormSubmit(
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const book = useBookStore((s) => s.privateBook.data)
	const [updateBook] = useBook_Update({ refetchQueries: [Book_GetUserBooksDocument] })

	return useCallback(
		async function (formData: ChangeBookFormData) {
			if (!book) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateBook({
					variables: {
						input: {
							id: book.id,
							author: formData.author,
							name: formData.name,
							languageCode: formData.languageCode,
							note: formData.note,
						},
					},
				})

				if (errors) {
					setFormError('Не удалось сохранить книгу')
					return
				}

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[book, setFieldError, setFormError, setFormStatus, updateBook],
	)
}
