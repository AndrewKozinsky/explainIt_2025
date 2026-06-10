import React, { CSSProperties, MouseEventHandler } from 'react'
import cn from 'classnames'
import { Link } from '@/i18n/routing'
import './BaseButton.scss'

type BaseButtonProps = {
	theme?: 'plain' | 'outline' | 'regular' | 'accent' | 'danger'
	onClick?: () => void
	disabled?: boolean
	extraClass?: string
	current?: boolean
	href?: string
	type?: 'button' | 'submit' | 'reset'
	style?: CSSProperties
	children?: React.ReactNode
}

function BaseButton(props: BaseButtonProps) {
	const { theme = 'regular', extraClass, onClick, current, disabled, href, type, style, children } = props

	const isDisabled = !!disabled || !!current
	const className = cn('base-button', 'base-button--' + theme, extraClass, current && 'base-button--current')

	if (!href || isDisabled) {
		return (
			<button className={className} disabled={isDisabled} style={style} onClick={onClick} type={type ?? 'button'}>
				{children}
			</button>
		)
	}

	return (
		<Link className={className} href={href} style={style} onClick={onClick}>
			{children}
		</Link>
	)
}

export default BaseButton
