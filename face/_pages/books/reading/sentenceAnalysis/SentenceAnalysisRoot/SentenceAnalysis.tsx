import HintAndTranslateButtonBlock from '_pages/books/reading/sentenceAnalysis/HintAndTranslateButtonBlock/HintAndTranslateButtonBlock'
import SentenceBlock from '_pages/books/reading/sentenceAnalysis/sentenceBlock/SentenceBlock/SentenceBlock'
import PhrasesBlock from '../phrasesBlock/PhrasesBlock/PhrasesBlock'
import SentenceTranslationBlock from '../SentenceTranslationBlock/SentenceTranslationBlock'
import './WordsAnalysis.scss'

function SentenceAnalysis() {
	return (
		<>
			<div className='words-analysis__top'>
				<SentenceBlock />
				<SentenceTranslationBlock />
				<HintAndTranslateButtonBlock />
			</div>
			<div className='words-analysis__bottom'>
				<PhrasesBlock />
			</div>
		</>
	)
}

export default SentenceAnalysis
