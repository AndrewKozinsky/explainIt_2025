import React from 'react'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import ExpressionsPageContent from '../ExpressionsPageContent/ExpressionsPageContent'
import { pageUrls } from 'сonsts/pageUrls'

type PagItemType = {
	name: string
	path: string
}

type ExpressionsPageProps = {
	children: React.ReactNode
	breadcrumbItems?: PagItemType[]
	headerText?: string
}

function ExpressionsLayout(props: ExpressionsPageProps) {
	const { children, breadcrumbItems = [], headerText = pageUrls.expressions.name } = props

	return (
		<PageContentWrapper>
			<BreadCrumbs items={breadcrumbItems} />
			<Header>{headerText}</Header>
			<ExpressionsPageContent>{children}</ExpressionsPageContent>
		</PageContentWrapper>
	)
}

export default ExpressionsLayout
