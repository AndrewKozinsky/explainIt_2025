import React from 'react'
import { PageHeader } from '../../../ui/pageRelated/PageHeader/PageHeader'
import './MainPageHeader.scss'

function MainPageHeader() {
	return (
		<div className='main-page-header'>
			<PageHeader extraClass='main-page-header__header'>Понимая английский</PageHeader>
			<p className='main-page-header__description'>
				Курс для тех, кто хочет разобраться и&nbsp;превратить грамматику в навык.
			</p>
		</div>
	)
}

export default MainPageHeader
