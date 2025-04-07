import React from 'react'
import './PageContentWrapper.scss'

type PageContentWrapperProps = {
	children: React.ReactNode[]
}

export function PageContentWrapper(props: PageContentWrapperProps) {
	const { children } = props
	const header = children[0] || 'Header is required'
	const breadCrumbs = children[1] || 'BreadCrumbs is required'
	const content = children[2] || 'Content is required'

	return (
		<article className="page-content-wrapper">
			<div className="page-content-wrapper__top">
				{header}
				{breadCrumbs}
			</div>
			{content}
		</article>
	)
}
