'use client'

import React from 'react'
import cn from 'classnames'
import Button from 'ui/formRelated/buttons/Button/Button'
import { TariffOutModel } from '@/graphql'
import './Tariff.scss'

type TariffProps = {
	tariff: TariffOutModel
	isAuthorized: boolean
	isAnySubscriptionAlreadyBought: boolean
	isLoading: boolean
	isPaidTariff: boolean
	onBuy(): void
}

export function Tariff(props: TariffProps) {
	const { tariff, isAuthorized, isAnySubscriptionAlreadyBought, isLoading, isPaidTariff, onBuy } = props

	const priceRub = (tariff.price / 100).toFixed(0)
	const translationsCount = Math.round(tariff.includedBalance / 6)

	return (
		<div className='tariff'>
			<p className='tariff__slogan'>{tariff.slogan}</p>
			<p className={cn('tariff__name', isPaidTariff && 'tariff__name--accent')}>{tariff.name}</p>
			<ul className='tariff__features'>
				{tariff.code === 'free' && <Feature text='Одна публичная книга и фильм' />}
				{tariff.isPublicMediaIncluded && <Feature text='Все публичные книги и фильмы' />}
				{tariff.isPublicMediaIncluded && (
					<Feature text='Неограниченное количество переводов публичных книг и фильмов' />
				)}
				{tariff.isPrivateMediaIncluded && <Feature text='Загрузка собственных книг и фильмов' />}
				{translationsCount ? (
					<Feature text={'≈' + translationsCount + ' переводов предложений из собственных книг и фильмов'} />
				) : null}
			</ul>
			<div className='tariff__small-text tariff__description'>{tariff.description}</div>
			<div className='tariff__spacer' />
			{isPaidTariff ? <div className='tariff__price'>{priceRub} ₽</div> : <div />}
			{isPaidTariff ? <div className='tariff__days'>{tariff.durationDays} дней</div> : <div />}
			{isPaidTariff && (
				<Button
					disabled={isAnySubscriptionAlreadyBought}
					loading={isLoading}
					onClick={onBuy}
					theme='accent'
					size='big'
					extraClass='tariff__button'
				>
					{!isAuthorized
						? 'Войти, чтобы купить'
						: isAnySubscriptionAlreadyBought
							? 'Одна подписка уже куплена'
							: 'Купить'}
				</Button>
			)}
			{isPaidTariff && <div className='tariff__small-text tariff__footer-text'>Оплата картой РФ</div>}
		</div>
	)
}

function Feature({ text }: { text: string }) {
	return <li className='tariff__feature'>{text}</li>
}
