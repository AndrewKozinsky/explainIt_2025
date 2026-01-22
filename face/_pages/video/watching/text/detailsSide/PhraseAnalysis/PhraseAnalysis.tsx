import React from 'react'
import { useGetAnalysisAfterSelectedWordChange } from './fn/getAnalysis'
import Lexemes from './Lexemes'
import TopText from './TopText'
import './PhraseAnalysis.scss'

function PhraseAnalysis() {
	useGetAnalysisAfterSelectedWordChange()

	return (
		<div className='phrase-analysis'>
			<TopText />
			<Lexemes />
		</div>
	)
}

export default PhraseAnalysis
