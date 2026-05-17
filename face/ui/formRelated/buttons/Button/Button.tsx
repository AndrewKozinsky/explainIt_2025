'use client'

import React, { ReactNode } from 'react'
import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import Spinner from '../../../Spinner/Spinner'
import { ButtonIcon } from './ButtonIcon'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'danger' | 'accent'
	size?: 'medium' | 'big'
	children?: ReactNode
	icon?: string | ReactNode
	loading?: boolean
	extraClass?: string
}

function Button(props: ButtonProps) {
	const { theme = 'regular', size = 'medium', children, icon, loading = false, extraClass, ...restProps } = props

	if (!restProps.type) {
		restProps.type = 'button'
	}

	const buttonClasses = ['button', `button--size-${size}`, !children && icon && 'button--icon-only']

	let disabled = (props.disabled || loading) ?? false

	return (
		<BaseButton extraClass={cn(buttonClasses, extraClass)} disabled={disabled} theme={theme}>
			<ButtonIcon icon={icon} disabled={disabled} />
			{children}
			{loading && <Spinner size='small' />}
		</BaseButton>
	)
}

export default Button
