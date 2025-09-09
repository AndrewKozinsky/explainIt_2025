import React from 'react'
import AnalysisSentence from '../AnalysisSentence/AnalysisSentence'
import './WordsAnalysis.scss'

function WordsAnalysis() {
	return (
		<>
			<div className='words-analysis__top'>
				<AnalysisSentence />
			</div>
			<div className='words-analysis__bottom'>123</div>
		</>
	)
}

export default WordsAnalysis
