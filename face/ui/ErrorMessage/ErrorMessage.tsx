import React from 'react'
import { ErrorIcon } from '../icons/ErrorIcon/ErrorIcon'
import './ErrorMessage.scss'

type LoadingMessageProps = {
	text: string
}

function ErrorMessage(props: LoadingMessageProps) {
	const { text } = props

	return (
		<div className='error-message' data-testid='exercise-error-analysis-block'>
			<ErrorIcon />
			{text}
		</div>
	)
}

export default ErrorMessage
