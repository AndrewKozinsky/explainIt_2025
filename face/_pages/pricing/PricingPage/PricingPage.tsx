import { useTranslations } from 'next-intl'
import { pricingConfig } from '@/shared/consts/pricingConfig'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import { pageUrls } from '@/shared/utils/pageUrls'
import LimitRefillNote from './ui/LimitRefillNote/LimitRefillNote'
import PricingPlanCard from './ui/PricingPlanCard/PricingPlanCard'
import SubscriptionPurchase from './ui/SubscriptionPurchase/SubscriptionPurchase'
import './PricingPage.scss'

/**
 * Страница тарифов. Возможности тарифов одинаковые, отличается только дневной лимит на ИИ.
 * Оплата пока не подключена: тарифы показываются, чтобы оценить интерес к подписке.
 */
function PricingPage() {
	const t = useTranslations('pricingPage')
	const tPageUrls = useTranslations('pageUrls')

	const { subscriptionLimitMultiplier, subscriptionDurationInDays } = pricingConfig
	const features = [t('features.scenarios'), t('features.tools')]

	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{tPageUrls(pageUrls.pricing.nameKey)}</Header>
				<div className='pricing-page__content'>
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
					<LimitRefillNote />
					<section className='pricing-page__after-subscription'>
						<Header hTag={2} hStyle={3}>
							{t('afterSubscription.title')}
						</Header>
						<p>{t('afterSubscription.freePlan')}</p>
						<p>{t('afterSubscription.noRenewal')}</p>
						<p>{t('afterSubscription.carryover')}</p>
						<p>{t('afterSubscription.dialogues')}</p>
					</section>
				</div>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default PricingPage
