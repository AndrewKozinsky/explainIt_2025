import React from 'react'
import './FormError.scss'

type FormErrorProps = {
	text: null | string
	dataTestId?: string
}

function FormError(props: FormErrorProps) {
	const { text, dataTestId } = props

	if (!text) return null

	return (
		<p className='form-error' data-testid={dataTestId}>
			{text}
		</p>
	)
}

export default FormError
