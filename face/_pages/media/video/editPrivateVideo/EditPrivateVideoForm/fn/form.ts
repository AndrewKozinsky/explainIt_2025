import * as yup from 'yup'

export type ChangeVideoFormData = {
	languageCode?: null | string
	name?: null | string
	content?: null | string
}

export const changeVideoFormSchema = yup.object({
	languageCode: yup.string().nullable().notRequired(),
	name: yup.string().nullable().notRequired(),
	content: yup.string().nullable().notRequired(),
})
