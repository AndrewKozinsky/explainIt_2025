import Link from 'next/link'
import React from 'react'
import './ContentLinkWrapper.scss'

type BookLinkBlockProps = {
	href: string
	isCurrent: boolean
	children: React.ReactNode
	dataTestId?: string
}

function ContentLinkWrapper(props: BookLinkBlockProps) {
	const { href, isCurrent, children, dataTestId } = props

	if (isCurrent) {
		return (
			<div className='content-link-wrapper content-link-wrapper--current' data-testid={dataTestId}>
				{children}
			</div>
		)
	}

	return (
		<Link href={href} className='content-link-wrapper content-link-wrapper--link' data-testid={dataTestId}>
			{children}
		</Link>
	)
}

export default ContentLinkWrapper
