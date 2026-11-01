import { ReactNode } from 'react'
import cn from 'classnames'
import './MainPageSection.scss'

type MainPageSectionProps = {
	// Короткая надпись над заголовком
	eyebrow?: string
	header: string
	// Текст под заголовком
	text?: string
	children: ReactNode
	extraClass?: string
}

/** Блок главной страницы: надпись, заголовок, текст и содержимое блока */
function MainPageSection(props: MainPageSectionProps) {
	const { eyebrow, header, text, children, extraClass } = props

	return (
		<section className={cn('main-page-section', extraClass)}>
			<div className='main-page-section__top'>
				{eyebrow && <p className='main-page-section__eyebrow'>{eyebrow}</p>}
				<h2 className='main-page-section__header'>{header}</h2>
				{text && <p className='main-page-section__text'>{text}</p>}
			</div>
			{children}
		</section>
	)
}

export default MainPageSection
