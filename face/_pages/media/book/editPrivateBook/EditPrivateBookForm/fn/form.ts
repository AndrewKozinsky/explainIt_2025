import * as yup from 'yup'

export const changeBookFormSchema = yup.object({
	languageCode: yup.string().nullable().notRequired(),
	author: yup.string().nullable().notRequired(),
	name: yup.string().nullable().notRequired(),
	note: yup.string().nullable().notRequired(),
})

export type ChangeBookFormData = yup.InferType<typeof changeBookFormSchema>
