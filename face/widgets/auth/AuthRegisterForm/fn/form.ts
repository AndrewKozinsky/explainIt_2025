import * as yup from 'yup'
import { type AuthValidationTexts, minPasswordLength } from '../../fn/useAuthValidationTexts'

export function createRegisterFormSchema(validationTexts: AuthValidationTexts) {
	return yup
		.object({
			email: yup.string().email(validationTexts.wrongEmailFormat).required(validationTexts.requiredField),
			password: yup
				.string()
				.required(validationTexts.requiredField)
				.min(minPasswordLength, validationTexts.minPasswordCharacters),
			// passwordAgain must be the same as password
			passwordAgain: yup
				.string()
				.oneOf([yup.ref('password')], validationTexts.passwordsMustBeTheSame)
				.required(validationTexts.requiredField),
		})
		.required()
}

export type RegisterFormData = yup.InferType<ReturnType<typeof createRegisterFormSchema>>
