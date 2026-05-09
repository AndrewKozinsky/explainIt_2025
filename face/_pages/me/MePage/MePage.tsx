import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from '@/ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import MePageContent from '_pages/me/MePageContent/MePageContent'

function MePage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Личный кабинет</Header>
				<MePageContent />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default MePage
