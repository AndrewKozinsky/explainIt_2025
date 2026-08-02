'use client'

import { useMemo, useState } from 'react'
import { PaymentService } from '@/entites/payment/PaymentService'
import { PaymentApi } from '@/entites/payment/repository/PaymentApi'
import { useAsyncMutation } from '@/shared/utils/fetchData/useAsyncMutation'

const RUBLES_TO_KOPECKS = 100

export function useBalanceTopUpForm() {
	const [amountInRubles, setAmountInRubles] = useState('')
	const [formError, setFormError] = useState<null | string>(null)

	const service = useMemo(() => new PaymentService(new PaymentApi()), [])
	const { loading, mutate: topUpBalance } = useAsyncMutation((input: { amountInKopecks: number }) =>
		service.topUpBalance(input),
	)

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()
		setFormError(null)

		const rubles = parseInt(amountInRubles, 10)
		if (isNaN(rubles) || rubles <= 0) {
			setFormError('Введите корректную сумму')
			return
		}

		const amountInKopecks = rubles * RUBLES_TO_KOPECKS

		const result = await topUpBalance({ amountInKopecks })

		if (result.error) {
			setFormError(result.error)
			return
		}

		if (result.data?.confirmationUrl) {
			window.location.href = result.data.confirmationUrl
		}
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
