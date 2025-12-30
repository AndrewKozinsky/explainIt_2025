import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import React, { useCallback } from 'react'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useVideosStore } from '@/_pages/video/videos/videosStore'
import { ChangeVideoFormData } from './form'

export function useGetOnUpdateVideoFormSubmit(
	setFieldError: (field: keyof ChangeVideoFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const book = useVideosStore((s) => s.privateVideo)
	const [updateBook] = useVideoPrivate_Update({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

	return useCallback(
		async function (formData: ChangeVideoFormData) {
			if (!book) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateBook({
					variables: {
						input: { id: book.id, name: formData.name, subtitles: formData.subtitles },
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
