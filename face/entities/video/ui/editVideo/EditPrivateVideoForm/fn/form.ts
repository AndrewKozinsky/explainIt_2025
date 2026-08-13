import * as yup from 'yup'
import { languageKeys } from '@/shared/utils/languages'

export const editPrivateVideoFormSchema = yup.object({
	name: yup.string().nullable().notRequired(),
	content: yup.string().nullable().notRequired(),
	languageCode: yup.string().oneOf(languageKeys).required(),
})

export type EditPrivateVideoFormData = yup.InferType<typeof editPrivateVideoFormSchema>
