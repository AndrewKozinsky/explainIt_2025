import React from 'react'
import FieldError from '../FieldError/FieldError'
import LabelWithField from '../LabelWithField/LabelWithField'
import { throwErrorIfWrongProps } from './fn/wrongPropsError'
import MaxCharactersCounter from './MaxCharactersCounter'
import './TextInput.scss'

export type TextInputProps = {
	label?: string
	error?: null | string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
	textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
	maxCharacters?: number
	currentText?: null | string
}

function TextInput(props: TextInputProps) {
	const { label, error, inputProps, textareaProps, maxCharacters, currentText } = props

	throwErrorIfWrongProps(props)

	const disabled = inputProps?.disabled || textareaProps?.disabled

	return (
		<LabelWithField label={label} disabled={disabled}>
			{inputProps && <input className='text-input__input' {...inputProps} />}
			{textareaProps && <textarea className='text-input__input' {...textareaProps} />}
			{maxCharacters && <MaxCharactersCounter maxCharacters={maxCharacters} text={currentText} />}
			<FieldError text={error} />
		</LabelWithField>
	)
}

export default TextInput
