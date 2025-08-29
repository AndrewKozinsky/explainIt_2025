import * as yup from 'yup'
import { errorMessages } from '../../../../utils/errorMessages'

export const increaseBalanceFormSchema = yup
	.object({
		amount: yup
			.number()
			.typeError(errorMessages.mustBeNumber)
			.required(errorMessages.requiredField)
			.min(10, errorMessages.minNum(10))
			.max(1000, errorMessages.maxNum(1000)),
	})
	.required()

export type IncreaseBalanceFormData = yup.InferType<typeof increaseBalanceFormSchema>

export const IncreaseBalanceFormTest = {
	form: { id: 'form' },
	amountField: { id: 'amount-field' },
	submitButton: { id: 'submit-button' },
	failMessage: { id: 'fail-message' },
	successMessage: { id: 'success-message' },
}
