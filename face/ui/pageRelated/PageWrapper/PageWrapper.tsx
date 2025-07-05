import React from 'react'
import Bar from '../PageTopBar/Bar'
import './PageWrapper.scss'

type PageWrapperProps = {
	// Содержимое страницы
	children: React.ReactNode
}

export function PageWrapper(props: PageWrapperProps) {
	const { children } = props

	return (
		<div className='page-wrapper' data-testid='page-wrapper'>
			<header className='page-wrapper__top'>
				<Bar position='top' />
			</header>
			<div className='page-wrapper__middle'>{children}</div>
			<footer className='page-wrapper__bottom'>
				<Bar position='bottom' />
			</footer>
		</div>
	)
}
