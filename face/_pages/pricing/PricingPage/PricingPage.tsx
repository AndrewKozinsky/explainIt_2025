import { useTranslations } from 'next-intl'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import { pageUrls } from '@/shared/utils/pageUrls'
import PricingContent from '@/widgets/pricing/PricingContent/PricingContent'

/**
 * Страница тарифов. Возможности тарифов одинаковые, отличается только дневной лимит на ИИ.
 * Оплата пока не подключена: тарифы показываются, чтобы оценить интерес к подписке.
 */
function PricingPage() {
	const tPageUrls = useTranslations('pageUrls')

	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{tPageUrls(pageUrls.pricing.nameKey)}</Header>
				<PricingContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default PricingPage
