'use client'

import React, { ReactNode } from 'react'
import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import Spinner from '../../../Spinner/Spinner'
import { ButtonIcon } from './ButtonIcon'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'danger' | 'accent' | 'plain' | 'outline'
	colorScheme?: 'dark' | 'light'
	rounded?: boolean
	size?: 'small' | 'medium' | 'big' | 'custom'
	href?: string
	children?: ReactNode
	icon?: string | ReactNode
	loading?: boolean
	extraClass?: string
}

function Button(props: ButtonProps) {
	const {
		theme = 'regular',
		colorScheme = 'dark',
		rounded,
		size = 'medium',
		children,
		icon,
		loading = false,
		href,
		extraClass,
		onClick,
		...restProps
	} = props

	if (!restProps.type) {
		restProps.type = 'button'
	}

	const buttonClasses = [
		'button',
		size !== 'custom' && `button--size-${size}`,
		!children && icon && 'button--icon-only',
		rounded && 'button--rounded',
	]
	const buttonType = restProps.type || 'button'

	let disabled = (props.disabled || loading) ?? false

	return (
		<BaseButton
			href={href}
			extraClass={cn(buttonClasses, extraClass)}
			disabled={disabled}
			theme={theme}
			colorScheme={colorScheme}
			onClick={onClick}
			onPointerDown={restProps.onPointerDown}
			type={buttonType}
			title={restProps.title}
			aria-label={restProps['aria-label']}
			aria-pressed={restProps['aria-pressed']}
		>
			<ButtonIcon icon={icon} disabled={disabled} />
			{children}
			{loading && <Spinner size='small' />}
		</BaseButton>
	)
}

export default Button
