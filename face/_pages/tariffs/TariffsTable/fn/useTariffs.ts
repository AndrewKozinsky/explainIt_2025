'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TariffOutModel, usePayment_YookassaBuySubscription, useTariff_Get_Tariffs } from '@/graphql'
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
			const tariffs = tariffsData?.tariff_get_tariffs ?? []
			return getTariffsConfig(tariffs)
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

export type TariffConfig = {
	id: number
	slogan: string
	name: string
	isPaid: boolean
	features: string[]
	description: string
	prices: {
		tariffId: number
		priceRub: number
		durationDays: number
	}[]
}

function getTariffsConfig(tariffsData: TariffOutModel[]): TariffConfig[] {
	const baseTariffs = tariffsData.filter((t) => t.code.startsWith('base'))
	const standardTariffs = tariffsData.filter((t) => t.code.startsWith('standard'))

	return [
		{
			id: 1,
			slogan: 'Попробовать в действии',
			name: 'Бесплатно',
			isPaid: false,
			features: [
				'Неограниченное количество переводов одной книги и одного фильма',
				'До 5 переводов книг и фильмов ежедневно',
			],
			description: 'Попробовать формат на настоящем материале.',
			prices: [],
		},
		{
			id: 2,
			slogan: 'Регулярная практика',
			name: 'База',
			isPaid: true,
			features: [
				'Неограниченное количество переводов публичных книг и  фильмов',
				'До 5 переводов своих книг и фильмов ежедневно',
			],
			description: 'Продолжить изучение когда бесплатные материалы уже пройдены.',
			prices: baseTariffs.map((tariff) => {
				return {
					tariffId: tariff.id,
					priceRub: tariff.price / 100,
					durationDays: tariff.durationDays,
				}
			}),
		},
		{
			id: 3,
			slogan: 'Полная свобода',
			name: 'Стандарт',
			isPaid: true,
			features: [
				'Неограниченное количество переводов публичных книг и  фильмов',
				'Загрузка собственных книг и фильмов',
				'≈850 или ≈2500 переводов своих книг и фильмов',
			],
			description: 'Учиться на том, что интересно именно вам.',
			prices: standardTariffs.map((tariff) => {
				return {
					tariffId: tariff.id,
					priceRub: tariff.price / 100,
					durationDays: tariff.durationDays,
				}
			}),
		},
	]
}
