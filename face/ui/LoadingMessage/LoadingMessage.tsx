import React from 'react'
import Spinner from '../Spinner/Spinner'
import './LoadingMessage.scss'

type LoadingMessageProps = {
	text: string
}

function LoadingMessage(props: LoadingMessageProps) {
	const { text } = props

	return (
		<div className='loading-message' data-testid='exercise-loading-analysis-block'>
			{text}
			<Spinner />
		</div>
	)
}

export default LoadingMessage
