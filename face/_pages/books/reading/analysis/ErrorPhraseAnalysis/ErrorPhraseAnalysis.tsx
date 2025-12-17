import React from 'react'
import { useGetErrorMessage } from './fn/getPhraseData'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

function ErrorPhraseAnalysis() {
	const errorMessage = useGetErrorMessage()

	return (
		<div style={{ paddingTop: '1.5rem' }}>
			<ErrorMessage text={errorMessage} />
		</div>
	)
}

export default ErrorPhraseAnalysis
