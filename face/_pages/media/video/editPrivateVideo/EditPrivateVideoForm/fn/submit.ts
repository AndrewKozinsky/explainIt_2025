import React, { useCallback } from 'react'
import { useVideoPrivate_Update, VideoPrivate_GetDocument, VideoPrivate_GetUserVideosDocument } from '@/graphql'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { useVideoStore } from '_pages/media/video/videoStore'
import { ChangeVideoFormData } from './form'

export function useGetOnUpdateVideoFormSubmit(
	setFieldError: (field: keyof ChangeVideoFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const video = useVideoStore((s) => s.privateVideo.data)
	const [updateVideo] = useVideoPrivate_Update({
		refetchQueries: [
			VideoPrivate_GetUserVideosDocument,
			{ query: VideoPrivate_GetDocument, variables: { input: { id: video?.id } } },
		],
	})

	return useCallback(
		async function (formData: ChangeVideoFormData) {
			if (!video) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				const { data, errors } = await updateVideo({
					variables: {
						input: {
							id: video.id,
							languageCode: formData.languageCode,
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
		[video, setFieldError, setFormError, setFormStatus, updateVideo],
	)
}
