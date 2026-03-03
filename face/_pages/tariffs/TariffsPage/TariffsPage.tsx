import Header from 'ui/Header/Header'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import TariffRules from '../TariffRules/TariffRules'
import TariffsTable from '../TariffsTable/TariffsTable'

/** Страница тарифов */
function TariffsPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Тарифы</Header>
				<div>
					<TariffsTable />
					<TariffRules />
				</div>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default TariffsPage
