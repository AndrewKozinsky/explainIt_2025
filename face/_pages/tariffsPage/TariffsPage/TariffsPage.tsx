import React from 'react'
import Header from 'ui/Header/Header'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { BreadCrumbs } from '@/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageWrapper } from '@/ui/pageRelated/PageWrapper/PageWrapper'
import Tariffs from '../Tariffs/Tariffs'

/** Страница тарифов */
function TariffsPage() {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>Тарифы</Header>
				<Tariffs />
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default TariffsPage
