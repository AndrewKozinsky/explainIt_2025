import React from 'react'
import { useGetErrorMessage } from './fn/getPhraseData'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

function ErrorPhraseAnalysis() {
	const errorMessage = useGetErrorMessage()

	return <ErrorMessage text={errorMessage} />
}

export default ErrorPhraseAnalysis
