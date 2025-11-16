import React from 'react'
import { useGetText } from './fn/getText'
import './LoadingPhraseAnalysis.scss'

function LoadingPhraseAnalysis() {
	const phraseText = useGetText()

	return (
		<p className='loading-phrase-analysis' data-text={phraseText}>
			{phraseText}
		</p>
	)
}

export default LoadingPhraseAnalysis
