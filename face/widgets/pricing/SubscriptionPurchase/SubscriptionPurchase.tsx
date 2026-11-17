import { useLocale, useTranslations } from 'next-intl'
import { pricingConfig } from '@/shared/consts/pricingConfig'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import './SubscriptionPurchase.scss'

/** Цена подписки и кнопка выбора. Оплата пока не подключена: что делает кнопка, ещё не решено. */
function SubscriptionPurchase() {
	const t = useTranslations('pricingPage.subscriptionPlan')
	const locale = useLocale()

	const priceText = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(pricingConfig.subscriptionPriceInDollars)

	return (
		<div className='subscription-purchase'>
			<p className='subscription-purchase__price'>
				<span className='subscription-purchase__amount'>{priceText}</span>{' '}
				<span className='subscription-purchase__period'>
					{t('pricePeriod', { days: pricingConfig.subscriptionDurationInDays })}
				</span>
			</p>
			<Button theme='accent' size='custom' extraClass='subscription-purchase__button'>
				{t('chooseButton')}
			</Button>
		</div>
	)
}

export default SubscriptionPurchase
