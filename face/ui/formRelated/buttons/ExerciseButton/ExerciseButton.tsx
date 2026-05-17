'use client'

import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import '../Button/Button.scss'
import './ExerciseButton.scss'
import BaseButton from 'ui/BaseButton/BaseButton'

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
