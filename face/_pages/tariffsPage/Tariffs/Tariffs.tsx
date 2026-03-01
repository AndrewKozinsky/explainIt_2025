'use client'

import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import { useTariffs } from './fn/useTariffs'
import { TariffCard } from './TariffCard'
import './Tariffs.scss'

function Tariffs() {
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
		return <div className='tariffs'>Загрузка тарифов...</div>
	}

	if (tariffsError) {
		return (
			<div className='tariffs'>
				Ошибка при получении тарифов: <ErrorMessage text={tariffsError.message} />
			</div>
		)
	}

	return (
		<div className='tariffs'>
			<div className='tariffs__grid'>
				{tariffs.map((tariff) => {
					const isLoading = submittingTariffId === tariff.id

					return (
						<TariffCard
							key={tariff.id}
							tariff={tariff}
							isAuthorized={isAuthorized}
							isAnySubscriptionAlreadyBought={isAnySubscriptionAlreadyBought}
							isLoading={isLoading}
							onBuy={function () {
								return handleBuySubscription(tariff.id)
							}}
						/>
					)
				})}
			</div>

			{submitError && (
				<div className='tariffs__error'>
					Ошибка: <ErrorMessage text={submitError} />
				</div>
			)}
		</div>
	)
}

export default Tariffs
