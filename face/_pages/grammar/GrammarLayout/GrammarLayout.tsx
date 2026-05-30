import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import GrammarPageContent from '../GrammarPageContent/GrammarPageContent'
import { pageUrls } from 'сonsts/pageUrls'

type PageItemType = {
	name: string
	path: string
}

type GrammarLayoutProps = {
	children: React.ReactNode
	breadcrumbItems?: PageItemType[]
	headerText?: string
}

function GrammarLayout(props: GrammarLayoutProps) {
	const { children, breadcrumbItems = [], headerText = pageUrls.grammar.name } = props

	return (
		<PageContentWrapper>
			<BreadCrumbs items={breadcrumbItems} />
			<Header>{headerText}</Header>
			<GrammarPageContent>{children}</GrammarPageContent>
		</PageContentWrapper>
	)
}

export default GrammarLayout
