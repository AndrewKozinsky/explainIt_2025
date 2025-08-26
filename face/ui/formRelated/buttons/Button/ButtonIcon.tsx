import React, { ReactNode } from 'react'

type ButtonIconProps = {
	icon?: string | ReactNode
}

export function ButtonIcon(props: ButtonIconProps) {
	const { icon } = props

	if (!icon) {
		return null
	}

	return typeof icon === 'string' ? <img src={icon} alt='icon' /> : null
}
