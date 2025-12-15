import cn from 'classnames'
import React from 'react'
import MaxCharactersCounter from 'ui/formRelated/TextInput/MaxCharactersCounter'
import FieldError from '../FieldError/FieldError'
import { throwErrorIfWrongProps } from './fn/wrongPropsError'
import './TextInput.scss'

export type TextInputProps = {
	label: string
	error?: null | string
	dataTestId?: string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
	textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
	maxCharacters?: number
	currentText?: null | string
}

function TextInput(props: TextInputProps) {
	const { label, error, dataTestId, inputProps, textareaProps, maxCharacters, currentText } = props

	throwErrorIfWrongProps(props)

	const disabled = inputProps?.disabled || textareaProps?.disabled

	return (
		<div className={cn('text-input', disabled && 'text-input--disabled')} data-testid={dataTestId}>
			<label className='text-input__label'>{label}</label>
			{inputProps && <input className='text-input__input' {...inputProps} />}
			{textareaProps && <textarea className='text-input__input' {...textareaProps} />}
			{maxCharacters && <MaxCharactersCounter maxCharacters={maxCharacters} text={currentText} />}
			<FieldError text={error} />
		</div>
	)
}

export default TextInput
