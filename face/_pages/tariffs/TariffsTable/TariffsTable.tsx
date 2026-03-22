'use client'

// import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { Tariff } from '../Tariff/Tariff'
// import { useTariffRowHeights } from './fn/useTariffRowHeights'
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
		<div className='tariffs-table'>
			{tariffs.map((tariff) => {
				const isLoading = submittingTariffId === tariff.id

				return (
					<Tariff
						key={tariff.id}
						tariff={tariff}
						isAuthorized={isAuthorized}
						isAnySubscriptionAlreadyBought={isAnySubscriptionAlreadyBought}
						isLoading={isLoading}
						onBuy={handleBuySubscription}
					/>
				)
			})}

			{submitError && (
				<div className='tariffs__error'>
					Ошибка: <ErrorMessage text={submitError} />
				</div>
			)}
		</div>
	)
}

export default TariffsTable
