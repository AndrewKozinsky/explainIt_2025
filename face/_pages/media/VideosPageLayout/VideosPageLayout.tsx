'use client'

import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'

type LLMPageLayoutProps = {
	children: React.ReactNode
}

function VideosPageLayout(props: LLMPageLayoutProps) {
	const { children } = props

	return (
		<PageWrapper top bottom>
			{children}
		</PageWrapper>
	)
}

export default VideosPageLayout
