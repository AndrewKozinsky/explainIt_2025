import React from 'react'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

type ContentErrorProps = {
	errorText: string
}

function ContentError(props: ContentErrorProps) {
	const { errorText } = props

	return (
		<div className='video-dropzone video-dropzone--error'>
			<ErrorMessage text={errorText} />
		</div>
	)
}

export default ContentError

// 'Во время загрузки возникла ошибка. Попробуйте ещё раз.'
