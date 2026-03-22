'use client'

import React from 'react'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function BooksPageLayout(props: LLMPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper top bottom>
			{children}
		</PageWrapper>
	)
}

export default BooksPageLayout
