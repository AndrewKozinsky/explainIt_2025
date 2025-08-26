import cn from 'classnames'
import React, { ReactNode } from 'react'

type ButtonIconProps = {
	icon?: string | ReactNode
	disabled: boolean
}

export function ButtonIcon(props: ButtonIconProps) {
	const { icon, disabled } = props

	if (!icon) {
		return null
	}

	return typeof icon === 'string' ? (
		<span className={cn('button__icon', disabled && 'button__icon--disabled')}>
			<img src={icon} alt='icon' />
		</span>
	) : null
}
