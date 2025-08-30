import Link from 'next/link'
import React from 'react'
import './ContentLinkWrapper.scss'

type BookLinkBlockProps = {
	href: string
	isCurrent: boolean
	children: React.ReactNode
}

function ContentLinkWrapper(props: BookLinkBlockProps) {
	const { href, isCurrent, children } = props

	if (isCurrent) {
		return <div className='content-link-wrapper content-link-wrapper--current'>{children}</div>
	}

	return (
		<Link href={href} className='content-link-wrapper content-link-wrapper--link'>
			{children}
		</Link>
	)
}

export default ContentLinkWrapper
