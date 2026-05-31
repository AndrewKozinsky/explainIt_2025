import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'
import GrammarPageContent from '_pages/grammar/GrammarPageContent/GrammarPageContent'
import { pageUrls } from 'сonsts/pageUrls'

type PagItemType = {
	name: string
	path: string
}

type GrammarLayoutProps = {
	children: React.ReactNode
	breadcrumbItems?: PagItemType[]
	headerText?: string
}

export default function GrammarRootLayout(props: GrammarLayoutProps) {
	const { children, breadcrumbItems = [], headerText = pageUrls.grammar.name } = props

	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs items={breadcrumbItems} />
				<Header>{headerText}</Header>
				<GrammarPageContent>{children}</GrammarPageContent>
			</PageContentWrapper>
		</PageWrapper>
	)
}
