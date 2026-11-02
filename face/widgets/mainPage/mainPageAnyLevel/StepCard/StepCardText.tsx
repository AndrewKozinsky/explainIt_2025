import { ReactNode } from 'react'
import cn from 'classnames'
import './StepCard.scss'

type StepCardTextProps = {
	children: ReactNode
	extraClass?: string
}

/** Текстовая часть карточки шага с отступами по краям. Раскладку содержимого задаёт extraClass */
function StepCardText(props: StepCardTextProps) {
	const { children, extraClass } = props

	return <div className={cn('any-level-step-card__text', extraClass)}>{children}</div>
}

export default StepCardText
