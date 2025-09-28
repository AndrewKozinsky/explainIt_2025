import cn from 'classnames'
import Link from 'next/link'
import React from 'react'
import './ContentLinkWrapper.scss'

type BookLinkBlockProps = {
	href: string
	isCurrent: boolean
	children: React.ReactNode
	dataTestId?: string
}

// Обёртка для книги или главы
function ContentLinkWrapper(props: BookLinkBlockProps) {
	const { href, isCurrent, children, dataTestId } = props

	const classes = ['content-link-wrapper', 'content-link-wrapper--link']
	if (isCurrent) {
		classes.push('content-link-wrapper--current')
	}

	return (
		<Link href={href} className={cn(classes)} data-testid={dataTestId}>
			{children}
		</Link>
	)
}

export default ContentLinkWrapper
