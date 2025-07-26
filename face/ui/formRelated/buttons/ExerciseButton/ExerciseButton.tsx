'use client'

import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import '../button/Button.scss'
import './ExerciseButton.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string
	onClick?: () => void
}

function ExerciseButton(props: ButtonProps) {
	const { text, onClick = () => {}, className, ...buttonProps } = props

	return (
		<button className={cn('button rect-button', className)} onClick={onClick} {...buttonProps}>
			{text}
		</button>
	)
}

export default ExerciseButton
