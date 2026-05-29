import React from 'react'
import './MenuAndContentContainer.scss'

type MenuAndContentContainerProps = {
	leftMenu: React.ReactNode
	children: React.ReactNode
}

function MenuAndContentContainer(props: MenuAndContentContainerProps) {
	const { leftMenu, children } = props

	return (
		<div className='menu-and-content-container'>
			<main className='menu-and-content-container__content'>{children}</main>
			<aside className='menu-and-content-container__menu'>{leftMenu}</aside>
		</div>
	)
}

export default MenuAndContentContainer
