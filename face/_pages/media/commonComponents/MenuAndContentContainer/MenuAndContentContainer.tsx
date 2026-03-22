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
			<aside className='menu-and-content-container__menu'>{leftMenu}</aside>
			<main className='menu-and-content-container__content'>{children}</main>
		</div>
	)
}

export default MenuAndContentContainer
