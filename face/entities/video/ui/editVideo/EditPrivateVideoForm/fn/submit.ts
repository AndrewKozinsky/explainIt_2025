import { useCallback, useMemo } from 'react'
import { VideosApi } from '@/entities/video/repository/VideosApi'
import type { UpdateVideoInput } from '@/entities/video/repository/VideosRepository'
import { VideosService } from '@/entities/video/VideosService'
import { FormStatus, setErrorsToForm } from '@/shared/utils/forms'
import { EditPrivateVideoFormData } from './form'

export function useGetOnUpdateVideoFormSubmit(
	videoId: number,
	reset: (formData: EditPrivateVideoFormData) => void,
	onSaved: () => void,
	setFieldError: (field: keyof EditPrivateVideoFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const videosService = useMemo(() => new VideosService(new VideosApi()), [])

	return useCallback(
		async function (formData: EditPrivateVideoFormData) {
			setFormError(null)
			setFormStatus('submitting')

			const data: UpdateVideoInput = {
				name: formData.name ?? null,
				originalContent: formData.content ?? null,
				languageCode: formData.languageCode,
			}

			try {
				const result = await videosService.updateVideo(videoId, data)

				if (result.error || result.errors) {
					setFormError(result.error ?? 'Неизвестная ошибка')
					setFormStatus('idle')
					return
				}

				// Сбрасываем dirty-состояние формы
				reset(formData)

				onSaved()

				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[videoId, videosService, reset, onSaved, setFieldError, setFormError, setFormStatus],
	)
}
