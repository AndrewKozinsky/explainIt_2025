import React from 'react'
import { ErrorIcon } from '../icons/ErrorIcon/ErrorIcon'
import './ErrorMessage.scss'

type LoadingMessageProps = {
	text: null | string
}

function ErrorMessage(props: LoadingMessageProps) {
	const { text } = props

	if (!text) {
		return null
	}

	return (
		<div className='error-message' data-testid='exercise-error-analysis-block'>
			<ErrorIcon />
			{text}
		</div>
	)
}

export default ErrorMessage
