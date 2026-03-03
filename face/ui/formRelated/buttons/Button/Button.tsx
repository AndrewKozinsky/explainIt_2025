'use client'

import React, { ReactNode } from 'react'
import cn from 'classnames'
import Spinner from '../../../Spinner/Spinner'
import { ButtonIcon } from './ButtonIcon'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'danger' | 'accent'
	size?: 'medium' | 'big'
	children?: ReactNode
	icon?: string | ReactNode
	loading?: boolean
	dataTestId?: string
	extraClass?: string
}

function Button(props: ButtonProps) {
	const {
		theme = 'regular',
		size = 'medium',
		children,
		icon,
		loading = false,
		dataTestId,
		extraClass,
		...restProps
	} = props

	if (!restProps.type) {
		restProps.type = 'button'
	}

	const buttonClasses = [
		'button',
		`button--size-${size}`,
		`button--theme-${theme}`,
		!children && icon && 'button--icon-only',
	]

	let disabled = (props.disabled || loading) ?? false

	return (
		<button className={cn(buttonClasses, extraClass)} {...restProps} data-testid={dataTestId} disabled={disabled}>
			<ButtonIcon icon={icon} disabled={disabled} />
			{children}
			{loading && <Spinner />}
		</button>
	)
}

export default Button
