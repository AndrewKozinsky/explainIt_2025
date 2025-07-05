import cn from 'classnames'
import React from 'react'
import { LinkLogoWithText } from '../../logo/LinkLogoWithText/LinkLogoWithText'
import { MainMenu } from '../MainMenu/MainMenu'
import './Bar.scss'

type BarProps = {
	position: 'top' | 'bottom'
}

function Bar(props: BarProps) {
	const { position } = props

	return (
		<div className={cn('page-bar', 'page-bar__' + position)}>
			<div className='page-bar__left'>
				<LinkLogoWithText />
				<MainMenu />
			</div>
			<div></div>
		</div>
	)
}

export default Bar
