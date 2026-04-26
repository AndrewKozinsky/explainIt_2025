import React from 'react'

type GenerationIsFailedProps = {
	errorMessage?: null | string
}

function GenerationIsFailed(props: GenerationIsFailedProps) {
	const { errorMessage } = props

	return (
		<p className='chat-message__status-text chat-message__status-text--error'>
			Ошибка: {errorMessage ?? 'не удалось получить ответ'}
		</p>
	)
}

export default GenerationIsFailed
