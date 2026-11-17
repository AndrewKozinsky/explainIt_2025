import { useTranslations } from 'next-intl'
import { pricingConfig } from '@/shared/consts/pricingConfig'
import PricingPlanCard from '../PricingPlanCard/PricingPlanCard'
import SubscriptionPurchase from '../SubscriptionPurchase/SubscriptionPurchase'
import './PricingPlans.scss'

function PricingPlans() {
	const t = useTranslations('pricingPage')

	const { subscriptionLimitMultiplier, subscriptionDurationInDays } = pricingConfig
	const features = [t('features.scenarios'), t('features.tools')]

	return (
		<div className='pricing-page__plans'>
			<div className='pricing-page__plan'>
				<PricingPlanCard
					tagline={t('freePlan.tagline')}
					title={t('freePlan.title')}
					features={features}
					limit={t('freePlan.limit')}
					conditions={[t('freePlan.limitCarryover')]}
				/>
			</div>
			<div className='pricing-page__plan'>
				<PricingPlanCard
					tagline={t('subscriptionPlan.tagline', { multiplier: subscriptionLimitMultiplier })}
					title={t('subscriptionPlan.title')}
					isAccent
					features={features}
					limit={t('subscriptionPlan.limit', { multiplier: subscriptionLimitMultiplier })}
					conditions={[
						t('subscriptionPlan.limitCarryover'),
						t('subscriptionPlan.duration', { days: subscriptionDurationInDays }),
					]}
				>
					<SubscriptionPurchase />
				</PricingPlanCard>
			</div>
		</div>
	)
}

export default PricingPlans
