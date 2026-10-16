import React, { CSSProperties } from 'react'
import cn from 'classnames'
import { Link } from '@/i18n/routing'
import './BaseButton.scss'

type BaseButtonProps = {
	theme?: 'plain' | 'outline' | 'regular' | 'accent' | 'danger'
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	extraClass?: string
	current?: boolean
	href?: string
	type?: 'button' | 'submit' | 'reset'
	style?: CSSProperties
	title?: string
	'aria-label'?: string
	'aria-pressed'?: React.AriaAttributes['aria-pressed']
	children?: React.ReactNode
}

function BaseButton(props: BaseButtonProps) {
	const {
		theme = 'regular',
		extraClass,
		onClick,
		current,
		disabled,
		href,
		type,
		style,
		title,
		'aria-label': ariaLabel,
		'aria-pressed': ariaPressed,
		children,
	} = props

	const isDisabled = !!disabled || !!current
	const className = cn('base-button', 'base-button--' + theme, extraClass, current && 'base-button--current')

	if (!href || isDisabled) {
		return (
			<button
				className={className}
				disabled={isDisabled}
				style={style}
				onClick={onClick}
				type={type ?? 'button'}
				title={title}
				aria-label={ariaLabel}
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
		>
			{children}
		</Link>
	)
}

export default BaseButton
