import React, { CSSProperties } from 'react'
import cn from 'classnames'
import { Link } from '@/i18n/routing'
import './BaseButton.scss'

type BaseButtonProps = {
	theme?: 'plain' | 'outline' | 'regular' | 'accent' | 'danger' | 'unstyled'
	colorScheme?: 'dark' | 'light'
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	onPointerDown?: React.PointerEventHandler<HTMLButtonElement>
	disabled?: boolean
	extraClass?: string
	current?: boolean
	href?: string
	type?: 'button' | 'submit' | 'reset'
	style?: CSSProperties
	title?: string
	'aria-label'?: string
	'aria-labelledby'?: React.AriaAttributes['aria-labelledby']
	'aria-describedby'?: React.AriaAttributes['aria-describedby']
	'aria-pressed'?: React.AriaAttributes['aria-pressed']
	children?: React.ReactNode
}

function BaseButton(props: BaseButtonProps) {
	const {
		theme = 'regular',
		colorScheme = 'dark',
		extraClass,
		onClick,
		onPointerDown,
		current,
		disabled,
		href,
		type,
		style,
		title,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': ariaDescribedBy,
		'aria-pressed': ariaPressed,
		children,
	} = props

	const isDisabled = !!disabled || !!current
	const colorModifier = current
		? `base-button--color-${colorScheme}-current`
		: `base-button--color-${colorScheme}-${theme}`
	const className = cn(
		theme !== 'unstyled' && ['base-button', 'base-button--' + theme, colorModifier],
		extraClass,
		current && 'base-button--current',
	)

	if (!href || isDisabled) {
		return (
			<button
				className={className}
				disabled={isDisabled}
				style={style}
				onClick={onClick}
				onPointerDown={onPointerDown}
				type={type ?? 'button'}
				title={title}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
				aria-describedby={ariaDescribedBy}
				aria-pressed={ariaPressed}
			>
				{children}
			</button>
		)
	}

	return (
		<Link
			className={className}
			href={href}
			style={style}
			onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
			title={title}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-describedby={ariaDescribedBy}
		>
			{children}
		</Link>
	)
}

export default BaseButton
