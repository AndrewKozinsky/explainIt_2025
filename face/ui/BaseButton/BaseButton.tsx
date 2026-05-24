import React, { CSSProperties, MouseEventHandler } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import './BaseButton.scss'

type BaseButtonProps = {
	theme?: 'plain' | 'outline' | 'regular' | 'accent' | 'danger'
	onClick?: () => void
	disabled?: boolean
	extraClass: string
	current?: boolean
	href?: string
	type?: 'button' | 'submit' | 'reset'
	style?: CSSProperties
	children: React.ReactNode
}

function BaseButton(props: BaseButtonProps) {
	const { theme = 'regular', extraClass, onClick, current, disabled, href, type, style, children } = props

	const Tag = href ? Link : 'button'

	return (
		<Tag
			className={cn('base-button', 'base-button--' + theme, extraClass, current && 'base-button--current')}
			disabled={disabled || current}
			href={href ?? '/'}
			style={style}
			onClick={onClick}
			{...(!href ? { type: type ?? 'button' } : {})}
		>
			{children}
		</Tag>
	)
}

export default BaseButton
