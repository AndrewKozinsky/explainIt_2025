'use client'

import cn from 'classnames'
import React, { ReactNode } from 'react'
import { ButtonIcon } from './ButtonIcon'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'danger'
	size?: 'small'
	children?: ReactNode
	icon?: string | ReactNode
	dataTestId?: string
}

function Button(props: ButtonProps) {
	const { theme = 'regular', size = 'small', children, icon, dataTestId, ...restProps } = props

	const buttonClasses = ['button', `button--size-${size}`, `button--theme-${theme}`]

	return (
		<button className={cn(buttonClasses)} {...restProps} data-testid={dataTestId}>
			<ButtonIcon icon={icon} />
			{children}
		</button>
	)
}

export default Button
