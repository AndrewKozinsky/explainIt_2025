import type { ReactNode } from 'react'
import cn from 'classnames'
import { CheckIcon } from '@/shared/ui/icons/common/CheckIcon'
import './PricingPlanCard.scss'

type PricingPlanCardProps = {
	/** Строка над названием: чем тариф отличается. */
	tagline: string
	title: string
	/** Название тарифа акцентным цветом. */
	isAccent?: boolean
	features: string[]
	/** Описание дневного лимита. */
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
			<header className='pricing-plan-card__heading'>
				<p className='pricing-plan-card__tagline'>{tagline}</p>
				<h2 className={cn('pricing-plan-card__title', isAccent && 'pricing-plan-card__title--accent')}>
					{title}
				</h2>
			</header>
			<ul className='pricing-plan-card__features' role='list'>
				{features.map((feature) => (
					<li key={feature} className='pricing-plan-card__feature'>
						<CheckIcon extraClass='pricing-plan-card__feature-icon' />
						{feature}
					</li>
				))}
			</ul>
			<div className='pricing-plan-card__rules'>
				<p>{limit}</p>
				<ul className='pricing-plan-card__conditions' role='list'>
					{conditions.map((condition) => (
						<li key={condition}>{condition}</li>
					))}
				</ul>
			</div>
			{children}
		</section>
	)
}

export default PricingPlanCard
