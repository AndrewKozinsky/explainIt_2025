import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'
import ExpressionsPageContent from '../ExpressionsPageContent/ExpressionsPageContent'
import { pageUrls } from 'сonsts/pageUrls'

function ExpressionsPage({ children }: { children: React.ReactNode }) {
	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs />
				<Header>{pageUrls.expressions.name}</Header>
				<ExpressionsPageContent>{children}</ExpressionsPageContent>
			</PageContentWrapper>
		</PageWrapper>
	)
}

export default ExpressionsPage
