import { useCallback } from 'react'
import { Book_GetUserBooksDocument, useBook_Update } from '../../../../../../graphql'
import { FormStatus, setErrorsToForm } from '../../../../../../utils/forms'
import { ChangeBookFormData } from './form'

export function useGetOnUpdateBookFormSubmit(
	bookId: undefined | number,
	setFieldError: (field: keyof ChangeBookFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const [updateBook] = useBook_Update({ refetchQueries: [Book_GetUserBooksDocument] })

	return useCallback(
		async function (formData: ChangeBookFormData) {
			if (!bookId) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateBook({
					variables: {
						input: { id: bookId, author: formData.author, name: formData.name, note: formData.note },
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
		[bookId],
	)
}
