import SelectedSentence from '../AnalysisSentence/AnalysisSentence'
import TranslatePhraseBlock from '../TranslatePhraseButtonBlock/TranslatePhraseBlock'
import './WordsAnalysis.scss'

function WordsAnalysis() {
	return (
		<>
			<div className='words-analysis__top'>
				<SelectedSentence />
				<TranslatePhraseBlock />
			</div>
			<div className='words-analysis__bottom'>bottom</div>
		</>
	)
}

export default WordsAnalysis
