'use client'

import { useLocale, useTranslations } from 'next-intl'
import { formatBalanceRefillTime } from '@/entities/user/fn/getNextBalanceRefill'
import { useNextBalanceRefill } from '@/entities/user/fn/useNextBalanceRefill'
import './LimitRefillNote.scss'

/**
 * Как обновляется дневной лимит и что бывает при превышении.
 * Время обновления — в часовом поясе браузера; до гидратации показывается в UTC.
 */
function LimitRefillNote() {
	const t = useTranslations('pricingPage.limitNote')
	const locale = useLocale()
	const balanceRefill = useNextBalanceRefill()

	const refillText = balanceRefill
		? t('refillLocal', { time: formatBalanceRefillTime(balanceRefill.refillTime, locale) })
		: t('refillUtc')

	return (
		<p className='limit-refill-note'>
			{refillText} {t('overrun')}
		</p>
	)
}

export default LimitRefillNote
