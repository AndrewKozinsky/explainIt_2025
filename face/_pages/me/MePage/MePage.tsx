import Header from '@/shared/ui/Header/Header'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/shared/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/shared/ui/pageRelated/PageWrapper/PageWrapper'
import MePageContent from '_pages/me/MePageContent/MePageContent'

function MePage() {
	return (
		<PageWrapper withTop withBottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Личный кабинет</Header>
				<MePageContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default MePage
