import React, { CSSProperties } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import './BaseButton.scss'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: 'regular' | 'accent' | 'danger'
	extraClass: string
	current?: boolean
	href?: string
	style?: CSSProperties
	children: React.ReactNode
}

function BaseButton(props: BaseButtonProps) {
	const { type = 'default', extraClass, onClick, current, disabled, href, style, children, ...restProps } = props

	const Tag = href ? Link : 'button'

	return (
		<Tag
			className={cn('base-button', 'base-button--' + type, extraClass, current && 'base-button--current')}
			disabled={disabled || current}
			href={href ?? '/'}
			style={style}
			{...restProps}
		>
			{children}
		</Tag>
	)
}

export default BaseButton
