import * as yup from 'yup'
import { errorMessage } from '../../../../utils/errorMessage'

export const increaseBalanceFormSchema = yup
	.object({
		amount: yup
			.number()
			.typeError(errorMessage.mustBeNumber)
			.required(errorMessage.requiredField)
			.min(10, errorMessage.minNum(10))
			.max(1000, errorMessage.maxNum(1000)),
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
