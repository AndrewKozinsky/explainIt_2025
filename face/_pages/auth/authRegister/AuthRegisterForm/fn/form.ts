import * as yup from 'yup'
import { errorMessages } from '../../../../../utils/errorMessages'

export const registerFormSchema = yup
	.object({
		email: yup.string().email(errorMessages.wrongEmailFormat).required(errorMessages.requiredField),
		password: yup.string().required(errorMessages.requiredField).min(6, errorMessages.minCharacters(6)),
		// passwordAgain must be the same as password
		passwordAgain: yup
			.string()
			.oneOf([yup.ref('password')], errorMessages.passwordsMustBeTheSame)
			.required(errorMessages.requiredField),
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
