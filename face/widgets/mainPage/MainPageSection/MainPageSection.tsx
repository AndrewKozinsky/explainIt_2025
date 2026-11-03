import { ReactNode } from 'react'
import cn from 'classnames'
import MainPageEyebrow from '../MainPageEyebrow/MainPageEyebrow'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
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
				{eyebrow && <MainPageEyebrow text={eyebrow} />}
				<MainPageHeader text={header} />
				{text && <p className='main-page-section__text'>{text}</p>}
			</div>
			{children}
		</section>
	)
}

export default MainPageSection
