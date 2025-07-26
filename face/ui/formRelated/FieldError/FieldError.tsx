import React from 'react'
import './FieldError.scss'

type FieldErrorProps = {
	text: undefined | null | string
}

function FieldError(props: FieldErrorProps) {
	const { text } = props

	if (!text) return null

	return <p className='field-error'>{text}</p>
}

export default FieldError
