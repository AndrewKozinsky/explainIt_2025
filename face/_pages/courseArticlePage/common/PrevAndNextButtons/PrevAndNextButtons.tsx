import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { LeftArrow, RightArrow } from '../../../../ui/icons/ArrowIcon/ArrowIcon'
import './ArtPrevAndNextButtons.scss'

// Какого цвета будет текст кнопки
export type PrevAndNextButtonsTextColor = 'blue' | 'white'

export type PrevAndNextButtonConfig = {
	topText?: string
	name: string
	description: string
	href: string
}

type ArtPrevAndNextButtonsProps = {
	// Цвет текста и обводок
	textColor?: PrevAndNextButtonsTextColor
	// Конфигурация левой кнопки
	backConfig?: PrevAndNextButtonConfig
	// Конфигурация правой кнопки
	nextConfig?: PrevAndNextButtonConfig
}

/**
 * Компонент с двумя кнопка для перехода между статей.
 * Располагается внизу страницы
 */
export function PrevAndNextButtons(props: ArtPrevAndNextButtonsProps) {
	const { textColor = 'blue', backConfig: back, nextConfig: next } = props

	if (!back && !next) return null

	return (
		<div className='art-prev-and-next-buttons-outer'>
			<nav className={cn('art-prev-and-next-buttons', 'art-prev-and-next-buttons--' + textColor)}>
				{back ? (
					<PrevOrNextButton
						direction='prev'
						topText={back.topText}
						name={back.name}
						description={back.description}
						href={back.href}
					/>
				) : (
					<div data-testid='prev-and-next-button-ghost' />
				)}

				{next ? (
					<PrevOrNextButton
						direction='next'
						topText={next.topText}
						name={next.name}
						description={next.description}
						href={next.href}
					/>
				) : (
					<div />
				)}
			</nav>
		</div>
	)
}

type ArtPrevOrNextButtonProps = PrevAndNextButtonConfig & {
	// Направление кнопки-ссылки
	direction: 'prev' | 'next'
}

/** Кнопка-ссылка на предыдущую или следующую статью */
function PrevOrNextButton(props: ArtPrevOrNextButtonProps) {
	const { topText, name, description, direction, href } = props

	return (
		<Link href={href} className={cn('prev-or-next-button', 'prev-or-next-button--' + direction)}>
			{direction === 'prev' ? (
				<LeftArrow extraClass='prev-or-next-button__arrow' />
			) : (
				<RightArrow extraClass='prev-or-next-button__arrow' />
			)}
			<div className='prev-or-next-button__hr' />
			<div className='prev-or-next-button__content'>
				{topText && <p className='prev-or-next-button__top'>{topText}</p>}
				<p className='prev-or-next-button__name'>{name}</p>
				<p className='prev-or-next-button__description'>{description}</p>
			</div>
		</Link>
	)
}
