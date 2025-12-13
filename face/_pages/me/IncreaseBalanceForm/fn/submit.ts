import { useCallback } from 'react'
import { usePayment_YookassaTopUpBalance } from '@/graphql'
import { errorMessages } from '@/utils/errorMessages'
import { FormStatus, setErrorsToForm } from '@/utils/forms'
import { IncreaseBalanceFormData } from './form'

export function useGetIncreaseBalanceFormSubmit(
	setFieldError: (field: keyof IncreaseBalanceFormData, params: any) => void,
	setFormStatus: React.Dispatch<React.SetStateAction<FormStatus>>,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const [topUpBalance] = usePayment_YookassaTopUpBalance()

	return useCallback(async function (formData: IncreaseBalanceFormData) {
		setFormError(null)
		setFormStatus('submitting')

		try {
			// 5.77 -> 500
			const amount = Math.floor(formData.amount) * 100

			const { data: topUpBalanceRes } = await topUpBalance({
				variables: { input: { amount } },
			})

			if (!topUpBalanceRes || topUpBalanceRes?.payment_yookassa_top_up_balance?.confirmationUrl === null) {
				setFormError(errorMessages.cannotGetPaymentConfirmationUrl)
				setFormStatus('idle')
				return null
			}

			setFormStatus('success')

			window.location.replace(topUpBalanceRes.payment_yookassa_top_up_balance.confirmationUrl)
			// window.location.href = topUpBalanceRes.payment_yookassa_top_up_balance.confirmationUrl
		} catch (gqError: unknown) {
			setErrorsToForm(gqError, setFieldError, setFormError)
			setFormStatus('idle')
		}
	}, [])
}
