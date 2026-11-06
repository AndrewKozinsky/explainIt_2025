import * as yup from 'yup'
import { type AuthValidationTexts, minPasswordLength } from '../../fn/useAuthValidationTexts'

export function createLoginFormSchema(validationTexts: AuthValidationTexts) {
	return yup
		.object({
			email: yup.string().email(validationTexts.wrongEmailFormat).required(validationTexts.requiredField),
			password: yup
				.string()
				.required(validationTexts.requiredField)
				.min(minPasswordLength, validationTexts.minPasswordCharacters),
		})
		.required()
}

export type LoginFormData = yup.InferType<ReturnType<typeof createLoginFormSchema>>
