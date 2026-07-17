// import React, { useCallback } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
// import {
// 	useVideoPrivateControllerUpdateVideoPrivate,
// 	getVideoPrivateControllerGetUserVideosPrivateQueryKey,
// 	getVideoPrivateControllerGetVideoPrivateQueryKey,
// } from '@/shared/api/generated/video-private/video-private'
// import type { UpdateVideoDtoLanguageCode } from '@/shared/api/generated/models'
// import { FormStatus, setErrorsToForm } from '@/utils/forms'
// import { useVideoStore } from '_pages/media/video/videoStore'
// import { ChangeVideoFormData } from './form'

/*export function useGetOnUpdateVideoFormSubmit(
	setFieldError: (field: keyof ChangeVideoFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const video = useVideoStore((s) => s.privateVideo.data)
	const { mutateAsync: updateVideo } = useVideoPrivateControllerUpdateVideoPrivate()
	const queryClient = useQueryClient()

	return useCallback(
		async function (formData: ChangeVideoFormData) {
			if (!video) return

			setFormError(null)
			setFormStatus('submitting')

			try {
				await updateVideo({
					id: video.id,
					data: {
						languageCode: formData.languageCode as unknown as UpdateVideoDtoLanguageCode,
						name: formData.name,
						originalContent: formData.content,
					},
				})

				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetUserVideosPrivateQueryKey() })
				queryClient.invalidateQueries({ queryKey: getVideoPrivateControllerGetVideoPrivateQueryKey(video.id) })

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[video, setFieldError, setFormError, setFormStatus, updateVideo, queryClient],
	)
}*/
