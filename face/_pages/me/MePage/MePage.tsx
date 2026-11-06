import { useTranslations } from 'next-intl'
import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import { pageUrls } from '@/shared/utils/pageUrls'
import MePageContent from '_pages/me/MePageContent/MePageContent'

function MePage() {
	const t = useTranslations('pageUrls')

	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{t(pageUrls.me.nameKey)}</Header>
				<MePageContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default MePage
