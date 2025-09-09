import React from 'react'
import AnalysisSentence from '../AnalysisSentence/AnalysisSentence'
import TranslatePhraseButtonBlock from '../TranslatePhraseButtonBlock/TranslatePhraseButtonBlock'
import './WordsAnalysis.scss'

function WordsAnalysis() {
	return (
		<>
			<div className='words-analysis__top'>
				<AnalysisSentence />
				<TranslatePhraseButtonBlock />
			</div>
			<div className='words-analysis__bottom'>123</div>
		</>
	)
}

export default WordsAnalysis
