import * as yup from 'yup'

export const MaxContentLength = 4000

export const changeChapterFormSchema = yup.object({
	name: yup.string().nullable().notRequired(),
	header: yup.string().nullable().notRequired(),
	content: yup
		.string()
		.nullable()
		.notRequired()
		.max(MaxContentLength, `Максимальная длина текста — ${MaxContentLength} символов`),
	note: yup.string().nullable().notRequired(),
})

export type ChangeChapterFormData = yup.InferType<typeof changeChapterFormSchema>

export const ChangeChapterFormTest = {
	form: { id: 'form' },
	nameField: { id: 'name-field' },
	headerField: { id: 'header-field' },
	contentField: { id: 'content-field' },
	noteField: { id: 'note-field' },
	submitButton: { id: 'submit-button' },
	failMessage: { id: 'fail-message' },
}
