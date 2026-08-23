'use client'

import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import BaseButton from '../../buttons/BaseButton/BaseButton'
import '../Button/Button.scss'
import './ExerciseButton.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string
	onClick?: () => void
}

function ExerciseButton(props: ButtonProps) {
	const { text, onClick = () => {}, className, ...buttonProps } = props

	return (
		<BaseButton extraClass={cn('rect-button', className)} onClick={onClick} {...buttonProps}>
			{text}
		</BaseButton>
	)
}

export default ExerciseButton
