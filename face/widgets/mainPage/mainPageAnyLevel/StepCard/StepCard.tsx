import { ReactNode } from 'react'
import cn from 'classnames'
import './StepCard.scss'

type StepCardProps = {
	// Номер шага в виде «01»
	number: string
	title: string
	children: ReactNode
	extraClass?: string
}

/** Карточка шага: сверху номер и заголовок, под ними содержимое шага */
function StepCard(props: StepCardProps) {
	const { number, title, children, extraClass } = props

	return (
		<li className={cn('any-level-step-card', extraClass)}>
			<div className='any-level-step-card__top'>
				{/* Номер уже передаёт нумерованный список */}
				<span className='any-level-step-card__number' aria-hidden='true'>
					{number}
				</span>
				<h3 className='any-level-step-card__title'>{title}</h3>
			</div>
			<div className='any-level-step-card__body'>{children}</div>
		</li>
	)
}

export default StepCard
