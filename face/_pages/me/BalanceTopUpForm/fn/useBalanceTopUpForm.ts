'use client'

import { useState } from 'react'
import { usePaymentControllerTopUpBalanceWithYooKassa } from '@/shared/api/generated/payment/payment'

const RUBLES_TO_KOPECKS = 100

export function useBalanceTopUpForm() {
	const [amountInRubles, setAmountInRubles] = useState('')
	const [formError, setFormError] = useState<null | string>(null)

	const { mutateAsync: topUpBalance, isPending: loading } = usePaymentControllerTopUpBalanceWithYooKassa()

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault()
		setFormError(null)

		const rubles = parseInt(amountInRubles, 10)
		if (isNaN(rubles) || rubles <= 0) {
			setFormError('Введите корректную сумму')
			return
		}

		const amountInKopecks = rubles * RUBLES_TO_KOPECKS

		topUpBalance({ data: { amountInKopecks } })
			.then((response) => {
				// NestJS returns the model directly, not wrapped in { data, status }
				const confirmationUrl = (response as unknown as { confirmationUrl: string }).confirmationUrl
				if (confirmationUrl) {
					window.location.href = confirmationUrl
				}
			})
			.catch((error: unknown) => {
				setFormError(error instanceof Error ? error.message : 'Произошла ошибка при создании платежа')
			})
	}

	function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		// Allow only numbers
		if (value === '' || /^\d+$/.test(value)) {
			setAmountInRubles(value)
		}
	}

	return {
		amountInRubles,
		formError,
		loading,
		handleSubmit,
		handleAmountChange,
	}
}
