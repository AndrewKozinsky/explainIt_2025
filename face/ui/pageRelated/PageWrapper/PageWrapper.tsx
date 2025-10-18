import Link from 'next/link'
import React from 'react'
import { pageUrls } from 'сonsts/pageUrls'
import Bar from '../pageTopBar/PageTopBar/Bar'
import './PageWrapper.scss'

type PageWrapperProps = {
	top?: boolean
	bottom?: boolean
	// Содержимое страницы
	children: React.ReactNode
}

export function PageWrapper(props: PageWrapperProps) {
	const { top = false, bottom = false, children } = props

	return (
		<div className='page-wrapper' data-testid='page-wrapper'>
			{top && (
				<header className='page-wrapper__top'>
					<Bar />
				</header>
			)}
			<div className='page-wrapper__middle'>{children}</div>
			{bottom && (
				<footer className='page-wrapper__bottom'>
					<p>
						<Link className='link' href={pageUrls.docs.privacyPolicy.path}>
							{pageUrls.docs.privacyPolicy.name}
						</Link>
					</p>
				</footer>
			)}
		</div>
	)
}
