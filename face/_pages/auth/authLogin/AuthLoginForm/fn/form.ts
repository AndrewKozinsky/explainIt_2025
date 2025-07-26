import * as yup from 'yup'
import { errorMessage } from '../../../../../utils/errorMessage'

export const loginFormSchema = yup
	.object({
		email: yup.string().email(errorMessage.wrongEmailFormat).required(errorMessage.requiredField),
		password: yup.string().required(errorMessage.requiredField).min(6, errorMessage.minCharacters(6)),
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
