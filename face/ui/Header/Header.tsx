import React from 'react'
import cn from 'classnames'
import './Header.scss'

type PageHeaderProps = {
	hTag?: 1 | 2 | 3 | 4
	hStyle?: 1 | 2 | 3 | 4
	extraClass?: string
	children: React.ReactNode
	// Текст подзаголовка
	subheaderText?: string
}

export default function Header(props: PageHeaderProps) {
	const { hTag = 1, hStyle = hTag, children, extraClass, subheaderText } = props

	const Tag = ('h' + hTag) as 'h1'
	const headerClasses = cn('header', 'header--' + 'h' + hStyle, extraClass)

	return (
		<div>
			<Tag className={headerClasses}>{children}</Tag>
			{subheaderText ? <p className='header__subheader'>{subheaderText}</p> : null}
		</div>
	)
}
