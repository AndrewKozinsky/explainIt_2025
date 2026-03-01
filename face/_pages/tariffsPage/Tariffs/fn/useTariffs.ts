'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePayment_YookassaBuySubscription, useTariff_Get_Tariffs } from '@/graphql'
import { useUserStore } from '@/stores/userStore'
import { pageUrls } from '@/сonsts/pageUrls'

export function useTariffs() {
	const router = useRouter()
	const user = useUserStore((s) => s.user)
	const isUserLoading = useUserStore((s) => s.isLoading)

	const { data: tariffsData, loading: tariffsLoading, error: tariffsError } = useTariff_Get_Tariffs()
	const [buySubscription] = usePayment_YookassaBuySubscription()

	const [submittingTariffId, setSubmittingTariffId] = useState<null | number>(null)
	const [submitError, setSubmitError] = useState<string | null>(null)

	const isAuthorized = Boolean(user) && !isUserLoading
	const isAnySubscriptionAlreadyBought = Boolean(user?.currentSubscription)

	const tariffs = useMemo(
		function () {
			return tariffsData?.tariff_get_tariffs ?? []
		},
		[tariffsData],
	)

	async function handleBuySubscription(tariffId: number) {
		setSubmitError(null)

		if (!isAuthorized) {
			router.push(pageUrls.auth.login.path)
			return
		}
		if (isAnySubscriptionAlreadyBought) {
			return
		}

		try {
			setSubmittingTariffId(tariffId)
			const { data } = await buySubscription({
				variables: {
					input: {
						tariffId,
					},
				},
			})

			const confirmationUrl = data?.payment_yookassa_buy_subscription?.confirmationUrl
			if (!confirmationUrl) {
				setSubmitError('Не удалось получить ссылку для оплаты')
				return
			}

			window.location.replace(confirmationUrl)
		} catch (e: unknown) {
			setSubmitError(e instanceof Error ? e.message : 'Ошибка при создании платежа')
		} finally {
			setSubmittingTariffId(null)
		}
	}

	return {
		tariffs,
		tariffsLoading,
		tariffsError,
		isAuthorized,
		isAnySubscriptionAlreadyBought,
		submittingTariffId,
		submitError,
		handleBuySubscription,
	}
}
