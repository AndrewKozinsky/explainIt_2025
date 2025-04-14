import React from 'react'
import cn from 'classnames'
import './PageHeader.scss'

type PageHeaderProps = {
	extraClass?: string
	children: React.ReactNode
	// Текст подзаголовка
	subheaderText?: string
}

export function PageHeader(props: PageHeaderProps) {
	const { children, extraClass, subheaderText } = props

	return (
		<div>
			<h1 className={cn('page-header', extraClass)}>{children}</h1>
			{subheaderText ? <p className='page-header__subheader'>{subheaderText}</p> : null}
		</div>
	)
}
