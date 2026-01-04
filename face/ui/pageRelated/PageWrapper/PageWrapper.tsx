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
					<p className='page-wrapper__legal-text-wrapper'>
						<Link className='link' href={pageUrls.docs.privacyPolicy.path}>
							{pageUrls.docs.privacyPolicy.name}
						</Link>
						<Link className='link' href={pageUrls.docs.offer.path}>
							{pageUrls.docs.offer.name}
						</Link>
					</p>
					<p className='page-wrapper__legal-text-wrapper'>
						<span>Самозанятый Козинский Андрей Сергеевич</span>
						<span>ИНН: 560912925372</span>
						<span>Россия, Оренбург</span>
						<span>andkozinskiy@yandex.ru</span>
						<span>
							Переводы выполняются автоматически с использованием искусственного интеллекта. Возможны
							неточности.
						</span>
						{/*TODO Сделай чтобы эта надпись появлялась только на странице где действительно используется Словарь, а не на всех*/}
						<span>
							Реализовано с помощью сервиса{' '}
							<a href='https://tech.yandex.ru/dictionary'>«Яндекс.Словарь»</a>
						</span>
					</p>
				</footer>
			)}
		</div>
	)
}
