import { ReactNode } from 'react'
import './FeatureCard.scss'

type FeatureCardProps = {
	number: string
	title: string
	text: string
	// Иллюстрация функции под текстом
	children?: ReactNode
}

/** Карточка функции: слева номер, справа заголовок, описание и иллюстрация */
function FeatureCard(props: FeatureCardProps) {
	const { number, title, text, children } = props

	return (
		<article className='feature-card'>
			<span className='feature-card__number' aria-hidden='true'>
				{number}
			</span>
			<div className='feature-card__content'>
				<h3 className='feature-card__title'>{title}</h3>
				<p className='feature-card__text'>{text}</p>
				{children}
			</div>
		</article>
	)
}

export default FeatureCard
