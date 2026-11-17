import { useTranslations } from 'next-intl'
import Header from '@/shared/ui/Header/Header'
import './AfterSubscription.scss'

function AfterSubscription() {
	const t = useTranslations('pricingPage.afterSubscription')

	return (
		<section className='pricing-page__after-subscription'>
			<Header hTag={2} hStyle={3}>
				{t('title')}
			</Header>
			<p>{t('freePlan')}</p>
			<p>{t('noRenewal')}</p>
			<p>{t('carryover')}</p>
			<p>{t('dialogues')}</p>
		</section>
	)
}

export default AfterSubscription
