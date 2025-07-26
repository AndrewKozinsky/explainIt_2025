'use client'

import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useIsCurrentPage } from './MainMenu/fn/mainMenuFn'

type MenuLinkProps = {
	linkData: {
		path: string
		name: string
	}
}

export function MainMenuLink(props: MenuLinkProps) {
	const { linkData } = props
	const { path, name } = linkData

	const isCurrentPage = useIsCurrentPage(path)

	return (
		<Link
			href={path}
			className={cn('link', isCurrentPage && 'main-menu__link--current')}
			data-testid='main-menu-item'
		>
			{name}
		</Link>
	)
}
