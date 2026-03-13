import React, { useCallback } from 'react'
import { useVideoPrivate_Update, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useVideoStore } from '_pages/video/video/videoStore'
import { ChangeVideoFormData } from './form'

export function useGetOnUpdateVideoFormSubmit(
	setFieldError: (field: keyof ChangeVideoFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const video = useVideoStore((s) => s.privateVideo.data)
	const [updateBook] = useVideoPrivate_Update({ refetchQueries: [VideoPrivate_GetUserVideosDocument] })

	return useCallback(
		async function (formData: ChangeVideoFormData) {
			if (!video) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateBook({
					variables: {
						input: {
							id: video.id,
							name: formData.name,
							originalContent: formData.content,
						},
					},
				})

				if (errors) {
					setFormError('Не удалось сохранить видео')
					return
				}

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[video, setFieldError, setFormError, setFormStatus, updateBook],
	)
}
