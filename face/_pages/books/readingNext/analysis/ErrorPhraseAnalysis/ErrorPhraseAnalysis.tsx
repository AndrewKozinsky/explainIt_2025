import React from 'react'
import { useGetErrorMessage } from '_pages/books/readingNext/analysis/ErrorPhraseAnalysis/fn/getPhraseData'
import './ErrorPhraseAnalysis.scss'

function ErrorPhraseAnalysis() {
	const errorMessage = useGetErrorMessage()

	return <div className='error-phrase-analysis'>{errorMessage}</div>
}

export default ErrorPhraseAnalysis
