import { useCallback, useMemo } from 'react'
import { UseFormReset } from 'react-hook-form'
import { ChaptersService } from '@/entities/chapter/ChaptersService'
import { ChaptersApi } from '@/entities/chapter/repository/ChaptersApi'
import type { UpdateChapterInput } from '@/entities/chapter/repository/ChaptersRepository'
import { FormStatus, setErrorsToForm } from '@/shared/utils/forms'
import { ChangeChapterFormData } from './form'

export function useGetOnUpdateChapterFormSubmit(
	chapterId: number,
	resetForm: UseFormReset<ChangeChapterFormData>,
	onChapterUpdated: () => void,
	setFieldError: (field: keyof ChangeChapterFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const chaptersService = useMemo(() => new ChaptersService(new ChaptersApi()), [])

	return useCallback(
		async function (formData: ChangeChapterFormData) {
			setFormError(null)
			setFormStatus('submitting')

			const data: UpdateChapterInput = {
				name: formData.name ?? null,
				header: formData.header ?? null,
				originalContent: formData.content ?? null,
			}

			try {
				const result = await chaptersService.updateChapter(chapterId, data)

				if (result.error || result.errors) {
					setFormError(result.error ?? 'Неизвестная ошибка')
					setFormStatus('idle')
					return
				}

				// Сбрасываем форму с сохранёнными значениями, чтобы isDirty стал false
				resetForm(formData)
				onChapterUpdated()
				setFormStatus('idle')
			} catch (gqError: unknown) {
				setErrorsToForm(gqError, setFieldError, setFormError)
				setFormStatus('idle')
			}
		},
		[chapterId, chaptersService, resetForm, onChapterUpdated, setFieldError, setFormError, setFormStatus],
	)
}
