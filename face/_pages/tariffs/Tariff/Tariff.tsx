import { useState } from 'react'
import cn from 'classnames'
import Button from 'ui/formRelated/buttons/Button/Button'
import RadioGroup from 'ui/formRelated/RadioGroup/RadioGroup'
import { TariffConfig } from '_pages/tariffs/TariffsTable/fn/useTariffs'
import './Tariff.scss'

type TariffProps = {
	tariff: TariffConfig
	isAuthorized: boolean
	isAnySubscriptionAlreadyBought: boolean
	isLoading: boolean
	onBuy(tariffId: number): Promise<void>
}

export function Tariff(props: TariffProps) {
	const { tariff, isAuthorized, isAnySubscriptionAlreadyBought, isLoading, onBuy } = props

	return (
		<div className='tariff'>
			<p className='tariff__slogan'>{tariff.slogan}</p>
			<p className={cn('tariff__name', tariff.isPaid && 'tariff__name--accent')}>{tariff.name}</p>
			<div className='tariff__features-and-description'>
				<ul className='tariff__features'>
					{tariff.features.map((feature) => {
						return <Feature text={feature} key={feature} />
					})}
				</ul>
				<div className='tariff__small-text tariff__description'>{tariff.description}</div>
			</div>
			{tariff.isPaid && (
				<PriceAndBuyButtonBlock
					tariff={tariff}
					isAuthorized={isAuthorized}
					isAnySubscriptionAlreadyBought={isAnySubscriptionAlreadyBought}
					isLoading={isLoading}
					onBuy={onBuy}
				/>
			)}
		</div>
	)
}

function Feature({ text }: { text: string }) {
	return <li className='tariff__feature'>{text}</li>
}

function PriceAndBuyButtonBlock(props: TariffProps) {
	const { tariff, isAuthorized, isAnySubscriptionAlreadyBought, isLoading, onBuy } = props

	const [duration, setDuration] = useState<number>(tariff.prices[0].durationDays)
	const selectedTariff = tariff.prices.find((price) => price.durationDays === duration) ?? tariff.prices[0]

	return (
		<div>
			<RadioGroup
				config={tariff.prices.map((price) => {
					return {
						id: price.durationDays.toString(),
						label: `${price.durationDays} дней`,
						checked: duration === price.durationDays,
						inputProps: {
							onChange: () => setDuration(price.durationDays),
						},
					}
				})}
				direction='horizontal'
				extraClass='tariff__duration'
			/>
			<p className='tariff__price'>{selectedTariff.priceRub} ₽</p>
			<Button
				disabled={isAnySubscriptionAlreadyBought}
				loading={isLoading}
				onClick={() => onBuy(selectedTariff.tariffId)}
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
			<div className='tariff__small-text tariff__footer-text'>Оплата картой РФ</div>
		</div>
	)
}
