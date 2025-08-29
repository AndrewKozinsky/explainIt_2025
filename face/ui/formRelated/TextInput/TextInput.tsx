import cn from 'classnames'
import React from 'react'
import FieldError from '../FieldError/FieldError'
import './TextInput.scss'

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
	label: string
	placeholder?: string
	error?: null | string
	disabled?: boolean
	dataTestId?: string
}

function TextInput(props: TextInputProps) {
	const { label, error, className, disabled, dataTestId, ...restProps } = props

	return (
		<div className={cn('text-input', disabled && 'text-input--disabled')} data-testid={dataTestId}>
			<label className='text-input__label'>{label}</label>
			<input className='text-input__input' disabled={disabled} {...restProps} />
			<FieldError text={error} />
		</div>
	)
}

export default TextInput
