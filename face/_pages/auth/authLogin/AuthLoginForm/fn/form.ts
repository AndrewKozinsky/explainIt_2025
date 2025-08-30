import * as yup from 'yup'
import { errorMessages } from '@/utils/errorMessages'

export const loginFormSchema = yup
	.object({
		email: yup.string().email(errorMessages.wrongEmailFormat).required(errorMessages.requiredField),
		password: yup.string().required(errorMessages.requiredField).min(6, errorMessages.minCharacters(6)),
	})
	.required()

export type LoginFormData = yup.InferType<typeof loginFormSchema>

export const LoginFormTest = {
	form: { id: 'form' },
	emailField: { id: 'email-field' },
	passwordField: { id: 'password-field' },
	submitButton: { id: 'submit-button' },
	failMessage: { id: 'fail-message' },
}
