import * as yup from 'yup'

export const changeChapterFormSchema = yup.object({
	name: yup.string().nullable().notRequired(),
	header: yup.string().nullable().notRequired(),
	content: yup.string().nullable().notRequired(),
	note: yup.string().nullable().notRequired(),
})

export type ChangeChapterFormData = yup.InferType<typeof changeChapterFormSchema>
