// import React, { useCallback } from 'react'
// import { Book_GetUserBooksDocument, useBook_Update } from '@/graphql'
// import { FormStatus, setErrorsToForm } from '@/utils/forms'
// import { ChangeBookFormData } from './form'
// import { useBooksStore } from '@/_pages/books/books/booksStore'

/*export function useGetOnUpdateBookFormSubmit(
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const book = useBooksStore((s) => s.book)
	const [updateBook] = useBook_Update({ refetchQueries: [Book_GetUserBooksDocument] })

	return useCallback(
		async function (formData: ChangeBookFormData) {
			if (!book) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateBook({
					variables: {
						input: { id: book.id, author: formData.author, name: formData.name, note: formData.note },
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
}*/
