import { useTranslations } from 'next-intl'
import './AfterSubscription.scss'

function AfterSubscription() {
	const t = useTranslations('pricingPage.afterSubscription')

	return (
		<section className='pricing-page__after-subscription'>
			<h2 className='pricing-page__after-subscription-title'>{t('title')}</h2>
			<p>{t('freePlan')}</p>
			<p>{t('noRenewal')}</p>
			<p>{t('carryover')}</p>
			<p>{t('dialogues')}</p>
		</section>
	)
}

export default AfterSubscription
