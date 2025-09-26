import { useCallback } from 'react'
import { useBookChapter_Update } from '@/graphql'
import { Book_GetUserBooksDocument } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { ChangeChapterFormData } from './form'

export function useGetOnUpdateChapterFormSubmit(
	chapterId: number,
	setFieldError: (field: keyof ChangeChapterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const [updateChapter] = useBookChapter_Update({ refetchQueries: [Book_GetUserBooksDocument] })

	return useCallback(
		async function (formData: ChangeChapterFormData) {
			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateChapter({
					variables: {
						input: {
							id: chapterId,
							name: formData.name,
							header: formData.header,
							content: formData.content,
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
		[chapterId, setFieldError, setFormError, setFormStatus, updateChapter],
	)
}
