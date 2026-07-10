import React, { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useBookPrivateControllerUpdateBook } from '@/shared/api/generated/book-private/book-private'
import {
	getBookPrivateControllerGetUserBooksQueryKey,
	getBookPrivateControllerGetBookQueryKey,
} from '@/shared/api/generated/book-private/book-private'
import type { UpdateBookDtoLanguageCode } from '@/shared/api/generated/models'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useBookStore } from '_pages/media/book/bookStore'
import { ChangeBookFormData } from './form'

export function useGetOnUpdateBookFormSubmit(
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const book = useBookStore((s) => s.privateBook.data)
	const { mutateAsync: updateBook } = useBookPrivateControllerUpdateBook()
	const queryClient = useQueryClient()

	return useCallback(
		async function (formData: ChangeBookFormData) {
			if (!book) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				await updateBook({
					id: book.id,
					data: {
						author: formData.author,
						name: formData.name,
						languageCode: formData.languageCode as unknown as UpdateBookDtoLanguageCode,
						note: formData.note,
					},
				})

				queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetUserBooksQueryKey() })
				queryClient.invalidateQueries({ queryKey: getBookPrivateControllerGetBookQueryKey(book.id) })

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[book, setFieldError, setFormError, setFormStatus, updateBook, queryClient],
	)
}
