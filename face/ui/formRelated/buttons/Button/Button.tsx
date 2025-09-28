'use client'

import cn from 'classnames'
import React, { ReactNode } from 'react'
import Spinner from '../../../Spinner/Spinner'
import { ButtonIcon } from './ButtonIcon'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'danger'
	size?: 'small'
	children?: ReactNode
	icon?: string | ReactNode
	loading?: boolean
	dataTestId?: string
}

function Button(props: ButtonProps) {
	const { theme = 'regular', size = 'small', children, icon, loading = false, dataTestId, ...restProps } = props

	if (!restProps.type) {
		restProps.type = 'button'
	}

	const buttonClasses = ['button', `button--size-${size}`, `button--theme-${theme}`]

	let disabled = (props.disabled || loading) ?? false

	return (
		<button className={cn(buttonClasses)} {...restProps} data-testid={dataTestId} disabled={disabled}>
			<ButtonIcon icon={icon} disabled={disabled} />
			{children}
			{loading && <Spinner />}
		</button>
	)
}

export default Button
