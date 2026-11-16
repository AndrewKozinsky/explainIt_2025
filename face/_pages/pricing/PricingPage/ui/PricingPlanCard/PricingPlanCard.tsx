import type { ReactNode } from 'react'
import cn from 'classnames'
import { CheckIcon } from '@/shared/ui/icons/CheckIcon'
import './PricingPlanCard.scss'

type PricingPlanCardProps = {
	/** Строка над названием: чем тариф отличается. */
	tagline: string
	title: string
	/** Название тарифа акцентным цветом. */
	isAccent?: boolean
	features: string[]
	/** Главное отличие тарифов — дневной лимит; выделяется сильнее возможностей. */
	limit: string
	conditions: string[]
	/** Цена и кнопка выбора. */
	children?: ReactNode
}

/** Колонка тарифа: возможности, дневной лимит и условия. */
function PricingPlanCard(props: PricingPlanCardProps) {
	const { tagline, title, isAccent, features, limit, conditions, children } = props

	return (
		<section className='pricing-plan-card'>
			<p className='pricing-plan-card__tagline'>{tagline}</p>
			<h2 className={cn('pricing-plan-card__title', isAccent && 'pricing-plan-card__title--accent')}>{title}</h2>
			<p className='pricing-plan-card__limit'>{limit}</p>
			<ul className='pricing-plan-card__features'>
				{features.map((feature) => (
					<li key={feature} className='pricing-plan-card__feature'>
						<CheckIcon extraClass='pricing-plan-card__feature-icon' />
						{feature}
					</li>
				))}
			</ul>
			<ul className='pricing-plan-card__conditions'>
				{conditions.map((condition) => (
					<li key={condition} className='pricing-plan-card__condition'>
						{condition}
					</li>
				))}
			</ul>
			{children && <div className='pricing-plan-card__purchase'>{children}</div>}
		</section>
	)
}

export default PricingPlanCard
