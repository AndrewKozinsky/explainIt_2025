import React from 'react'
import { SuccessIcon } from 'ui/icons/SuccessIcon/ErrorIcon'
import './SuccessMessage.scss'

type SuccessMessageProps = {
	text: null | string
}

function SuccessMessage(props: SuccessMessageProps) {
	const { text } = props

	if (!text) {
		return null
	}

	return (
		<div className='success-message'>
			<SuccessIcon />
			{text}
		</div>
	)
}

export default SuccessMessage
