import { useReadingStore } from '_pages/books/reading/readingStore'
import AnalysisSentence from '../AnalysisSentence/AnalysisSentence'
import TranslatePhraseBlock from '../TranslatePhraseButtonBlock/TranslatePhraseBlock'
import './WordsAnalysis.scss'

function WordsAnalysis() {
	const sentence = useReadingStore((s) => s.selectedSentence)

	if (!sentence || !sentence.sentence || !sentence.selectedWordIds.length) {
		return null
	}

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
