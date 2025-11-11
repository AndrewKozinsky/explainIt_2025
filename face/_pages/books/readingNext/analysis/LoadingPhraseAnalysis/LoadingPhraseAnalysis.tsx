import { useGetText } from '_pages/books/readingNext/analysis/LoadingPhraseAnalysis/fn/getText'
import React from 'react'
import './LoadingPhraseAnalysis.scss'

function LoadingPhraseAnalysis() {
	const phraseText = useGetText()

	return <p className='loading-phrase-analysis' data-text={phraseText}>{phraseText}</p>
}

export default LoadingPhraseAnalysis
