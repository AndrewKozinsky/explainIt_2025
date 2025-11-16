import React from 'react'
import { useGetErrorMessage } from '_pages/books/reading/analysis/ErrorPhraseAnalysis/fn/getPhraseData'
import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'

function ErrorPhraseAnalysis() {
	const errorMessage = useGetErrorMessage()

	return <ErrorMessage text={errorMessage} />
}

export default ErrorPhraseAnalysis
