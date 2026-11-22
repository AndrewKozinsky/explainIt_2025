'use client'

import { useLocale, useTranslations } from 'next-intl'
import { formatBalanceRefillTime } from '@/entities/user/fn/getNextBalanceRefill'
import { useIsBalanceExhausted } from '@/entities/user/fn/useIsBalanceExhausted'
import { useNextBalanceRefill } from '@/entities/user/fn/useNextBalanceRefill'
import { pricingConfig } from '@/shared/consts/pricingConfig'
import { capturePosthogEvent, type PricingLinkPlacement } from '@/shared/posthog/posthogEvents'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { InfoIcon } from '@/shared/ui/icons/common/InfoIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import './BalanceExhaustedNotice.scss'

type BalanceExhaustedNoticeProps = {
	/** Где показано сообщение: свойство события PostHog при переходе к тарифам. */
	placement: PricingLinkPlacement
}

/**
 * Сообщение об исчерпанном дневном лимите ИИ со ссылкой на тарифы.
 * Показывается, только пока баланс не больше нуля, и исчезает само после начисления.
 */
function BalanceExhaustedNotice(props: BalanceExhaustedNoticeProps) {
	const { placement } = props

	const t = useTranslations('balanceExhaustedNotice')
	const locale = useLocale()
	const isBalanceExhausted = useIsBalanceExhausted()
	const balanceRefill = useNextBalanceRefill()

	if (!isBalanceExhausted) return null

	const refillTimeText = balanceRefill ? formatBalanceRefillTime(balanceRefill.refillTime, locale) : null

	return (
		<div className='balance-exhausted-notice' role='status'>
			<InfoIcon extraClass='balance-exhausted-notice__icon' />
			<div className='balance-exhausted-notice__content'>
				<p className='balance-exhausted-notice__title'>{t('title')}</p>
				<p className='balance-exhausted-notice__text'>
					{refillTimeText &&
						t('refill', { day: balanceRefill?.isToday ? 'today' : 'tomorrow', time: refillTimeText }) + ' '}
					{t('subscription', { multiplier: pricingConfig.subscriptionLimitMultiplier })}
				</p>
				<Button
					theme='accent'
					href={pageUrls.pricing.path}
					extraClass='balance-exhausted-notice__pricing-button'
					onClick={() => capturePosthogEvent({ name: 'pricing_link_clicked', placement })}
				>
					{t('pricingButton')}
				</Button>
			</div>
		</div>
	)
}

export default BalanceExhaustedNotice
