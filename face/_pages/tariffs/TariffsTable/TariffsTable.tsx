'use client'

import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { Tariff } from '../Tariff/Tariff'
import { useTariffRowHeights } from './fn/useTariffRowHeights'
import { useTariffs } from './fn/useTariffs'
import './TariffsTable.scss'

function TariffsTable() {
	const {
		tariffs,
		tariffsLoading,
		tariffsError,
		isAuthorized,
		isAnySubscriptionAlreadyBought,
		submittingTariffId,
		submitError,
		handleBuySubscription,
	} = useTariffs()

	const tableRef = React.useRef<HTMLDivElement | null>(null)

	const allTariffs = React.useMemo(
		function () {
			const list = tariffs ?? []
			const next = [...list]
			next.unshift({
				id: 0,
				code: 'free',
				slogan: 'Полноценный старт',
				name: 'Бесплатный',
				description: 'Попробовать формат на настоящем материале.',
				isPublicMediaIncluded: false,
				isPrivateMediaIncluded: false,
				price: 0,
				durationDays: 30,
				includedBalance: 0,
				includedFileStorageMb: 0,
				createdAt: '',
			})
			return next
		},
		[tariffs],
	)

	useTariffRowHeights({ tableRef, tariffsCount: allTariffs.length })

	if (tariffsLoading) {
		return <LoadingMessage text='Загрузка тарифов...' />
	}

	if (tariffsError) {
		return (
			<div>
				Ошибка при получении тарифов: <ErrorMessage text={tariffsError.message} />
			</div>
		)
	}

	return (
		<div className='tariffs-table' ref={tableRef}>
			{allTariffs.map((tariff) => {
				const isLoading = submittingTariffId === tariff.id

				return (
					<Tariff
						key={tariff.id}
						tariff={tariff}
						isAuthorized={isAuthorized}
						isAnySubscriptionAlreadyBought={isAnySubscriptionAlreadyBought}
						isLoading={isLoading}
						isPaidTariff={tariff.code !== 'free'}
						onBuy={function () {
							return handleBuySubscription(tariff.id)
						}}
					/>
				)
			})}

			{/*{submitError && (
				<div className='tariffs__error'>
					Ошибка: <ErrorMessage text={submitError} />
				</div>
			)}*/}
		</div>
	)
}

export default TariffsTable
