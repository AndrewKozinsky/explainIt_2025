import React from 'react'
import AnalysisSentence from '../AnalysisSentence/AnalysisSentence'
import TranslatePhraseBlock from '_pages/books/reading/analysis/wordsAnalysis/TranslatePhraseButtonBlock/TranslatePhraseBlock'
import './WordsAnalysis.scss'

function WordsAnalysis() {
	return (
		<>
			<div className='words-analysis__top'>
				<AnalysisSentence />
				<TranslatePhraseBlock />
			</div>
			<div className='words-analysis__bottom'>bottom</div>
		</>
	)
}

export default WordsAnalysis
