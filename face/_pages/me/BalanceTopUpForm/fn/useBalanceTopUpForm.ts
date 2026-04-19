'use client'

import { useState } from 'react'
import { usePayment_YookassaTopUpBalance } from '@/graphql'

const RUBLES_TO_KOPECKS = 100

export function useBalanceTopUpForm() {
	const [amountInRubles, setAmountInRubles] = useState('')
	const [formError, setFormError] = useState<null | string>(null)

	const [topUpBalance, { loading }] = usePayment_YookassaTopUpBalance()

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault()
		setFormError(null)

		const rubles = parseInt(amountInRubles, 10)
		if (isNaN(rubles) || rubles <= 0) {
			setFormError('Введите корректную сумму')
			return
		}

		const amountInKopecks = rubles * RUBLES_TO_KOPECKS

		topUpBalance({
			variables: {
				input: {
					amountInKopecks,
				},
			},
		})
			.then((response) => {
				const confirmationUrl = response.data?.payment_yookassa_top_up_balance?.confirmationUrl
				if (confirmationUrl) {
					window.location.href = confirmationUrl
				}
			})
			.catch((error) => {
				setFormError(error.message || 'Произошла ошибка при создании платежа')
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
