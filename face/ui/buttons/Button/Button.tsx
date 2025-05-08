import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import '../Button.scss'
import './Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string
	onClick: () => void
}

function Button(props: ButtonProps) {
	const { text, onClick, className, ...buttonProps } = props

	return (
		<button className={cn('button rect-button', className)} onClick={onClick} {...buttonProps}>
			{text}
		</button>
	)
}

export default Button
