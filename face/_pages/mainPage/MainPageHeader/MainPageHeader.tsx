import React from 'react'
import { PageHeader } from '../../../ui/pageRelated/PageHeader/PageHeader'
import s from './MainPageHeader.module.scss'

function MainPageHeader() {
	return (
		<div className={s.wrapper}>
			<PageHeader extraClass={s.header}>Понимая английский</PageHeader>
			<p className={s.description}>
				Упражнения для тех, кто хочет разобраться и&nbsp;превратить грамматику в навык.
			</p>
		</div>
	)
}

export default MainPageHeader
