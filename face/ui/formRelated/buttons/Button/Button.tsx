'use client'

import React, { ReactNode } from 'react'
import './Button.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	dataTestId?: string
}

function Button(props: ButtonProps) {
	const { children, dataTestId, ...restProps } = props

	return (
		<button className='button' {...restProps} data-testid={dataTestId}>
			{children}
		</button>
	)
}

export default Button
