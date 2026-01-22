import * as yup from 'yup'

export const changeVideoFormSchema = yup.object({
	name: yup.string().nullable().notRequired(),
	text: yup.string().nullable().notRequired(),
})

export type ChangeVideoFormData = yup.InferType<typeof changeVideoFormSchema>
