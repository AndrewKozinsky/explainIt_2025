import React from 'react'
import { ErrorIcon } from '../icons/ErrorIcon/ErrorIcon'
import './ErrorMessage.scss'

type LoadingMessageProps = {
	text: string
}

function ErrorMessage(props: LoadingMessageProps) {
	const { text } = props

	return (
		<div className='error-message'>
			<ErrorIcon />
			{text}
		</div>
	)
}

export default ErrorMessage
