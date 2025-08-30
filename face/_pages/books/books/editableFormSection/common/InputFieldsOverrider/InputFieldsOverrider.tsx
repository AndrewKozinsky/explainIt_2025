import React from 'react'
import cn from 'classnames'
import './InputFieldsOverrider.scss'

type InputFieldsOverriderProps = {
	children: React.ReactNode
	size?: 'standard' | 'big'
}

function InputFieldsOverrider(props: InputFieldsOverriderProps) {
	const { children, size = 'standard' } = props

	return <div className={cn('book-input', size === 'big' && 'book-input--big')}>{children}</div>
}

export default InputFieldsOverrider
