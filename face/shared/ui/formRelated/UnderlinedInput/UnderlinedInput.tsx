import React from 'react'
import './UnderlinedInput.scss'

type UnderlinedInputProps = {
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

/** Однострочное поле крупным шрифтом без рамки: границу поля обозначает только линия снизу. */
function UnderlinedInput({ inputProps }: UnderlinedInputProps) {
	return <input className='underlined-input' {...inputProps} />
}

export default UnderlinedInput
