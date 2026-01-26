import { useCallback } from 'react'
import { useBookChapter_Update } from '@/graphql'
import { Book_GetUserBooksDocument } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useBooksStore } from '_pages/books/books/booksStore'
import { ChangeChapterFormData } from './form'

export function useGetOnUpdateChapterFormSubmit(
	setFieldError: (field: keyof ChangeChapterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const chapter = useBooksStore((s) => s.chapter)

	const [updateChapter] = useBookChapter_Update({ refetchQueries: [Book_GetUserBooksDocument] })

	return useCallback(
		async function (formData: ChangeChapterFormData) {
			if (!chapter.data) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				// Update chapter data
				const { data, errors } = await updateChapter({
					variables: {
						input: {
							id: chapter.data.id,
							name: formData.name,
							header: formData.header,
							content: formData.content ?? null,
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
		[chapter.data, setFieldError, setFormError, setFormStatus, updateChapter],
	)
}
