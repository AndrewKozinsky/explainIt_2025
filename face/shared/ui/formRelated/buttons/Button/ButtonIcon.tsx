import React, { ReactNode } from 'react'
import cn from 'classnames'

type ButtonIconProps = {
	icon?: string | ReactNode
	disabled: boolean
}

export function ButtonIcon(props: ButtonIconProps) {
	const { icon, disabled } = props

	if (!icon) return null

	return (
		<span className={cn('button__icon', typeof icon === 'string' && disabled && 'button__icon--disabled')}>
			{typeof icon === 'string' ? <img src={icon} alt='icon' /> : icon}
		</span>
	)
}
