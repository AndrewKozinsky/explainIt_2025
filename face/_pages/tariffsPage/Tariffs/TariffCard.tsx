'use client'

import React, { useMemo } from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import { TariffOutModel } from '@/graphql'

type TariffCardProps = {
	tariff: TariffOutModel
	isAuthorized: boolean
	isAnySubscriptionAlreadyBought: boolean
	isLoading: boolean
	onBuy(): void
}

export function TariffCard(props: TariffCardProps) {
	const { tariff, isAuthorized, isAnySubscriptionAlreadyBought, isLoading, onBuy } = props

	const priceRub = useMemo(
		function () {
			return (tariff.price / 100).toFixed(0)
		},
		[tariff.price],
	)

	return (
		<div className='tariffs__card'>
			<div className='tariffs__card-header'>
				<div className='tariffs__name'>{tariff.name}</div>
				<div className='tariffs__days'>{tariff.durationDays} дней</div>
			</div>

			<div className='tariffs__slogan'>{tariff.slogan}</div>
			<div className='tariffs__description'>{tariff.description}</div>

			<ul className='tariffs__features'>
				{tariff.isPublicMediaIncluded ? (
					<li className='tariffs__feature'>✓ Все публичные книги и фильмы</li>
				) : null}
				{tariff.isPrivateMediaIncluded ? (
					<li className='tariffs__feature'>✓ Загрузка собственных книг и фильмов</li>
				) : null}
			</ul>

			<div className='tariffs__price'>{priceRub} ₽</div>

			<Button disabled={isAnySubscriptionAlreadyBought} loading={isLoading} onClick={onBuy}>
				{!isAuthorized
					? 'Войти, чтобы купить'
					: isAnySubscriptionAlreadyBought
						? 'Одна подписка уже куплена'
						: 'Купить'}
			</Button>
		</div>
	)
}
