import * as yup from 'yup'
import { errorMessage } from '../../../../../utils/errorMessage'

export const registerFormSchema = yup
	.object({
		email: yup.string().email(errorMessage.wrongEmailFormat).required(errorMessage.requiredField),
		password: yup.string().required(errorMessage.requiredField).min(6, errorMessage.minCharacters(6)),
		// passwordAgain must be the same as password
		passwordAgain: yup
			.string()
			.oneOf([yup.ref('password')], errorMessage.passwordsMustBeTheSame)
			.required(errorMessage.requiredField),
	})
	.required()

export type RegisterFormData = yup.InferType<typeof registerFormSchema>

export const RegisterFormTest = {
	form: { id: 'form' },
	emailField: { id: 'email-field' },
	passwordField: { id: 'password-field' },
	passwordAgainField: { id: 'password-again-field' },
	submitButton: { id: 'submit-button' },
	failMessage: { id: 'fail-message' },
	successMessage: { id: 'success-message' },
}
