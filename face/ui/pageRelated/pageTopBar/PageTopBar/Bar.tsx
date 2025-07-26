import cn from 'classnames'
import React from 'react'
import { LinkLogoWithText } from '@/ui/logo/LinkLogoWithText/LinkLogoWithText'
import { MainMenu } from '../../MainMenu/MainMenu'
import PageTopBarUserButtons from '../PageTopBarUserButtons/PageTopBarUserButtons'
import './Bar.scss'

function Bar() {
	return (
		<div className={cn('page-bar')}>
			<div className='page-bar__left'>
				<LinkLogoWithText />
				<MainMenu />
			</div>
			<PageTopBarUserButtons />
		</div>
	)
}

export default Bar
